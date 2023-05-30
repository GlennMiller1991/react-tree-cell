import {tErrorState} from '../../../../types/errorState'
import React from 'react'
import styles from './Error.module.css'

type tError = {
  name: string,
  error: tErrorState
}
export const Error: React.FC<tError> = React.memo(({
                                                     name,
                                                     error,
                                                   }) => {
  return (
    <details className={styles.details}>
      <summary>
        <span>
          {name}
        </span>
      </summary>
      <div>
        {
          typeof error === 'string' ?
            <p>{error}</p> :
            <>
              {
                Object.entries(error as {}).map(([name, error], i) => {
                  if (error === undefined) return <React.Fragment key={i}></React.Fragment>
                  return <Error key={i} name={name} error={error}/>
                })
              }
            </>
        }
      </div>
    </details>

  )
})
Error.displayName = 'Error'
