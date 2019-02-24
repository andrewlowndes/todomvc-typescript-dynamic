export type NewArrayItems<T> = Array<[T, number]>; //item, newIndex
export type MovedArrayItems<T> = Array<[T, number, number]>; //item, prevIndex, newIndex
export type DeletedArrayItems<T> = Array<[T, number]>; //item, prevIndex

export interface ArrayChanges<T> {
  newItems: NewArrayItems<T>;
  movedItems: MovedArrayItems<T>;
  deletedItems: DeletedArrayItems<T>;
}

export function arrayDiff<T = any>(a: Array<T>, b: Array<T>): ArrayChanges<T> {
  const valueIndexMap = new Map<T, number>();

  a.forEach((item, index) => {
    valueIndexMap.set(item, index);
  });

  const newItems: NewArrayItems<T> = [],
    movedItems: MovedArrayItems<T> = [];

  b.forEach((item, index) => {
    if (valueIndexMap.has(item)) {
      const existingIndex = valueIndexMap.get(item);
      
      if (index !== existingIndex) {
        movedItems.push([item, existingIndex, index]);
      }
      
      valueIndexMap.delete(item);
    } else {
      newItems.push([item, index]);
    }
  });

  const deletedItems: DeletedArrayItems<T> = Array.from(valueIndexMap.entries());

  return { newItems, movedItems, deletedItems };
}
