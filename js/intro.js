window.onload = () => { 
    // Reduzido de 800ms para 400ms para começar mais rápido
    setTimeout(typePassword, 400); 
};

function typePassword() {
    const passInput = document.getElementById('pass-input');
    const fullPass = "********";
    let i = 0;
    if (!passInput) return;

    // Digitação levemente mais rápida (100ms)
    const interval = setInterval(() => {
        passInput.value += fullPass[i]; 
        i++;
        if (i >= fullPass.length) {
            clearInterval(interval);
            startProgressBar();
        }
    }, 100); 
}

function startProgressBar() {
    const loader = document.getElementById('boot-progress');
    const status = document.getElementById('boot-status');
    if (!loader) return;

    let progress = 0;
    const messages = [
        "Carregando Kernel...", 
        "Checando hardware...", 
        "Iniciando Interface 3D...", 
        "Acesso concedido."
    ];

    // Aumentamos o passo de 2 para 4 e reduzimos o intervalo para 30ms
    // Isso faz o carregamento levar cerca de 0.8s a 1s no total
    const timer = setInterval(() => {
        progress += 4; 
        loader.style.width = progress + "%";

        if (progress < 30) status.innerText = messages[0];
        else if (progress < 60) status.innerText = messages[1];
        else if (progress < 90) status.innerText = messages[2];
        else status.innerText = messages[3];

        if (progress >= 100) { 
            clearInterval(timer); 
            setTimeout(transitionTo3D, 400); 
        }
    }, 30);
}

function transitionTo3D() {
    const login = document.getElementById('login-screen');
    const desktop = document.getElementById('desktop-3d');
    
    if (login && desktop) {
        // Efeito de fade-out suave
        login.style.transition = "opacity 0.6s ease";
        login.style.opacity = '0';

        setTimeout(() => {
            login.style.display = 'none';
            desktop.classList.remove('hidden');
            
            // DISPARO CRUCIAL: Inicializa os módulos do app.js
            if (window.startOS) {
                window.startOS();
            }
            
            // Evento opcional para outros scripts
            window.dispatchEvent(new Event('system-ready'));
        }, 600);

    // ... seu código de sumir a tela de login ...
    
    // GARANTIA: Chama o carregamento do IP e Interface
    if (typeof window.startOS === 'function') {
        window.startOS();
    } else {
        console.error("Erro: startOS não encontrada. Verifique se o app.js carregou.");
    }
