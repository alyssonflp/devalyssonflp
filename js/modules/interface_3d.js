// =====================================================
// axiomOS - Interface 3D
// =====================================================
//
// Controla a rotação 3D do monitor principal.
//

import { state } from '../core/state.js';

export function initInterface3D() {
  const terminal = document.querySelector(".main-terminal");
  if (!terminal) return;

  let isDragging = false, startX = 0, startY = 0;

  const updateTransform = (y, x) => {
    terminal.style.transform = `translate(-50%, -50%) rotateY(${y}deg) rotateX(${x}deg)`;
  };

  const startDrag = (e) => {
    isDragging = true;
    startX = e.pageX || (e.touches?.[0].pageX ?? 0);
    startY = e.pageY || (e.touches?.[0].pageY ?? 0);
    terminal.style.transition = "none";
    terminal.style.cursor = "grabbing";
  };

  const stopDrag = () => {
    isDragging = false;
    terminal.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
    terminal.style.cursor = "grab";
  };

  const doDrag = (e) => {
    if (!isDragging) return;
    const x = e.pageX || (e.touches?.[0].pageX ?? 0);
    const y = e.pageY || (e.touches?.[0].pageY ?? 0);

    const deltaX = x - startX, deltaY = y - startY;

    state.currentRotationY += deltaX / 5;
    state.currentRotationX -= deltaY / 5;

    state.currentRotationY = Math.max(-80, Math.min(80, state.currentRotationY));
    state.currentRotationX = Math.max(-25, Math.min(25, state.currentRotationX));

    updateTransform(state.currentRotationY, state.currentRotationX);

    startX = x;
    startY = y;
  };

  // Eventos Mouse e Touch
  terminal.addEventListener("mousedown", startDrag);
  window.addEventListener("mousemove", doDrag);
  window.addEventListener("mouseup", stopDrag);

  terminal.addEventListener("touchstart", startDrag, { passive: false });
  window.addEventListener("touchmove", (e) => { if(isDragging) { if(e.cancelable) e.preventDefault(); doDrag(e); }}, { passive: false });
  window.addEventListener("touchend", stopDrag);

  // Posição inicial
  updateTransform(state.currentRotationY, state.currentRotationX);
                            }
