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
                <h1 style="font-size: 24px; color: #3b82f6; font-weight: bold;">Alysson Felipe</h1>
                <p style="margin-bottom: 15px;">ADS | UI/UX Designer | Desenvolvedor</p>
                <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 20px;">
                    <a href="https://github.com/alyssonflp" target="_blank" style="font-size: 20px;"><i class="fab fa-github"></i></a>
                    <a href="https://linkedin.com/in/alyssonfelipe" target="_blank" style="font-size: 20px;"><i class="fab fa-linkedin"></i></a>
                </div>
                <p style="text-align: left; opacity: 0.8;">Apaixonado por tecnologia e design, focado em criar soluções que unem estética e funcionalidade.</p>
            </div>`;
    });
}

function openEdu() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (education)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="edu-cmd"></span></div><div id="edu-res"></div>`;
    typeTerminal(document.getElementById('edu-cmd'), "cat education.txt", 40, () => {
        document.getElementById('edu-res').innerHTML = `<br>• ESTÁCIO: ADS (2027)<br>• MICROCAMP: Linux & Redes`;
    });
}

function openExp() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (experiences)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="exp-cmd"></span></div><div id="exp-res"></div>`;
    typeTerminal(document.getElementById('exp-cmd'), "ls -la /career", 40, () => {
        document.getElementById('exp-res').innerHTML = `<br>• ALUARTS: Mkt Digital & ADM<br>• MUNDIAL MARCAS: Web Designer`;
    });
}

function openProject() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (projects)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="proj-cmd"></span></div><div id="proj-res"></div>`;
    typeTerminal(document.getElementById('proj-cmd'), "./list_projects.sh", 40, () => {
        document.getElementById('proj-res').innerHTML = `<br>>> FLOW HUB: <a href='https://flow-hub.shop' target='_blank' style='color:#3b82f6'>flow-hub.shop</a>`;
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

// Canvas Background
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
