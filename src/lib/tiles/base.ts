import type { Tile, Vec2, TileType} from "$types";
import TileComponent from "$components/Tile.svelte";
export class Base implements Tile {

    id: number;
    position: Vec2;
    type: TileType = "none";
    name: string = "Base";
    description: string = "Base";
    color: string = "#666666";
    component = TileComponent;
    mainActionTitle = "Do Action";

    constructor (id: number, position: [number, number]) {
        this.id = id;
        this.position = position;
    }

    mainActionFunction = (args: {}) => {
        
    }

}