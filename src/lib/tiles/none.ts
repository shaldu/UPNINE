import type { TileType } from "$types";
import { Base } from "./base";

export class None extends Base{
    name: string = "";
    description: string = "";
    type: TileType = "none";
    color: string = "#000000";
}