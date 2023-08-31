<script lang="ts">
    import type { BaseCurrency } from "$game/currency";
    import type { Base } from "$game/tiles";
    import { SvelteComponent, onMount } from "svelte";
    import type bigInt from "big-integer";

    export let currency: BaseCurrency;
    export let tile: Base;
    export let name: string;

    onMount(() => {});
</script>
