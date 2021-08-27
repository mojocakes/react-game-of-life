import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {
    EffectComposer,
    DepthOfField,
    Bloom,
    Noise,
    Vignette,
    Scanline,
    Glitch,
    Pixelation,
    ChromaticAberration,
} from '@react-three/postprocessing'
import { BlendFunction, GlitchMode } from 'postprocessing'
import { randomCells, RuleOne } from '../lib/GameOfLife';
import { CellularAutomaton } from '../lib/game/CellularAutomaton';
import { ICell } from '../lib/game/types';
import { MeshStandardMaterial } from 'three';

class GameOfLife extends React.Component<any, { cells: ICell[] }> {
    static refreshSpeed: number = 100;
    
    protected game: CellularAutomaton;
    protected interval: number;
    protected cells: ICell[] = [];
    protected cellRefs: React.RefObject<MeshStandardMaterial>[] = [];

    public constructor(props) {
        super(props);

        // bind methods
        this.renderCell = this.renderCell.bind(this);

        const width = 40;
        const height = 40;

        this.game = new CellularAutomaton(width, height, [
            new RuleOne(width, height),
        ]);

        this.cells = randomCells(width, height);
        this.cells.forEach((cell, index) => {
            this.cellRefs[index] = React.createRef();
        });

        this.interval = (global as any).setInterval(() => {
            this.cells = this.game.next(this.cells);

            this.cells.forEach((cell, index) => {
                const ref = this.cellRefs[index];
                ref.current?.color.set(cell.state ? '#42c71a' : '#b50b5d');
            });
        }, GameOfLife.refreshSpeed);
    }

    public componentWillUnmount() {
        clearInterval(this.interval);
    }

    public render() {
        const cells = this.cells;
        const gridSize = 800;

        return (
            <Canvas
                dpr={[1, 2]}
                shadows
                style={{ width: gridSize, height: gridSize }}
            >
                <camera position={[-50, -20, -70]}>
                    <mesh
                        rotation={[-0.7, 0, 0]}
                    >
                        {cells.map(this.renderCell)}
                    </mesh>
                </camera>
                <ambientLight intensity={0.6} />
                <directionalLight color="orange" position={[0, 0, -80]} intensity={20} />
                <color attach="background" args={['white']} />
                <fog attach="fog" args={['red', 50, 200]} />
                <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                />
                <EffectComposer>
                    <DepthOfField
                        focusDistance={0.09}
                        focalLength={0.06}
                        bokehScale={2}
                        height={500}
                    />
                    <Noise opacity={0.2} />
                    {/* <Vignette eskil={false} offset={0.01} darkness={1.1} /> */}
                    <Scanline
                        blendFunction={BlendFunction.OVERLAY} // blend mode
                        density={1.25}
                    />
                    <Glitch
                        delay={[3, 5] as any} // min and max glitch delay
                        duration={[0.1, 1] as any} // min and max glitch duration
                        strength={[0.01, 0.5] as any} // min and max glitch strength
                        mode={GlitchMode.SPORADIC} // glitch mode
                        active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
                        ratio={0.4} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
                    />
                    {/* <ChromaticAberration
                        blendFunction={BlendFunction.NORMAL} // blend mode
                        offset={[0.004, 0.004] as any} // color offset
                    /> */}
                    {/* <Pixelation
                        granularity={5} // pixel granularity
                    /> */}
                </EffectComposer>
            </Canvas>
        );
    }

    renderCell(cell: ICell, index: number) {
        const xWidth = 100 / this.game.width;
        const yHeight = 100 / this.game.height;

        const xPosition = (cell.coordinates.x * xWidth) - xWidth;
        const yPosition = (cell.coordinates.y * yHeight) - yHeight;

        return (
            <mesh
                position={[xPosition, yPosition, 0]} scale={1}
                key={index}
            >
                <boxGeometry
                    args={[xWidth, xWidth, xWidth * 5]}
                />
                <meshStandardMaterial
                    color={cell.state ? '#42c71a' : '#b50b5d'}
                    ref={this.cellRefs[index]}
                />
            </mesh>
        );
    }
}

export default GameOfLife;
