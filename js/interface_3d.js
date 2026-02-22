// Aguarda o sistema carregar (vinculado ao seu intro.js)
window.addEventListener('start-3d-env', () => {
    const terminal = document.querySelector('.main-terminal');
    
    document.addEventListener('mousemove', (e) => {
        // Calcula a rotação baseada na posição do mouse
        let xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        let yAxis = (window.innerHeight / 2 - e.pageY) / 50;
        
        // Aplica a rotação mantendo a base da foto
        terminal.style.transform = `rotateY(${-15 + xAxis}deg) rotateX(${5 + yAxis}deg)`;
    });
});
