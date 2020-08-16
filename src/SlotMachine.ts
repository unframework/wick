import { FRAME_DELAY } from './components/Timer';

export interface Wheel {
  position: number;
}

export class SlotMachine {
  wheels: Wheel[] = [{ position: 0 }, { position: 0.3 }, { position: 0.7 }];

  update(): void {
    this.wheels.forEach((wheel) => {
      wheel.position = (wheel.position + FRAME_DELAY * 1.5) % 1;
    });
  }
}
