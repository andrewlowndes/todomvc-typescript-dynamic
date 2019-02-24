import * as DomCreator from '../../view/DomCreator';

import { dynamic, Dynamic } from '../../models/core/Dynamic';
import { inverseStatusUrlMap, Status } from '../../constants/Status';

interface ToggleLinkProps {
  item: Dynamic<Status>;
  value: Status;
}

export function ToggleLink(props: ToggleLinkProps, children: DomCreator.ChildNodes) {
  const linkClass = dynamic(getLinkClass(), [props.item], getLinkClass);

  function getLinkClass() {
    return props.item.get() === props.value ? 'selected' : '';
  }
  
  function setState() {
    props.item.set(props.value);
  }

  return [(
    <>
      <a href={'#' + inverseStatusUrlMap.get(props.value)} className={linkClass} onclick={ setState }>{ children }</a>
    </>
  ), () => {
    linkClass.destroy();
  }];
}

