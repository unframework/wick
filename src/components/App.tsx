import { h, FunctionalComponent } from 'preact';
import { SlotMachine } from '../SlotMachine';
import { Timer } from './Timer';
import { CRTWarpGenerator } from './CRTWarpGenerator';
import { WheelStrip, WHEEL_STRIP_DEFS, WHEEL_WIDTH } from './WheelStrip';

import './App.scss';

const WHEEL_GUTTER = 10;
const WHEEL_START_X = (320 - WHEEL_WIDTH * 3 - WHEEL_GUTTER * 2) / 2;
const WHEEL_START_Y = 40;

export const App: FunctionalComponent<{ state: SlotMachine }> = ({ state }) => {
  return (
    <Timer
      update={() => {
        state.update();
      }}
    >
      <div className="App">
        <svg
          width="740"
          height="580"
          viewBox="-50 -50 740 580"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {WHEEL_STRIP_DEFS}

            <g
              id="screenContents"
              style="filter: url(#displacementFilter)"
              className="App__screen"
            >
              <rect width="320" height="240" fill="#e06f8b" />

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

            <CRTWarpGenerator filterId="displacementFilter" warpScale={50} />
          </defs>
          <g>
            <path
              d="M-20 480 L5 5 h630 L660 480 Z"
              fill="#000"
              stroke="#000"
              stroke-linejoin="round"
              stroke-width="40"
            />
          </g>
          <g transform="scale(2, 2)">
            <use xlinkHref="#screenContents" />
          </g>
        </svg>
      </div>
    </Timer>
  );
};
