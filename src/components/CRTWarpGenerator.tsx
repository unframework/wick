import { h, FunctionalComponent } from 'preact';
import { useEffect, useMemo } from 'preact/hooks';

const MAP_SIZE = 256;

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

      const factor = -(ctrU * ctrU + ctrV * ctrV) * 1.5;
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
  filterId: string;
  warpScale: number;
}> = ({ filterId, warpScale }) => {
  const warpCanvas = useMemo(() => {
    const node = document.createElement('canvas');
    node.width = MAP_SIZE;
    node.height = MAP_SIZE;
    Object.assign(node.style, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '1px',
      height: '1px',
      overflow: 'hidden',
      objectFit: 'none'
    });

    document.body.appendChild(node);

    return node;
  }, []);

  useEffect(() => {
    return () => {
      document.body.removeChild(warpCanvas);
    };
  }, [warpCanvas]);

  // perform actual computation
  const warpDataURI = useMemo(() => {
    fillWarpCanvas(warpCanvas);
    return warpCanvas.toDataURL();
  }, [warpCanvas]);

  const filterContents = useMemo(
    () => (
      <filter
        id={filterId}
        x="0"
        y="0"
        width="320"
        height="240"
        filterUnits="userSpaceOnUse"
      >
        <feImage
          xlinkHref={warpDataURI}
          preserveAspectRatio="none"
          result="warpMap"
        />
        <feDisplacementMap
          in2="warpMap"
          in="SourceGraphic"
          result="raw"
          scale={warpScale}
          xChannelSelector="R"
          yChannelSelector="G"
          // eslint-disable-next-line react/no-unknown-property
          color-interpolation-filters="sRGB"
        />

        <feComponentTransfer in="raw" result="lowRaw">
          {h('feFuncR', { type: 'table', tableValues: '0 0.5' })}
          {h('feFuncG', { type: 'table', tableValues: '0 0.5' })}
          {h('feFuncB', { type: 'table', tableValues: '0 0.5' })}
        </feComponentTransfer>

        {/* eslint-disable-next-line react/no-unknown-property */}
        <feFlood flood-color="#000" result="bg" />

        <feMerge result="lowRawBg">
          <feMergeNode in="bg" />
          <feMergeNode in="lowRaw" />
        </feMerge>

        <feComponentTransfer in="raw" result="contrastRaw">
          {h('feFuncR', { type: 'table', tableValues: '0 0 0.1 0.8 1' })}
          {h('feFuncG', { type: 'table', tableValues: '0 0 0.1 0.8 1' })}
          {h('feFuncB', { type: 'table', tableValues: '0 0 0.1 0.8 1' })}
        </feComponentTransfer>

        <feColorMatrix
          in="contrastRaw"
          result="highlights"
          type="matrix"
          values="0.2 0.2 0.2 0 0
                  0.2 0.2 0.2 0 0
                  0.2 0.2 0.2 0 0
                  0 0 0 0 1"
        />

        <feGaussianBlur
          in="highlights"
          result="highlightsBlur"
          stdDeviation="2"
        />

        <feComposite in="lowRawBg" in2="highlightsBlur" operator="lighter" />
      </filter>
    ),
    [filterId, warpScale, warpDataURI]
  );

  return filterContents;
};
