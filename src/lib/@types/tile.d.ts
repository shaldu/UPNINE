import TileComponent from '$components/Tile.svelte';
import type { BaseCurrency } from "$game/currency";
import { Vec2 } from "./global";
import bigInt from "big-integer";

export type TileType = "none" | "empty" | "wheat" | "base" | "buyable";

export type Tile = {
    id: number;
    position: Vec2;
    type: string;
    name: string;
    description: string;
    canvas: HTMLDivElement;
    matrixId: number;
    currency: BaseCurrency | null;
    tile: TileComponent | null;

}

export type TileMap = Tile[][] | null[][];