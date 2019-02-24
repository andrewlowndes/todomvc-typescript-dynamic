import { ChildNodes, ChildNode, createFragment } from "../../view/DomCreator";

import { Dynamic, derived } from '../../models/core/Dynamic';

interface RevealerProps {
  show: Dynamic<boolean> | boolean;
}

export function Revealer(props: RevealerProps, children: ChildNodes) {
  function getContents(show: boolean): Array<ChildNode> {
    return show ? children as Array<ChildNode> : undefined;
  }

  let newChildren: ChildNodes;

  if (props.show instanceof Dynamic) {
    const show = props.show as Dynamic<boolean>;

    newChildren = derived([show], () => {
      return getContents(show.get());
    });
  } else {
    newChildren = getContents(props.show);
  }

  return [createFragment(newChildren), () => {
    if (newChildren instanceof Dynamic) {
      newChildren.destroy();
    }
  }];
}
