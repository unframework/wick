import { h, cloneElement, FunctionalComponent, VNode } from 'preact';
import { useState } from 'preact/hooks';
import { CRTWarpGenerator } from './CRTWarpGenerator';
import { WheelStrip, WHEEL_STRIP_DEFS, WHEEL_HEIGHT } from './WheelStrip';

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
          {WHEEL_STRIP_DEFS}

          <g
            id="screenContents"
            style="filter: url(#displacementFilter)"
            className="App__screen"
          >
            <rect width="320" height="240" fill="#493c2b" />

            <g transform={`translate(40,${(240 - WHEEL_HEIGHT) / 2})`}>
              <WheelStrip />
            </g>
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
