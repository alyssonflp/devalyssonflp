export function initInterface3D() {
    const terminal = document.querySelector(".main-terminal");
    const dock = document.getElementById("terminal-dock");
    if (!terminal || !dock) return;

    let isDragging = false;
    let currentRotationY = 25;
    let currentRotationX = 10;
    let startX = 0;
    let startY = 0;

    // Altura inicial do monitor
    const initialTranslateY = -40;

    // Atualiza transform monitor
    const updateTransform = (rotY, rotX) => {
        terminal.style.transform = `
            translate(-50%, ${initialTranslateY}%) 
            rotateY(${rotY}deg) 
            rotateX(${rotX}deg)
        `;

        // Posiciona dock baseado no monitor
        const desktop = document.getElementById("desktop-3d");
        const monitorRect = terminal.getBoundingClientRect();
        const desktopRect = desktop.getBoundingClientRect();

        dock.style.position = "absolute";
        dock.style.left = `${monitorRect.left + monitorRect.width / 2}px`;
        dock.style.top = `${monitorRect.bottom + 5}px`; // 5px abaixo do monitor
        dock.style.transform = "translateX(-50%)"; // centraliza horizontal
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

        currentRotationY += deltaX / 5;
        currentRotationX -= deltaY / 5;

        if (currentRotationY > 80) currentRotationY = 80;
        if (currentRotationY < -80) currentRotationY = -80;
        if (currentRotationX > 25) currentRotationX = 25;
        if (currentRotationX < -25) currentRotationX = -25;

        updateTransform(currentRotationY, currentRotationX);

        startX = x;
        startY = y;
    };

    // Eventos mouse
    terminal.addEventListener("mousedown", startDrag);
    window.addEventListener("mousemove", doDrag);
    window.addEventListener("mouseup", stopDrag);

    // Eventos touch
    terminal.addEventListener("touchstart", startDrag, { passive: false });
    window.addEventListener("touchmove", (e) => {
        if (isDragging) {
            if (e.cancelable) e.preventDefault();
            doDrag(e);
        }
    }, { passive: false });
    window.addEventListener("touchend", stopDrag);

    // Inicializa transform
    updateTransform(currentRotationY, currentRotationX);
            }
