import { Callable } from '../interfaces/Callable';

import { CleanFunctionOr, CleanFunction } from '../models/core/CleanFunction';
import { Dynamic, DynamicOrValue } from '../models/core/Dynamic';

import { on, off } from '../utils/events';
import { arrayDiff } from '../utils/arrayDiff';
import { reverseForEach } from '../utils/reverseForEach';

export type DynamicAttribute<K extends keyof HTMLElementTagNameMap, L extends keyof HTMLElementTagNameMap[K]> = CleanFunctionOr<DynamicOrValue<HTMLElementTagNameMap[K][L]>>;

export type DynamicHTMLElementNative<K extends keyof HTMLElementTagNameMap> = {
  [L in keyof HTMLElementTagNameMap[K]]?: CleanFunctionOr<DynamicOrValue<Partial<HTMLElementTagNameMap[K][L]>>>;
}

export type CustomHTMLAttributes = {
  ref?: Dynamic;
  onattach?: () => void;
  ondetach?: () => void;
};

export type DynamicHTMLElement<K extends keyof HTMLElementTagNameMap> = DynamicHTMLElementNative<K> & CustomHTMLAttributes;

declare global {
  export namespace JSX {
    type IntrinsicElements = {
      [K in keyof HTMLElementTagNameMap]: DynamicHTMLElement<K>
    };
  }
}

export class FragmentNode {
  children?: ChildNodes;
}

export class ElementNode<K extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap> {
  tagName: K;
  args?: DynamicHTMLElement<K>;
  children?: ChildNodes;
}

export class FunctionNode {
  func: Callable;
  props?: object;
  children?: ChildNodes;
}

export type PrintablePrimitive = string | number | boolean | null;

export type PrintableNode = Dynamic<PrintablePrimitive> | PrintablePrimitive;

export type ChildNode = ElementNode | FunctionNode | PrintableNode;

export type ChildNodes = Array<ChildNode> | Dynamic<Array<ChildNode>>;

export type Destructor = () => void;

export type RenderReturnType = [Node, Destructor];

export const Fragment = {};

export function renderFragment(node: FragmentNode): RenderReturnType {
  const fragment = document.createDocumentFragment();

  if (!node.children) {
    return [fragment, () => {}];
  }
  
  let childStartMap: Map<ChildNode, Node>;
  let childEndMap: Map<ChildNode, Node>;

  let destructors = new Map<ChildNode, Destructor>();

  function createItem(item: ChildNode): Node {
    const childRender = render(item);
    destructors.set(item, childRender[1]);
    return childRender[0];
  }

  function createDynamicItem(item: ChildNode): Node {
    const childRender = render(item);

    const childWrap = document.createDocumentFragment(),
      childStart = document.createTextNode(''),
      childEnd = document.createTextNode('');

    destructors.set(item, childRender[1]);
    childStartMap.set(item, childStart);
    childEndMap.set(item, childEnd);

    childWrap.appendChild(childStart);
    childWrap.appendChild(childRender[0]);
    childWrap.appendChild(childEnd);
    
    return childWrap;
  }

  if (node.children instanceof Dynamic) {
    const children = node.children as Dynamic<Array<ChildNode>>,
      childrenNodes = children.get(),
      entryNode = document.createTextNode(''),
      exitNode = document.createTextNode('');

    childStartMap = new Map();
    childEndMap = new Map();

    fragment.appendChild(entryNode);

    let originalNodes: Array<ChildNode>;

    if (childrenNodes) {
      originalNodes = childrenNodes.slice();
      childrenNodes.map(createDynamicItem).forEach((node) => {
        fragment.appendChild(node);
      });
    } else {
      originalNodes = [];
    }

    fragment.appendChild(exitNode);

    //TODO: implement a dynamic list here instead so we do need to diff the collection
    on(children, 'change', node, () => {
      const newNodes = children.get() || [];
      const changes = arrayDiff(originalNodes, newNodes);
      const parentNode = entryNode.parentNode;

      reverseForEach(changes.deletedItems, ([item]) => {
        destructors.get(item)();
        destructors.delete(item);

        const startNode = childStartMap.get(item);
        const endNode = childEndMap.get(item);
        
        let node = endNode, nextNode: Node;

        do {
          nextNode = node.previousSibling;
          parentNode.removeChild(node);
          node = nextNode;
        } while (node !== startNode);
        
        parentNode.removeChild(node);

        childStartMap.delete(item);
        childEndMap.delete(item);
        
        if (item instanceof ElementNode) {
          if (item.args && 'ondetach' in item.args) {
            item.args.ondetach();
          }
        }
      });

      reverseForEach(changes.newItems, ([item, index]) => {
        const newNode = createDynamicItem(item);

        let targetNode: Node;

        if (index < newNodes.length - 1) {
          targetNode = childStartMap.get(newNodes[index+1]);
        }

        parentNode.insertBefore(newNode, targetNode || exitNode);

        if (item instanceof ElementNode) {
          if (item.args && 'onattach' in item.args) {
            item.args.onattach();
          }
        }
      });

      changes.movedItems.forEach(([item, _, newIndex]) => {
        let targetNode: Node;

        if (newIndex < newNodes.length - 1) {
          targetNode = childStartMap.get(newNodes[newIndex + 1]);
        } else {
          targetNode = exitNode;
        }

        const startNode = childStartMap.get(item);
        const endNode = childEndMap.get(item);
        
        let node = startNode, nextNode: Node;

        do {
          nextNode = node.nextSibling;
          parentNode.insertBefore(node, targetNode);
          node = nextNode;
        } while (node !== endNode);

        parentNode.insertBefore(node, targetNode);
      });

      originalNodes = newNodes.slice();
    });
  } else {
    node.children.map(createItem).forEach((childNode) => {
      fragment.appendChild(childNode);
    });
  }

  return [fragment, () => {
    if (node.children instanceof Dynamic) {
      off(node.children, 'change', node);
    }

    destructors.forEach((destructor) => destructor());
  }];
}

