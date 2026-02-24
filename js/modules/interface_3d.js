/**
 * =====================================================
 * AxiomOS — Módulo de Interface 3D
 * =====================================================
 *
 * Gerencia a rotação, altura e posição do monitor principal,
 * além de posicionar o dock rente à base do monitor.
 *
 * Compatível Desktop + Mobile (touch).
 */

export function initInterface3D() {
    const terminal = document.querySelector(".main-terminal");
    const dock = document.getElementById("terminal-dock");
    if (!terminal || !dock) return;

    // === Estado inicial do monitor ===
    let isDragging = false;
    let currentRotationY = 25; // posição inicial Y (logo no boot)
    let currentRotationX = 10; // posição inicial X (logo no boot)
    let startX = 0;
    let startY = 0;

    // === Função para atualizar transformação do monitor ===
    const updateTransform = (xDeg, yDeg) => {
        terminal.style.transform = `translate(-50%, -50%) rotateY(${xDeg}deg) rotateX(${yDeg}deg)`;
    };

    // === Função para atualizar posição do dock ===
    const updateDockPosition = () => {
        const rect = terminal.getBoundingClientRect();

        // Posiciona o dock rente à base do monitor
        dock.style.position = "absolute";
        dock.style.top = `${rect.bottom - 5}px`; // 5px acima da base
        dock.style.left = `${rect.left + rect.width / 2}px`;
        dock.style.transform = "translateX(-50%)";
        dock.style.zIndex = 9999;
    };

    // Inicializa dock na posição correta
    updateDockPosition();

    // === Drag / Rotação ===
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

        currentRotationY += deltaX / 5; // sensibilidade
        currentRotationX -= deltaY / 5;

        // Travas
        if (currentRotationY > 80) currentRotationY = 80;
        if (currentRotationY < -80) currentRotationY = -80;
        if (currentRotationX > 25) currentRotationX = 25;
        if (currentRotationX < -25) currentRotationX = -25;

        updateTransform(currentRotationY, currentRotationX);

        startX = x;
        startY = y;

        // Atualiza dock enquanto arrasta
        updateDockPosition();
    };

    // === Eventos Desktop ===
    terminal.addEventListener("mousedown", startDrag);
    window.addEventListener("mousemove", doDrag);
    window.addEventListener("mouseup", stopDrag);

    // === Eventos Mobile / Touch ===
    terminal.addEventListener("touchstart", startDrag, { passive: false });
    window.addEventListener("touchmove", (e) => {
        if (isDragging) {
            if (e.cancelable) e.preventDefault();
            doDrag(e);
        }
    }, { passive: false });
    window.addEventListener("touchend", stopDrag);

    // === Inicializa transformações iniciais ===
    updateTransform(currentRotationY, currentRotationX);
    updateDockPosition();

    // === Observador de resize para manter dock alinhado ===
    window.addEventListener("resize", updateDockPosition);

    console.log("🎨 Interface 3D inicializada e dock posicionado rente ao monitor.");
        }
