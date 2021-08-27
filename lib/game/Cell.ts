import { ICell, TCoordinates } from './types';

export class Cell<TState = boolean> implements ICell<TState> {
    public readonly coordinates: TCoordinates;

    public constructor(
        x: number,
        y: number,
        public state: TState
    ) {
        this.coordinates = { x, y };
    }

    public setState(state: TState): this {
        this.state = state;
        return this;
    }
}
