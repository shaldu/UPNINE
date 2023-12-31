<script lang="ts">
    import { onMount } from "svelte";
    import Game from "$game/game";
    import { MAP_SIZE, TILE_SIZE } from "$game/config";

    let canvas: HTMLDivElement;
    let innerCanvas: HTMLDivElement;
    let uiElement: HTMLDivElement;

    let rightClickPress = false;

    let zoom = 1;
    let keyW = false,
        keyA = false,
        keyS = false,
        keyD = false;
    let movementIntervalVar;

    let game: Game;
    let mousePosition = [0, 0];

    onMount(() => {
        innerCanvas = innerCanvas.querySelector(
            ".position-absolute"
        ) as HTMLDivElement;
        window.addEventListener("contextmenu", (e) => e.preventDefault());

        canvas.addEventListener("mousemove", (e) => {
            mousePosition = [e.clientX, e.clientY];
        });

        canvas.addEventListener("mousedown", (e) => {
            if (e.button === 2) {
                e.preventDefault();
                rightClickPress = true;
            }
        });

        canvas.addEventListener("mouseup", (e) => {
            if (e.button === 2) {
                e.preventDefault();
                rightClickPress = false;
            }
        });

        //add on mouse move event listener
        canvas.addEventListener("mousemove", (e) => {
            if (rightClickPress) {
                moveCanvas(e.movementX, e.movementY);
            }
        });

        function movementInterval() {
            movementIntervalVar = setInterval(() => {
                const speed = 8;

                let movementX = 0;
                let movementY = 0;

                if (keyW) {
                    movementY += speed;
                }
                if (keyA) {
                    movementX += speed;
                }
                if (keyS) {
                    movementY -= speed;
                }
                if (keyD) {
                    movementX -= speed;
                }
                //fix diagonal speed
                if (movementX !== 0 && movementY !== 0) {
                    movementX /= 1.414;
                    movementY /= 1.414;
                }

                moveCanvas(movementX, movementY);
            }, 10);
        }

        game = new Game(innerCanvas, uiElement);

        zoomCanvas(0.4);
        centerCanvas();
        movementInterval();
    });

    const zoomCanvasEvent = (e: WheelEvent) => {

        let noZoom = false;
        let element = e.target as HTMLElement | null;
        for (let i = 0; i < 8; i++) {
            if (!element) {
                break;
            }
            if (element.classList.contains("no-zoom")) {
                noZoom = true;
                break;
            }
            element = element.parentElement;
        }
        
        if (noZoom) return;
        

        const maxZoom = 4;
        const minZoom = 0.2;
        const zoomSpeed = 0.1;

        if (e.deltaY < 0) {
            if (zoom < maxZoom) {
                zoom += zoomSpeed;
            }
        } else {
            if (zoom > minZoom) {
                zoom -= zoomSpeed;
            }
        }

        const scale = zoom;

        //TODO: fix zooming
        zoomCanvas(scale);
    };

    function zoomCanvas(scale: number) {
        innerCanvas.style.transform = `scale(${scale})`;
    }

    function moveCanvas(valueX: number, valueY: number) {
        if (innerCanvas) {
            innerCanvas.style.left = `${innerCanvas.offsetLeft + valueX}px`;
            innerCanvas.style.top = `${innerCanvas.offsetTop + valueY}px`;
        }
    }

    function centerCanvas() {
        //move canvas to center
        innerCanvas.style.left = `${
            canvas.offsetWidth / 2 - innerCanvas.offsetWidth / 2
        }px`;
        innerCanvas.style.top = `${
            canvas.offsetHeight / 2 - innerCanvas.offsetHeight / 2
        }px`;
    }

    const keyMovementDown = (e: KeyboardEvent) => {
        switch (e.key) {
            case "w":
                keyW = true;
                break;
            case "a":
                keyA = true;
                break;
            case "s":
                keyS = true;
                break;
            case "d":
                keyD = true;
                break;
        }
    };

    const keyMovementUp = (e: KeyboardEvent) => {
        switch (e.key) {
            case "w":
                keyW = false;
                break;
            case "a":
                keyA = false;
                break;
            case "s":
                keyS = false;
                break;
            case "d":
                keyD = false;
                break;
        }
    };
</script>

<!-- svelte-ignore a11y-autofocus -->
<div id="ui" bind:this={uiElement}>

</div>
<div
    id="canvas"
    tabindex="-1"
    autofocus
    role="button"
    on:keydown={keyMovementDown}
    on:keyup={keyMovementUp}
    on:wheel={zoomCanvasEvent}
    bind:this={canvas}
>
    <div id="inner-canvas" bind:this={innerCanvas}>
        <div
            class="position-absolute"
            style={`
            grid-template-columns: repeat(${MAP_SIZE}, ${TILE_SIZE}px);
            grid-template-rows: repeat(${MAP_SIZE}, ${TILE_SIZE}px);
        `}
        />
    </div>
</div>
