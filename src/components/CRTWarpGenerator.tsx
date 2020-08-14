import { h, FunctionalComponent, VNode } from 'preact';
import { useRef, useEffect } from 'preact/hooks';

const MAP_SIZE = 64;

function fillWarpCanvas(warpCanvas: HTMLCanvasElement) {
  const ctx = warpCanvas.getContext('2d');
  if (!ctx) {
    throw new Error('no 2d ctx');
  }

  const imageData = ctx.createImageData(MAP_SIZE, MAP_SIZE);

  const pixelData = imageData.data;
  const globalScale = 0.9;

  for (let row = 0; row < MAP_SIZE; row += 1) {
    for (let col = 0; col < MAP_SIZE; col += 1) {
      const ctrU = globalScale * (col / MAP_SIZE - 0.5);
      const ctrV = globalScale * (row / MAP_SIZE - 0.5);

      const scaleShiftU = ctrU * (globalScale - 1);
      const scaleShiftV = ctrV * (globalScale - 1);

      const factor = -(ctrU * ctrU + ctrV * ctrV) * 0.6;
      const shiftU = -1 * ctrU * (1 - factor) * factor;
      const shiftV = -1 * ctrV * (1 - factor) * factor;

      const encU = 256 * (shiftU + scaleShiftU + 0.5);
      const encV = 256 * (shiftV + scaleShiftV + 0.5);

      const offset = (row * MAP_SIZE + col) * 4;
      pixelData[offset] = encU; // red
      pixelData[offset + 1] = encV; // green
      pixelData[offset + 2] = 0; // blue
      pixelData[offset + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

export const CRTWarpGenerator: FunctionalComponent<{
  warpScale: number;
  onReady: (svgFilterNode: VNode) => void;
}> = ({ warpScale, onReady }) => {
  // wrap in ref to avoid re-triggering hook
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const warpCanvas = canvasRef.current;
    fillWarpCanvas(warpCanvas);

    const warpDataURI = warpCanvas.toDataURL();

    onReadyRef.current(
      <filter x="0" y="0" width="100%" height="100%">
        <feImage
          xlinkHref={warpDataURI}
          preserveAspectRatio="none"
          result="warpMap"
        />
        <feDisplacementMap
          in2="warpMap"
          in="SourceGraphic"
          scale={warpScale}
          xChannelSelector="R"
          yChannelSelector="G"
          // eslint-disable-next-line react/no-unknown-property
          color-interpolation-filters="sRGB"
        />
      </filter>
    );
  }, [warpScale]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        overflow: 'hidden'
      }}
    >
      <canvas width={MAP_SIZE} height={MAP_SIZE} ref={canvasRef} />
    </div>
  );
};
