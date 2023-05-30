import {simpleRegress} from '@do-while-for-each/automation';
import {TaskIds} from './task/task.id';
import {envArgs} from './env/args';

jest.setTimeout(30_000); // default timeout for each test

simpleRegress(envArgs, TaskIds);
