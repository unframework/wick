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
          >
            <rect fill="#ccc" x="0" width="10" height="10" y="0"></rect>
            <rect fill="#ccc" x="10" width="10" height="10" y="10"></rect>
          </pattern>

          {crtFilterNode &&
            cloneElement(crtFilterNode, { id: 'displacementFilter' })}
        </defs>

        <g style="filter: url(#displacementFilter)">
          <rect width="640" height="480" fill="url(#checkerboardPattern)" />
        </g>
      </svg>
    </div>
  );
};
