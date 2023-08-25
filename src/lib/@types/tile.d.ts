
import { Vec2 } from "./global";
import type TileComponent from "$components/Tile.svelte";

export type TileType = "none" | "wheat" | "base";

export type Tile = {
    id: number;
    position: Vec2;
    type: string;
    name: string;
    description: string;
    color: string;
    component: typeof TileComponent;
}

export type TileMap = Tile[][];