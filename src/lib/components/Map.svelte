<script lang="ts">
    import { onMount } from "svelte";
    import type { TileMap, Vec2 } from "$types";
    import { Wheat } from "$lib/tiles";

    let map: TileMap = [];

    onMount(() => {
        addTile([0, 0]);
    });

    function addTile(position: Vec2) {
        const tile = new Wheat(1, position);
        map[position[0]] ??= [];
        map[position[0]][position[1]] = tile;
    }
</script>

<div>
    <button on:click={() => addTile([map.length, map.length])}
        >Add Tile</button
    >
    {#each map as x}
        {#if x}
            {#each x as y}
                {#if y}
                    <svelte:component this={y.component} name={y.name} color={y.color}/>
                {/if}
            {/each}
        {/if}
    {/each}
</div>
