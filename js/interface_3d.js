document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.querySelector(".main-terminal");
    
    // Injeta apenas o wrapper de vidro vazio
    terminal.innerHTML = `<div class="terminal-content-wrapper" id="content"></div>`;

    let isDragging = false;
    let currentRotationY = -25; // Ângulo inicial
    let currentRotationX = 10;
    let startX, startY;

    const startDrag = (e) => {
        isDragging = true;
        startX = e.pageX || e.touches[0].pageX;
        startY = e.pageY || e.touches[0].pageY;
    };

    const stopDrag = () => isDragging = false;

    const doDrag = (e) => {
        if (!isDragging) return;
        
        const x = e.pageX || e.touches[0].pageX;
        const y = e.pageY || e.touches[0].pageY;

        // Sensibilidade do giro
        let nextRotationY = currentRotationY + (x - startX) / 5;
        let nextRotationX = currentRotationX - (y - startY) / 5;

        // --- LIMITE DE 180 GRAUS (Eixo Y) ---
        // Impede que o monitor vire totalmente de costas
        if (nextRotationY > 90) nextRotationY = 90;
        if (nextRotationY < -90) nextRotationY = -90;

        // Limite Vertical (Eixo X) para não tombar demais
        if (nextRotationX > 35) nextRotationX = 35;
        if (nextRotationX < -35) nextRotationX = -35;

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

    // Eventos de Touch (Mobile)
    terminal.addEventListener("touchstart", startDrag, { passive: false });
    window.addEventListener("touchmove", (e) => {
        if (isDragging) e.preventDefault();
        doDrag(e);
    }, { passive: false });
    window.addEventListener("touchend", stopDrag);
});
