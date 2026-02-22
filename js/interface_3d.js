document.addEventListener("mousemove", (e) => {
    const terminal = document.querySelector(".main-terminal");
    if (!terminal) return;
    
    let xAxis = (window.innerWidth / 2 - e.pageX) / 50;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 50;
    
    terminal.style.transform = `rotateY(${-15 + xAxis}deg) rotateX(${5 + yAxis}deg)`;
});

// Conteúdo inicial
document.getElementById("content").innerHTML = `
    <h2 style="color: #00d4ff">> hc:[ACERVO_DE_PROJETOS]</h2>
    <p>> Sistema Alysson OS carregado com sucesso.</p>
    <p>> Fundo 4K detectado. Alta performance ativada.</p>
`;
