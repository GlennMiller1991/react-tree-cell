import {Header, Main} from '../index';
import './GeneralTemplate.css'
import {GeneralTemplateState} from './GeneralTemplateState'
import {useCellState} from '@do-while-for-each/tree-cell-react'
import {RenderCount} from '../../atoms/RenderCount/RenderCount'
import {Alert} from '../../atoms/Alert/Alert'
import {Spinner} from '../../atoms/Spinner/Spinner';

/**
 * Стейт предложения, мне показалось разумным сделать его глобальным и не передавать контекстом
 * чтобы иметь возможность использовать его напрямую в третьих стейтах
 */
export const appState = new GeneralTemplateState()

export const GeneralTemplate = (props: any) => {
  const [alert] = useCellState(() => appState.alert)
  const [spinner] = useCellState(() => appState.spinner)

  return (
    <>
      <div className="general-tmpl">
        <RenderCount/>
        <Header/>
        <Main>
          {props.children}
        </Main>
      </div>
      <Alert text={alert}/>
      {
        spinner && Spinner
      }
    </>
  )
}
