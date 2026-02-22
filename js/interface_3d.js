document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.querySelector(".main-terminal");
    const content = document.getElementById("content");

    // 1. Efeito de Movimento 3D (Mouse Move)
    // Ajustado para manter o terminal centralizado com o novo CSS
    document.addEventListener("mousemove", (e) => {
        if (!terminal || window.innerWidth < 1000) return; // Desativa em mobile para não bugar
        
        // Cálculo de sensibilidade (divisor maior = movimento mais sutil)
        let xAxis = (window.innerWidth / 2 - e.pageX) / 70;
        let yAxis = (window.innerHeight / 2 - e.pageY) / 70;
        
        /**
         * IMPORTANTE: Mantemos o translate(-50%, -50%) para o terminal não fugir do centro.
         * Somamos a inclinação base (-15deg e 7deg) aos valores do rato.
         */
        terminal.style.transform = `translate(-50%, -50%) rotateY(${-15 + xAxis}deg) rotateX(${7 + yAxis}deg)`;
    });

    // 2. Conteúdo Inicial do Terminal
    if (content) {
        content.innerHTML = `
            <div style="color: #00d4ff; font-weight: bold; margin-bottom: 10px;">> hc:[SISTEMA_INICIADO]</div>
            <div style="color: #fff; margin-bottom: 5px;">> Alysson_FLP OS v2.6 detectado...</div>
            <div style="color: #fff; margin-bottom: 5px;">> Fundo 4K WebP renderizado com sucesso.</div>
            <div style="color: #ff007a; margin-top: 15px;">[ STATUS: AGUARDANDO COMANDO ]</div>
        `;
    }

    // 3. Simulação de Latência no Rodapé
    setInterval(() => {
        const latencyElement = document.getElementById("latency");
        if (latencyElement) {
            const fakeLatency = Math.floor(Math.random() * 12) + 18;
            latencyElement.innerText = `LATENCY: ${fakeLatency}ms`;
        }
    }, 3000);
});

// 4. Lógica de Troca de Abas (Global para o index.html aceder)
function changeTab(tabName) {
    const content = document.getElementById("content");
    
    // Atualiza classes dos botões
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    // Efeito de "limpeza" antes de trocar o texto
    content.innerHTML = `<div style="color: rgba(255,255,255,0.3)">> Carregando...</div>`;

    setTimeout(() => {
        if (tabName === 'sobre') {
            content.innerHTML = `
                <div style="color: #00d4ff;">> hc:[SOBRE_MIM]</div>
                <p style="margin-top:10px;">Desenvolvedor FullStack focado em criar interfaces que parecem vir do futuro.</p>
                <p>Especialista em transformar designs complexos em código limpo.</p>
            `;
        } else if (tabName === 'stack') {
            content.innerHTML = `
                <div style="color: #00d4ff;">> hc:[STACK_TECNOLOGICO]</div>
                <ul style="list-style: none; margin-top:10px; padding:0;">
                    <li>- JavaScript (ES6+)</li>
                    <li>- React / Next.js</li>
                    <li>- Node.js / Express</li>
                    <li>- CSS 3D & Animations</li>
                </ul>
            `;
        } else {
            content.innerHTML = `
                <div style="color: #00d4ff;">> hc:[ACERVO_DE_PROJETOS]</div>
                <div style="margin-top:10px;">
                    <span style="color: #00ff00;">[OK]</span> API_COMMERCE v1.0<br>
                    <span style="color: #00ff00;">[OK]</span> DASHBOARD_FINANCEIRO<br>
                    <span style="color: #ff007a;">[EM CURSO]</span> INTERFACE_HOLOGRAFICA
                </div>
            `;
        }
    }, 200);
}
