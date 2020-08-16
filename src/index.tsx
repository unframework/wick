import { h, render } from 'preact';
import { App } from './components/App';
import { SlotMachine } from './SlotMachine';

import './index.scss';

render(
  <App state={new SlotMachine()} />,
  document.getElementById('app') as Element
);
