import { h, FunctionalComponent } from 'preact';
import { SlotMachine } from '../SlotMachine';
import { CRTWarpGenerator } from './CRTWarpGenerator';
import {
  WheelStrip,
  WHEEL_STRIP_DEFS,
  WHEEL_WIDTH,
  WHEEL_HEIGHT
} from './WheelStrip';

const LOGO_ANCHOR_X = 160;
const LOGO_ANCHOR_Y = 45;

const WHEEL_GUTTER = 10;
const WHEEL_START_X = (320 - WHEEL_WIDTH * 3 - WHEEL_GUTTER * 2) / 2;
const WHEEL_START_Y = 75;

const PAYLINE_START_X = WHEEL_START_X - 10;
const PAYLINE_END_X = WHEEL_START_X + WHEEL_WIDTH * 3 + WHEEL_GUTTER * 2 + 10;
const PAYLINE_Y = WHEEL_START_Y + WHEEL_HEIGHT / 2;

import './MachineScreen.scss';

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

        <pattern
          id="MachineScreen__bgPattern"
          x="10"
          y="10"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <rect className="_bgFill" x="0" y="0" width="60" height="60" />
          <text className="_bgText" x="10" y="30">
            $
          </text>
        </pattern>

        <g
          id="screenContents"
          style="filter: url(#displacementFilter)"
          className="MachineScreen"
        >
          <rect
            className="_bg"
            width="320"
            height="240"
            fill="url(#MachineScreen__bgPattern)"
          />

          <text className="_tagline" x={LOGO_ANCHOR_X} y={LOGO_ANCHOR_Y}>
            Video Casino
          </text>

          <text className="_logo" x={LOGO_ANCHOR_X} y={LOGO_ANCHOR_Y}>
            LUCKY GUY!
          </text>

          <line
            className="_payline"
            x1={PAYLINE_START_X}
            y1={PAYLINE_Y}
            x2={PAYLINE_END_X}
            y2={PAYLINE_Y}
          />

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
