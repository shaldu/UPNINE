<script lang="ts">
    import { onMount } from "svelte";
    export let gold: number;

    let formattedGold = '';
    onMount(() => {
        formattedGold = formatGold(gold);
    });

    function formatGold(gold: number){
        //add ' every 3 digits from the right
        let goldString = gold.toString();
        let formattedGold = "";
        for(let i = goldString.length - 1; i >= 0; i--){
            if((goldString.length - i - 1) % 3 === 0){
                if (i !== goldString.length - 1) {
                    formattedGold = "'" + formattedGold; 
                }
            }
            formattedGold = goldString[i] + formattedGold;
        }
        return formattedGold;
    }

</script>

<div>
    $ {formattedGold}
</div>
