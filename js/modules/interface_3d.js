/**
 * interface_3d.js
 * Módulo de Interface 3D - axiomOS
 *
 * Gerencia a rotação, posição e perspectiva do monitor,
 * terminal interno e dock.
 */

export function initInterface3D() {
    const terminal = document.querySelector(".main-terminal");
    const dock = document.getElementById("terminal-dock");
    if (!terminal) return;

    // Estado inicial
    let isDragging = false;
    let currentRotationY = 25;  // Rotação inicial horizontal
    let currentRotationX = 10;  // Rotação inicial vertical
    let startX = 0;
    let startY = 0;

    // Altura inicial do monitor e dock
    const initialTranslateY = -40; // Ajuste vertical do monitor
    const dockOffsetY = 28; // Offset para dock rente à base

    // Aplica transform do monitor
    const updateTransform = (rotY, rotX) => {
        terminal.style.transform = `
            translate(-50%, ${initialTranslateY}%) 
            rotateY(${rotY}deg) 
            rotateX(${rotX}deg)
        `;

        if (dock) {
            // Posiciona dock na base do monitor
            const monitorHeight = terminal.offsetHeight || 400;
            dock.style.bottom = `${dockOffsetY}px`;
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
        if (currentRotationY > 80) currentRotationY = 80;
        if (currentRotationY < -80) currentRotationY = -80;
        if (currentRotationX > 25) currentRotationX = 25;
        if (currentRotationX < -25) currentRotationX = -25;

        updateTransform(currentRotationY, currentRotationX);

        startX = x;
        startY = y;
    };

    // Eventos de mouse
    terminal.addEventListener("mousedown", startDrag);
    window.addEventListener("mousemove", doDrag);
    window.addEventListener("mouseup", stopDrag);

    // Eventos de touch
    terminal.addEventListener("touchstart", startDrag, { passive: false });
    window.addEventListener("touchmove", (e) => {
        if (isDragging) {
            if (e.cancelable) e.preventDefault();
            doDrag(e);
        }
    }, { passive: false });
    window.addEventListener("touchend", stopDrag);

    // Inicializa posição padrão
    updateTransform(currentRotationY, currentRotationX);

    // Força dock ficar sempre visível e rente à base
    if (dock) {
        dock.style.position = "absolute";
        dock.style.left = "50%";
        dock.style.transform = "translateX(-50%)";
        dock.style.opacity = "1";
        dock.style.pointerEvents = "all";
    }
                              }
