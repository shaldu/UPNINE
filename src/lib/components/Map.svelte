<script lang="ts">
    import { onMount } from "svelte";
    import type { TileMap, TileType, Vec2 } from "$types";
    import { Empty, Wheat, None } from "$lib/tiles";

    const MAP_SIZE = 32;

    let map: TileMap = [];
    let tileBuyMode = false;

    onMount(() => {
        initMapWithNull();
        addTile([0, 0], "wheat");
        console.log(map);
    });

    function initMapWithNull() {
        for (let x = 0; x < MAP_SIZE; x++) {
            map[x] = [];
            for (let y = 0; y < MAP_SIZE; y++) {
                map[x][y] = null;
            }
        }
    }

    function convertToMapPosition(pos: Vec2): Vec2 {
        //convert to map position where 0,0 is the center of the map and the middle of the array
        const mapX = Math.floor(pos[0] / 32) + MAP_SIZE / 2;
        const mapY = Math.floor(pos[1] / 32) + MAP_SIZE / 2;
        return [mapX, mapY];
    }

    function addTile(position: Vec2, tileType: TileType) {
        position = convertToMapPosition(position);

        let tile = new Empty(1, position);

        switch (tileType) {
            case "wheat":
                tile = new Wheat(1, position);
                break;
            case "empty":
                tile = new Empty(1, position);
                break;
            default:
                break;
        }

        map[position[0]][position[1]] = tile;
    }

    //get neighbors that are not occupied by a tile that have type none or do not exist
    function getUnexistantNeighbours(position: Vec2): Vec2[] {
        const unexistantNeighbours: Vec2[] = [];
        const neighbours: Vec2[] = [
            [position[0], position[1] + 1],
            [position[0], position[1] - 1],
            [position[0] + 1, position[1]],
            [position[0] - 1, position[1]],
        ];

        //check if neighbour exists in map
        for (const neighbour of neighbours) {
            if (!map[neighbour[0]] || !map[neighbour[0]][neighbour[1]]) {
                unexistantNeighbours.push(neighbour);
            }
        }

        return unexistantNeighbours;
    }

    function getAllUnexistantNeighbours(): Vec2[] {
        const unexistantNeighbours: Vec2[] = [];
        for (const x in map) {
            for (const y in map[x]) {
                const neighbours = getUnexistantNeighbours([
                    Number(x),
                    Number(y),
                ]);
                for (const neighbour of neighbours) {
                    unexistantNeighbours.push(neighbour);
                }
            }
        }
        return unexistantNeighbours;
    }

    function addEmptyTiles(position: Vec2[]) {
        console.log(position);
        for (const pos of position) {
            addTile(pos, "empty");
        }
    }

    function removeEmptyTiles() {
        //loop trough map and remove all empty tiles
        for (const x in map) {
            for (const y in map[x]) {
                if (map[x][y]?.type == "empty") {
                    map[x][y] = null;                    
                }
            }
        }
    }

    function switchTileBuyMode() {
        tileBuyMode = !tileBuyMode;
        if (tileBuyMode) {
            addEmptyTiles(getAllUnexistantNeighbours());
        } else {
            removeEmptyTiles();
        }
    }
</script>

<div>
    <button on:click={() => switchTileBuyMode()}>Buy Tiles</button>
    <div class="maplayout">
        {#each map as x}
            {#if x}
                {#each x as y}
                    {#if y}
                        <svelte:component
                            this={y.component}
                            name={y.name}
                            color={y.color}
                        />
                    {:else}
                        <div class="none">

                        </div>
                    {/if}
                {/each}
            {/if}
        {/each}
    </div>
</div>
