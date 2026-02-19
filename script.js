const win = document.getElementById('main-terminal');
const content = document.getElementById('content');
const title = document.getElementById('win-title');

window.onload = () => { setTimeout(typePassword, 800); };

function typePassword() {
    const passInput = document.getElementById('pass-input');
    const status = document.getElementById('login-status');
    const loader = document.getElementById('login-loader');
    const fullPass = "********";
    let i = 0;
    const interval = setInterval(() => {
        passInput.value += fullPass[i]; i++;
        if (i >= fullPass.length) {
            clearInterval(interval);
            status.innerText = "Autenticando...";
            loader.style.display = "block";
            setTimeout(startBoot, 1000);
        }
    }, 120);
}

function startBoot() {
    const loginScreen = document.getElementById('login-screen');
    const helloScreen = document.getElementById('hello-screen');
    const dock = document.getElementById('dock-main');
    const canvas = document.getElementById('neural-canvas');

    loginScreen.style.opacity = '0';
    setTimeout(() => {
        loginScreen.style.display = 'none';
        helloScreen.style.display = 'flex';
        void helloScreen.offsetWidth;
        helloScreen.style.opacity = '1';
        setTimeout(() => {
            helloScreen.style.opacity = '0';
            setTimeout(() => {
                helloScreen.style.display = 'none';
                dock.style.display = 'flex';
                void dock.offsetWidth;
                dock.style.opacity = '1';
                canvas.style.opacity = '1';
                openBio(); 
            }, 500);
        }, 1200);
    }, 500);
}

function typeTerminal(element, html, speed, callback) {
    let i = 0; element.innerHTML = "";
    const timer = setInterval(() => {
        if (html.charAt(i) === '<') {
            let endTag = html.indexOf('>', i);
            element.innerHTML += html.substring(i, endTag + 1);
            i = endTag + 1;
        } else { element.innerHTML += html.charAt(i); i++; }
        content.scrollTop = content.scrollHeight;
        if (i >= html.length) { clearInterval(timer); if (callback) callback(); }
    }, speed);
}

// Seções principais
function openBio() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (profile)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="bio-cmd"></span></div><div id="bio-res"></div>`;
    typeTerminal(document.getElementById('bio-cmd'), "./profile.sh", 50, () => {
        document.getElementById('bio-res').innerHTML = `
            <div style="text-align:center; margin-top:20px;">
                <h1 class="main-name">Alysson Felipe</h1>
                <p id="ads-target" style="font-weight:bold; font-size:14px; margin-bottom:15px; color:var(--accent);"></p>
                <div id="bio-typing" style="text-align:left; opacity:0.9;"></div>
                <span class="cursor"></span>
                <div class="social-links">
                    <a href="https://instagram.com/alysson.dev" target="_blank" class="social-icon"><i class="fab fa-instagram"></i></a>
                    <a href="https://linkedin.com/in/alyssonfelipe" target="_blank" class="social-icon"><i class="fab fa-linkedin"></i></a>
                    <a href="https://github.com/alyssonflp" target="_blank" class="social-icon"><i class="fab fa-github"></i></a>
                </div>
                <a href="./assets/cv-alysson.pdf" download class="cv-btn"><i class="fas fa-file-download"></i> Download CV</a>
            </div>`;
        typeTerminal(document.getElementById('ads-target'), "> ADS | UI/UX Designer | IoT & IA", 25, () => {
            typeTerminal(document.getElementById('bio-typing'), "Apaixonado por tecnologia e design, transito entre o código e a experiência do usuário. Atualmente cursando ADS na Estácio, aplico conceitos de tecnologia para criar sistemas inteligentes.", 10);
        });
    });
}

function openEdu() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (education)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="edu-cmd"></span></div><div id="edu-res" style="margin-top:15px;"></div><span class="cursor"></span>`;
    const data = `<strong>[ FORMAÇÃO ]</strong><br><br>• ESTÁCIO: ADS (2027)<br>• MICROCAMP: Linux & Redes`;
    typeTerminal(document.getElementById('edu-cmd'), "cat education.sh", 40, () => {
        setTimeout(() => typeTerminal(document.getElementById('edu-res'), data, 5), 100);
    });
}

