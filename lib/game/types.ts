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
