document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.querySelector(".main-terminal");
    const content = document.getElementById("content");

    const handleMove = (x, y) => {
        if (!terminal) return;
        
        // Ajuste de sensibilidade
        const isMobile = window.innerWidth < 1000;
        const baseRY = isMobile ? -20 : -28; // Base da perspectiva
        const baseRX = isMobile ? 8 : 12;
        const divisor = isMobile ? 60 : 100;

        let rotateY = baseRY + (window.innerWidth / 2 - x) / divisor;
        let rotateX = baseRX + (window.innerHeight / 2 - y) / divisor;

        terminal.style.transform = `translate(-50%, -50%) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    };

    // PC
    document.addEventListener("mousemove", (e) => handleMove(e.pageX, e.pageY));

    // Mobile
    document.addEventListener("touchmove", (e) => {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    // Conteúdo igual ao da imagem de exemplo
    if (content) {
        content.innerHTML = `
            <div style="color: #00d4ff; margin-bottom: 15px;">hc:[ACERVO_DE_PROJETOS]></div>
            <div style="padding-left: 15px; border-left: 1px solid rgba(0,212,255,0.2);">
                <div style="color: #fff; margin-bottom: 10px;">> API_COMMERCE: <span style="color: #ff007a;">Online</span></div>
                <div style="color: #fff; margin-bottom: 10px;">> DASHBOARD_FIN: <span style="color: #ff007a;">Online</span></div>
                <div style="color: #00d4ff; font-size: 0.8rem; margin-top: 20px;">[ Sincronizado com GitHub_Logs ]</div>
            </div>
        `;
    }
});
