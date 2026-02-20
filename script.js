const win = document.getElementById('main-terminal');
const content = document.getElementById('content');
const title = document.getElementById('win-title');

window.onload = () => { setTimeout(typePassword, 800); };

function typePassword() {
    const passInput = document.getElementById('pass-input');
    const fullPass = "********";
    let i = 0;
    if (!passInput) return;
    const interval = setInterval(() => {
        passInput.value += fullPass[i]; i++;
        if (i >= fullPass.length) {
            clearInterval(interval);
            const loader = document.getElementById('boot-progress');
            if (loader) {
                let p = 0;
                const t = setInterval(() => {
                    p += 5; loader.style.width = p + "%";
                    if (p >= 100) { clearInterval(t); setTimeout(startBoot, 500); }
                }, 50);
            } else { setTimeout(startBoot, 1000); }
        }
    }, 120);
}

function startBoot() {
    const login = document.getElementById('login-screen');
    const hello = document.getElementById('hello-screen');
    if (login) login.style.opacity = '0';
    setTimeout(() => {
        if (login) login.style.display = 'none';
        if (hello) { hello.style.display = 'flex'; hello.style.opacity = '1'; }
        setTimeout(() => {
            if (hello) hello.style.opacity = '0';
            setTimeout(() => {
                if (hello) hello.style.display = 'none';
                const dock = document.getElementById('dock-main');
                const canvas = document.getElementById('neural-canvas');
                if (dock) { dock.style.display = 'flex'; setTimeout(() => dock.style.opacity = '1', 50); }
                if (canvas) canvas.style.opacity = '1';
                openBio();
            }, 500);
        }, 1200);
    }, 500);
}

function typeTerminal(element, html, speed, callback) {
    if (!element) return;
    let i = 0; element.innerHTML = "";
    const timer = setInterval(() => {
        if (html.charAt(i) === '<') {
            let endTag = html.indexOf('>', i);
            element.innerHTML += html.substring(i, endTag + 1);
            i = endTag + 1;
        } else { element.innerHTML += html.charAt(i); i++; }
        if (content) content.scrollTop = content.scrollHeight;
        if (i >= html.length) { clearInterval(timer); if (callback) callback(); }
    }, speed);
}

function openBio() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (profile)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="bio-cmd"></span></div><div id="bio-res"></div>`;
    
    typeTerminal(document.getElementById('bio-cmd'), "./profile.sh", 50, () => {
        const res = document.getElementById('bio-res');
        res.innerHTML = `
            <div class="bio-content">
                <h1 id="type-name" class="main-name"></h1>
                <p id="type-ads" class="ads-text"></p>
                <div id="social-area" class="social-links reveal-hidden">
                    <a href="https://github.com/alyssonflp" target="_blank" class="social-icon social-github"><i class="fab fa-github"></i></a>
                    <a href="https://linkedin.com/in/alyssonfelipe" target="_blank" class="social-icon social-linkedin"><i class="fab fa-linkedin"></i></a>
                    <a href="https://instagram.com/alysson.dev" target="_blank" class="social-icon social-instagram"><i class="fab fa-instagram"></i></a>
                </div>
                <p id="type-desc" class="bio-description"></p>
                <div id="cv-area" class="reveal-hidden">
                    <a href="./assets/cv-alysson.pdf" download class="cv-btn">CURRÍCULO <i class="fas fa-download"></i></a>
                </div>
            </div>`;

        typeTerminal(document.getElementById('type-name'), "Alysson Felipe", 50, () => {
            typeTerminal(document.getElementById('type-ads'), "> ADS | UI/UX Designer | IoT & IA", 30, () => {
                const descText = "Apaixonado por tecnologia e design, transito entre o código e a experiência do usuário. Atualmente cursando ADS na Estácio, aplico conceitos de tecnologia para criar sistemas inteligentes e interfaces funcionais.";
                typeTerminal(document.getElementById('type-desc'), descText, 10, () => {
                    const sArea = document.getElementById('social-area');
                    const cArea = document.getElementById('cv-area');
                    if(sArea) sArea.classList.add('active');
                    if(cArea) cArea.classList.add('active');
                });
            });
        });
    });
}

function openEdu() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (education)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="edu-cmd"></span></div><div id="edu-res" style="margin-top:15px; white-space: pre-wrap;"></div>`;
    const data = `<strong>[EDUCAÇÃO]</strong>\n\nFACULDADE ESTÁCIO\nTecnólogo em Análise e Desenvolvimento de Sistemas - Cursando (1º Período)\n\nMICROCAMP CURITIBA\nConteúdo: Windows, Linux, Hardware, Software, Redes e Firewall - Concluído\n\nCOLÉGIO ESTADUAL ARNALDO FAIVRO BUSATO\nEnsino Médio - Concluído\n\n<strong>[QUALIFICAÇÕES COMPLEMENTARES]</strong>\n\n• Design & Web: Domínio em Photoshop, criação de identidades visuais.\n• Sistemas Inteligentes (IA/IoT): Implementação de sistemas e hardware.`;
    typeTerminal(document.getElementById('edu-cmd'), "./education.sh", 40, () => {
        typeTerminal(document.getElementById('edu-res'), data, 10);
    });
}

