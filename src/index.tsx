import 'reflect-metadata';
import {RouteResultHandler} from './router';
import './style/index.css'
import './di'

new RouteResultHandler(document.getElementById('root'))
  .start()
