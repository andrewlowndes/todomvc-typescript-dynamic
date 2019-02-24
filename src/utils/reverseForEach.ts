export function reverseForEach<T>(arr: Array<T>, func: (item?: T, index?: number, list?: Array<T>) => void) {
  for (let i=arr.length-1; i>-1; i--) {
    func(arr[i], i, arr);
  }
}
