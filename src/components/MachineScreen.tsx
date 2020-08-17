import { h, FunctionalComponent } from 'preact';
import { SlotMachine } from '../SlotMachine';
import { CRTWarpGenerator } from './CRTWarpGenerator';
import { WheelStrip, WHEEL_STRIP_DEFS, WHEEL_WIDTH } from './WheelStrip';

const WHEEL_GUTTER = 10;
const WHEEL_START_X = (320 - WHEEL_WIDTH * 3 - WHEEL_GUTTER * 2) / 2;
const WHEEL_START_Y = 40;

export const MachineScreen: FunctionalComponent<{ state: SlotMachine }> = ({
  state
}) => {
  return (
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
      <g transform="scale(2, 2)">
        <use xlinkHref="#screenContents" />
      </g>
    </svg>
  );
};
