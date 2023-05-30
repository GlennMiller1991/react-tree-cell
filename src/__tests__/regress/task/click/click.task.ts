import {Env, TaskFromSiteRootAbstract, TCommand} from '@do-while-for-each/automation';
import {getCommands} from './commands';

export class ClickTask extends TaskFromSiteRootAbstract {

  constructor(id: any, env: Env) {
    super(id, env);
  }

  get commands(): TCommand[] {
    return getCommands(this.id);
  }

}
