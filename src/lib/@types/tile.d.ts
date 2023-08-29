
import { Vec2 } from "./global";
import type TileComponent from "$components/Tile.svelte";

export type TileType = "none" | "empty" | "wheat" | "base" | "buyable";

export type Tile = {
    id: number;
    position: Vec2;
    type: string;
    name: string;
    description: string;
    color: string;
    component: typeof TileComponent;
    mainActionFunction: (args: {}) => void;
    mainActionTitle: string;
}

export type TileMap = Tile[][] | null[][];