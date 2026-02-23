document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.querySelector(".main-terminal");
    const content = document.getElementById("content");

    // Variáveis de controle de rotação
    let isDragging = false;
    let currentRotationY = -25; // Começa na perspectiva que você gostou
    let currentRotationX = 10;
    let startX, startY;

    // --- FUNÇÕES DE MOVIMENTO ---

    const startDrag = (e) => {
        isDragging = true;
        // Pega posição inicial (Mouse ou Touch)
        startX = e.pageX || e.touches[0].pageX;
        startY = e.pageY || e.touches[0].pageY;
    };

    const stopDrag = () => {
        isDragging = false;
    };

    const doDrag = (e) => {
        if (!isDragging) return;

        const x = e.pageX || e.touches[0].pageX;
        const y = e.pageY || e.touches[0].pageY;

        // Calcula a distância movida
        const deltaX = x - startX;
        const deltaY = y - startY;

        // Atualiza os ângulos (ajuste o divisor 5 para mudar a velocidade do giro)
        currentRotationY += deltaX / 5;
        currentRotationX -= deltaY / 5; // Invertido para o natural do monitor

        // Aplica a rotação mantendo o centro
        terminal.style.transform = `translate(-50%, -50%) rotateY(${currentRotationY}deg) rotateX(${currentRotationX}deg)`;

        // Atualiza o ponto inicial para o próximo frame
        startX = x;
        startY = y;
    };

    // --- EVENTOS MOUSE ---
    terminal.addEventListener("mousedown", startDrag);
    window.addEventListener("mousemove", doDrag);
    window.addEventListener("mouseup", stopDrag);

    // --- EVENTOS TOUCH (MOBILE) ---
    terminal.addEventListener("touchstart", startDrag, { passive: false });
    window.addEventListener("touchmove", (e) => {
        if (isDragging) e.preventDefault(); // Impede o scroll da página ao girar
        doDrag(e);
    }, { passive: false });
    window.addEventListener("touchend", stopDrag);

    // Conteúdo Inicial
    if (content) {
        content.innerHTML = `
            <div style="color: #00d4ff; margin-bottom: 10px;">> MODO_INTERATIVO_360_ATIVO</div>
            <p>Clique e arraste o terminal para girar livremente.</p>
            <div style="margin-top:20px; color: #ff007a;">[ ALYSSON_FLP.SYS v2.6 ]</div>
        `;
    }
});

// Função de abas básica
function changeTab(tabName) {
    const content = document.getElementById("content");
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    if (event) event.currentTarget.classList.add('active');
    content.innerHTML = `<div style="color: #00d4ff;">> Acessando ${tabName}...</div>`;
}
