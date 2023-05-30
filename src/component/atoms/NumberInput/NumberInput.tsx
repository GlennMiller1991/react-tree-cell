import React, {ChangeEvent, FocusEvent, useCallback, useEffect, useState} from 'react'
import {blurNumberRegExp, numberRegExp} from './constants'
import {Input} from 'antd'
import {setClasses} from '../../../util/setClasses'

export type tNumberInput = {
  value: number,
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void,
  error?: string,
  className?: string,
  title?: string,
  [key: string]: any,
}
export const NumberInput: React.FC<tNumberInput> = React.memo(({
                                                                 value,
                                                                 onBlur,
                                                                 error,
                                                                 className,
                                                                 title,
                                                                 ...props
                                                               }) => {

  const [newValue, setNewValue] = useState<string>(() => String(value))

  const onNumberInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value
    if ((numberRegExp).test(value)) {
      setNewValue(value)
    }
  }, [])

  const newOnBlur = (event: FocusEvent<HTMLInputElement>) => {
    let newValue = event.currentTarget.value.trim()
    let res: number
    if (blurNumberRegExp.test(newValue)) {
      res = +newValue
    } else {
      res = 0
      setNewValue(String(res))
    }
    if (res !== value) {
      event.currentTarget.value = String(res)
      onBlur && onBlur(event)
    }
  }

  useEffect(() => {
    setNewValue(String(newValue))
  }, [value])

  return (
    <Input value={newValue}
           title={setClasses(title, error)}
           className={setClasses('input', className, error && 'erroredInput')}
           onBlur={newOnBlur}
           onChange={onNumberInputChange}
           {...props}
    />
  )
})
