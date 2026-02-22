document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.querySelector(".main-terminal");
    const content = document.getElementById("content");

    // 1. Movimento 3D suave baseado no mouse
    document.addEventListener("mousemove", (e) => {
        if (!terminal) return;
        
        // Valores menores (80) para o movimento ser bem sutil e manter o alinhamento
        let xAxis = (window.innerWidth / 2 - e.pageX) / 80;
        let yAxis = (window.innerHeight / 2 - e.pageY) / 80;
        
        // Mantemos a base do CSS (-18deg Y e 10deg X) e somamos o movimento
        terminal.style.transform = `rotateY(${-18 + xAxis}deg) rotateX(${10 + yAxis}deg)`;
    });

    // 2. Conteúdo Inicial
    content.innerHTML = `
        <div style="color: #00d4ff; font-weight: bold; margin-bottom: 10px;">> hc:[ACERVO_DE_PROJETOS]</div>
        <div style="color: #fff;">> Sistema ALYSSON_FLP v2.6 ativo.</div>
        <div style="color: #fff;">> Aguardando entrada de dados...</div>
        <div style="margin-top: 20px; color: #ff007a;">[ ONLINE ] - Servidores de Curitiba conectados.</div>
    `;
});

// 3. Função de troca de abas
function changeTab(tabName) {
    const content = document.getElementById("content");
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    event.currentTarget.classList.add('active');

    if(tabName === 'sobre') {
        content.innerHTML = `<div style="color: #00d4ff;">> hc:[SOBRE_MIM]</div><p>Desenvolvedor focado em experiências imersivas e sistemas de alto desempenho.</p>`;
    } else if(tabName === 'stack') {
        content.innerHTML = `<div style="color: #00d4ff;">> hc:[STACK]</div><p>JavaScript, Node.js, React, CSS 3D e Automação.</p>`;
    } else {
        content.innerHTML = `<div style="color: #00d4ff;">> hc:[ACERVO]</div><p>> API_COMMERCE: Online<br>> DASHBOARD_FIN: Online</p>`;
    }
}
