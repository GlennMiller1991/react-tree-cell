import {Command, TCommand} from '@do-while-for-each/automation';
import {QaSel} from '../qa.selector';
import {TaskId} from '../task.id';

export function getCommands(id: TaskId): TCommand[] {
  const result = commands.get(id);
  if (!result)
    throw new Error(`No commands defined for "${id}"`);
  return result;
}

const {click, wait, fill} = Command;
const commands = new Map<TaskId, TCommand[]>([

  [TaskId.Image, [
    click({selector: QaSel.IndexPage_Image}),
  ]], // => Image page

  [TaskId.JsonFileReading, [
    click({selector: QaSel.IndexPage_JsonFileReading}),
  ]], // => JsonFileReading page

  [TaskId.JSXComponent, [
    click({selector: QaSel.IndexPage_JSXComponent}),
  ]], // => JSXComponent page

  [TaskId.PureJsFuncRun, [
    click({selector: QaSel.IndexPage_PureJsFuncRun}),
  ]], // => PureJsFuncRun page

  [TaskId.StyleLess, [
    click({selector: QaSel.IndexPage_StyleLess}),
  ]], // => StyleLess page

  [TaskId.StyleModule, [
    click({selector: QaSel.IndexPage_StyleModule}),
  ]], // => StyleModule page

  [TaskId.Svg, [
    click({selector: QaSel.IndexPage_Svg}),
  ]], // => Svg page


]);
