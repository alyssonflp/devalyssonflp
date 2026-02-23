window.onload = () => { 
    // Inicia o processo de digitação após 400ms
    setTimeout(typePassword, 400); 
};

function typePassword() {
    const passInput = document.getElementById('pass-input');
    const fullPass = "********";
    let i = 0;
    if (!passInput) return;

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
        // Efeito de fade-out suave na tela de login
        login.style.transition = "opacity 0.6s ease";
        login.style.opacity = '0';

        setTimeout(() => {
            login.style.display = 'none';
            desktop.classList.remove('hidden');
            
            // GARANTIA: Inicializa o IP, Localização e Rotação 3D do app.js
            if (typeof window.startOS === 'function') {
                window.startOS();
            } else {
                console.warn("Aviso: startOS não encontrada. Verifique se o app.js está como type='module'.");
            }
            
            // Evento para sinalizar que o sistema está pronto
            window.dispatchEvent(new Event('system-ready'));
        }, 600);
    }
}
