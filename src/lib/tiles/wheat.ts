import type { TileType } from "$types";
import { Base } from "./base";

export class Wheat extends Base{
    name: string = "Wheat";
    description: string = "Wheat Tile to feed your people";
    type: TileType = "wheat";
    color: string = "#e6d143";
}