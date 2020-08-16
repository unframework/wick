import { h, createContext, FunctionalComponent, RefObject } from 'preact';
import { useRef, useContext, useEffect, useState } from 'preact/hooks';

type TimerCallback = () => void;
const TimerContext = createContext<RefObject<TimerCallback>[] | null>(null);

export const FRAME_DELAY = 1 / 60;

export const Timer: FunctionalComponent<{ update: () => void }> = ({
  update,
  children
}) => {
  const cbListRef = useRef<RefObject<TimerCallback>[]>([]);

  useEffect(() => {
    const cbList = cbListRef.current;

    let rafId: number | null = null;

    function startRAF() {
      rafId = window.requestAnimationFrame(() => {
        // first, update the state
        update();

        cbList.forEach((cbRef) => {
          if (!cbRef.current) {
            throw new Error('empty frame callback');
          }

          cbRef.current();
        });

        // request new frame if no errors have happened
        startRAF();
      });
    }

    startRAF();

    return () => {
      if (rafId === null) {
        return;
      }

      window.cancelAnimationFrame(rafId);
    };
  }, [update]);

  return (
    <TimerContext.Provider value={cbListRef.current}>
      {children}
    </TimerContext.Provider>
  );
};

export function useFrame(callback: TimerCallback): void {
  const cbList = useContext(TimerContext);

  const callbackRef = useRef<TimerCallback>(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!cbList) {
      throw new Error('no timer context');
    }

    cbList.push(callbackRef);

    return () => {
      const index = cbList.indexOf(callbackRef);

      if (index === -1) {
        throw new Error('double cleanup in timer list');
      }

      cbList.splice(index, 1);
    };
  }, [cbList]);
}

export function useFrameRefresh(): void {
  // simply trigger a re-render
  const [, setTrigger] = useState<boolean>(false);

  useFrame(() => {
    setTrigger((prev) => !prev);
  });
}
