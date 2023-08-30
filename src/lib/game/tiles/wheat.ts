import type { Tile, Vec2, TileType} from "$types";
import WheatComponent from '$components/TileComponents/Wheat.svelte';
import { Base } from './index';

export default class Wheat extends Base {
    
    get color(): string {
        return '#d1cf69';
    }

    get name(): string {
        return 'Wheat';
    }

    get type(): TileType {
        return 'wheat';
    }

    get description(): string {
        return 'This is the wheat tile';
    }

    get component(): typeof WheatComponent {
        return WheatComponent;
    }

}