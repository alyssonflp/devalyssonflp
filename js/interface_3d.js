document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.querySelector(".main-terminal");
    const content = document.getElementById("content");

    document.addEventListener("mousemove", (e) => {
        if (!terminal || window.innerWidth < 1000) return;
        
        // Sensibilidade sutil
        let xAxis = (window.innerWidth / 2 - e.pageX) / 75;
        let yAxis = (window.innerHeight / 2 - e.pageY) / 75;
        
        // Base de 15deg (Direita) e 6deg (Inclinação)
        terminal.style.transform = `translate(-50%, -50%) rotateY(${15 + xAxis}deg) rotateX(${6 + yAxis}deg)`;
    });

    if (content) {
        content.innerHTML = `
            <div style="color: #00d4ff; font-weight: bold; margin-bottom: 10px;">> hc:[SISTEMA_ONLINE]</div>
            <div style="color: #fff;">> Alysson_FLP v2.6 em perspectiva real.</div>
            <div style="color: #ff007a; margin-top: 10px;">[ SELECIONE UMA ABA ACIMA ]</div>
        `;
    }
});

function changeTab(tabName) {
    const content = document.getElementById("content");
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    if (event && event.currentTarget) event.currentTarget.classList.add('active');

    content.innerHTML = `<div style="color: rgba(255,255,255,0.3)">> Acessando...</div>`;

    setTimeout(() => {
        if (tabName === 'sobre') {
            content.innerHTML = `<div style="color: #00d4ff;">> hc:[SOBRE]</div><p>Dev FullStack focado em UI/UX futurista.</p>`;
        } else if (tabName === 'stack') {
            content.innerHTML = `<div style="color: #00d4ff;">> hc:[STACK]</div><p>React, Node, CSS 3D, WebP 4K.</p>`;
        } else {
            content.innerHTML = `<div style="color: #00d4ff;">> hc:[ACERVO]</div><p>Projetos e APIs carregados com sucesso.</p>`;
        }
    }, 150);
}
