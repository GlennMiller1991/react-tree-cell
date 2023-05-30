import React from 'react'

export type tInputType = 'number' | 'string' | 'disabled'

/**
 * T - тип объекта
 * D - тип свойства
 */
export type tHeader<T, D = string> = {
  prop: keyof T,
  name: string,
  type?: tInputType,
  validators?: (value: D, msgError?: string) => void
}
export type tTableHeader<T> = {
  name: string,
  headers: tHeader<T>[]
}

function TableHeaderPre<T>({name, headers}: React.PropsWithChildren<tTableHeader<T>>) {
  return (
    <thead>
    <tr>
      <th colSpan={headers.length}>{name}</th>
    </tr>
    <tr>
      {
        headers.map((head) => {
          return <th key={head.prop as string}>{head.name}</th>

        })
      }
    </tr>
    </thead>
  )
}

export const TableHeader = React.memo(TableHeaderPre) as typeof TableHeaderPre
