import { h, render } from 'preact';
import { App } from './components/App';

import './index.scss';

render(<App />, document.getElementById('app') as Element);
