<script lang="ts">
    import { onMount } from "svelte";
    import type { TileMap, TileType, Vec2 } from "$types";
    import { Buyable, Empty, Wheat, None } from "$lib/tiles";

    const MAP_SIZE = 32;

    let map: TileMap = [];
    let tileBuyMode = false;
    
    
    onMount(() => {
        initMapWithNull();
        addTile([16, 16], "wheat");
    });

    function initMapWithNull() {
        for (let x = 0; x < MAP_SIZE; x++) {
            map[x] = [];
            for (let y = 0; y < MAP_SIZE; y++) {
                map[x][y] = null;
            }
        }
    }

    function addTile(position: Vec2, tileType: TileType) {
        let tile = new None(1, position);

        switch (tileType) {
            case "wheat":
                tile = new Wheat(1, position);
                break;
            case "buyable":
                tile = new Buyable(1, position);
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
            if (map[neighbour[0]] === undefined) continue;
            if (map[neighbour[0]][neighbour[1]] === null) {
                unexistantNeighbours.push(neighbour);
            }
        }

        return unexistantNeighbours;
    }

    function getAllUnexistantNeighbours(): Vec2[] {
        const unexistantNeighbours: Vec2[] = [];
        for (const x in map) {
            for (const y in map[x]) {
                if (map[x][y]?.type == "buyable" || map[x][y] == null) continue;
                const neighbours = getUnexistantNeighbours([
                    Number(x),
                    Number(y),
                ]);
                console.log(neighbours);
                
                for (const neighbour of neighbours) {
                    unexistantNeighbours.push(neighbour);
                }
            }
        }
        return unexistantNeighbours;
    }

    function addEmptyTiles(position: Vec2[]) {
        for (const pos of position) {     
            addTile(pos, "buyable");
        }
    }

    function removeBuyableTiles() {
        //loop trough map and remove all Buyable tiles
        for (const x in map) {
            for (const y in map[x]) {
                if (map[x][y]?.type == "buyable") {
                    map[x][y] = null;
                }
            }
        }
    }

    export function switchTileBuyMode() {
        tileBuyMode = !tileBuyMode;
        if (tileBuyMode) {
            addEmptyTiles(getAllUnexistantNeighbours());
        } else {
            removeBuyableTiles();
        }
    }
</script>

<div class="position-absolute">
    <div class="maplayout">
        {#each map as x}
            {#if x}
                {#each x as y}
                    {#if y}
                        <svelte:component
                            this={y.component}
                            name={y.name}
                            color={y.color}
                            actionFunction={y.mainActionFunction({})}
                            actionTitle={y.mainActionTitle}
                            >
                        </svelte:component>
                    {:else}
                        <div class="none" />
                    {/if}
                {/each}
            {/if}
        {/each}
    </div>
</div>
