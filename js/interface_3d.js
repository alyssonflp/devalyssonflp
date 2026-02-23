document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.querySelector(".main-terminal");
    
    // Injeta a estrutura interna se estiver vazio
    if (terminal && !terminal.querySelector(".terminal-content-wrapper")) {
        terminal.innerHTML = `<div class="terminal-content-wrapper" id="content"></div>`;
    }

    let isDragging = false;
    let currentRotationY = 25; // Sincronizado com a nova posição
    let currentRotationX = 10;
    let startX, startY;

    const startDrag = (e) => {
        isDragging = true;
        startX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
        startY = e.pageY || (e.touches ? e.touches[0].pageY : 0);
    };

    const stopDrag = () => { isDragging = false; };

    const doDrag = (e) => {
        if (!isDragging) return;
        
        const x = e.pageX || (e.touches ? e.touches[0].pageX : 0);
        const y = e.pageY || (e.touches ? e.touches[0].pageY : 0);

        let nextRotationY = currentRotationY + (x - startX) / 5;
        let nextRotationX = currentRotationX - (y - startY) / 5;

        // Limite de 180 graus no Y
        if (nextRotationY > 90) nextRotationY = 90;
        if (nextRotationY < -90) nextRotationY = -90;

        // Limite no X
        if (nextRotationX > 30) nextRotationX = 30;
        if (nextRotationX < -30) nextRotationX = -30;

        currentRotationY = nextRotationY;
        currentRotationX = nextRotationX;

        terminal.style.transform = `translate(-50%, -50%) rotateY(${currentRotationY}deg) rotateX(${currentRotationX}deg)`;

        startX = x;
        startY = y;
    };

    terminal.addEventListener("mousedown", startDrag);
    window.addEventListener("mousemove", doDrag);
    window.addEventListener("mouseup", stopDrag);

    terminal.addEventListener("touchstart", startDrag, { passive: false });
    window.addEventListener("touchmove", (e) => {
        if (isDragging) e.preventDefault();
        doDrag(e);
    }, { passive: false });
    window.addEventListener("touchend", stopDrag);
});
