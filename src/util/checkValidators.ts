export type Validator<T> = (value: T) => string | undefined

export function checkValidators<T>(value: T, validators: Array<Validator<T>>) {
  for (let v of validators) {
    let res = v(value)
    if (res) return res
  }
}
