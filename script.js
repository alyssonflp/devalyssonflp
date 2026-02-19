const win = document.getElementById('main-terminal');
const content = document.getElementById('content');
const title = document.getElementById('win-title');

// CONFIGURAÇÕES DE IDENTIDADE E CONEXÃO
const GEMINI_API_KEY = 'AIzaSyBWC90SM1ITe6Qh9QwsWiz5xuVFg4NxMZU'; 
const IA_NAME = "JARVIS"; 

window.onload = () => { setTimeout(typePassword, 800); };

// Sistema de Login
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
            status.innerText = "SISTEMA AUTORIZADO";
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

// Digitação Efeito Terminal
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

// Conteúdos das Janelas
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
                    <a href="https://github.com/alyssonfelipe" target="_blank" class="social-icon"><i class="fab fa-github"></i></a>
                </div>
                <a href="./assets/cv-alysson.pdf" download class="cv-btn"><i class="fas fa-file-download"></i> Download CV</a>
            </div>`;
        typeTerminal(document.getElementById('ads-target'), "> ADS | UI/UX Designer | IA", 25, () => {
            typeTerminal(document.getElementById('bio-typing'), "Focado em transformar complexidade em interfaces intuitivas. Atualmente cursando ADS na Estácio.", 10);
        });
    });
}

function openEdu() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (education)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="edu-cmd"></span></div><div id="edu-res" style="margin-top:15px;"></div>`;
    typeTerminal(document.getElementById('edu-cmd'), "cat education.sh", 40, () => {
        document.getElementById('edu-res').innerHTML = `<strong>[ FORMAÇÃO ]</strong><br><br>• ESTÁCIO: ADS (2027)<br>• MICROCAMP: Linux & Redes`;
    });
}

function openExp() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (experiences)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="exp-cmd"></span></div><div id="exp-res" style="margin-top:15px;"></div>`;
    typeTerminal(document.getElementById('exp-cmd'), "cat experiences.sh", 40, () => {
        document.getElementById('exp-res').innerHTML = `<strong>[ EXPERIÊNCIAS ]</strong><br><br>• ALUARTS: Mkt Digital<br>• MUNDIAL MARCAS: Web Designer`;
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

// SEÇÃO JARVIS (CORRIGIDA)
function openAI() {
    win.style.display = 'flex';
    title.innerText = `alyssonfelipe@root: ~ (${IA_NAME.toLowerCase()}_core)`;
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="ai-cmd"></span></div><div id="ai-res" style="margin-top:15px;"></div>`;
    
    typeTerminal(document.getElementById('ai-cmd'), `./initialize_${IA_NAME.toLowerCase()}.sh`, 40, () => {
        document.getElementById('ai-res').innerHTML = `
            <div style="border: 1px solid #3b82f6; background: rgba(59, 130, 246, 0.05); padding: 15px; border-radius: 8px;">
                <p style="color:#3b82f6; font-weight:bold; margin-bottom:10px;">[ ${IA_NAME} ONLINE ]</p>
                <div class="flex gap-2">
                    <input type="text" id="ai-input" class="terminal-input flex-1" placeholder="Aguardando comando..." style="margin:0">
                    <button onclick="askAI()" class="terminal-btn" style="margin:0; background:#3b82f6; color:#fff; border-radius:4px; padding:0 15px;">PERGUNTAR</button>
                </div>
                <div id="ai-response-display" style="margin-top:20px; min-height:40px;"></div>
            </div>
        `;
        document.getElementById('ai-input').addEventListener('keypress', (e) => { if(e.key === 'Enter') askAI(); });
    });
}

async function askAI() {
    const input = document.getElementById('ai-input');
    const display = document.getElementById('ai-response-display');
    const prompt = input.value;
    if(!prompt) return;

    display.innerHTML = "<span class='cursor'></span> [ ANALISANDO PROTOCOLOS... ]";
    input.value = "";

    try {
        // CORREÇÃO: URL V1 ESTÁVEL
        const URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `
                        Você é o ${IA_NAME}, o assistente pessoal de Alysson Felipe.
                        Alysson estuda ADS na Estácio e é Designer.
                        Responda de forma curta, técnica e educada (chame de Senhor).
                        Se perguntarem algo fora da tecnologia ou portfólio, recuse educadamente.
                        Pergunta: ${prompt}` }]
                }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const aiText = data.candidates[0].content.parts[0].text;
            typeTerminal(display, `<span style="color:#3b82f6">> ${IA_NAME}:</span> ${aiText}`, 15);
        } else {
            display.innerHTML = `> Erro de processamento.`;
        }
    } catch (err) {
        display.innerHTML = `> Erro de conexão com o mainframe.`;
    }
}

function openContact() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (mail_service)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="contact-cmd"></span></div><div id="contact-res" style="margin-top:15px;"></div>`;
    
    typeTerminal(document.getElementById('contact-cmd'), "./send_mail.sh", 40, () => {
        document.getElementById('contact-res').innerHTML = `
            <form id="email-form" action="https://formspree.io/f/xbdaajro" method="POST" class="terminal-form">
                <input type="text" name="name" class="terminal-input" placeholder="Seu Nome" required>
                <input type="email" name="_replyto" class="terminal-input" placeholder="Seu E-mail" required>
                <textarea name="message" class="terminal-input" rows="3" placeholder="Mensagem..." required></textarea>
                <button type="submit" class="terminal-btn">ENVIAR</button>
            </form>
            <div id="success-output"></div>
        `;

        const form = document.getElementById('email-form');
        form.onsubmit = async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            btn.innerText = "ENVIANDO..."; btn.disabled = true;
            const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } });
            if (response.ok) {
                document.getElementById('success-output').innerHTML = `<p style="color:var(--accent)">[ MENSAGEM ENVIADA ]</p>`;
                form.style.display = 'none';
            }
        };
    });
}

function closeWin() { win.style.display = 'none'; }

// Background
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
