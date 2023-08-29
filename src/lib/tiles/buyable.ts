
import TileSimple from "$components/Tile_simple.svelte";
import type { TileType } from "$types";
import { Base } from "./base";

export class Buyable extends Base{
    name: string = "Buy Tile";
    description: string = "Buy a Tile";
    type: TileType = "buyable";
    color: string = "#ffffff";
    component = TileSimple;
    mainActionTitle = "Buy new Tile";

    mainActionFunction = (args: {}) => {
        //@ts-ignore
        const { gold, upgradeCost  } = args;
    }
}