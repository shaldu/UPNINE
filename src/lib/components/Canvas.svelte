<script lang="ts">
    import { onMount } from "svelte";
    import Map from "./Map.svelte";

    let canvas: HTMLDivElement;
    let innerCanvas: HTMLDivElement;
    let middleMousePressed = false;

    let zoom = 1;
    let keyW = false,
        keyA = false,
        keyS = false,
        keyD = false;
    let movementIntervalVar;

    onMount(() => {
        canvas.addEventListener("mousedown", (e) => {
            if (e.button === 1) {
                middleMousePressed = true;
            }
        });

        canvas.addEventListener("mouseup", (e) => {
            if (e.button === 1) {
                middleMousePressed = false;
            }
        });

        //add on mouse move event listener
        canvas.addEventListener("mousemove", (e) => {
            if (middleMousePressed) {
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

        centerCanvas();
        movementInterval();
        zoomCanvas(zoom);
    });

    const zoomCanvasEvent = (e: WheelEvent) => {
        const maxZoom = 4;
        const minZoom = 0.2;
        const zoomSpeed = 0.1;

        if (e.deltaY < 0) {
            if (zoom < maxZoom) {
                zoom += zoomSpeed;
                zoomCanvas(zoom);
            }
        } else {
            if (zoom > minZoom) {
                zoom -= zoomSpeed;
                zoomCanvas(zoom);
            }
        }
    };

    function centerCanvas(){
        //move canvas to center
        innerCanvas.style.left = `${canvas.offsetWidth / 2 - innerCanvas.offsetWidth / 2}px`;
        innerCanvas.style.top = `${canvas.offsetHeight / 2 - innerCanvas.offsetHeight / 2}px`;
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

    function moveCanvas(valueX: number, valueY: number) {
        innerCanvas.style.left = `${innerCanvas.offsetLeft + valueX}px`;
        innerCanvas.style.top = `${innerCanvas.offsetTop + valueY}px`;
    }

    function zoomCanvas(value: number) {
        innerCanvas.style.transform = `scale(${value})`;
    }

</script>

<!-- svelte-ignore a11y-autofocus -->
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
        <Map />
    </div>
</div>
