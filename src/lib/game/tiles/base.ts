import type { Tile, Vec2, TileType} from "$types";
import TileComponent from '$components/Tile.svelte';
import BuyableTileComponent from '$components/TileComponents/Buyable.svelte';
import type { BaseCurrency } from "$game/currency";
import bigInt from "big-integer";
import type Game from "$game/game";
import { writable, type Writable } from "svelte/store";


export default class Base implements Tile {
    id: number;
    position: Vec2;
    canvas: HTMLDivElement;
    tile: TileComponent | null = null;
    matrixId: number;
    currency: BaseCurrency;
    game: Game;

    store: Writable<{ progressBarObj:  { current: number, max: number, earning: string } }>;

    progressbar: { current: number, max: number, earning: string } = {current: 0, max: 10, earning: '0'};

    constructor(game:Game,canvas: HTMLDivElement, id: number, position: Vec2, matrixId: number, currency: BaseCurrency) {
        this.store = writable({ progressBarObj: this.progressbar });

        this.game = game;
        this.canvas = canvas;
        this.id = id;
        this.position = position;
        this.matrixId = matrixId;
        this.currency = currency;
        this.initProgressbar();
        this.addComponent();
    }

    initProgressbar() {
        this.progressbar = {current: 0, max: 10, earning: this.currency.formatNumberName(this.currency.getIncome(this.getBasicIncome()))};
    }

    updateStore() {
        let earning = this.currency.formatNumberName(this.currency.getIncome(this.getBasicIncome()));
        this.progressbar.earning = earning;
        this.store.set({ progressBarObj: this.progressbar });
    }

    get progressBarObj(): {  } {
        return this.progressbar;
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

    buyUpgrade(currency: BaseCurrency) {
        this.currency.buyUpgrade(currency);
    }


    addComponent() {
        this.tile = new TileComponent({
            target: this.canvas,
            props: {
                tileType: this.type,
                name: this.name,
                color: this.color,
                matrixId: this.matrixId,
                currency: this.currency,
                tile: this,
                game: this.game,
                tileComponent: this.component
            }
        });
    }

    getBasicIncome(): bigInt.BigInteger {
        return bigInt(10);
    }

    updateProgressbar(rate:number) {
        this.progressbar.current += (rate / 1000);
        if (this.progressbar.current >= this.progressbar.max) {
            this.progressbar.current = 0;
            this.currency.addIncome(this.getBasicIncome());
        }
        this.updateStore();
    }

    update(rate:number) {
        this.updateProgressbar(rate);
    }

}