// =====================================================
// axiomOS — Módulo de Interface 3D
// Gerencia rotação e posição do monitor principal
// =====================================================

import { state } from '../core/state.js';

export function initInterface3D() {
    const terminal = document.querySelector(".main-terminal");
    if (!terminal) return;

    // Estado inicial baseado no boot antigo
    // Antes do boot: rotateY(25deg) e rotateX(10deg)
    state.currentRotationY = 25;
    state.currentRotationX = 10;

    // Variáveis de controle do drag
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    // Função que aplica a rotação atual ao monitor
    const updateTransform = (yDeg, xDeg) => {
        terminal.style.transform = `translate(-50%, -50%) rotateY(${yDeg}deg) rotateX(${xDeg}deg)`;
    };

    // Inicializa a posição do monitor
    updateTransform(state.currentRotationY, state.currentRotationX);

    // Início do drag (mouse ou touch)
    const startDrag = (e) => {
        isDragging = true;
        startX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
        startY = e.pageY || (e.touches ? e.touches[0].pageY : 0);

        terminal.style.transition = "none"; // Remove transição suave para movimento instantâneo
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

        // Sensibilidade reduzida para mobile e desktop
        state.currentRotationY += deltaX / 5;
        state.currentRotationX -= deltaY / 5;

        // Limites para evitar rotações exageradas
        if (state.currentRotationY > 80) state.currentRotationY = 80;
        if (state.currentRotationY < -80) state.currentRotationY = -80;
        if (state.currentRotationX > 25) state.currentRotationX = 25;
        if (state.currentRotationX < -25) state.currentRotationX = -25;

        updateTransform(state.currentRotationY, state.currentRotationX);

        startX = x;
        startY = y;
    };

    // Eventos de mouse
    terminal.addEventListener("mousedown", startDrag);
    window.addEventListener("mousemove", doDrag);
    window.addEventListener("mouseup", stopDrag);

    // Eventos de toque (mobile)
    terminal.addEventListener("touchstart", startDrag, { passive: false });
    window.addEventListener("touchmove", (e) => {
        if (isDragging) {
            if (e.cancelable) e.preventDefault(); // Bloqueia scroll enquanto arrasta
            doDrag(e);
        }
    }, { passive: false });
    window.addEventListener("touchend", stopDrag);
    }
