import { ICell, TCoordinates } from './types';

export class Cell<TState = boolean> implements ICell<TState> {
    public readonly coordinates: TCoordinates;

    public constructor(
        x: number,
        y: number,
        public readonly state: TState
    ) {
        this.coordinates = { x, y };
    }
}
