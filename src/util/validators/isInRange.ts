import {Validator} from "../checkValidators";

export function isInRange(params: {
  min: number,
  max: number,
  minExcluded?: boolean,
  maxExcluded?: boolean
}, msgError?: string): Validator<number> {
  return (value) => {
    const {min, max, minExcluded, maxExcluded} = params
    const bottom = minExcluded ? (value > min) : (value >= min)
    const top = maxExcluded ? (value < max) : (value <= max)
    if (!bottom || !top) {
      return msgError || `Число не входит в пределы ${minExcluded ? '(' : '['}${min}, ${max}${maxExcluded ? ')' : ']'}`
    }
  }
}
