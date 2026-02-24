// js/modules/interface_3d.js

// 🖥️ Responsável SOMENTE pela rotação 3D do monitor

import { setRotationY } from '../core/state.js';

let rotationY = 0;
const monitor = document.querySelector('.main-terminal');

export function init3D() {

    if (!monitor) return;

    let isDragging = false;
    let startX = 0;

    monitor.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    document.addEventListener('mousemove', (e) => {

        if (!isDragging) return;

        const delta = e.clientX - startX;
        rotationY += delta * 0.2;

        monitor.style.transform = `rotateY(${rotationY}deg)`;

        // Atualiza estado global
        setRotationY(rotationY);

        startX = e.clientX;
    });
}
