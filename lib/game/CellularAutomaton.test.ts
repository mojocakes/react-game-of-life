import { CellularAutomaton } from './CellularAutomaton';
import { Cell } from './Cell';
import { Rule } from './Rule';
import { ICell, IRule } from './types';

describe('game/CellularAutomaton', () => {
    describe('nextFrame()', () => {
        it('should throw an error if any cells are missing', () => {
            expect.assertions(1);

            try {
                const game = new CellularAutomaton(3, 3, []);
                game.next([
                    new Cell(1, 1, false),
                    new Cell(2, 1, false),
                    new Cell(3, 1, false),
                    new Cell(1, 2, false),
                    new Cell(2, 2, false),
                    // deliberately missing cell for X=3, Y=2 here
                    new Cell(1, 3, false),
                    new Cell(2, 3, false),
                    new Cell(3, 3, false),
                ]);
            } catch (error) {
                expect(error.toString().includes('{"x":3,"y":2}')).toBeTruthy();
            }
        });

        it('should return an array of cells augmented by rules', () => {
            // rule that flips the value of the cell
            class IncreaseRule extends Rule<number> {
                apply(cell: ICell<number>, previousGeneration: ICell<number>[]): ICell<number> {
                    return new Cell(cell.coordinates.x, cell.coordinates.y, cell.state + 1);
                }
            }

            // rule that shifts all cells down by 1 row
            class DoubleRule extends Rule<number> {
                apply(cell: ICell<number>, previousGeneration: ICell<number>[]): ICell<number> {
                    return new Cell(cell.coordinates.x, cell.coordinates.y, cell.state * 2);
                }
            }

            const game = new CellularAutomaton<number>(3, 3, [
                new IncreaseRule(3, 3),
                new DoubleRule(3, 3),
            ]);

            const initialCells = [
                new Cell(1, 1, 1),
                new Cell(2, 1, 2),
                new Cell(3, 1, 3),
                new Cell(1, 2, 4),
                new Cell(2, 2, 5),
                new Cell(3, 2, 6),
                new Cell(1, 3, 7),
                new Cell(2, 3, 8),
                new Cell(3, 3, 9),
            ];

            expect(game.next(initialCells)).toEqual([
                new Cell(1, 1, (1 + 1) * 2),
                new Cell(2, 1, (2 + 1) * 2),
                new Cell(3, 1, (3 + 1) * 2),
                new Cell(1, 2, (4 + 1) * 2),
                new Cell(2, 2, (5 + 1) * 2),
                new Cell(3, 2, (6 + 1) * 2),
                new Cell(1, 3, (7 + 1) * 2),
                new Cell(2, 3, (8 + 1) * 2),
                new Cell(3, 3, (9 + 1) * 2),
            ]);
        });
    });
});
