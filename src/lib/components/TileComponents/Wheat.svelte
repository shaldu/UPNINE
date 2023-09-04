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

<div>
    <div class="d-flex justify-content-between">
        <div>
            {name}
        </div>
        <div>
            {$tileCurrency.formattedValue}
        </div>
    </div>

    <Button
        text="Buy Worker"
        subtextLeft={`Cost: ${currency.formatNumber($tileCurrency.cost)}`}
        action={() => {
            tile.buyUpgrade(gameCoinCurrency);
        }}
    />
    <Progressbar currentProgress={$tileStore.progressBarObj.current} maxProgress={$tileStore.progressBarObj.max} />
</div>
<div class="bottomBar d-flex justify-content-between">
    <div>
        {$tileCurrency.level}
    </div>
    <div>
        <Button
        text={`Collect: ${currency.formattedAndNamedValue}`}
        subtextLeft=""
        action={() => {
            tile.buyUpgrade(gameCoinCurrency);
        }}
    />
    </div>
</div>
