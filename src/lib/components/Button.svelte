<script lang="ts">
    export let action: () => void;
    export let text: string;
    export let subtextLeft: string | undefined = undefined;
    export let subtextRight: string | undefined = undefined;
</script>

<div>
    <button class="button" on:click={action}>
        <div class="d-flex flex-column">
            <div class="mainText">
                {text}
            </div>
            {#if subtextLeft}
                <div class="d-flex justify-content-between">
                    <div class="subText subTextLeft">
                        {subtextLeft}
                    </div>
                    {#if subtextRight}
                        <div class="subText subTextRight">
                            {subtextRight}
                        </div>
                    {/if}
                </div>
            {/if}
        </div>
    </button>
</div>
