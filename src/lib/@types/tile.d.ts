
import { Vec2 } from "./global";

export type TileType = "none" | "empty" | "wheat" | "base" | "buyable";

export type Tile = {
    id: number;
    position: Vec2;
    type: string;
    name: string;
    description: string;
}

export type TileMap = Tile[][] | null[][];