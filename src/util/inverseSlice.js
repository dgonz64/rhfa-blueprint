export function inverseSlice(arr, at) {
  return [ ...arr.slice(0, at), ...arr.slice(at + 1) ]
}
