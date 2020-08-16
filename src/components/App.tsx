import { h, cloneElement, FunctionalComponent, VNode } from 'preact';
import { useState } from 'preact/hooks';
import { SlotMachine } from '../SlotMachine';
import { Timer } from './Timer';
import { CRTWarpGenerator } from './CRTWarpGenerator';
import { WheelStrip, WHEEL_STRIP_DEFS, WHEEL_WIDTH } from './WheelStrip';

import './App.scss';

const WHEEL_GUTTER = 10;
const WHEEL_START_X = (320 - WHEEL_WIDTH * 3 - WHEEL_GUTTER * 2) / 2;
const WHEEL_START_Y = 40;

export const App: FunctionalComponent<{ state: SlotMachine }> = ({ state }) => {
  const [crtFilterNode, setCRTFilterNode] = useState<VNode | null>(null);

  return (
    <Timer
      update={() => {
        state.update();
      }}
    >
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

              <g transform={`translate(${WHEEL_START_X},${WHEEL_START_Y})`}>
                <WheelStrip wheel={state.wheels[0]} />
              </g>

              <g
                transform={`translate(${
                  WHEEL_START_X + WHEEL_WIDTH + WHEEL_GUTTER
                },${WHEEL_START_Y})`}
              >
                <WheelStrip wheel={state.wheels[1]} />
              </g>

              <g
                transform={`translate(${
                  WHEEL_START_X + (WHEEL_WIDTH + WHEEL_GUTTER) * 2
                },${WHEEL_START_Y})`}
              >
                <WheelStrip wheel={state.wheels[2]} />
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
    </Timer>
  );
};
