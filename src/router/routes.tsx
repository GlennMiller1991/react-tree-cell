// @formatter:off
import {IEntry} from '@do-while-for-each/browser-router';
import {IndexPage, TrainsApp} from '../page';
import {GeneralTemplate} from '../component'


export const routes: IEntry[] = [
  {segment: '', component: <IndexPage/>},
  {segment: 'tom-and-jerry-fn-tree-cell', component: <GeneralTemplate><TrainsApp/></GeneralTemplate>},
];
