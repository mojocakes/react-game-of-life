import { IGrid, TCoordinates } from './types';

export class Grid implements IGrid {
    public constructor(
        public readonly width: number,
        public readonly height: number,
    ) {
        // bind methods
        this.coordinatesExist = this.coordinatesExist.bind(this);
    }

    /**
     * Maps a grid index to its coordinates
     * 
     * @param {number} index
     * @returns {null | TCoordinates}
     */
    coordinates(index: number): null | TCoordinates {
        const y = Math.floor(index / this.width);
        const x = (index % this.width);
        const coordinates = {
            x: x + 1,
            y: y + 1,
        };

        if (!this.coordinatesExist(coordinates)) {
            return null;
        }

        return coordinates;
    }

    /**
     * Maps grid coordinates to its index
     * 
     * @param {TCoordinates} coordinates
     * @returns {null | number}
     */
    index(coordinates: TCoordinates): null | number {
        if (!this.coordinatesExist(coordinates)) {
            return null;
        }

        return ((coordinates.y - 1) * this.width) + (coordinates.x - 1);

        // return 0;
    }

    /**
     * Finds the coordinates of all surrounding cells
     * 
     * @param {TCoordinates} coordinates
     * @returns {TCoordinates[]}
     */
    neighbours(coordinates: TCoordinates): TCoordinates[] {
        return [
            { x: coordinates.x - 1, y: coordinates.y - 1 },
            { x: coordinates.x, y: coordinates.y - 1 },
            { x: coordinates.x + 1, y: coordinates.y - 1 },
            { x: coordinates.x - 1, y: coordinates.y },
            { x: coordinates.x + 1, y: coordinates.y },
            { x: coordinates.x - 1, y: coordinates.y + 1 },
            { x: coordinates.x, y: coordinates.y + 1 },
            { x: coordinates.x + 1, y: coordinates.y + 1 },
        ].filter(this.coordinatesExist);
    }

    /**
     * Determines whether a set of coordinates are present in the grid
     * 
     * @param {TCoordinates} coordinates
     * @returns {boolean}
     */
    protected coordinatesExist(coordinates: TCoordinates): boolean {
        if (coordinates.x < 1) { return false; }
        if (coordinates.y < 1) { return false; }
        if (coordinates.x > this.width) { return false; }
        if (coordinates.y > this.height) { return false; }
        return true;
    }
}