export function renderFunction(node: FunctionNode): RenderReturnType {
  const result = node.func(node.props, node.children);
  const renderedResult = render(result[0]);

  return [renderedResult[0], () => {
    renderedResult[1]();
    result[1]();
  }];
}

export function setAttributeValue<T extends object = object>(obj: T, key: keyof T, value: T[keyof T]) {
  if (value === undefined || value === null) {
    delete obj[key];
  } else {
    obj[key] = value;
  }
}

export function setAttribute<E extends HTMLElement = HTMLElement, K extends keyof E = keyof E>(element: E, propName: K, propValue: E[K]): Destructor | void {
  let destructor: Destructor;
  let dynamics: Array<Dynamic>;

  if (propValue instanceof CleanFunction) {
    const valResult = propValue.func();

    propValue = valResult[0];
    destructor = valResult[1];
  }

  if (typeof propValue === 'object' && propValue !== null) {
    dynamics = [];

    for (let key in propValue) {
      const objValue = propValue[key];
      
      if (objValue instanceof Dynamic) {
        dynamics.push(objValue);
  
        on(objValue, 'change', element, () => setAttributeValue((element as any)[propName], key, objValue.get()));
        setAttributeValue((element as any)[propName], key, objValue.get());
      } else {
        setAttributeValue((element as any)[propName], key, objValue);
      }
    }
  } else {
    setAttributeValue(element, propName, propValue);
  }

  return () => {
    if (dynamics) {
      dynamics.forEach((dynamic) => off(dynamic, 'change', element));
    }

    if (destructor) {
      destructor();
    }
  };
}

export function renderElement<E extends keyof HTMLElementTagNameMap>(node: ElementNode<E>): RenderReturnType {
  const element = document.createElement(node.tagName) as HTMLElementTagNameMap[E];
  
  let argDestructors: Map<string, Destructor | void>;
  let dynamics: Array<Dynamic>;
  let fragmentDestructor: Destructor;
  let destructors: Array<Destructor>;

  if (node.args) {
    argDestructors = new Map();
    dynamics = [];
    destructors = [];
  
    for (let argName in node.args) {
      if (argName === 'onattach' || argName === 'ondetach') {
        continue;
      }

      if (argName === 'ref') {
        node.args[argName].set(element);
        continue;
      }
      
      const nodeArgs = node.args as any;

      let value = nodeArgs[argName];

      if (value instanceof CleanFunction) {
        const valResult = value.func();

        value = valResult[0];
        destructors.push(valResult[1]);
      }

      if (value instanceof Dynamic) {
        dynamics.push(value);

        let argDestructor = setAttribute(element, argName as any, value.get());
        argDestructors.set(argName, argDestructor);
        
        on(value, 'change', element, () => {
          if (argDestructor) {
            argDestructor();
          }

          argDestructor = setAttribute(element, argName as any, (value as Dynamic).get());
          argDestructors.set(argName, argDestructor);
        });
      } else {
        setAttribute(element, argName as any, value);
      }
    }
  }

  if (node.children) {
    const fragmentResults = renderFragment(node);
    element.appendChild(fragmentResults[0]);
    fragmentDestructor = fragmentResults[1];
  }

  return [element, () => {
    if (dynamics) {
      dynamics.forEach((dynamic) => off(dynamic, 'change', element));
    }

    if (argDestructors) {
      argDestructors.forEach((destructor) => {
        if (destructor) {
          destructor();
        }
      });
    }

    if (fragmentDestructor) {
      fragmentDestructor();
    }

    if (destructors) {
      destructors.forEach((destructor) => destructor());
    }
  }];
}

export function serializePrintable(node: PrintablePrimitive): string {
  return (node === null || node === undefined) ? '' : '' + node;
}

export function renderPrintable(node: PrintableNode): RenderReturnType {
  let textNode: Text;

  if (node instanceof Dynamic) {
    textNode = document.createTextNode(serializePrintable(node.get()));
    
    on(node, 'change', node, () => {
      textNode.textContent = serializePrintable(node.get());
    });
  } else {
    textNode = document.createTextNode(serializePrintable(node));
  }

  return [textNode, () => {
    if (node instanceof Dynamic) {
      off(node, 'change', node);
    }
  }];
}

export function render(node: FragmentNode | ElementNode | FunctionNode | PrintableNode): RenderReturnType {
  if (node instanceof FragmentNode) {
    return renderFragment(node);
  }

  if (node instanceof ElementNode) {
    return renderElement(node);
  }

  if (node instanceof FunctionNode) {
    return renderFunction(node);
  }

  return renderPrintable(node);
}

export function createFunction<F extends Callable = Callable>(func: F, props?: object, children?: ChildNodes): FunctionNode {
  return Object.assign(new FunctionNode(), {
    func,
    props,
    children
  });
}

export function createFragment(children: ChildNodes): FragmentNode {
  return Object.assign(new FragmentNode(), {
    children
  });
}

export function createElement(tagName: Symbol | string | Callable, args?: object, ...children: Array<ChildNode>): ElementNode | FunctionNode | FragmentNode {
  if (tagName === Fragment) {
    return createFragment(children);
  }

  switch (typeof tagName) {
    case 'string':
      return Object.assign(new ElementNode(), {
        tagName,
        args,
        children
      });
    case 'function':
      return createFunction(tagName, args as any, children);
  }
}
