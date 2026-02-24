// =====================================================
// 🚀 Boot Module - Alysson OS
// Responsável apenas por executar a animação inicial
// e liberar o sistema principal ao final.
// =====================================================

// Exportamos a função principal do boot.
// Agora o app.js pode controlar quando ele inicia.
export function initBoot() {

    // Espera a página carregar completamente
    window.addEventListener("load", () => {
        setTimeout(typePassword, 400);
    });

}


// =====================================================
// Digitação automática da senha fake
// =====================================================

function typePassword() {

    const input = document.getElementById("pass-input");
    if (!input) return;

    const pass = "********";
    let i = 0;

    const interval = setInterval(() => {

        input.value += pass[i++];

        if (i >= pass.length) {
            clearInterval(interval);
            startProgress();
        }

    }, 100);
}


// =====================================================
// Barra de progresso simulada
// =====================================================

function startProgress() {

    const loader = document.getElementById("boot-progress");
    const status = document.getElementById("boot-status");
    if (!loader || !status) return;

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

            setTimeout(showDesktop, 400);

        }

    }, 30);
}


// =====================================================
// Transição para o Desktop
// =====================================================

function showDesktop() {

    const login = document.getElementById("login-screen");
    const desktop = document.getElementById("desktop-3d");

    if (!login || !desktop) return;

    login.style.opacity = "0";
    login.style.transition = "opacity 0.6s ease";

    setTimeout(() => {

        login.style.display = "none";
        desktop.classList.remove("hidden");

        // Aqui chamamos o sistema principal
        window.startOS?.();

    }, 600);
                                 }
