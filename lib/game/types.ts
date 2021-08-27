export type TConstructor<TClass> = Function & { prototype: TClass };

export type TCoordinates = { x: number, y: number };

export interface IGrid {
    readonly height: number;
    readonly width: number;

    /**
     * Maps a grid index to its coordinates
     * 
     * @param {number} index
     * @returns {null | TCoordinates}
     */
    coordinates(index: number): null | TCoordinates;

    /**
     * Maps grid coordinates to its index
     * 
     * @param {TCoordinates} coordinates
     * @returns {null | number}
     */
    index(coordinates: TCoordinates): null | number;

    /**
     * Finds the coordinates of all surrounding cells
     * 
     * @param {TCoordinates} coordinates
     * @returns {TCoordinates[]}
     */
    neighbours(coordinates: TCoordinates): TCoordinates[];
}

export interface ICell<TState = boolean> {
    readonly coordinates: TCoordinates;
    state: TState;
    setState(state: TState): ICell<TState>;
}

export interface IRule<TCellState> {
    /**
     * Applies the rule to a cell.
     * 
     * @param {TCell<TCellState>} cell
     * @param {ICell[]} previousGeneration
     * @return {ICell<TCellState>}
     */
    apply(
        cell: ICell<TCellState>,
        previousGeneration: ICell<TCellState>[],
    ): ICell<TCellState>;
}

export interface ICellularAutomaton<TCellState> {
    readonly height: number;
    readonly rules: IRule<TCellState>[];
    readonly width: number;

    /**
     * Generates the next frame given an existing one.
     * 
     * @param {ICell<TCellState>} cells
     * @returns {ICell<TCellState>[]}
     */
    next(cells: ICell<TCellState>[]): ICell<TCellState>[];
}
