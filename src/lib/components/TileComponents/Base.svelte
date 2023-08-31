<script lang="ts">
    import type { BaseCurrency } from "$game/currency";
    import type { Base } from "$game/tiles";
    import type bigInt from "big-integer";
    import { SvelteComponent, onMount } from "svelte";

    export let currency: BaseCurrency;
    export let tile: Base;
    export let name: string;

    onMount(() => {});
</script>