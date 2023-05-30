import React, {MouseEvent} from 'react'
import {Button} from 'antd'
import {setClasses} from '../../../util/setClasses'

export type tSaveBtn = {
  onClick?: (event: MouseEvent) => void,
  className?: string,
  disabled?: boolean,
}
export const SaveBtn: React.FC<tSaveBtn> = React.memo(({
                                                         className,
                                                         onClick,
                                                         disabled,
                                                       }) => {
  return (
    <Button className={setClasses('saveBtn', className)}
            onClick={onClick}
            disabled={disabled}>
      Сохранить
    </Button>
  )
})
