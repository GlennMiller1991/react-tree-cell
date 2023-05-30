import {ITask, TaskFactoryAbstract} from '@do-while-for-each/automation';
import {ClickTask} from './click/click.task';

export class TaskFactory extends TaskFactoryAbstract {

  get(stage, id): ITask {
    let ctor;
    switch (id) {
      default:
        ctor = ClickTask;
    }
    const task = new ctor(id, this.env);
    this.setupTask(stage, task);
    return task;
  }

}
