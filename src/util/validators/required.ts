import {Validator} from '../checkValidators'

export function required<T>(msgError?: string): Validator<T> {
  return function (value) {
    if (!value) return msgError || 'Поле обязательно'
  }
}
