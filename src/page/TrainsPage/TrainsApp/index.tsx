import {useCellState} from '@do-while-for-each/tree-cell-react';
import React, {useState} from 'react';
import {Errors, RenderCount, SaveBtn, TableHeader, TBody, TRow} from '../../../component'
import {tSpeedLimit, tTrain} from '../types'
import {
  emptyRowConfigSL,
  emptyRowConfigTrain,
  emptyRowItems,
  items,
  speedLimitTableHeaders,
  trainsTableHeaders
} from '../constants'
import {setClasses} from '../../../util/setClasses'
import {tErrorState} from '../../../types/errorState';
import {TrainsState} from './TrainsState'
import {Col, Row} from 'antd'

//@ts-ignore
export const TrainsApp = React.memo(() => {
  const [trainsState] = useState<TrainsState>(() => new TrainsState())
  const [trains] = useCellState<Array<tTrain>>(() => trainsState.trains)
  const [selectedTrainNumber] = useCellState<number>(() => trainsState.selectedTrainNumber)
  const [trainsErrors] = useCellState<tErrorState>(() => trainsState.isError)


  return (
    <>
      <Row className={'relative'}>
        <RenderCount/>
        <Col span={8}>
          <table className={'table'}>
            <TableHeader<tTrain>
              name={'Поезда'}
              headers={trainsTableHeaders}
            />
            <TBody items={trains.length ? items : emptyRowItems}
                   emptyRowConfig={emptyRowConfigTrain}
                   onItemClick={trainsState.eventHandlers.onContextTrainHandler}>
              {
                trains.map((train, i) => {
                  return (
                    <TRow<tTrain> key={train.id}
                                  className={setClasses(selectedTrainNumber === i && 'selectedRow')}
                                  obj={train}
                                  name={train.owner.isError?.name}
                                  disabled={selectedTrainNumber !== i}
                                  onBlur={trainsState.eventHandlers.onBlurTrainValues}
                                  onClick={trainsState.eventHandlers.onTrainsRowClick}
                                  headers={trainsTableHeaders}
                                  index={i}/>
                  )
                })
              }
            </TBody>
          </table>
        </Col>

        {
          trains[selectedTrainNumber!] &&
          <Col span={8}>
            <table className={'table'}>
              <TableHeader<tSpeedLimit>
                name={`Скоростные ограничение поезда "${trains[selectedTrainNumber!].name}"`}
                headers={speedLimitTableHeaders}
              />
              <TBody items={trains[selectedTrainNumber!].speedLimits.length ? items : emptyRowItems}
                     emptyRowConfig={emptyRowConfigSL}
                     onItemClick={trainsState.eventHandlers.onContextSpeedLimitsHandler}>
                {
                  trains[selectedTrainNumber!].speedLimits.map((sL, i) => {
                    const error = sL.owner.isError
                    return (
                      <TRow<tSpeedLimit> key={sL.id}
                                         obj={sL}
                                         name={error?.name}
                                         speedLimit={error?.speedLimit}
                                         headers={speedLimitTableHeaders}
                                         onBlur={trainsState.eventHandlers.onBlurSpeedLimitValues}
                                         index={i}
                      />
                    )
                  })
                }
              </TBody>
            </table>
          </Col>
        }

        {
          trainsErrors &&
          <Col span={8}>
            <Errors errors={trainsErrors}/>
          </Col>
        }

      </Row>
      <SaveBtn
        disabled={!!trainsErrors}
        onClick={trainsState.apiHandlers.saveTrains}/>
    </>
  )
})
TrainsApp.displayName = 'TrainsApp'
