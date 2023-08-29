import type { TileType } from "$types";
import { Base } from "./base";

export class Empty extends Base{
    name: string = "Select a Tile";
    description: string = "Select a Tile";
    type: TileType = "empty";
    color: string = "#666666";
}