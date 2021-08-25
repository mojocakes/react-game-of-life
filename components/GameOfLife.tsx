import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { randomCells, RuleOne } from '../lib/GameOfLife';
import { CellularAutomaton } from '../lib/game/CellularAutomaton';
import { ICell } from '../lib/game/types';

class GameOfLife extends React.Component<any, { cells: ICell[] }> {
    static refreshSpeed: number = 250;

    protected game: CellularAutomaton;
    protected interval: number;

    public constructor(props) {
        super(props);

        // bind methods
        this.renderCell = this.renderCell.bind(this);

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
        }, GameOfLife.refreshSpeed);
    }

    public componentWillUnmount() {
        clearInterval(this.interval);
    }

    public render() {
        const { cells } = this.state;
        const gridSize = 800;

        return (
            <Canvas
                dpr={[1, 2]}
                shadows
                style={{ width: gridSize, height: gridSize }}
            >
                <camera position={[-50, -30, -70]}>
                    <mesh
                        rotation={[-0.5, 0, 0]}
                        // rotation-x={-Math.PI / 2}
                    >
                        {cells.map(this.renderCell)}
                    </mesh>
                </camera>
                <ambientLight intensity={1} />
                <directionalLight color="purple" position={[0, 0, 5]} />
                <color attach="background" args={['#381a40']} />
                <fog attach="fog" args={['#270430', 50, 180]} />
                <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                />
            </Canvas>
        );
    }

    renderCell(cell: ICell, index: number) {
        const xWidth = 100 / this.game.width;
        const yHeight = 100 / this.game.height;

        const xPosition = (cell.coordinates.x * xWidth) - xWidth;
        const yPosition = (cell.coordinates.y * yHeight) - yHeight;

        return (
            <mesh position={[xPosition, yPosition, 0]} scale={1} key={index}>
                <boxGeometry
                    args={[xWidth, xWidth, xWidth * 5]}
                />
                <meshStandardMaterial color={cell.state ? '#42c71a' : '#b50b5d'} />
            </mesh>
        );
    }
}

export default GameOfLife;
