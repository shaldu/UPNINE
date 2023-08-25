import type { Tile, Vec2, TileType} from "$types";
import TileComponent from "$components/Tile.svelte";
export class Base <T extends Tile> implements Tile {

    id: number;
    position: Vec2;
    type: TileType = "none";
    name: string = "Base";
    description: string = "Base";
    color: string = "#666666";
    component = TileComponent;

    constructor(id: number, position: [number, number]) {
        this.id = id;
        this.position = position;
    }
}