import { ICell,
    ICellularAutomaton,
    IGrid,
    IRule,
} from './types';
import { Grid } from './Grid';
import { Rule } from './Rule';

export class CellularAutomaton<TCellState = boolean> implements ICellularAutomaton<TCellState> {
    protected cells: ICell<TCellState>[] = [];
    protected grid: IGrid;

    public constructor(
        public readonly width: number,
        public readonly height: number,
        public readonly rules: IRule<TCellState>[],
    ) {
        this.grid = new Grid(width, height);
    }

    /**
     * Generates the next frame given an existing one.
     * 
     * @param {ICell<TCellState>} cells
     * @returns {ICell<TCellState>[]}
     */
    public next(cells: ICell<TCellState>[]): ICell<TCellState>[] {
        this.validateGridCells(cells);

        // apply rules to each cell
        const nextCells = cells.map(cell => {
            // run cell through each rule
            return this.rules.reduce((prev, rule, index, []) => {
                return rule.apply(prev, cells);
            }, cell);
        });

        this.validateGridCells(nextCells);

        return nextCells;
    }

    /**
     * Checks that an array of cells contains every cell required to populate the grid.
     * 
     * @param {ICell<TCellState>[]} cells
     * @returns {void}
     */
    protected validateGridCells(cells: ICell<TCellState>[]): void {
        // make an array with the correct number of items for our grid
        const indexes = (new Array(this.width * this.height)).fill(null);

        indexes.forEach((val, index) => {
            const coordinates = this.grid.coordinates(index);
            const cell = cells.find(cell => cell.coordinates.x === coordinates.x && cell.coordinates.y === coordinates.y);

            if (!cell) {
                throw new Error(`No cell in initialConditions matches the coordinates ${JSON.stringify(coordinates)}`);
            }
        });
    }
}