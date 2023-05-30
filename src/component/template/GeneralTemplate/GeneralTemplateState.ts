import {cell, makeObservable} from '@do-while-for-each/tree-cell'

export class GeneralTemplateState {
  alert: string = ''
  spinner: boolean = false

  constructor() {
    makeObservable(this, {
      alert: cell,
      spinner: cell,
    })
  }

  setAlert = (text: string) => {
    this.alert = text
  }

  setSpinner = (value: boolean) => {
    this.spinner = value
  }
}
