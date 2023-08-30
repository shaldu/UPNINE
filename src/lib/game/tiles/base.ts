import type { Tile, Vec2, TileType} from "$types";
import TileComponent from '$components/Tile.svelte';
import BuyableTileComponent from '$components/TileComponents/Buyable.svelte';

export default class Base implements Tile {
    id: number;
    position: Vec2;
    canvas: HTMLDivElement;
    tile: TileComponent | null = null;
    matrixId: number;

    constructor(canvas: HTMLDivElement, id: number, position: Vec2, matrixId: number) {
        this.canvas = canvas;
        this.id = id;
        this.position = position;
        this.matrixId = matrixId;

        this.addComponent();
    }

    get name(): string {
        return '';
    }

    get description(): string {
        return '';
    }

    get type(): TileType {
        return 'base';
    }

    get color(): string {
        return '#000000';
    }

    get component(): typeof BuyableTileComponent {
        return BuyableTileComponent;
    }

    addComponent() {
        this.tile = new TileComponent({
            target: this.canvas,
            props: {
                tileType: this.type,
                name: this.name,
                color: this.color,
                matrixId: this.matrixId,
                tileComponent: this.component
            }
        });
    }

}