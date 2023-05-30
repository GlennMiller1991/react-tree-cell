import {cell, makeObservable} from '@do-while-for-each/tree-cell';
import {FocusEvent, MouseEvent} from 'react';
import {appState} from '../../../component/template/GeneralTemplate/GeneralTemplate'
import {tSpeedLimit, tSpeedLimitDto, tTrain, tTrainDto} from '../types'
import {v1} from 'uuid'
import {trainValidators} from '../constants'
import {tErrorState} from '../../../types/errorState';
import {updateErrors} from '../../../util/updateErrors';

/**
 * variant
 * -1 - удалить
 * 0 - вставить до
 * +1 - вставить после
 */
export type tOnItemClickPayload = {
  variant: -1 | 0 | 1,
  row: number
}

export class SpeedLimit {
  speedLimit: tSpeedLimit

  constructor(speedLimit: tSpeedLimitDto) {
    this.speedLimit = {
      ...speedLimit,
      id: v1(),
      owner: this
    }
    makeObservable(this, {
      speedLimit: cell,
      isError: cell,
    })
  }

  get isError() {
    const name = trainValidators.isSpeedLimitNameError(this.speedLimit.name)
    const speedLimit = trainValidators.isSpeedLimitValueError(this.speedLimit.speedLimit)
    if (name || speedLimit) {
      let errors: tErrorState = {}
      if (name) errors.name = name
      if (speedLimit) errors.speedLimit = speedLimit
      return errors
    }
  }
}

export class Train {
  train: tTrain

  constructor(train: tTrainDto) {
    this.train = {
      ...train,
      id: v1(),
      owner: this,
      speedLimits: train.speedLimits.map((sL) => {
        return new SpeedLimit(sL).speedLimit
      })
    }
    makeObservable(this, {
      train: cell,
      isError: cell,
    })
  }

  get isError() {
    const train = this.train
    const name = trainValidators.isTrainNameError(train.name)
    let slError: tErrorState = undefined
    const speedLimits = train
      .speedLimits
      .reduce((acc, sL) => {
        slError = sL.owner.isError
        return updateErrors(acc, slError && {[sL.id]: slError})
      }, undefined as tErrorState)
    if (!name && !speedLimits) return undefined
    let error: tErrorState = {}
    if (name) error.name = name
    if (speedLimits) error.speedLimits = speedLimits
    return error
  }
}


export class TrainsState {
  trains: Array<tTrain> = []
  selectedTrainNumber: number = -1
  url = 'https://gist.githubusercontent.com/GlennMiller1991/152583a1bf1e057e8db06f5949ae3dda/raw/f84adf51092706ae0e7c0abc7589ad49800d8112/trains.json'

  constructor() {
    makeObservable(this, {
      selectedTrainNumber: cell,
      trains: cell,
      isError: cell,
    });
    this.apiHandlers.getTrains()
  }

  get isError() {
    let errors: tErrorState = {}
    let errorsCount = 0
    const trains = this.trains
    let train
    let trainError: tErrorState
    for (let trainIndex in trains) {
      train = trains[trainIndex]
      trainError = train.owner.isError
      if (trainError) {
        errorsCount++
        errors[train.id] = trainError
      }
    }
    if (!errorsCount) return undefined
    return {
      trains: errors
    }
  }

  readonly apiHandlers = {
    getTrains: () => {
      appState.setSpinner(true)
      fetch(this.url)
        .then(res => res.json())
        .then((trains: tTrainDto[]) => {
          this.trains = trains.map((trainDto) => {
            return new Train(trainDto).train
          })
        })
        .catch((err) => {
          appState.setAlert(err.message)
        })
        .finally(() => {
          appState.setSpinner(false)
        })
    },
    saveTrains: async () => {
      appState.setSpinner(true)
      const errors = this.isError
      let p
      if (errors) {
        p = new Promise<void>((res) => {
          appState.setAlert('Ошибки в консоли')
          console.log(errors)
          res()
        })
      } else {
        p = new Promise<number>((resolve) => {
          setTimeout(() => {
            console.log(this.trains)
            resolve(1)
          }, Math.floor((Math.random() * 3 + 2) * 1000))
        })
          .then((res: number) => {
            if (res) {
              appState.setAlert('Сохранено.')
            } else appState.setAlert('Не сохранено')
          })
      }
      p.finally(() => {
        appState.setSpinner(false)
      })
    }
  }

  readonly eventHandlers = {
    onContextTrainHandler: (payload: tOnItemClickPayload) => {
      const {row, variant} = payload
      let trains = this.trains
      if (variant !== -1) {
        trains.splice(
          row + variant,
          0,
          new Train({
            name: '',
            speedLimits: [],
            description: '',
          }).train
        )
      } else {
        trains.splice(
          row, 1
        )
      }
      this.trains = [...trains]
      if (variant === -1) this.selectedTrainNumber = -1
    },
    onContextSpeedLimitsHandler: (payload: tOnItemClickPayload) => {
      const {row, variant} = payload
      this.trains = this.trains.map((train, i) => {
        if (i !== this.selectedTrainNumber!) return train
        if (variant !== -1) {
          train.speedLimits.splice(
            variant + row,
            0,
            new SpeedLimit({
              speedLimit: 0,
              name: '',
            }).speedLimit
          )
        } else {
          train.speedLimits.splice(row, 1)
        }
        return {
          ...train,
          speedLimits: [...train.speedLimits]
        }
      })
    },
    onBlurTrainValues: (event: FocusEvent<HTMLInputElement>) => {
      this.trains = this.trains.map((train, i) => {
        if (i !== this.selectedTrainNumber!) return train
        const newTrain = {
          ...train,
          name: event.currentTarget.value.trim()
        }
        train.owner.train = newTrain
        return newTrain
      })
    },
    onBlurSpeedLimitValues: (event: FocusEvent<HTMLInputElement>) => {
      let value: tSpeedLimit['name'] | tSpeedLimit['speedLimit'] = event.currentTarget.value.trim()
      const index = +event.currentTarget.dataset.index!
      const field = event.currentTarget.dataset.field as keyof tSpeedLimit
      switch (field) {
        case 'speedLimit': {
          value = +value
          break
        }
        default:
          break
      }
      this.trains = this.trains.map((train, i) => {
        if (i !== this.selectedTrainNumber!) return train
        train.owner.train = {
          ...train,
          speedLimits: train.speedLimits.map((sL, j) => {
            if (j !== index) return sL
            sL.owner.speedLimit = {
              ...sL,
              [field]: value
            }
            return sL.owner.speedLimit
          })
        }
        return train.owner.train
      })
    },
    onTrainsRowClick: (event: MouseEvent<HTMLTableRowElement>) => {
      this.selectedTrainNumber = +event.currentTarget.dataset.index!
    }
  }
}
