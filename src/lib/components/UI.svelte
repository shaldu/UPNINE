<script lang="ts">
    import type Game from "$game/game";
    import { onMount } from "svelte";

    export let game: Game;

    $:gameStore = game.store;
    $:coinCurrency = game.globalCoin.store;

    onMount(() => {
        
    });
</script>
<div id="ui-top-bar">
    <div class="inner">
        <div class="gold">
            {$coinCurrency.formattedAndNamedValue}
        </div>
    </div>
</div>
<div id="ui-side-bar">
    <div class="inner" />
</div>