/*
import { createFragment, ChildNodes, ChildNode, createFunction, Destructor } from "../../view/DomCreator";

import { Dynamic, dynamic } from '../../models/core/Dynamic';

interface ListProps<T = any> {
  collection: Dynamic<Array<T>> | Array<T>;
  item?: Dynamic<T>;
  index?: Dynamic<number>;
  func?: (item: T, index: number) => [ChildNode, Destructor];
}

export function List<T = any>(props: ListProps<T>, children: ChildNodes) {
  function iterate(iterateProps: { item: T, index: number }) {
    if (props.item) props.item.set(iterateProps.item);
    if (props.index) props.index.set(iterateProps.index);
    
    return [createFragment(children), () => {}];
  }

  let getDynamicContents: () => Array<ChildNode>;
  let getContents: (items: Array<T>) => Array<ChildNode>;

  let destructors: Array<Destructor>;

  const isDynamic = props.collection instanceof Dynamic;

  if (props.func) {
    destructors = [];

    getContents = (items: Array<T>): Array<ChildNode> => {
      return items.map((item, index) => {
        const itemFuncResults = props.func(item, index);
        destructors.push(itemFuncResults[1]);
        return itemFuncResults[0];
      });
    };

    //TODO: implement a dynamic list with more events so we do not have to diff the array
    if (isDynamic) {
      getDynamicContents = () => {
        destructors.forEach((destructor) => destructor());
        destructors = [];
        return getContents((props.collection as Dynamic).get());
      };
    }
  } else {
    getContents = (items: Array<T>): Array<ChildNode> => {
      return items.map((item, index) => createFunction(iterate, { item, index }));
    };

    //TODO: implement a dynamic list with more events so we do not have to diff the array
    if (isDynamic) {
      getDynamicContents = () => {
        

        return getContents((props.collection as Dynamic).get());
      };
    }
  }

  let newChildren: ChildNodes;

  if (isDynamic) {
    const collection = props.collection as Dynamic<Array<T>>;
    newChildren = dynamic(getContents(collection.get()), [collection], getDynamicContents);
  } else {
    newChildren = getContents(props.collection as Array<T>);
  }

  return [createFragment(newChildren), () => {
    if (newChildren instanceof Dynamic) {
      newChildren.destroy();
    }

    if (destructors) {
      destructors.forEach((destructor) => destructor());
    }
  }];
}
*/

import { createFragment, ChildNodes, ChildNode, Destructor } from "../../view/DomCreator";

import { Dynamic, dynamic } from '../../models/core/Dynamic';
import { arrayDiff } from "../../utils/arrayDiff";
import { reverseForEach } from "../../utils/reverseForEach";

type ListFuncReturn = [ChildNode, Destructor];

interface ListProps<T = any> {
  collection: Dynamic<Array<T>> | Array<T>;
  func: (item?: T) => ListFuncReturn;
}

export function List<T = any>(props: ListProps<T>) {
  let destructors = new Map<T, Destructor>();
  let itemContents = new Map<T, ChildNode>();

  function createItem(item: T): ChildNode {
    const itemFuncResults = props.func(item);

    destructors.set(item, itemFuncResults[1]);
    itemContents.set(item, itemFuncResults[0]);

    return itemFuncResults[0];
  }

  function getContents(items: Array<T>): Array<ChildNode> {
    return items.map((item) => createItem(item));
  }

  let newChildren: ChildNodes;

  if (props.collection instanceof Dynamic) {
    const collection = props.collection as Dynamic<Array<T>>;
    let originalCollection = collection.get().slice();

    const contents = getContents(originalCollection);
    
    //TODO: implement a dynamic list here instead so we do need to diff the collection
    newChildren = dynamic(contents, [collection], () => {
      const newCollection = collection.get();
      const changes = arrayDiff<T>(originalCollection, newCollection);

      reverseForEach(changes.deletedItems, ([item, index]) => {
        contents.splice(index, 1);
        destructors.get(item)();
        itemContents.delete(item);
        destructors.delete(item);
      });

      changes.newItems.forEach(([item, index]) => contents.splice(index, 0, createItem(item)));

      changes.movedItems.forEach(([item, _, newIndex]) => {
        const childNode = itemContents.get(item);

        if (contents[newIndex] !== childNode) {
          contents.splice(newIndex, 1, childNode);
        }
      });

      originalCollection = newCollection.slice();

      return contents;
    });
  } else {
    newChildren = getContents(props.collection as Array<T>);
  }

  return [createFragment(newChildren), () => {
    if (newChildren instanceof Dynamic) {
      newChildren.destroy();
    }

    if (destructors) {
      destructors.forEach((destructor) => destructor());
    }
  }];
}
