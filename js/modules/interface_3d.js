/**
 * axiomOS — Módulo Interface 3D
 * Gerencia rotação do monitor e posição do dock
 */

export function initInterface3D() {
    const terminal = document.querySelector(".main-terminal");
    const dock = document.getElementById("terminal-dock");
    if (!terminal) return;

    // Estado inicial do monitor
    let isDragging = false;
    let currentRotationY = 25;
    let currentRotationX = 10;
    let startX = 0;
    let startY = 0;

    // Atualiza a transformação do monitor e dock
    const updateTransform = (yDeg, xDeg) => {
        terminal.style.transform = `translate(-50%, -50%) rotateY(${yDeg}deg) rotateX(${xDeg}deg)`;
        if (dock) {
            // Dock acompanha a rotação (sutil)
            dock.style.transform = `translateX(-50%) translateZ(30px) rotateY(${yDeg}deg)`;
        }
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

        currentRotationY += deltaX / 5;
        currentRotationX -= deltaY / 5;

        // Limites de rotação
        currentRotationY = Math.min(80, Math.max(-80, currentRotationY));
        currentRotationX = Math.min(25, Math.max(-25, currentRotationX));

        updateTransform(currentRotationY, currentRotationX);

        startX = x;
        startY = y;
    };

    // Eventos de mouse
    terminal.addEventListener("mousedown", startDrag);
    window.addEventListener("mousemove", doDrag);
    window.addEventListener("mouseup", stopDrag);

    // Eventos touch (mobile/tablet)
    terminal.addEventListener("touchstart", startDrag, { passive: false });
    window.addEventListener("touchmove", (e) => {
        if (isDragging) {
            if (e.cancelable) e.preventDefault();
            doDrag(e);
        }
    }, { passive: false });
    window.addEventListener("touchend", stopDrag);

    // Inicializa posição padrão do monitor + dock
    updateTransform(currentRotationY, currentRotationX);
                             }
