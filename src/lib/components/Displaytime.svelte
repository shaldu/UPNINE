<script lang="ts">
    import { onMount } from "svelte";

    export let timeInSeconds: number;
    export let format: "dd:hh:mm" | "hh:mm:ss" | "mm:ss" | "ss";

    function padWithZero(num: number): string {
        return num < 10 ? `0${num}` : `${num}`;
    }

    function convertTimeToFormat(
        timeInSeconds: number,
        format: "dd:hh:mm" | "hh:mm:ss" | "mm:ss" | "ss"
    ) {
        const days = Math.floor(timeInSeconds / (24 * 3600));
        const hours = Math.floor((timeInSeconds % (24 * 3600)) / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = Math.floor(timeInSeconds % 60);

        switch (format) {
            case "dd:hh:mm":
                return `${padWithZero(days)}:${padWithZero(
                    hours
                )}:${padWithZero(minutes)}`;
            case "hh:mm:ss":
                return `${padWithZero(hours)}:${padWithZero(
                    minutes
                )}:${padWithZero(seconds)}`;
            case "mm:ss":
                return `${padWithZero(minutes)}:${padWithZero(seconds)}`;
            case "ss":
                return `${padWithZero(seconds)}`;
            default:
                return "";
        }
    }
</script>

<div>
    {convertTimeToFormat(timeInSeconds, format)}
</div>
