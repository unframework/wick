import { h, cloneElement, FunctionalComponent, VNode } from 'preact';
import { useState } from 'preact/hooks';
import { CRTWarpGenerator } from './CRTWarpGenerator';

import './App.scss';

export const App: FunctionalComponent = () => {
  const [crtFilterNode, setCRTFilterNode] = useState<VNode | null>(null);

  return (
    <div className="App">
      <CRTWarpGenerator warpScale={50} onReady={setCRTFilterNode} />

      <svg
        width="640"
        height="480"
        viewBox="0 0 640 480"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="checkerboardPattern"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
            viewBox="0 0 20 20"
          >
            <rect fill="#f7e26b" x="0" width="10" height="10" y="0"></rect>
            <rect fill="#f7e26b" x="10" width="10" height="10" y="10"></rect>
          </pattern>

          <g
            id="screenContents"
            style="filter: url(#displacementFilter)"
            className="App__screen"
          >
            <rect width="320" height="240" fill="#eb8931" />
            <rect width="320" height="240" fill="url(#checkerboardPattern)" />

            <text
              x="15"
              y="50"
              transform="scale(0.5, 1)"
              transform-origin="15 120"
            >
              PC LOAD LETTER
            </text>
          </g>

          {crtFilterNode &&
            cloneElement(crtFilterNode, { id: 'displacementFilter' })}
        </defs>
        <g transform="scale(2, 2)">
          <use xlinkHref="#screenContents" />
        </g>
      </svg>
    </div>
  );
};
