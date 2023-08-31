import type { Tile, Vec2, TileType, TileMap } from "$types";
import bigInt from "big-integer";
import { MAP_SIZE } from "./config";
import { BaseCurrency, WheatCurrency } from "./currency";
import { Base, Wheat } from "./tiles";



export default class Game {
    tileMap: TileMap = [];
    mapSize: number = MAP_SIZE;
    canvas: HTMLDivElement;

    coins: BaseCurrency = new BaseCurrency();
    wheat: WheatCurrency = new WheatCurrency();

    constructor(canvas: HTMLDivElement) {
        this.canvas = canvas;
        this.initMap();
        this.loadMap();

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
                    tile = new Wheat(this.canvas, i * this.mapSize + j, [i, j], i * this.mapSize + j, currency);
                } else {
                    const currency = new BaseCurrency();
                    tile = new Base(this.canvas, i * this.mapSize + j, [i, j], i * this.mapSize + j, currency);
                }

            });
        });

    }
}