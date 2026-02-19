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
        helloScreen.style.opacity = '1';
        setTimeout(() => {
            helloScreen.style.opacity = '0';
            setTimeout(() => {
                helloScreen.style.display = 'none';
                dock.style.display = 'flex';
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

function openBio() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (profile)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="bio-cmd"></span></div><div id="bio-res"></div>`;
    typeTerminal(document.getElementById('bio-cmd'), "./profile.sh", 50, () => {
        document.getElementById('bio-res').innerHTML = `
            <div style="text-align:center; margin-top:20px;">
                <h1 style="font-size: 24px; color: #3b82f6; font-weight: bold; margin-bottom: 5px;">Alysson Felipe</h1>
                <p style="font-weight:bold; font-size:14px; margin-bottom:10px; color:#22d3ee;">> ADS | UI/UX Designer | IoT & IA</p>
                
                <div style="display: flex; justify-content: center; gap: 25px; margin-bottom: 15px;">
                    <a href="https://github.com/alyssonflp" target="_blank" style="font-size: 22px; color: white;"><i class="fab fa-github"></i></a>
                    <a href="https://linkedin.com/in/alyssonfelipe" target="_blank" style="font-size: 22px; color: white;"><i class="fab fa-linkedin"></i></a>
                    <a href="https://instagram.com/alysson.dev" target="_blank" style="font-size: 22px; color: white;"><i class="fab fa-instagram"></i></a>
                </div>

                <div style="text-align:left; opacity:0.9; margin-bottom: 25px; line-height: 1.5; font-size: 13px;">
                    Apaixonado por tecnologia e design, transito entre o código e a experiência do usuário. Atualmente cursando ADS na Estácio, aplico conceitos de tecnologia para criar sistemas inteligentes e interfaces funcionais.
                </div>

                <div style="display: flex; justify-content: center; width: 100%;">
                    <a href="./assets/cv-alysson.pdf" download style="display: flex; align-items: center; gap: 8px; padding: 10px 20px; border: 1px solid #3b82f6; color: #3b82f6; text-decoration: none; border-radius: 4px; font-size: 13px; font-weight: bold; transition: 0.3s;">
                        CURRICULO.PDF <i class="fas fa-download"></i>
                    </a>
                </div>
            </div>`;
    });
}

function openEdu() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (education)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="edu-cmd"></span></div><div id="edu-res" style="margin-top:15px; line-height:1.6;"></div>`;
    
    const data = `<strong>[EDUCAÇÃO]</strong><br><br>FACULDADE ESTÁCIO<br>Tecnólogo em Análise e Desenvolvimento de Sistemas - Cursando (1º Período)<br>Previsão de conclusão: 2026<br><br>MICROCAMP CURITIBA<br>Curso de Informática Avançada<br>Conteúdo: Windows, Linux, Hardware, Software, Redes e Firewall<br>Concluído<br><br>COLÉGIO ESTADUAL ARNALDO FAIVRO BUSATO<br>Ensino Médio<br>Concluído<br><br><strong>[QUALIFICAÇÕES E ATIVIDADES COMPLEMENTARES]</strong><br><br>Design & Web: Domínio em Photoshop, criação de identidades visuais e desenvolvimento de sites em WordPress com foco em SEO/SEM.<br><br>Sistemas Inteligentes (IA/IoT): Experiência prática na implementação de sistemas de reconhecimento facial e integração de hardware.<br><br>Ferramentas de Escritório: Pacote Office completo (Word, Excel e PowerPoint).<br><br>Idiomas: Inglês nível A1.`;

    typeTerminal(document.getElementById('edu-cmd'), "cat education.txt", 40, () => {
        document.getElementById('edu-res').innerHTML = data;
    });
}

function openExp() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (experiences)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="exp-cmd"></span></div><div id="exp-res" style="margin-top:15px;"></div>`;
    typeTerminal(document.getElementById('exp-cmd'), "ls -la /career", 40, () => {
        document.getElementById('exp-res').innerHTML = `• ALUARTS: Mkt Digital & ADM<br>• MUNDIAL MARCAS: Web Designer`;
    });
}

function openProject() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (projects)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="proj-cmd"></span></div><div id="proj-res" style="margin-top:15px;"></div>`;
    typeTerminal(document.getElementById('proj-cmd'), "./list_projects.sh", 40, () => {
        document.getElementById('proj-res').innerHTML = `>> FLOW HUB: <a href='https://flow-hub.shop' target='_blank' style='color:#3b82f6'>flow-hub.shop</a>`;
    });
}

function openContact() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (mail_service)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="contact-cmd"></span></div><div id="contact-res"></div>`;
    typeTerminal(document.getElementById('contact-cmd'), "./send_mail.sh", 40, () => {
        document.getElementById('contact-res').innerHTML = `
            <form id="email-form" action="https://formspree.io/f/xbdaajro" method="POST" style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
                <input type="text" name="name" placeholder="Nome" required style="background: rgba(255,255,255,0.05); border: 1px solid #333; color: white; padding: 8px;">
                <input type="email" name="email" placeholder="E-mail" required style="background: rgba(255,255,255,0.05); border: 1px solid #333; color: white; padding: 8px;">
                <textarea name="message" placeholder="Sua mensagem..." required style="background: rgba(255,255,255,0.05); border: 1px solid #333; color: white; padding: 8px; height: 80px;"></textarea>
                <button type="submit" style="background: #3b82f6; color: white; padding: 10px; font-weight: bold; cursor: pointer;">ENVIAR</button>
            </form>
            <div id="success-output"></div>`;

        const form = document.getElementById('email-form');
        form.onsubmit = async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            btn.innerText = "ENVIANDO..."; btn.disabled = true;
            const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } });
            if (response.ok) {
                const asciiArt = `<b>
      _____ _    _  _____ ______  _____ _____  ____  
     / ____| |  | |/ ____|  ____|/ ____/ ____|/ __ \\ 
    | (___ | |  | | |    | |__  | (___| (___ | |  | |
     \\___ \\| |  | | |    |  __|  \\___ \\\\___ \\| |  | |
     ____) | |__| | |____| |____ ____) |___) | |__| |
    |_____/ \\____/ \\_____|______|_____/_____/ \\____/ </b>
    <br>[ SISTEMA: MENSAGEM ENVIADA ]`;
                document.getElementById('success-output').innerHTML = `<pre style="font-size: 7px; color: #3b82f6; margin-top: 15px;">${asciiArt}</pre>`;
                form.style.display = 'none';
            }
        };
    });
}

function closeWin() { win.style.display = 'none'; }

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
