import { ICell, IGrid } from './game/types';
import { Rule } from './game/Rule';
import { Cell } from './game/Cell';
import { Grid } from './game/Grid';

const findLivingNeighbours = (cell: ICell, previousGeneration: ICell[], grid: IGrid): ICell[] => {
    const neighbourCoords = grid.neighbours(cell.coordinates);
    const neighbours = neighbourCoords.map(coordinates =>
        previousGeneration.find(previousCell =>
            previousCell.coordinates.x === coordinates.x && previousCell.coordinates.y === coordinates.y));

    if (neighbours.includes(undefined)) {
        console.log({
            neighbourCoords,
            neighbours,
        });
        throw new Error('A neighbour cannot be found.');
    }
    
    const livingNeighbours = neighbours.filter(neighbour => neighbour.state === true);
    return livingNeighbours;
}

export class RuleOne extends Rule {
    public apply(cell: ICell, previousGeneration: ICell[]): ICell {
        const livingNeighbours = findLivingNeighbours(cell, previousGeneration, this.grid);
        
        // Any live cell with two or three live neighbours survives.
        if (cell.state === true && [2, 3].includes(livingNeighbours.length)) {
            return new Cell(cell.coordinates.x, cell.coordinates.y, true);
        }

        // Any dead cell with three live neighbours becomes a live cell.
        if (cell.state === false && livingNeighbours.length === 3) {
            return new Cell(cell.coordinates.x, cell.coordinates.y, true);
        }

        return new Cell(cell.coordinates.x, cell.coordinates.y, false);
    }
}

// Any dead cell with three live neighbours becomes a live cell.
export class RuleTwo extends Rule {
    public apply(cell: ICell, previousGeneration: ICell[]): ICell {
        const livingNeighbours = findLivingNeighbours(cell, previousGeneration, this.grid);
        if (livingNeighbours.length > 3) {
            return new Cell(cell.coordinates.x, cell.coordinates.y, true);
        }

        return cell;
    }
}

export const randomCells = (width: number, height: number): ICell[] => {
    const grid = new Grid(width, height);

    return (new Array(width * height)).fill(null).map((val, index) => {
        const coordinates = grid.coordinates(index);
        const state = Math.random() < 0.5;
        return new Cell(coordinates.x, coordinates.y, state);
    });
}

