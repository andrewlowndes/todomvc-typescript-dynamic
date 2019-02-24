import { Dynamic } from './Dynamic';

//a 'change' event here means adding/removing an element
//TODO: figure out if we need this!
export class DynamicList<T extends any> extends Dynamic<Array<T>> {
  protected value: Array<T>;
  
  private addItems(items: Array<T>) {
    if (items) {
      this.value.push(...items);
    }
  }

  private removeItems(indexes: Array<number>) {
    indexes.sort((a, b) => b - a).some((index) => {
      if (index < 0) {
        return true;
      }

      this.value.splice(index, 1);
    });
  }

  clear() {
    this.value = new Array<T>();
    this.update();
  }

  add(...items: Array<T>) {
    this.addItems(items);
    this.update();
  }

  remove(...indexes: Array<number>) {
    this.removeItems(indexes);
    this.update();
  }

  removeValue(...items: Array<T>) {
    this.removeItems(items.map((item) => this.value.indexOf(item)));
    this.update();
  }

  getItem(index: number): T {
    return this.value[index];
  }

  setItem(index: number, value: T) {
    if (this.value[index] === value) {
      return;
    }

    this.value[index] = value;
    this.update();
  }
}
