import {SpeedLimit, Train} from "./TrainsApp/TrainsState";

export type tTrainDto = {
  name: string,
  description: string,
  speedLimits: Array<tSpeedLimitDto>
}

export type tSpeedLimitDto = {
  name: string,
  speedLimit: number,
}

export type tSpeedLimit = tSpeedLimitDto & {
  id: string,
  owner: SpeedLimit
}

export type tTrain = Omit<tTrainDto, 'speedLimits'> & {
  id: string,
  speedLimits: Array<tSpeedLimit>,
  owner: Train
}

