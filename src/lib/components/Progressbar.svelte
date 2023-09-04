<script lang="ts">
    import { TICK_RATE } from "$game/config";

    export let currentProgress: number = 0;
    export let maxProgress: number = 100;

    
</script>
<div class="progressbar-outer">
    <div class="progressbar-progress" style="width: {currentProgress / maxProgress * 100}%"></div>
</div>