import {BrowserRouter} from '@do-while-for-each/browser-router';
import {provider} from '@do-while-for-each/provider'
import {routes} from './router';

provider.register(
  {provide: BrowserRouter, useValue: new BrowserRouter(routes)},
);
