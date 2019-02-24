import { ListItem } from '../../interfaces/ListItem';

import { Status, statusUrlMap } from '../../constants/Status';
import { Keys } from '../../constants/Keys';
import { Mode } from '../../constants/Mode';

import { ListItems } from '../../models/ListItems';
import { dynamic, derived } from '../../models/core/Dynamic';

import * as DomCreator from '../../view/DomCreator';

import { on, off } from '../../utils/events';

import { Revealer } from '../common/Revealer';
import { List } from '../common/List';

import { ToggleLink } from '../ui/ToggleLink';

import { TodoItem } from './TodoItem';

export function TodoList() {
  const listItems = new ListItems(getItems());

  if (!window.location.hash) {
    window.location.hash = '#/';
  }

  const status = dynamic(getStatusFromUrl());

  const inputText = dynamic('');

  const tickedItems = derived([listItems.list], () => {
    return listItems.list.get().map((item) => item.ticked);
  });

  const tickedItemUpdates = derived(tickedItems);

  const textItems = derived([listItems.list], () => {
    return listItems.list.get().map((item) => item.text);
  });

  const textItemUpdates = derived(textItems);

  const tickedListChanges = derived([listItems.list, tickedItemUpdates]);

  const allListChanges = derived([tickedListChanges, textItemUpdates]);

  const visibleListItems = derived([tickedListChanges, status], () => {
    switch (status.get()) {
      default:
      case Status.All:
        return listItems.list.get();
      case Status.Active:
        return listItems.list.get().filter((item) => !item.ticked.get());
      case Status.Completed:
        return listItems.list.get().filter((item) => item.ticked.get());  
    }
  });

  const allTicked = derived([tickedListChanges], () => {
    return listItems.list.get().every((newListItem) => newListItem.ticked.get());
  });

  const showList = derived([listItems.list], () => {
    return listItems.list.get().length > 0;
  });

  const remainingText = derived([tickedListChanges], () => {
    const count = listItems.list.get().filter((item) => !item.ticked.get()).length;

    return `${count} item${count !== 1 ? 's' : ''} left`;
  });

  const showClear = derived([tickedListChanges], () => {
    return listItems.list.get().some((item) => item.ticked.get());
  });

  function getStatusFromUrl(): Status {
    const newStatus = window.location.hash.substring(1);

    if (statusUrlMap.has(newStatus)) {
      return statusUrlMap.get(newStatus);
    }

    return Status.All;
  }

  function getItems() {
    const store = localStorage.getItem('todo');

    if (!store) {
      return [];
    }

    const storeObject = JSON.parse(store);

    if (!storeObject) {
      return [];
    }

    return storeObject.items.map((item: { ticked: boolean; text: string }) => ({
      ticked: dynamic(item.ticked),
      text: dynamic(item.text)
    }));
  }

  function storeItems() {
    const storeObject = {
      items: listItems.list.get().map((item: ListItem) => ({
        ticked: item.ticked.get(),
        text: item.text.get()
      }))
    };

    localStorage.setItem('todo', JSON.stringify(storeObject));
  }

  function urlHashChange() {
    const newStatus = getStatusFromUrl();

    if (newStatus) {
      status.set(newStatus);
    }
  }

  function clearCompleted() {
    listItems.clearCompleted();
  }

  function setNewText(e: Event) {
    inputText.set((e.target as HTMLInputElement).value);
  }

  function addItem() {
    const text = inputText.get();

    if (text.length) {
      listItems.addListItem(text);
      inputText.set('');
    }
  }

  function newTextKeydown(e: KeyboardEvent) {
    if (e.which === Keys.Enter) {
      addItem();
    }
  }

  function toggleAllTicked() {
    listItems.toggleAllItems();
  }

  function removeItem(item: ListItem) {
    listItems.removeItem(item);
  }

  window.addEventListener('hashchange', urlHashChange);

  on(allListChanges, 'change', listItems, () => {
    storeItems();
  });

  return [(
    <section className="todoapp">
			<header className="header">
				<h1>todos</h1>

				<input className="new-todo" autocomplete="off" spellcheck={false} onblur={ addItem } onkeydown={ newTextKeydown } oninput={ setNewText } value={ inputText } placeholder="What needs to be done?" autofocus />
			</header>
      
      <Revealer show={ showList }>
        <section className="main">
            <input id="toggle-all" className="toggle-all" type="checkbox" onclick={ toggleAllTicked } checked={ allTicked } />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <ul className="todo-list">
              <List collection={ visibleListItems } func={ (item) => {
                let mode = dynamic(Mode.Normal);

                const completedClassName = derived([item.ticked, mode], () => {
                  const classes = [];

                  if (item.ticked.get()) {
                    classes.push('completed');
                  }

                  if (mode.get() === Mode.Edit) {
                    classes.push('editing');
                  }

                  return classes.join(' ');
                });

                return [
                  <li className={ completedClassName }><TodoItem item={ item } mode={ mode } onremove={ removeItem }></TodoItem></li>
                , () => {
                  mode.destroy();
                  completedClassName.destroy();
                }];
              }}></List>
            </ul>
            
            <footer className="footer">
              <span className="todo-count">{ remainingText }</span>

              <ul className="filters">
                <li><ToggleLink item={ status } value={ Status.All }>All</ToggleLink></li>
                <li><ToggleLink item={ status } value={ Status.Active }>Active</ToggleLink></li>
                <li><ToggleLink item={ status } value={ Status.Completed }>Completed</ToggleLink></li>
              </ul>

              <Revealer show={ showClear }>
                <button className="clear-completed" onclick={ clearCompleted }>Clear completed</button>
              </Revealer>
            </footer>
        </section>
      </Revealer>
    </section>
  ), () => {
    off(allListChanges, 'change', listItems);
    window.removeEventListener('hashchange', urlHashChange);
    listItems.destroy();
    status.destroy();
    inputText.destroy();
    tickedItems.destroy();
    tickedItemUpdates.destroy();
    textItems.destroy();
    textItemUpdates.destroy();
    tickedListChanges.destroy();
    allListChanges.destroy();
    visibleListItems.destroy();
    allTicked.destroy();
    showList.destroy();
    remainingText.destroy();
    showClear.destroy();
  }];
}
