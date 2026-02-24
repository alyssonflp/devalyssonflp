// =====================================================
// axiomOS — Módulo Interface 3D
// =====================================================

// Seleção do terminal principal
const terminal = document.querySelector(".main-terminal");
if (!terminal) throw new Error("Terminal não encontrado");

// Estado inicial
let isDragging = false;
let currentRotationY = 25; // rotação Y inicial padrão
let currentRotationX = 10; // rotação X inicial padrão
let startX = 0;
let startY = 0;

// Altura inicial do terminal (CSS) usada apenas para referência
const initialTranslateY = -50; // translateY(-50%) do CSS, mantém centralizado

/**
 * Atualiza a transformação do terminal
 * @param {number} rotY Rotação em Y
 * @param {number} rotX Rotação em X
 */
const updateTransform = (rotY, rotX) => {
    terminal.style.transform = `
        translate(-50%, ${initialTranslateY}%)
        rotateY(${rotY}deg)
        rotateX(${rotX}deg)
    `;
};

/**
 * Início do arraste (mouse ou touch)
 */
const startDrag = (e) => {
    isDragging = true;
    startX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
    startY = e.pageY || (e.touches ? e.touches[0].pageY : 0);
    terminal.style.transition = "none";
    terminal.style.cursor = "grabbing";
};

/**
 * Finaliza arraste
 */
const stopDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    terminal.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
    terminal.style.cursor = "grab";
};

/**
 * Movimento do terminal
 */
const doDrag = (e) => {
    if (!isDragging) return;

    const x = e.pageX || (e.touches ? e.touches[0].pageX : 0);
    const y = e.pageY || (e.touches ? e.touches[0].pageY : 0);

    const deltaX = x - startX;
    const deltaY = y - startY;

    // Sensibilidade ajustável
    currentRotationY += deltaX / 5;
    currentRotationX -= deltaY / 5;

    // Limites de rotação
    currentRotationY = Math.max(-80, Math.min(80, currentRotationY));
    currentRotationX = Math.max(-25, Math.min(25, currentRotationX));

    updateTransform(currentRotationY, currentRotationX);

    startX = x;
    startY = y;
};

// ===============================
// Eventos Mouse
// ===============================
terminal.addEventListener("mousedown", startDrag);
window.addEventListener("mousemove", doDrag);
window.addEventListener("mouseup", stopDrag);

// ===============================
// Eventos Touch (Mobile/Tablet)
// ===============================
terminal.addEventListener("touchstart", startDrag, { passive: false });
window.addEventListener("touchmove", (e) => {
    if (isDragging) {
        if (e.cancelable) e.preventDefault();
        doDrag(e);
    }
}, { passive: false });
window.addEventListener("touchend", stopDrag);

// ===============================
// Inicializa a posição padrão do terminal
// ===============================
updateTransform(currentRotationY, currentRotationX);

// ===============================
// Dock agora é totalmente controlado pelo CSS
// ===============================
// NÃO é necessário mexer em top/left via JS
// Apenas certifique-se que o CSS do #terminal-dock esteja correto
// ===============================
