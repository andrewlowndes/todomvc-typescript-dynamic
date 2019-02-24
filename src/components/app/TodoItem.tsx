import { ListItem } from "../../interfaces/ListItem";

import { Mode } from "../../constants/Mode";
import { Keys } from "../../constants/Keys";

import * as DomCreator from '../../view/DomCreator';

import { dynamic, derived, Dynamic } from "../../models/core/Dynamic";
import { Revealer } from "../common/Revealer";

interface TodoItemProps {
  item?: ListItem;
  mode?: Dynamic<Mode>;
  onremove: (item: ListItem) => void;
}

export function TodoItem(props: TodoItemProps) {
  const showEdit = derived([props.mode], () => props.mode.get() === Mode.Edit);

  const editInput = dynamic();

  let newText = derived([props.item.text], () => props.item.text.get());

  function toggleItem() {
    props.item.ticked.set(!props.item.ticked.get());
  }

  function updateText(e: Event) {
    newText.set((e.target as HTMLInputElement).value);
  }

  function setMode(newMode: Mode) {
    props.mode.set(newMode);
  }

  function editMode() {
    setMode(Mode.Edit);
  }

  function focusTextInput() {
    const input = editInput.get() as HTMLInputElement;
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }

  function enterNewText() {
    const newTextValue = newText.get();

    if (!newTextValue.length) {
      removeItem();
    } else {
      props.item.text.set(newTextValue);
    }

    setMode(Mode.Normal);
  }

  function editTextKeydown(e: KeyboardEvent) {
    if (e.which === Keys.Enter) {
      enterNewText();
    }
  }

  function removeItem() {
    props.onremove(props.item);
  }
  
  return [(
    <>
      <div className="view">
        <input className="toggle" type="checkbox" checked={ props.item.ticked } onclick={ toggleItem } />
        <label ondblclick={ editMode }>{ props.item.text }</label>
        <button className="destroy" onclick={ removeItem }></button>
      </div>

      <Revealer show={ showEdit }>
        <input onattach={ focusTextInput } autocomplete="off" spellcheck={false} ref={ editInput } className="edit" oninput={ updateText } onblur={ enterNewText } onkeydown={ editTextKeydown } value={ props.item.text } />
      </Revealer>
    </>
  ), () => {
    showEdit.destroy();
    editInput.destroy();
    newText.destroy();
  }];
}
