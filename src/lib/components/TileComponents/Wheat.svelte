<script lang="ts">
    import type { BaseCurrency } from "$game/currency";
    import { onMount } from "svelte";
    export let currency: BaseCurrency;

    $:store = currency.store;

    onMount(() => {});
</script>
<div>
    {$store.formattedAndNamedValue}
</div>
