/**
 * AxiomOS — Módulo de Interface 3D
 * Controla apenas rotação do monitor
 */

export function initInterface3D() {
    const terminal = document.querySelector(".main-terminal");
    if (!terminal) return;

    let isDragging = false;
    let rotationY = 25;
    let rotationX = 10;
    let startX = 0;
    let startY = 0;

    const updateTransform = (yDeg, xDeg) => {
        terminal.style.transform =
            `translate(-50%, -50%) rotateY(${yDeg}deg) rotateX(${xDeg}deg)`;
    };

    const startDrag = (e) => {
        isDragging = true;
        startX = e.pageX || e.touches?.[0].pageX || 0;
        startY = e.pageY || e.touches?.[0].pageY || 0;
        terminal.style.transition = "none";
        terminal.style.cursor = "grabbing";
    };

    const stopDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        terminal.style.transition =
            "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)";
        terminal.style.cursor = "grab";
    };

    const doDrag = (e) => {
        if (!isDragging) return;

        const x = e.pageX || e.touches?.[0].pageX || 0;
        const y = e.pageY || e.touches?.[0].pageY || 0;

        rotationY += (x - startX) / 5;
        rotationX -= (y - startY) / 5;

        rotationY = Math.max(-80, Math.min(80, rotationY));
        rotationX = Math.max(-25, Math.min(25, rotationX));

        updateTransform(rotationY, rotationX);

        startX = x;
        startY = y;
    };

    terminal.addEventListener("mousedown", startDrag);
    window.addEventListener("mousemove", doDrag);
    window.addEventListener("mouseup", stopDrag);

    terminal.addEventListener("touchstart", startDrag, { passive: false });
    window.addEventListener("touchmove", doDrag, { passive: false });
    window.addEventListener("touchend", stopDrag);

    updateTransform(rotationY, rotationX);
            }
