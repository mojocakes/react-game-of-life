import { Grid } from './Grid';

describe('game/Grid', () => {
    describe('coordinates()', () => {
        // TODO: Add more tests with different grid sizes
        it('should return coordinates matching the provided index', () => {
            expect((new Grid(10, 10)).coordinates(0)).toEqual({ x: 1, y: 1 });
            expect((new Grid(10, 10)).coordinates(9)).toEqual({ x: 10, y: 1 });
            expect((new Grid(10, 10)).coordinates(10)).toEqual({ x: 1, y: 2 });
            expect((new Grid(10, 10)).coordinates(44)).toEqual({ x: 5, y: 5 });
            expect((new Grid(10, 10)).coordinates(90)).toEqual({ x: 1, y: 10 });
            expect((new Grid(10, 10)).coordinates(99)).toEqual({ x: 10, y: 10 });
        });
    });

    describe('index()',  () => {
        // TODO: Add more tests with different grid sizes
        it('should return an index matching the provided coordinates', () => {
            expect((new Grid(10, 10)).index({ x: 1, y: 1 })).toEqual(0);
            expect((new Grid(11, 10)).index({ x: 11, y: 1 })).toEqual(10);
            expect((new Grid(10, 10)).index({ x: 10, y: 1 })).toEqual(9);
            expect((new Grid(10, 10)).index({ x: 5, y: 5 })).toEqual(44);
            expect((new Grid(10, 10)).index({ x: 1, y: 10 })).toEqual(90);
            expect((new Grid(10, 10)).index({ x: 10, y: 10 })).toEqual(99);
        });

        it('should return null if the coordinates are out of bounds', () => {
            expect((new Grid(10, 10)).index({ x: 0, y: 1 })).toEqual(null);
            expect((new Grid(10, 10)).index({ x: 11, y: 1 })).toEqual(null);
            expect((new Grid(10, 10)).index({ x: 1, y: 15 })).toEqual(null);
        });
    });

    describe('neighbours()', () => {
        it('should return an array of coordinates that map to grid neighbours', () => {
            expect((new Grid(10, 10).neighbours({ x: 1, y: 1 }))).toEqual([
                { x: 2, y: 1 },
                { x: 1, y: 2 },
                { x: 2, y: 2 },
            ]);
            expect((new Grid(10, 10).neighbours({ x: 10, y: 1 }))).toEqual([
                { x: 9, y: 1 },
                { x: 9, y: 2 },
                { x: 10, y: 2 },
            ]);
            expect((new Grid(10, 10).neighbours({ x: 5, y: 5 }))).toEqual([
                { x: 4, y: 4 },
                { x: 5, y: 4 },
                { x: 6, y: 4 },
                { x: 4, y: 5 },
                { x: 6, y: 5 },
                { x: 4, y: 6 },
                { x: 5, y: 6 },
                { x: 6, y: 6 },
            ]);
        });
    });
});
