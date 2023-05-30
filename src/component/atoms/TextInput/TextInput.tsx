import React, {ChangeEvent, FocusEvent, useCallback, useEffect, useState} from 'react'
import {Input} from 'antd'
import {setClasses} from '../../../util/setClasses'

export type tTextInput = {
  value: string,
  title?: string,
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  onChange?: undefined,
  className?: string,
  error?: string,
  [key: string]: any,
}
export const TextInput: React.FC<tTextInput> = React.memo(({
                                                             value,
                                                             onBlur,
                                                             className,
                                                             error,
                                                             title,
                                                             ...props
                                                           }) => {

  const [newValue, setNewValue] = useState(() => value)

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value
    setNewValue(value)
  }, [])

  const newOnBlur = (event: FocusEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    (newValue !== value) && onBlur && onBlur(event)
  }

  useEffect(() => {
    setNewValue(value)
  }, [value])

  return (
    <Input value={newValue}
           title={setClasses(title, error)}
           className={setClasses('input', className, error && 'erroredInput')}
           onBlur={newOnBlur}
           onChange={onChange}
           {...props}
    />
  )
})
TextInput.displayName = 'TextInput'
