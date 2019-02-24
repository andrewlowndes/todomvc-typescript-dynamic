import { ChildNodes, createFunction } from "../../view/DomCreator";

import { Callable } from "../../interfaces/Callable";

interface FunctionProps {
  func: Callable;
  props?: object;
}

export function Function(props: FunctionProps, children?: ChildNodes) {
  return [createFunction(props.func, props.props, children), () => {}];
}
