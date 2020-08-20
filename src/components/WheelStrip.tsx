import { h, Fragment, FunctionalComponent } from 'preact';

import { Wheel } from '../SlotMachine';
import { useFrameRefresh } from './Timer';

import slotIconUrl from './assets/slot-icons.png';
import './WheelStrip.scss';

const ICON_SIZE = 40;
const ICON_ATLAS_COUNT = 12;

const WHEEL_STOPS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const WHEEL_STOP_COUNT = WHEEL_STOPS.length;

export const WHEEL_WIDTH = ICON_SIZE * 1.5;
export const WHEEL_HEIGHT = ICON_SIZE * 3;

export const WHEEL_STRIP_DEFS = (
  <Fragment>
    <clipPath id="WheelStrip__overallClip">
      <rect width={WHEEL_WIDTH} height={WHEEL_HEIGHT} />
    </clipPath>
    <clipPath id="WheelStrip__iconClip">
      <rect width={ICON_SIZE} height={ICON_SIZE} />
    </clipPath>
  </Fragment>
);

function generateStopImage(
  stopIncrement: number,
  topStopIndex: number,
  shiftOffset: number
) {
  const stopIndex =
    (topStopIndex + WHEEL_STOP_COUNT - stopIncrement) % WHEEL_STOP_COUNT;
  const iconIndex = WHEEL_STOPS[stopIndex];

  return (
    <g
      className="_iconRoot"
      transform={`translate(${(WHEEL_WIDTH - ICON_SIZE) / 2},${
        (stopIncrement - shiftOffset) * ICON_SIZE
      })`}
    >
      <image
        className="_iconAtlas"
        xlinkHref={slotIconUrl}
        x={-iconIndex * ICON_SIZE}
        width={ICON_SIZE * ICON_ATLAS_COUNT}
        height={ICON_SIZE}
      />
    </g>
  );
}

export const WheelStrip: FunctionalComponent<{ wheel: Wheel }> = ({
  wheel
}) => {
  useFrameRefresh();

  // angle from centerline increasing "downwards", or clockwise if looking from left
  const wheelPosition = wheel.position;

  const visibleMidStopPos = WHEEL_STOP_COUNT * wheelPosition;
  const visibleTopEdgePos = visibleMidStopPos - 1.5;
  const visibleTopStopIndex = Math.ceil(visibleTopEdgePos);

  const visibleStopOffset = visibleTopStopIndex - visibleTopEdgePos;

  return (
    <g className="WheelStrip">
      <rect className="_bg" width={WHEEL_WIDTH} height={WHEEL_HEIGHT} />

      <Fragment>
        {generateStopImage(0, visibleTopStopIndex, visibleStopOffset)}
        {generateStopImage(1, visibleTopStopIndex, visibleStopOffset)}
        {generateStopImage(2, visibleTopStopIndex, visibleStopOffset)}
        {generateStopImage(3, visibleTopStopIndex, visibleStopOffset)}
      </Fragment>

      <rect className="_border" width={WHEEL_WIDTH} height={WHEEL_HEIGHT} />
    </g>
  );
};
