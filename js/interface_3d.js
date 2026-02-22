// Aguarda o sinal do sistema (vindo da intro.js)
window.addEventListener('system-ready', () => {
    init3DTerminal();
});

function init3DTerminal() {
    const terminal = document.querySelector('.main-terminal');

    // Efeito de acompanhamento do mouse
    document.addEventListener('mousemove', (e) => {
        let xAxis = (window.innerWidth / 2 - e.pageX) / 70;
        let yAxis = (window.innerHeight / 2 - e.pageY) / 70;

        // Mantém a inclinação base e adiciona o movimento suave
        terminal.style.transform = `rotateY(${-18 + xAxis}deg) rotateX(${8 + yAxis}deg)`;
    });

    // Simulação da Latência Variável (Igual na imagem)
    const latencyEl = document.getElementById('latency-val');
    setInterval(() => {
        const ping = Math.floor(Math.random() * (30 - 22) + 22);
        if(latencyEl) latencyEl.innerText = `LATENCY. ${ping}ms`;
    }, 3000);
}
