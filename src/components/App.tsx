import { h, FunctionalComponent } from 'preact';
import { SlotMachine } from '../SlotMachine';
import { Timer } from './Timer';
import { MachineScreen } from './MachineScreen';

import './App.scss';

export const App: FunctionalComponent<{ state: SlotMachine }> = ({ state }) => {
  return (
    <Timer
      update={() => {
        state.update();
      }}
    >
      <div className="App">
        <div className="_main">
          <div className="_table" />
          <div className="_cabinet">
            <div className="_screen">
              <MachineScreen state={state} />
            </div>
          </div>
        </div>
      </div>
    </Timer>
  );
};
