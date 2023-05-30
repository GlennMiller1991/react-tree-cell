import {defaultPixelmatchOptions, IEnvOpt, Storage} from '@do-while-for-each/automation';
import {TaskFactory} from '../task/task.factory';

export const chromium_800x600: IEnvOpt = {
  browserType: 'chromium',
  launchOpt: {
    headless: true,
    // headless: false,
    // devtools: true,
  },
  browserContext: {
    viewport: {
      width: 800,
      height: 600
    },
    locale: 'en_US',
    timezoneId: 'Europe/Moscow',
    colorScheme: 'light',
    // recordVideo: {
    //   dir: './reference',
    //   size: { width: 800, height: 600 }
    // }
  },
  screenshot: {
    type: 'png',
    // quality: 50,
    // fullPage: true,
  },
  pixelmatch: defaultPixelmatchOptions,
  taskFactory: {
    variant: TaskFactory,
  },
  storage: {
    variant: Storage,
    dir: './src/__tests__/__snapshots__',
  },
  urlOrigin: 'http://localhost:3300',
  isDebug: true,
  // leaveOpen: {
  //   env: true,
  //   pageOnTaskEnd: true,
  // },
}
