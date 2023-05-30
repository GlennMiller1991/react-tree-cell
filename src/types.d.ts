/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />


/**
 * Also see create-react-app definitions:
 *   https://github.com/facebook/create-react-app/blob/main/packages/react-scripts/lib/react-app.d.ts
 */

declare module '*.png';
declare module '*.jpg';
declare module '*.gif';

declare module '*.css' {
  const classes: Readonly<Record<string, string>>;
  export default classes;
}

// declare module '*.css' {
//   interface IClassNames {
//     [className: string]: string;
//   }
//   const classNames: IClassNames;
//   export = classNames;
// }

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent:
    React.FunctionComponent<React.SVGProps<SVGSVGElement>
      & { title?: string }>;

  const src: string;
  export default src;
}
// declare module '*.svg' {
//   const result: string;
//   export = result;
// }

//
// declare module JSX {
//   export interface IntrinsicElements {
//     'gm-chart-wrap': typeof IntrinsicElements.div;
//     'geo-preview': typeof IntrinsicElements.div;
//     'gm-compass': typeof IntrinsicElements.div;
//     'gm-slide': typeof IntrinsicElements.div;
//     'gm-zoom': typeof IntrinsicElements.div;
//     'gm-model-level': typeof IntrinsicElements.div;
//   }
// }
//
// declare module 'csstype' {
//   interface Properties {
//     '--step-duration'?: string;
//     '--step-width'?: string;
//     '--sub-step-width'?: string;
//     enableBackground?: string;
//   }
// }
