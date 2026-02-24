// =====================================================
// 🖥 axiomOS — Interface 3D
// =====================================================
//
// Gerencia rotação do terminal 3D com mouse e toque.
//

import { OSState } from '../core/state.js';

export function init3D() {
    const terminal = document.querySelector(".main-terminal");
    if (!terminal) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;

    // Atualiza a transformação do monitor
    const updateTransform = (xDeg, yDeg) => {
        terminal.style.transform = `translate(-50%, -50%) rotateY(${xDeg}deg) rotateX(${yDeg}deg)`;
    };

    const startDrag = (e) => {
        isDragging = true;
        startX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
        startY = e.pageY || (e.touches ? e.touches[0].pageY : 0);
        terminal.style.transition = "none";
        terminal.style.cursor = "grabbing";
    };

    const stopDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        terminal.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
        terminal.style.cursor = "grab";
    };

    const doDrag = (e) => {
        if (!isDragging) return;
        const x = e.pageX || (e.touches ? e.touches[0].pageX : 0);
        const y = e.pageY || (e.touches ? e.touches[0].pageY : 0);

        const deltaX = x - startX;
        const deltaY = y - startY;

        OSState.currentRotationY += deltaX / 5;
        OSState.currentRotationX -= deltaY / 5;

        if (OSState.currentRotationY > 80) OSState.currentRotationY = 80;
        if (OSState.currentRotationY < -80) OSState.currentRotationY = -80;
        if (OSState.currentRotationX > 25) OSState.currentRotationX = 25;
        if (OSState.currentRotationX < -25) OSState.currentRotationX = -25;

        updateTransform(OSState.currentRotationY, OSState.currentRotationX);
        startX = x;
        startY = y;
    };

    // Eventos
    terminal.addEventListener("mousedown", startDrag);
    window.addEventListener("mousemove", doDrag);
    window.addEventListener("mouseup", stopDrag);

    terminal.addEventListener("touchstart", startDrag, { passive: false });
    window.addEventListener("touchmove", (e) => {
        if (isDragging) {
            if (e.cancelable) e.preventDefault();
            doDrag(e);
        }
    }, { passive: false });
    window.addEventListener("touchend", stopDrag);

    // Inicializa posição padrão
    updateTransform(OSState.currentRotationY, OSState.currentRotationX);
            }
