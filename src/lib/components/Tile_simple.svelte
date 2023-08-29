<script lang="ts">
    import { onMount } from "svelte";
    export let name: string;
    export let color: string;
    
    export let actionFunction: (args: {}) => void;
    export let actionTitle: string;

    let styleColor = ''

    onMount(() => {
        setColors();
    });

    function setColors() {
        if (!color) return;

        const darkColor = shadeColor(color, -20);
        const darkerColor = shadeColor(color, -40);
        const darkestColor = shadeColor(color, -60);

        const lightColor = shadeColor(color, 20);
        const lighterColor = shadeColor(color, 40);
        const lightestColor = shadeColor(color, 60);

        styleColor = `
            --var-color-tile: ${color};
            --var-dark-color-tile: ${darkColor};
            --var-darker-color-tile: ${darkerColor};
            --var-darkest-color-tile: ${darkestColor};
            --var-light-color-tile: ${lightColor};
            --var-lighter-color-tile: ${lighterColor};
            --var-lightest-color-tile: ${lightestColor};
        `;
    }

    function shadeColor(color: string, percent: number) {
        var R: number = parseInt(color.substring(1, 3), 16);
        var G: number = parseInt(color.substring(3, 5), 16);
        var B: number = parseInt(color.substring(5, 7), 16);

        //@ts-ignore
        R = parseInt((R * (100 + percent)) / 100);
        //@ts-ignore
        G = parseInt((G * (100 + percent)) / 100);
        //@ts-ignore
        B = parseInt((B * (100 + percent)) / 100);

        R = R < 255 ? R : 255;
        G = G < 255 ? G : 255;
        B = B < 255 ? B : 255;

        R = Math.round(R);
        G = Math.round(G);
        B = Math.round(B);

        var RR =
            R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
        var GG =
            G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
        var BB =
            B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

        return "#" + RR + GG + BB;
    }
</script>

<div style={`${styleColor}`} class="baseTile">
    <button on:click={ actionFunction({}) }>
        {actionTitle}
    </button>
</div>
