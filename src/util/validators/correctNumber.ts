import {Validator} from "../checkValidators";

export function correctNumber<T>(msgError?: string): Validator<T> {
  return (value) => {
    if (isNaN(+value)) {
      return msgError || 'Некорректное число'
    }
  }
}
