import type { Tile, Vec2, TileType, TileMap } from "$types";
import bigInt from "big-integer";
import { MAP_SIZE, TICK_RATE } from "./config";
import { BaseCurrency, CoinCurrency, WheatCurrency } from "./currency";
import { Base, Wheat } from "./tiles";
import UIComponent from '$components/UI.svelte';
import { writable, type Writable } from "svelte/store";


export default class Game {
    tileMap: TileMap = [];
    mapSize: number = MAP_SIZE;
    canvas: HTMLDivElement;
    uiElement: HTMLDivElement;

    globalCoin: CoinCurrency = new CoinCurrency();
    globalWheat: WheatCurrency = new WheatCurrency();

    store: Writable<{ CoinCurrency: CoinCurrency, WheatCurrency: WheatCurrency }>;

    constructor(canvas: HTMLDivElement, uiElement: HTMLDivElement) {
        this.store = writable({ CoinCurrency: this.globalCoin, WheatCurrency: this.globalWheat });

        this.canvas = canvas;
        this.uiElement = uiElement;
        this.initMap();
        this.loadMap();
        this.loadUI();
        this.gameLoopInit();
        this.globalCoin.add(10002000);
    }

    loadUI() {
        //load ui from file
        new UIComponent({
            target: this.uiElement,
            props: {
                game: this
            }
        });
    }

    initMap() {
        for (let i = 0; i < this.mapSize; i++) {
            this.tileMap[i] = [];
            for (let j = 0; j < this.mapSize; j++) {
                this.tileMap[i][j] = null;
            }
        }
    }

    loadMap() {
        //load map from file
        this.tileMap.forEach((row, i) => {
            row.forEach((tile, j) => {

                if (i == (this.mapSize / 2) && j == (this.mapSize / 2)) {
                    const currency = new WheatCurrency();
                    this.tileMap[i][j] = new Wheat(this, this.canvas, i * this.mapSize + j, [i, j], i * this.mapSize + j, currency);
                } else if (i == (this.mapSize / 2) && j == (this.mapSize / 2) - 1) {
                    // const currency = new WheatCurrency();
                    // this.tileMap[i][j] = new Wheat(this, this.canvas, i * this.mapSize + j, [i, j], i * this.mapSize + j, currency);
                } else {
                    const currency = new BaseCurrency();
                    this.tileMap[i][j] = new Base(this, this.canvas, i * this.mapSize + j, [i, j], i * this.mapSize + j, currency);
                }

            });
        });

    }


    gameLoopInit() {
        const interValSpeed = TICK_RATE
        setInterval(() => {
            this.gameLoop(interValSpeed);
        }, interValSpeed);
    }

    gameLoop(rate: number) {
        this.tileMap.forEach((row, i) => {
            row.forEach((tile, j) => {
                if (tile) {
                    tile.update(rate);
                }
            });
        });
    }
}