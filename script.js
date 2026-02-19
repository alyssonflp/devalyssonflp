const win = document.getElementById('main-terminal');
const content = document.getElementById('content');
const title = document.getElementById('win-title');

// 1. INICIALIZAÇÃO: DIGITAÇÃO DA SENHA
window.onload = () => {
    setTimeout(typePassword, 800);
};

function typePassword() {
    const passInput = document.getElementById('pass-input');
    const status = document.getElementById('login-status');
    const loader = document.getElementById('login-loader');
    const fullPass = "********";
    let i = 0;

    const interval = setInterval(() => {
        passInput.value += fullPass[i];
        i++;
        if (i >= fullPass.length) {
            clearInterval(interval);
            status.innerText = "Autenticando...";
            loader.style.display = "block";
            setTimeout(startBoot, 1000);
        }
    }, 120);
}

// 2. SEQUÊNCIA DE BOOT (LOGIN -> HELLO -> DESKTOP)
function startBoot() {
    const loginScreen = document.getElementById('login-screen');
    const helloScreen = document.getElementById('hello-screen');
    const dock = document.getElementById('dock-main');
    const canvas = document.getElementById('neural-canvas');

    if(loginScreen) loginScreen.style.opacity = '0';
    
    setTimeout(() => {
        if(loginScreen) loginScreen.style.display = 'none';
        
        if(helloScreen) {
            helloScreen.style.display = 'flex';
            void helloScreen.offsetWidth; // Força renderização
            helloScreen.style.opacity = '1';
        }
        
        setTimeout(() => {
            if(helloScreen) helloScreen.style.opacity = '0';
            
            setTimeout(() => {
                if(helloScreen) helloScreen.style.display = 'none';
                if(dock) {
                    dock.style.display = 'flex';
                    void dock.offsetWidth;
                    dock.style.opacity = '1';
                }
                if(canvas) canvas.style.opacity = '1';
                openBio(); // Abre o perfil automaticamente
            }, 500);
        }, 1200); // Tempo do Hello World
    }, 500);
}

// 3. LOGICA DO TERMINAL (EFEITO DE DIGITAÇÃO)
function typeTerminal(element, html, speed, callback) {
    let i = 0;
    element.innerHTML = "";
    const timer = setInterval(() => {
        if (html.charAt(i) === '<') {
            let endTag = html.indexOf('>', i);
            element.innerHTML += html.substring(i, endTag + 1);
            i = endTag + 1;
        } else {
            element.innerHTML += html.charAt(i);
            i++;
        }
        content.scrollTop = content.scrollHeight;
        if (i >= html.length) { 
            clearInterval(timer); 
            if (callback) callback(); 
        }
    }, speed);
}

// 4. CONTEÚDO E ARTE ASCII
const nameAscii = `
   _   _ __   _____ ____  ____   ___  _   _   _____ _____ _     ___ ____  _____ 
  / \\ | |\\ \\ / / ___/ ___|/ ___| / _ \\| \\ | | |  ___| ____| |   |_ _|  _ \\| ____|
 / _ \\| | \\ V /\\___ \\___ \\___ \\| | | |  \\| | | |_  |  _| | |    | || |_) |  _|  
/ ___ \\ |__| |  ___) |__) |___) | |_| | |\\  | |  _| | |___| |___ | ||  __/| |___ 
/_/   \\_\\____|_| |____/____/____/ \\___/|_| \\_| |_|   |_____|_____|___|_|   |_____|`;

