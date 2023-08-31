<script lang="ts">
    import Button from "$components/Button.svelte";
    import type { BaseCurrency } from "$game/currency";
    import type { Base } from "$game/tiles";
    import { SvelteComponent, onMount } from "svelte";
    import type bigInt from "big-integer";

    export let currency: BaseCurrency;
    export let tile: Base;
    export let name: string;
    
    let amount = 1;

    $:store = currency.store;

    onMount(() => {});
</script>
<div>
    <div class="d-flex justify-content-between">
        <div>
            {name}
        </div>
        <div>
            {$store.formattedValue}
        </div>
    </div>
    
    <Button
        text="Buy Worker"
        subtextLeft={`Cost: ${currency.formatNumber($store.cost)}`}
        subtextRight={`${amount} x`}
        action={() => {
            tile.buyUpgrade();            
        }}
        ></Button>
</div>
<div class="bottomBar">
    {$store.level}
</div>