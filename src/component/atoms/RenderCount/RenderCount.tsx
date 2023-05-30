import React, {useRef, useState} from 'react'
import styles from './RenderCount.module.css'
import {setClasses} from '../../../util/setClasses'
import commonStyles from '../../../../src/style/commonStyles.module.css'

export const RenderCount: React.FC = () => {

  const [, setForceRerender] = useState(true)
  const value = useRef(0)


  return (
    <div className={setClasses(styles.renderCountValue, commonStyles.flexCenter)}
         onClick={() => {
           value.current = 0
           setForceRerender(prev => !prev)
         }}>
      {
        ++value.current
      }
    </div>
  )
}
RenderCount.displayName = 'RenderCount'
