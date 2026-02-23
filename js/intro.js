window.onload = () => { 
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
        // Inicia a transição visual
        login.style.transition = "opacity 0.6s ease";
        login.style.opacity = '0';

        setTimeout(() => {
            login.style.display = 'none';
            desktop.classList.remove('hidden'); // Aqui a classe .hidden do CSS é removida
            
            // Loop de tentativa: Garante que o app.js seja chamado assim que carregar
            let attempts = 0;
            const checkSystem = setInterval(() => {
                if (typeof window.startOS === 'function') {
                    window.startOS(); // Chama a função do app.js
                    clearInterval(checkSystem);
                } else {
                    attempts++;
                    if (attempts > 50) { // Desiste após 5 segundos para não travar o navegador
                        clearInterval(checkSystem);
                        console.error("ERRO CRÍTICO: Módulo app.js não responde.");
                    }
                }
            }, 100);
            
            window.dispatchEvent(new Event('system-ready'));
        }, 600);
    }
}
