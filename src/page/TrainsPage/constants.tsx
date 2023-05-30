import {tHeader} from '../../component/atoms/tableHeader/TableHeader'
import {tSpeedLimit, tTrain} from './types'
import {checkValidators} from '../../util/checkValidators'
import {required} from '../../util/validators/required'
import {correctNumber} from '../../util/validators/correctNumber';
import {isInRange} from '../../util/validators/isInRange';
import {MenuProps} from 'antd'
import {tEmptyRow} from '../../component/atoms/Table/TBody/EmptyRow/EmptyRow'

export const trainValidators = {
  isTrainNameError: (value: string, msgError?: string) => {
    return checkValidators(value, [
      required(msgError),
    ])
  },
  isSpeedLimitValueError: (value: number) => {
    return checkValidators(value, [
      correctNumber(),
      isInRange({min: 0, max: 1000, maxExcluded: false, minExcluded: true})
    ])
  },
  isSpeedLimitNameError: (value: string, msgError?: string) => {
    return checkValidators(value, [
      required(msgError),
    ])
  }
}
export const trainsTableHeaders: Array<tHeader<tTrain>> = [{
  name: 'Наименование',
  prop: 'name',
  type: 'string',
  validators: trainValidators.isTrainNameError
}]

export const speedLimitTableHeaders: Array<tHeader<tSpeedLimit>> = [
  {
    prop: 'name',
    name: 'Наименование',
    type: 'string',
    validators: trainValidators.isTrainNameError
  }, {
    prop: 'speedLimit',
    name: 'Скоростное ограничение',
    type: 'number',
  }
]
export const items: MenuProps['items'] = [
  {
    label: 'Вставить до',
    key: 0
  },
  {
    label: 'Вставить после',
    key: 1,
  },
  {
    label: 'Удалить',
    key: -1,
  },

];

export const emptyRowItems: MenuProps['items'] = [
  {
    label: 'Вставить',
    key: 0
  },
];

export const emptyRowConfigSL: tEmptyRow = {
  index: 0,
  colSpan: 2,
  text: 'Добавить'
}

export const emptyRowConfigTrain: tEmptyRow = {
  ...emptyRowConfigSL,
  colSpan: 1,
}
