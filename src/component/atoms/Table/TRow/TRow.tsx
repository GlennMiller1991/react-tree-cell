import {tHeader} from '../../tableHeader/TableHeader'
import React, {useMemo} from 'react'
import {TCell} from './TCell/TCell'
import {tErrorState} from '../../../../types/errorState'

type tTRow<T> = {
  headers: Array<tHeader<T>>
  obj: T,
  className?: string,
  index: number,
  onContextMenu?: () => void
  [key: string]: any,
}

function TRowPre<T>({
                      headers,
                      obj,
                      className,
                      index,
                      onClick,
                      onContextMenu,
                      ...props
                    }: React.PropsWithChildren<tTRow<T>>) {

  const errors = useMemo(() => headers.reduce((acc, head) => {
    acc[head.prop] = props[head.prop as string]
    delete props[head.prop as string]
    return acc
  }, {} as tErrorState), [props])

  return (
    <tr className={className}
        onClick={onClick}
        data-index={index}
        onContextMenu={onContextMenu}>
      {
        headers.map((head) => {
          return (
            <TCell key={`${((obj as any).id) || index}_${head.prop as string}`}
                   type={head.type}
                   value={obj[head.prop] as unknown as string | number}
                   data-field={head.prop}
                   data-index={index}
                   error={errors[head.prop]}
                   {...props}
            />
          )
        })
      }
    </tr>
  )
}

export const TRow = React.memo(TRowPre) as typeof TRowPre
