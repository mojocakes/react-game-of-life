import { Grid } from './Grid';
import { ICell, IGrid, IRule } from './types';

export abstract class Rule<TCellState = boolean> implements IRule<TCellState> {
    protected grid: IGrid;

    constructor(
        protected width: number,
        protected height: number,
    ) {
        this.grid = new Grid(width, height);
    }

    /**
     * Applies the rule to a cell.
     * 
     * @param {TCell<TCellState>} cell
     * @param {ICell<TCellState>[]} previousGeneration
     * @return {ICell<TCellState>}
     */
    abstract apply(
        cell: ICell<TCellState>,
        previousGeneration: ICell<TCellState>[],
    ): ICell<TCellState>;
}
