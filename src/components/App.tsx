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
        <MachineScreen state={state} />
      </div>
    </Timer>
  );
};
