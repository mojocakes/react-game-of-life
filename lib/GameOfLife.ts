import { ICell, IGrid } from './game/types';
import { Rule } from './game/Rule';
import { CellularAutomaton } from './game/CellularAutomaton';
import { Cell } from './game/Cell';

const findLivingNeighbours = (cell: ICell, previousGeneration: ICell[], grid: IGrid): ICell[] => {
    const neighbourCoords = grid.neighbours(cell.coordinates);
    const neighbours = neighbourCoords.map(coordinates => previousGeneration.find(previousCell => previousCell.coordinates === coordinates));
    const livingNeighbours = neighbours.filter(neighbour => neighbour.state === true);
    return livingNeighbours;
}

// Any live cell with two or three live neighbours survives.
export class RuleOne extends Rule {
    public apply(cell: ICell, previousGeneration: ICell[]): ICell {
        if (cell.state === true) {
            const livingNeighbours = findLivingNeighbours(cell, previousGeneration, this.grid);

            if ([2, 3].includes(livingNeighbours.length)) {
                return new Cell(cell.coordinates.x, cell.coordinates.y, true);
            }
        }

        return cell;
    }
}

// Any dead cell with three live neighbours becomes a live cell.
export class RuleTwo extends Rule {
    public apply(cell: ICell, previousGeneration: ICell[]): ICell {
        const livingNeighbours = findLivingNeighbours(cell, previousGeneration, this.grid);
        if (livingNeighbours.length > 3) {
            return new Cell(cell.coordinates.x, cell.coordinates.y, true);
        }
    }
}

const width = 10;
const height = 10;
const gameOfLife = new CellularAutomaton(width, height, [
    new RuleOne(width, height),
]);

export default gameOfLife;

// setInterval(() => {
//     const frame = game.nextFrame();
// });
