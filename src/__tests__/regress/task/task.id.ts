export enum TaskId {

  Image = '001_01-Image',
  JsonFileReading = '002_01-Json-File-Reading',
  JSXComponent = '003_01-JSX-Component',
  PureJsFuncRun = '004_01-Pure-JavaScript-Function-Run',
  StyleLess = '005_01-Style-Less',
  StyleModule = '006_01-Style-Module',
  Svg = '007_01-Svg'

}

export const TaskIds: TaskId[] = Object
  .values(TaskId)
// .filter(id => [ // ЕСЛИ требуется выполнить задачи выборочно
//   TaskId.Svg,
// ].includes(id))
