window.onload = () => { setTimeout(typePassword, 400); };

function typePassword() {
    const passInput = document.getElementById('pass-input');
    if (!passInput) return;
    const fullPass = "********";
    let i = 0;
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
    const timer = setInterval(() => {
        progress += 4; 
        loader.style.width = progress + "%";
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
        login.style.transition = "opacity 0.6s ease";
        login.style.opacity = '0';

        setTimeout(() => {
            login.style.display = 'none';
            desktop.classList.remove('hidden');
            
            // Loop de tentativa para chamar o startOS do app.js
            let attempts = 0;
            const checkSystem = setInterval(() => {
                if (typeof window.startOS === 'function') {
                    window.startOS();
                    clearInterval(checkSystem);
                } else {
                    attempts++;
                    if (attempts > 50) clearInterval(checkSystem);
                }
            }, 100);
        }, 600);
    }
}
