window.onload = () => { 
    setTimeout(typePassword, 800); 
};

function typePassword() {
    const passInput = document.getElementById('pass-input');
    const fullPass = "********";
    let i = 0;
    if (!passInput) return;

    // Simula a digitação da senha
    const interval = setInterval(() => {
        passInput.value += fullPass[i]; 
        i++;
        if (i >= fullPass.length) {
            clearInterval(interval);
            startProgressBar();
        }
    }, 120);
}

function startProgressBar() {
    const loader = document.getElementById('boot-progress');
    const status = document.getElementById('boot-status');
    if (!loader) return;

    let progress = 0;
    const messages = ["Carregando Kernel...", "Checando hardware...", "Iniciando Interface 3D...", "Acesso concedido."];

    const timer = setInterval(() => {
        progress += 2; // Velocidade do carregamento
        loader.style.width = progress + "%";

        // Atualiza mensagens de status
        if (progress < 30) status.innerText = messages[0];
        else if (progress < 60) status.innerText = messages[1];
        else if (progress < 90) status.innerText = messages[2];
        else status.innerText = messages[3];

        if (progress >= 100) { 
            clearInterval(timer); 
            setTimeout(transitionTo3D, 600); 
        }
    }, 40);
}

function transitionTo3D() {
    const login = document.getElementById('login-screen');
    const desktop = document.getElementById('desktop-3d');
    
    if (login) {
        login.style.opacity = '0';
        setTimeout(() => {
            login.style.display = 'none';
            if (desktop) {
                desktop.classList.remove('hidden');
                // Dispara evento para o script da interface 3D saber que começou
                window.dispatchEvent(new Event('system-ready'));
            }
        }, 800);
    }
}
