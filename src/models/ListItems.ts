import { ListItem } from '../interfaces/ListItem';

import { DynamicList } from './core/DynamicList';
import { Dynamic } from './core/Dynamic';

export class ListItems {
  list: DynamicList<ListItem>;

  constructor(items?: Array<ListItem>) {
    this.list = new DynamicList(items || []);
  }

  addListItem(text: string) {
    this.list.add({
      text: new Dynamic(text),
      ticked: new Dynamic(false)
    });
  }

  toggleAllItems() {
    const allTicked = !this.list.get().some((item) => !item.ticked.get()),
      newTickStatus = allTicked ? false : true;

    this.list.get().forEach((item) => {
      item.ticked.set(newTickStatus);
    });
  }

  removeItem(item: ListItem) {
    item.text.destroy();
    item.ticked.destroy();
    this.list.removeValue(item);
  }

  clearCompleted() {
    const listCopy = this.list.get().slice();
    
    listCopy.reverse().forEach((item) => {
      if (item.ticked.get()) {
        this.removeItem(item);
      }
    });
  }

  destroy() {
    this.list.get().slice().reverse().forEach((item) => {
        this.removeItem(item);
    });

    this.list.destroy();
  }
}
