import React from 'react';
import { randomCells, RuleOne, RuleTwo } from '../lib/GameOfLife';
import { CellularAutomaton } from '../lib/game/CellularAutomaton';
import { ICell } from '../lib/game/types';

class GameOfLife extends React.Component<any, { cells: ICell[] }> {
    protected game: CellularAutomaton;
    protected interval: number;

    public constructor(props) {
        super(props);

        const width = 50;
        const height = 50;

        this.game = new CellularAutomaton(width, height, [
            new RuleOne(width, height),
            // new RuleTwo(dimensions.width, dimensions.height),
        ]);

        this.state = { cells: randomCells(width, height) };

        this.interval = (global as any).setInterval(() => {
            this.setState(state => ({
                cells: this.game.next(state.cells),
            }));
        }, 1000);
    }

    public componentWillUnmount() {
        clearInterval(this.interval);
    }

    public render() {
        const { cells } = this.state;
        const gridSize = 800;
        const cellSize = Math.sqrt((gridSize * gridSize) / cells.length);

        return (
            <div
                className="game-grid game-grid--game-of-life"
                style={{
                    width: gridSize + 2,
                    height: gridSize + 2,
                }}
            >
                {cells.map(cell => (
                    <div
                        className="cell"
                        data-live={cell.state.toString()}
                        style={{
                            width: cellSize,
                            height: cellSize,
                            background: cell.state ? 'black' : '#ddd',
                        }}
                    />
                ))}
            </div>
        )
    }
}

export default GameOfLife;