function openExp() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (experiences)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="exp-cmd"></span></div><div id="exp-res" style="margin-top:15px;"></div><span class="cursor"></span>`;
    const data = `<strong>[ EXPERIÊNCIAS ]</strong><br><br>• ALUARTS: Mkt Digital & ADM<br>• MUNDIAL MARCAS: Web Designer`;
    typeTerminal(document.getElementById('exp-cmd'), "cat experiences.sh", 40, () => {
        setTimeout(() => typeTerminal(document.getElementById('exp-res'), data, 5), 100);
    });
}

function openProject() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (projects)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="proj-cmd"></span></div><div id="proj-res" style="margin-top:15px;"></div><span class="cursor"></span>`;
    typeTerminal(document.getElementById('proj-cmd'), "./list_projects.sh", 40, () => {
        setTimeout(() => typeTerminal(document.getElementById('proj-res'), `>> FLOW HUB: <a href='https://flow-hub.shop' target='_blank' style='color:var(--accent)'>flow-hub.shop</a>`, 10), 100);
    });
}

// SEÇÃO CONTATO (ICONE ENVELOPE) - MANTENDO O ASCII SUCESS
function openContact() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (mail_service)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="contact-cmd"></span></div><div id="contact-res" style="margin-top:15px;"></div>`;
    
    typeTerminal(document.getElementById('contact-cmd'), "./send_mail.sh", 40, () => {
        document.getElementById('contact-res').innerHTML = `
            <form id="email-form" action="https://formspree.io/f/xbdaajro" method="POST" class="terminal-form">
                <p style="color:var(--accent); font-weight:bold; margin-bottom:15px;">[ FORMULÁRIO DE CONTATO DIRETO ]</p>
                <input type="text" name="_gotcha" style="display:none">
                <label>NOME:</label>
                <input type="text" name="name" class="terminal-input" placeholder="Seu nome" required>
                <label>EMAIL:</label>
                <input type="email" name="_replyto" class="terminal-input" placeholder="seu@email.com" required>
                <label>MENSAGEM:</label>
                <textarea name="message" class="terminal-input" rows="3" placeholder="Sua mensagem aqui..." required></textarea>
                <button type="submit" class="terminal-btn">ENVIAR AGORA</button>
            </form>
            <div id="success-output"></div>
        `;

        const form = document.getElementById('email-form');
        form.onsubmit = async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const output = document.getElementById('success-output');
            btn.innerText = "ENVIANDO..."; btn.disabled = true;
            
            try {
                const response = await fetch(form.action, { 
                    method: 'POST', 
                    body: new FormData(form), 
                    headers: { 'Accept': 'application/json' } 
                });

                if (response.ok) {
                    const asciiArt = `<b>
      _____ _    _  _____ ______  _____ _____  ____  
     / ____| |  | |/ ____|  ____|/ ____/ ____|/ __ \\ 
    | (___ | |  | | |    | |__  | (___| (___ | |  | |
     \\___ \\| |  | | |    |  __|  \\___ \\\\___ \\| |  | |
     ____) | |__| | |____| |____ ____) |___) | |__| |
    |_____/ \\____/ \\_____|______|_____/_____/ \\____/ </b>
    <br>[ SISTEMA: MENSAGEM ENVIADA COM SUCESSO ]`;
                    output.innerHTML = `<pre class="ascii-success" style="font-size:8px; line-height:10px; color:var(--accent);">${asciiArt}</pre>`;
                    form.style.display = 'none';
                } else {
                    btn.innerText = "ERRO NO ENVIO"; btn.disabled = false;
                }
            } catch (err) {
                btn.innerText = "TENTAR NOVAMENTE"; btn.disabled = false;
            }
        };
    });
}

function closeWin() { win.style.display = 'none'; }

// Background Neural Canvas
const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');
let pts = [];
const res = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
window.addEventListener('resize', res);
res();
for(let i=0; i<30; i++) pts.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, vx:(Math.random()-0.5)*0.5, vy:(Math.random()-0.5)*0.5});
function anim() {
    ctx.clearRect(0,0,canvas.width,canvas.height); ctx.fillStyle = 'rgba(59,130,246,0.15)';
    pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>canvas.width) p.vx*=-1; if(p.y<0||p.y>canvas.height) p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,2,0,Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(anim);
}
anim();
