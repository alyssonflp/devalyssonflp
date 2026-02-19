const win = document.getElementById('main-terminal');
const content = document.getElementById('content');
const title = document.getElementById('win-title');

window.onload = () => { setTimeout(typePassword, 800); };

function typePassword() {
    const passInput = document.getElementById('pass-input');
    const fullPass = "********";
    let i = 0;
    const interval = setInterval(() => {
        passInput.value += fullPass[i]; i++;
        if (i >= fullPass.length) {
            clearInterval(interval);
            document.getElementById('login-status').innerText = "Autenticando...";
            document.getElementById('login-loader').style.display = "block";
            setTimeout(startBoot, 1000);
        }
    }, 120);
}

function startBoot() {
    document.getElementById('login-screen').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('login-screen').style.display = 'none';
        const hello = document.getElementById('hello-screen');
        hello.style.display = 'flex';
        setTimeout(() => { hello.style.opacity = '1'; }, 50);
        setTimeout(() => {
            hello.style.opacity = '0';
            setTimeout(() => {
                hello.style.display = 'none';
                document.getElementById('dock-main').style.display = 'flex';
                document.getElementById('dock-main').style.opacity = '1';
                document.getElementById('neural-canvas').style.opacity = '1';
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
                <h1 id="name-typing" class="main-name"></h1>
                <p id="ads-target" class="ads-text"></p>
                <div id="social-container" class="social-links">
                    <a id="s-1" href="https://instagram.com/alysson.dev" target="_blank" class="social-icon"><i class="fab fa-instagram"></i></a>
                    <a id="s-2" href="https://linkedin.com/in/alyssonfelipe" target="_blank" class="social-icon"><i class="fab fa-linkedin"></i></a>
                    <a id="s-3" href="https://github.com/alyssonfelipe" target="_blank" class="social-icon"><i class="fab fa-github"></i></a>
                </div>
                <div id="bio-typing" style="text-align:left; opacity:0.9; margin-top:15px;"></div>
                <span id="bio-cursor" class="cursor" style="display:none;"></span>
                <div id="btn-container" style="margin-top:20px;">
                    <a id="download-btn" href="./assets/cv-alysson.pdf" download class="cv-btn"><i class="fas fa-file-download"></i> Download CV</a>
                </div>
            </div>`;

        typeTerminal(document.getElementById('name-typing'), "Alysson Felipe", 60, () => {
            typeTerminal(document.getElementById('ads-target'), "> ADS | UI/UX Designer | IoT & IA", 25, () => {
                
                // Animação Ícones (Cima -> Baixo)
                setTimeout(() => { document.getElementById('s-1').style.animation = "slideDown 0.5s forwards"; }, 200);
                setTimeout(() => { document.getElementById('s-2').style.animation = "slideDown 0.5s forwards"; }, 400);
                setTimeout(() => { 
                    document.getElementById('s-3').style.animation = "slideDown 0.5s forwards";
                    
                    // Inicia Bio
                    document.getElementById('bio-cursor').style.display = 'inline-block';
                    typeTerminal(document.getElementById('bio-typing'), "Apaixonado por tecnologia e design, transito entre o código e a experiência do usuário. Atualmente cursando ADS na Estácio, aplico conceitos de IA e IoT para criar sistemas inteligentes.", 10, () => {
                        // Animação Download (Baixo -> Cima)
                        document.getElementById('download-btn').style.animation = "slideUp 0.6s forwards";
                    });
                }, 600);
            });
        });
    });
}

function openContact() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (mail_service)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="contact-cmd"></span></div><div id="contact-res"></div>`;
    typeTerminal(document.getElementById('contact-cmd'), "./send_mail.sh", 40, () => {
        document.getElementById('contact-res').innerHTML = `
            <form id="email-form" action="https://formspree.io/f/xbdaajro" method="POST" class="terminal-form">
                <p style="color:#22d3ee; font-weight:bold;">[ FORMULÁRIO DE CONTATO ]</p>
                <input type="text" name="name" class="terminal-input" placeholder="SEU NOME" required>
                <input type="email" name="email" class="terminal-input" placeholder="SEU EMAIL" required>
                <textarea name="message" class="terminal-input" rows="3" placeholder="MENSAGEM..." required></textarea>
                <button type="submit" class="terminal-btn">ENVIAR</button>
            </form><div id="success-output"></div>`;

        const form = document.getElementById('email-form');
        form.onsubmit = async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            btn.innerText = "ENVIANDO...";
            const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } });
            if (response.ok) {
                const asciiArt = `<b>
      _____ _    _  _____ ______  _____ _____  ____  
     / ____| |  | |/ ____|  ____|/ ____/ ____|/ __ \\ 
    | (___ | |  | | |    | |__  | (___| (___ | |  | |
     \\___ \\| |  | | |    |  __|  \\___ \\\\___ \\| |  | |
     ____) | |__| | |____| |____ ____) |___) | |__| |
    |_____/ \\____/ \\_____|______|_____/_____/ \\____/ </b>
    <br>[ SUCESSO NO ENVIO ]`;
                document.getElementById('success-output').innerHTML = `<pre class="ascii-success">${asciiArt}</pre>`;
                form.style.display = 'none';
                Swal.fire({ icon: 'success', title: 'Enviado!', background: '#1a1a1a', color: '#fff' });
            }
        };
    });
}

function openEdu() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (education)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="edu-cmd"></span></div><div id="edu-res" style="margin-top:15px;"></div>`;
    typeTerminal(document.getElementById('edu-cmd'), "cat education.sh", 40, () => {
        typeTerminal(document.getElementById('edu-res'), "<strong>[ FORMAÇÃO ]</strong><br><br>• ESTÁCIO: ADS (2027)<br>• MICROCAMP: Linux & Redes", 5);
    });
}

function openExp() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (experiences)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="exp-cmd"></span></div><div id="exp-res" style="margin-top:15px;"></div>`;
    typeTerminal(document.getElementById('exp-cmd'), "cat experiences.sh", 40, () => {
        typeTerminal(document.getElementById('exp-res'), "<strong>[ EXPERIÊNCIAS ]</strong><br><br>• ALUARTS: Mkt Digital & ADM<br>• MUNDIAL MARCAS: Web Designer", 5);
    });
}

function openProject() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (projects)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="proj-cmd"></span></div><div id="proj-res" style="margin-top:15px;"></div>`;
    typeTerminal(document.getElementById('proj-cmd'), "./list_projects.sh", 40, () => {
        typeTerminal(document.getElementById('proj-res'), ">> FLOW HUB: <a href='https://flow-hub.shop' target='_blank' style='color:#22d3ee'>flow-hub.shop</a>", 10);
    });
}

function closeWin() { win.style.display = 'none'; }

// Canvas Anim
const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');
let pts = [];
const res = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
window.addEventListener('resize', res); res();
for(let i=0; i<30; i++) pts.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, vx:(Math.random()-0.5)*0.5, vy:(Math.random()-0.5)*0.5});
function anim() {
    ctx.clearRect(0,0,canvas.width,canvas.height); ctx.fillStyle = 'rgba(147,51,234,0.15)';
    pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>canvas.width) p.vx*=-1; if(p.y<0||p.y>canvas.height) p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,2,0,Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(anim);
}
anim();
