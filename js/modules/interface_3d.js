// =====================================================
// axiomOS — Módulo Interface 3D
// Gerencia rotação do monitor e posição do dock
// =====================================================

export function initInterface3D() {

    const terminal = document.querySelector(".main-terminal");
    const dock = document.getElementById("terminal-dock");
    if (!terminal) return;

    // ===============================
    // Estado inicial do monitor
    // ===============================
    let isDragging = false;
    let currentRotationY = 25; // posição inicial do boot antigo
    let currentRotationX = 10; // posição inicial do boot antigo
    let startX = 0;
    let startY = 0;

    const initialTranslateY = -50; // para centralizar verticalmente

    // ===============================
    // Função que atualiza posição do terminal e dock
    // ===============================
    const updateTransform = (rotY, rotX) => {
        // Rotação 3D do terminal
        terminal.style.transform = `
            translate(-50%, ${initialTranslateY}%) 
            rotateY(${rotY}deg) 
            rotateX(${rotX}deg)
        `;

        // ===============================
        // Dock “soldado” à base do terminal
        // ===============================
        if (dock) {
            const termRect = terminal.getBoundingClientRect();
            dock.style.position = "absolute";
            dock.style.left = `${termRect.left + termRect.width / 2}px`;
            dock.style.top = `${termRect.top + termRect.height - 8}px`; // ligeiramente sobreposto
            dock.style.transform = "translateX(-50%)";
        }
    };

    // ===============================
    // Início do arraste
    // ===============================
    const startDrag = (e) => {
        isDragging = true;
        startX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
        startY = e.pageY || (e.touches ? e.touches[0].pageY : 0);
        terminal.style.transition = "none";
        terminal.style.cursor = "grabbing";
    };

    // ===============================
    // Fim do arraste
    // ===============================
    const stopDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        terminal.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
        terminal.style.cursor = "grab";
    };

    // ===============================
    // Executa arraste
    // ===============================
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

    // ===============================
    // Eventos de Mouse
    // ===============================
    terminal.addEventListener("mousedown", startDrag);
    window.addEventListener("mousemove", doDrag);
    window.addEventListener("mouseup", stopDrag);

    // ===============================
    // Eventos de Touch (Mobile/Tablet)
    // ===============================
    terminal.addEventListener("touchstart", startDrag, { passive: false });
    window.addEventListener("touchmove", (e) => {
        if (isDragging) {
            if (e.cancelable) e.preventDefault(); // impede scroll
            doDrag(e);
        }
    }, { passive: false });
    window.addEventListener("touchend", stopDrag);

    // ===============================
    // Inicializa posição padrão
    // ===============================
    updateTransform(currentRotationY, currentRotationX);
            }
