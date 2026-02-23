/**
 * Módulo de Interface 3D
 * Gerencia a rotação e perspectiva do monitor
 */
export function initInterface3D() {
    const terminal = document.querySelector(".main-terminal");
    if (!terminal) return;

    let isDragging = false;
    let currentRotationY = 25; 
    let currentRotationX = 10;
    let startX, startY;

    const startDrag = (e) => {
        isDragging = true;
        startX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
        startY = e.pageY || (e.touches ? e.touches[0].pageY : 0);
        terminal.style.transition = "none"; // Remove transição durante o arrasto para ficar fluido
    };

    const stopDrag = () => { 
        isDragging = false; 
        terminal.style.transition = "transform 0.1s ease-out";
    };

    const doDrag = (e) => {
        if (!isDragging) return;
        
        const x = e.pageX || (e.touches ? e.touches[0].pageX : 0);
        const y = e.pageY || (e.touches ? e.touches[0].pageY : 0);

        let nextRotationY = currentRotationY + (x - startX) / 5;
        let nextRotationX = currentRotationX - (y - startY) / 5;

        // Limites de segurança para não "quebrar" a perspectiva
        if (nextRotationY > 90) nextRotationY = 90;
        if (nextRotationY < -90) nextRotationY = -90;
        if (nextRotationX > 30) nextRotationX = 30;
        if (nextRotationX < -30) nextRotationX = -30;

        currentRotationY = nextRotationY;
        currentRotationX = nextRotationX;

        terminal.style.transform = `translate(-50%, -50%) rotateY(${currentRotationY}deg) rotateX(${currentRotationX}deg)`;

        startX = x;
        startY = y;
    };

    // Eventos de Mouse
    terminal.addEventListener("mousedown", startDrag);
    window.addEventListener("mousemove", doDrag);
    window.addEventListener("mouseup", stopDrag);

    // Eventos de Toque (Mobile)
    terminal.addEventListener("touchstart", startDrag, { passive: false });
    window.addEventListener("touchmove", (e) => {
        if (isDragging) e.preventDefault();
        doDrag(e);
    }, { passive: false });
    window.addEventListener("touchend", stopDrag);
}
