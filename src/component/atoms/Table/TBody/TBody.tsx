import React, {MouseEvent, useCallback, useRef} from 'react'
import {Dropdown, MenuProps} from 'antd'
import {EmptyRow, tEmptyRow} from './EmptyRow/EmptyRow'
import {tOnItemClickPayload} from '../../../../page/TrainsPage/TrainsApp/TrainsState'

type tTBody = {
  children: React.ReactNode,
  items?: MenuProps['items'],
  onItemClick?: (payload: tOnItemClickPayload) => void,
  emptyRowConfig?: tEmptyRow
}
export const TBody: React.FC<tTBody> = React.memo(({
                                                     children,
                                                     items,
                                                     onItemClick,
                                                     emptyRowConfig,
                                                   }) => {

  const contextRow = useRef(0)
  const onContextMenu = useCallback((event: MouseEvent<HTMLTableRowElement>) => {
    contextRow.current = +event.currentTarget.dataset.index!
  }, [])
  const onClick: MenuProps['onClick'] = (event) => {
    onItemClick && onItemClick({row: contextRow.current, variant: +event.key as tOnItemClickPayload['variant']})
  }

  const body = !emptyRowConfig ? children :
    React.Children.count(children) ? children :
      <EmptyRow {...emptyRowConfig}/>

  return !items ?
    <tbody>
    {
      body
    }
    </tbody> :
    <Dropdown menu={{items, onClick}}
              trigger={['contextMenu']}>
      <tbody>
      {
        React.Children.map(body, (child) => {
          if (!React.isValidElement(child)) return child
          return React.cloneElement(child, {
            ...child.props, onContextMenu
          })
        })
      }
      </tbody>
    </Dropdown>

})
