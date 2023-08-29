import type { Tile, Vec2, TileType} from "$types";

export class Base implements Tile {
    id: number;
    position: Vec2;
    type: TileType = "base";
    name: string = "Base";
    description: string = "Base Tile";
    
    constructor(id: number, position: Vec2) {
        this.id = id;
        this.position = position;
    }

}