<script lang="ts">
    import Button from "$components/Button.svelte";
    import type { BaseCurrency } from "$game/currency";
    import type { Base } from "$game/tiles";
    import { SvelteComponent, onMount } from "svelte";
    import type Game from "$game/game";
    import type bigInt from "big-integer";
    import Progressbar from "$components/Progressbar.svelte";

    export let currency: BaseCurrency;
    export let tile: Base;
    export let name: string;
    export let game: Game;

    $: tileCurrency = currency.store;

    $: gameStore = game.store;
    $: tileStore = tile.store;

    const gameCoinCurrency = game.globalCoin;

    onMount(() => {});
</script>

<div class="tile-inner">
    <div class="d-flex justify-content-between">
        <div>
            {name}
        </div>
        <div>
            {$tileCurrency.formattedValue}
        </div>
    </div>
    <div class="tile-content no-zoom">
        <Button
            text="Buy Fields"
            subtextLeft={`Cost: ${gameCoinCurrency.formatNumberName(
                $tileCurrency.cost
            )}`}
            action={() => {
                tile.buyUpgrade(gameCoinCurrency);
            }}
        />
        <Progressbar
            currentProgress={$tileStore.progressBarObj.current}
            maxProgress={$tileStore.progressBarObj.max}
            produceValue={$tileStore.progressBarObj.earning}
        />

    </div>
</div>
<div class="bottomBar d-flex justify-content-between">
    <div>
        {$tileCurrency.level}
    </div>
    <div style="min-width: 180px;">
        <Button
            text="Collect"
            
            action={() => {
                tile.buyUpgrade(gameCoinCurrency);
            }}
        />
    </div>
</div>
