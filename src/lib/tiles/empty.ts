import type { TileType } from "$types";
import { Base } from "./base";

export class Empty extends Base{
    name: string = "Buy Tile";
    description: string = "Buy a Tile";
    type: TileType = "empty";
    color: string = "#777777";
}