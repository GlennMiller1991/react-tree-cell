import {tErrorState} from '../../../types/errorState'
import React from 'react'
import {setClasses} from '../../../util/setClasses'
import {RenderCount} from '../RenderCount/RenderCount'
import {Error} from './Error/Error'
import styles from './Errors.module.css'

type tErrors = {
  errors: tErrorState
}
export const Errors: React.FC<tErrors> = React.memo(({
                                                       errors,
                                                     }) => {

  return (
    <div className={setClasses('table', 'relative')}>
      <RenderCount/>
      <h3 className={'alignTextCenter'}>Ошибки</h3>
      <div className={styles.detailsContainer}>
        {
          Object.entries(errors).map(([name, error], i) => {
            if (error === undefined) return <React.Fragment key={i}></React.Fragment>
            return <Error key={i} name={name} error={error}/>
          })
        }
      </div>
    </div>
  )
})
Errors.displayName = 'Errors'
