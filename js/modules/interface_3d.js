/**
 * interface_3d.js - Controla rotação e posição do monitor 3D
 */

import { state } from './state.js';

export function initInterface3D() {
    const terminal = document.querySelector(".main-terminal");
    if (!terminal) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;

    // Configuração inicial: monitor já com rotação e altura ajustada
    state.currentRotationY = 25; // rotação Y inicial
    state.currentRotationX = 10; // rotação X inicial
    const initialOffsetY = 0; // ajuste vertical inicial do monitor
    terminal.style.transform = `translate(-50%, -50%) translateY(${initialOffsetY}px) rotateY(${state.currentRotationY}deg) rotateX(${state.currentRotationX}deg)`;

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
        terminal.style.transition = "transform 0.5s cubic-bezier(0.23,1,0.32,1)";
        terminal.style.cursor = "grab";
    };

    const doDrag = (e) => {
        if (!isDragging) return;

        const x = e.pageX || (e.touches ? e.touches[0].pageX : 0);
        const y = e.pageY || (e.touches ? e.touches[0].pageY : 0);

        const deltaX = x - startX;
        const deltaY = y - startY;

        state.currentRotationY += deltaX / 5;
        state.currentRotationX -= deltaY / 5;

        // Constraints
        state.currentRotationY = Math.max(-80, Math.min(80, state.currentRotationY));
        state.currentRotationX = Math.max(-25, Math.min(25, state.currentRotationX));

        updateTransform(state.currentRotationY, state.currentRotationX);

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

    // Ajuste do dock para ficar rente à base do monitor
    const dock = document.getElementById('terminal-dock');
    if (dock) {
        const positionDock = () => {
            const rect = terminal.getBoundingClientRect();
            dock.style.position = 'absolute';
            dock.style.left = `${rect.left + rect.width / 2}px`;
            dock.style.top = `${rect.bottom + window.scrollY - 10}px`; // -10 para soldar rente
            dock.style.transform = 'translateX(-50%)';
        };
        positionDock();
        window.addEventListener('resize', positionDock);
    }
}