function openExp() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (experiences)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="exp-cmd"></span></div><div id="exp-res" style="margin-top:15px;"></div>`;
    typeTerminal(document.getElementById('exp-cmd'), "ls -la /career", 40, () => {
        document.getElementById('exp-res').innerHTML = `• ALUARTS: Mkt Digital<br>• MUNDIAL MARCAS: Web Designer`;
    });
}

function openProject() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (projects)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="proj-cmd"></span></div><div id="proj-res" style="margin-top:15px;"></div>`;
    typeTerminal(document.getElementById('proj-cmd'), "./list_projects.sh", 40, () => {
        document.getElementById('proj-res').innerHTML = `>> FLOW HUB: <a href='https://flow-hub.shop' target='_blank' style='color:var(--accent)'>flow-hub.shop</a>`;
    });
}

function openContact() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (mail_service)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="contact-cmd"></span></div><div id="contact-res"></div>`;
    typeTerminal(document.getElementById('contact-cmd'), "./send_mail.sh", 40, () => {
        document.getElementById('contact-res').innerHTML = `
            <form id="email-form" action="https://formspree.io/f/xbdaajro" method="POST" class="contact-form">
                <input type="text" name="name" class="terminal-input" placeholder="Seu Nome" required>
                <input type="email" name="email" class="terminal-input" placeholder="Seu E-mail" required>
                <input type="text" name="_gotcha" class="h-pot">
                <textarea name="message" class="terminal-input" placeholder="Sua Mensagem..." required style="height: 80px;"></textarea>
                <button type="submit" class="terminal-btn">ENVIAR</button>
            </form><div id="success-output"></div>`;
        const form = document.getElementById('email-form');
        form.onsubmit = async (e) => {
            e.preventDefault();
            const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } });
            if (response.ok) {
                const art = `<b>
      _____ _    _  _____ ______  _____ _____  ____  
     / ____| |  | |/ ____|  ____|/ ____/ ____|/ __ \\ 
    | (___ | |  | | |    | |__  | (___| (___ | |  | |
     \\___ \\| |  | | |    |  __|  \\___ \\\\___ \\| |  | |
     ____) | |__| | |____| |____ ____) |___) | |__| |
    |_____/ \\____/ \\_____|______|_____/_____/ \\____/ </b>`;
                document.getElementById('success-output').innerHTML = `<pre class="success-msg">${art}\n\n[ MENSAGEM ENVIADA COM SUCESSO ]</pre>`;
                form.style.display = 'none';
            }
        };
    });
}

function closeWin() { win.style.display = 'none'; }

// Sistema de Partículas Neural Canvas
const canvas = document.getElementById('neural-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let pts = [];
    const res = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', res); res();
    
    for(let i=0; i<30; i++) pts.push({
        x: Math.random()*canvas.width, 
        y: Math.random()*canvas.height, 
        vx: (Math.random()-0.5)*0.5, 
        vy: (Math.random()-0.5)*0.5
    });

    function anim() {
        const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#9333ea';
        ctx.clearRect(0,0,canvas.width,canvas.height); 
        ctx.fillStyle = accentColor + '26'; 
        
        pts.forEach(p => {
            p.x+=p.vx; p.y+=p.vy;
            if(p.x<0||p.x>canvas.width) p.vx*=-1; 
            if(p.y<0||p.y>canvas.height) p.vy*=-1;
            ctx.beginPath(); 
            ctx.arc(p.x, p.y, 2, 0, Math.PI*2); 
            ctx.fill();
        });
        requestAnimationFrame(anim);
    }
    anim();
}
