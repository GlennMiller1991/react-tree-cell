import {tInputType} from '../../../tableHeader/TableHeader'
import React from 'react'
import {NumberInput, tNumberInput} from '../../../NumberInput/NumberInput'
import {setClasses} from '../../../../../util/setClasses'
import {TextInput, tTextInput} from '../../../TextInput/TextInput'
import {RenderCount} from '../../../RenderCount/RenderCount'

type tTCell = {
  className?: string,
  type?: tInputType,
  [key: string]: any
}
export const TCell: React.FC<tTCell> = React.memo(({
                                                     type,
                                                     className,
                                                     ...props
                                                   }) => {


  return (
    <td className={className}>
      <RenderCount/>
      {
        type === 'number' ?
          <NumberInput {...props as tNumberInput} /> :
          <TextInput disabled={type === 'disabled'}
                     {...props as tTextInput}
                     className={setClasses(type === 'disabled' && 'disabledInput', props.className)}
          />
      }
    </td>
  )
})
