import React from 'react'
import styles from './EmptyRow.module.css'

export type tEmptyRow = {
  index?: number,
  colSpan?: number,
  onClick?: () => void,
  text?: string,
}
export const EmptyRow: React.FC<tEmptyRow> = React.memo(({
                                                           index = 0,
                                                           colSpan = 0,
                                                           onClick,
                                                           text = 'Добавить',
                                                         }) => {
  return (
    <tr data-index={index}
        className={styles.emptyRow}
        onClick={onClick}>
      <td colSpan={colSpan}>
        {
          text
        }
      </td>
    </tr>
  )
})
EmptyRow.displayName = 'EmptyRow'
