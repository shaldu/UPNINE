<script lang="ts">
    import { TICK_RATE } from "$game/config";
    import Displaytime from "./Displaytime.svelte";

    export let currentProgress: number = 0;
    export let maxProgress: number = 100;
    export let produceValue: string = "";
    
</script>
<div class="progressbar-outer">
    <div class="progressbar-progress" style="width: {currentProgress / maxProgress * 100}%">

    </div>
    <div class="progressbar-inner">
        <Displaytime timeInSeconds={currentProgress} format="mm:ss" />
        + {produceValue}
        <Displaytime timeInSeconds={maxProgress} format="mm:ss" />
    </div>
</div>