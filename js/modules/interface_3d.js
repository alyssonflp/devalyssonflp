/**
 * AxiomOS — Módulo de Interface 3D + Dock
 * Gerencia rotação do monitor e posição do dock inferior
 */

export function initInterface3D() {
    const terminal = document.querySelector(".main-terminal");
    const dock = document.getElementById("terminal-dock");
    if (!terminal || !dock) return;

    // --- Estado inicial ---
    let isDragging = false;
    let rotationY = 25; // posição inicial no boot
    let rotationX = 10;
    let startX = 0;
    let startY = 0;

    // Aplica transformação 3D no monitor
    const updateTransform = (yDeg, xDeg) => {
        terminal.style.transform = `translate(-50%, -50%) rotateY(${yDeg}deg) rotateX(${xDeg}deg)`;
        // Mantém o dock sempre na base do monitor
        const rect = terminal.getBoundingClientRect();
        dock.style.top = `${rect.bottom - terminal.offsetParent.getBoundingClientRect().top}px`;
    };

    // --- Drag com mouse ---
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
        rotationY += (x - startX) / 5;
        rotationX -= (y - startY) / 5;

        // Limites de rotação
        rotationY = Math.max(-80, Math.min(80, rotationY));
        rotationX = Math.max(-25, Math.min(25, rotationX));

        updateTransform(rotationY, rotationX);

        startX = x;
        startY = y;
    };

    // --- Eventos ---
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

    // --- Inicializa posição padrão ---
    updateTransform(rotationY, rotationX);

    // --- Dock inicial ---
    dock.style.position = "absolute";
    dock.style.left = "50%";
    dock.style.transform = "translateX(-50%) translateZ(30px)";
    dock.style.opacity = "1";
            }
