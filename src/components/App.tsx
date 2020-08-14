import { h, FunctionalComponent } from 'preact';

export const App: FunctionalComponent = () => {
  return (
    <div>
      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
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
        </defs>

        <rect
          id="grad"
          width="100"
          height="100"
          fill="url(#checkerboardPattern)"
        />
      </svg>
    </div>
  );
};
