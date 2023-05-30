import React, {useCallback} from 'react'
import {appState} from '../../template/GeneralTemplate/GeneralTemplate'
import {Modal} from 'antd'
import styles from './Alert.module.css'

type tAlert = {
  text: string
}
export const Alert: React.FC<tAlert> = React.memo(({
                                                     text
                                                   }) => {

  const closeAlert = useCallback(() => {
    appState.setAlert('')
  }, [])

  return (
    <Modal open={!!text}
           className={styles.modal}
           onCancel={closeAlert}
           closable={true}
           footer={[]}>
      <div className={styles.modalContent}>
        {
          text
        }
      </div>
    </Modal>
  )
})
Alert.displayName = 'Alert'