function openBio() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (profile)";
    content.innerHTML = `
        <div style="text-align:center">
            <pre id="ascii-target" class="ascii-art"></pre>
            <p id="ads-target" style="font-weight:bold; font-size:14px; margin-bottom:10px;"></p>
            <div id="bio-typing" style="text-align:left; opacity:0.9;"></div>
            <span class="cursor"></span>
        </div>`;
    
    let i = 0;
    const asciiTarget = document.getElementById('ascii-target');
    function drawAscii() {
        if (i < nameAscii.length) {
            asciiTarget.innerHTML += nameAscii.charAt(i);
            i++; 
            setTimeout(drawAscii, 1);
        } else {
            typeTerminal(document.getElementById('ads-target'), "> ADS | UI/UX Designer | IoT & IA", 25, () => {
                typeTerminal(document.getElementById('bio-typing'), "Apaixonado por tecnologia e design, transito entre o código e a experiência do usuário. Atualmente cursando ADS na Estácio, aplico conceitos de IA e IoT para criar sistemas inteligentes e interfaces que conectam pessoas.", 10);
            });
        }
    }
    drawAscii();
}

function openEdu() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (education)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="edu-cmd"></span></div><div id="edu-res" style="margin-top:15px;"></div><span class="cursor"></span>`;
    const data = `<strong>[ FORMAÇÃO ACADÊMICA ]</strong><br><br>
• <strong>FACULDADE ESTÁCIO</strong><br>
  Tecnólogo em Análise e Desenvolvimento de Sistemas<br>
  Status: Cursando | Previsão: 2027<br><br>
• <strong>MICROCAMP CURITIBA</strong><br>
  Informática Avançada: Windows, Linux, Redes e Firewall<br><br>
• <strong>COLÉGIO ESTADUAL ARNALDO FAIVRO BUSATO</strong><br>
  Ensino Médio Concluído`;

    typeTerminal(document.getElementById('edu-cmd'), "cat education.sh", 40, () => {
        setTimeout(() => typeTerminal(document.getElementById('edu-res'), data, 5), 100);
    });
}

function openExp() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (experiences)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="exp-cmd"></span></div><div id="exp-res" style="margin-top:15px;"></div><span class="cursor"></span>`;
    const data = `<strong>[ EXPERIÊNCIAS PROFISSIONAIS ]</strong><br><br>
• <strong>ALUARTS ESQUADRIAS</strong><br>
  Aux. Administrativo & Marketing Digital | 2020 – 2024<br><br>
• <strong>MUNDIAL MARCAS</strong><br>
  Web Designer | 2015 – 2017<br><br>
• <strong>OMAR CALÇADOS</strong><br>
  Consultor de Vendas | 2013 – 2014`;

    typeTerminal(document.getElementById('exp-cmd'), "cat experiences.sh", 40, () => {
        setTimeout(() => typeTerminal(document.getElementById('exp-res'), data, 5), 100);
    });
}

function openProject() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (projects)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="proj-cmd"></span></div><div id="proj-res" style="margin-top:15px;"></div><span class="cursor"></span>`;
    const data = `>> <strong>PROJETO:</strong> FLOW HUB<br>
>> <strong>URL:</strong> <a href="https://flow-hub.shop" target="_blank" style="color:var(--accent)">https://flow-hub.shop</a><br>
>> <strong>STATUS:</strong> Ativo / Em Produção`;
    
    typeTerminal(document.getElementById('proj-cmd'), "./list_projects.sh", 40, () => {
        setTimeout(() => typeTerminal(document.getElementById('proj-res'), data, 10), 100);
    });
}

function closeWin() { win.style.display = 'none'; }

// 5. FONDO NEURAL (CANVAS)
const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');
let pts = [];
const res = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
window.onresize = res; 
res();

for(let i=0; i<30; i++) {
    pts.push({
        x: Math.random() * canvas.width, 
        y: Math.random() * canvas.height, 
        vx: (Math.random() - 0.5) * 0.5, 
        vy: (Math.random() - 0.5) * 0.5
    });
}

function anim() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(59, 130, 246, 0.15)';
    pts.forEach(p => {
        p.x += p.vx; 
        p.y += p.vy;
        if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if(p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); 
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2); 
        ctx.fill();
    });
    requestAnimationFrame(anim);
}
anim();
