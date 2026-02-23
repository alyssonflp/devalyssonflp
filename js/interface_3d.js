/**
 * Módulo de Interface 3D
 * Gerencia a rotação e perspectiva do monitor
 */
export function initInterface3D() {
    const terminal = document.querySelector(".main-terminal");
    if (!terminal) return;

    // Estado inicial
    let isDragging = false;
    let currentRotationY = 25; 
    let currentRotationX = 10;
    let startX = 0;
    let startY = 0;

    // Função para aplicar a transformação de forma consistente
    const updateTransform = (xDeg, yDeg) => {
        terminal.style.transform = `translate(-50%, -50%) rotateY(${xDeg}deg) rotateX(${yDeg}deg)`;
    };

    const startDrag = (e) => {
        isDragging = true;
        // Captura posição inicial tanto de mouse quanto de touch
        startX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
        startY = e.pageY || (e.touches ? e.touches[0].pageY : 0);
        
        // Remove a transição para o movimento ser instantâneo ao rastro do mouse
        terminal.style.transition = "none";
        terminal.style.cursor = "grabbing";
    };

    const stopDrag = () => { 
        if (!isDragging) return;
        isDragging = false; 
        
        // Suaviza o retorno ou a parada
        terminal.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
        terminal.style.cursor = "grab";
    };

    const doDrag = (e) => {
        if (!isDragging) return;
        
        const x = e.pageX || (e.touches ? e.touches[0].pageX : 0);
        const y = e.pageY || (e.touches ? e.touches[0].pageY : 0);

        // Cálculo da distância percorrida
        const deltaX = x - startX;
        const deltaY = y - startY;

        // Sensibilidade (dividido por 5 para não girar rápido demais)
        currentRotationY += deltaX / 5;
        currentRotationX -= deltaY / 5;

        // Travas de segurança (Constraints)
        if (currentRotationY > 80) currentRotationY = 80;
        if (currentRotationY < -80) currentRotationY = -80;
        if (currentRotationX > 25) currentRotationX = 25;
        if (currentRotationX < -25) currentRotationX = -25;

        updateTransform(currentRotationY, currentRotationX);

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
        if (isDragging) {
            if (e.cancelable) e.preventDefault(); // Impede o scroll da página enquanto gira o monitor
            doDrag(e);
        }
    }, { passive: false });
    window.addEventListener("touchend", stopDrag);

    // Inicializa a posição padrão
    updateTransform(currentRotationY, currentRotationX);
}
