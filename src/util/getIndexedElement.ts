export function getIndexedElement<T>(array: Array<T> | string, index: number) {
  let l = array.length
  let i = index < 0 ? l + index : index
  return array[i]
}
