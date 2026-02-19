const win = document.getElementById('main-terminal');
const content = document.getElementById('content');
const title = document.getElementById('win-title');

window.onload = () => { 
    setTimeout(typePassword, 800); 
};

function typePassword() {
    const passInput = document.getElementById('pass-input');
    const fullPass = "********";
    let i = 0;
    
    if (!passInput) return;

    const interval = setInterval(() => {
        passInput.value += fullPass[i]; 
        i++;
        
        if (i >= fullPass.length) {
            clearInterval(interval);
            
            // Sincronizado com o ID do seu HTML: boot-progress
            const loaderBar = document.getElementById('boot-progress');
            
            if (loaderBar) {
                let progress = 0;
                const loadTimer = setInterval(() => {
                    progress += 5;
                    loaderBar.style.width = progress + "%";
                    if (progress >= 100) {
                        clearInterval(loadTimer);
                        setTimeout(startBoot, 500);
                    }
                }, 50);
            } else {
                setTimeout(startBoot, 1000);
            }
        }
    }, 120);
}

function startBoot() {
    const loginScreen = document.getElementById('login-screen');
    const helloScreen = document.getElementById('hello-screen');
    
    if (loginScreen) loginScreen.style.opacity = '0';
    
    setTimeout(() => {
        if (loginScreen) loginScreen.style.display = 'none';
        if (helloScreen) {
            helloScreen.style.display = 'flex';
            helloScreen.style.opacity = '1';
        }
        
        setTimeout(() => {
            if (helloScreen) helloScreen.style.opacity = '0';
            setTimeout(() => {
                if (helloScreen) helloScreen.style.display = 'none';
                
                const dock = document.getElementById('dock-main');
                const canvas = document.getElementById('neural-canvas');
                
                if (dock) {
                    dock.style.display = 'flex';
                    dock.style.opacity = '1';
                }
                if (canvas) canvas.style.opacity = '1';
                
                openBio(); 
            }, 500);
        }, 1200);
    }, 500);
}

function typeTerminal(element, html, speed, callback) {
    if (!element) return;
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
        if (content) content.scrollTop = content.scrollHeight;
        if (i >= html.length) { 
            clearInterval(timer); 
            if (callback) callback(); 
        }
    }, speed);
}

function openBio() {
    if (!win || !content) return;
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (profile)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="bio-cmd"></span></div><div id="bio-res"></div>`;
    
    typeTerminal(document.getElementById('bio-cmd'), "./profile.sh", 50, () => {
        const bioRes = document.getElementById('bio-res');
        if (bioRes) {
            bioRes.innerHTML = `
            <div style="text-align:center; margin-top:10px;">
                <h1 class="main-name">Alysson Felipe</h1>
                <p class="ads-text">> ADS | UI/UX Designer | IoT & IA</p>
                
                <div class="social-links">
                    <a href="https://github.com/alyssonflp" target="_blank" class="social-icon fa-github"><i class="fab fa-github"></i></a>
                    <a href="https://linkedin.com/in/alyssonfelipe" target="_blank" class="social-icon fa-linkedin"><i class="fab fa-linkedin"></i></a>
                    <a href="https://instagram.com/alysson.dev" target="_blank" class="social-icon fa-instagram"><i class="fab fa-instagram"></i></a>
                </div>

                <p style="text-align:left; opacity:0.8; margin: 20px 0; font-size:14px; line-height:1.6;">
                    Apaixonado por tecnologia e design, transito entre o código e a experiência do usuário. Atualmente cursando ADS na Estácio, aplico conceitos de tecnologia para criar sistemas inteligentes e interfaces funcionais.
                </p>

                <a href="./assets/cv-alysson.pdf" download class="cv-btn" style="opacity:1;">
                    CURRICULO <i class="fas fa-download"></i>
                </a>
            </div>`;
        }
    });
}

function openEdu() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (education)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="edu-cmd"></span></div><div id="edu-res" style="margin-top:15px; white-space: pre-wrap;"></div>`;
    
    const data = `<strong>[EDUCAÇÃO]</strong><br><br>` +
                 `FACULDADE ESTÁCIO<br>Tecnólogo em Análise e Desenvolvimento de Sistemas - Cursando (1º Período)<br><br>` +
                 `MICROCAMP CURITIBA<br>Conteúdo: Windows, Linux, Hardware, Software, Redes e Firewall - Concluído<br><br>` +
                 `COLÉGIO ESTADUAL ARNALDO FAIVRO BUSATO<br>Ensino Médio - Concluído<br><br>` +
                 `<strong>[QUALIFICAÇÕES COMPLEMENTARES]</strong><br><br>` +
                 `• Design & Web: Domínio em Photoshop, criação de identidades visuais, desenvolvimento de sites, SEO & SEM.<br>` +
                 `• Sistemas Inteligentes (IA/IoT): Experiência prática na implementação de sistemas e integração de hardware.<br>` +
                 `• Ferramentas de Escritório: Pacote Office completo<br>` +
                 `• Idiomas: Inglês nível A1.`;

    // Atualizado para ./education.sh com efeito de digitação no comando e no conteúdo
    typeTerminal(document.getElementById('edu-cmd'), "./education.sh", 40, () => {
        const eduRes = document.getElementById('edu-res');
        if (eduRes) typeTerminal(eduRes, data, 10); 
    });
}

function openExp() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (experiences)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="exp-cmd"></span></div><div id="exp-res" style="margin-top:15px;"></div>`;
    typeTerminal(document.getElementById('exp-cmd'), "ls -la /career", 40, () => {
        const expRes = document.getElementById('exp-res');
        if (expRes) expRes.innerHTML = `• ALUARTS: Mkt Digital<br>• MUNDIAL MARCAS: Web Designer`;
    });
}

function openProject() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (projects)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="proj-cmd"></span></div><div id="proj-res" style="margin-top:15px;"></div>`;
    typeTerminal(document.getElementById('proj-cmd'), "./list_projects.sh", 40, () => {
        const projRes = document.getElementById('proj-res');
        if (projRes) projRes.innerHTML = `>> FLOW HUB: <a href='https://flow-hub.shop' target='_blank' style='color:var(--accent)'>flow-hub.shop</a>`;
    });
}

function openContact() {
    win.style.display = 'flex';
    title.innerText = "alyssonfelipe@root: ~ (mail_service)";
    content.innerHTML = `<div><strong>alyssonfelipe@root:~$</strong> <span id="contact-cmd"></span></div><div id="contact-res"></div>`;
    typeTerminal(document.getElementById('contact-cmd'), "./send_mail.sh", 40, () => {
        const contactRes = document.getElementById('contact-res');
        if (contactRes) {
            contactRes.innerHTML = `
                <form id="email-form" action="https://formspree.io/f/xbdaajro" method="POST" style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
                    <input type="email" name="email" class="terminal-input" placeholder="Seu e-mail" required>
                    <textarea name="message" class="terminal-input" placeholder="Sua mensagem..." required style="height: 80px;"></textarea>
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
                    document.getElementById('success-output').innerHTML = `<pre class="ascii-success" style="color:var(--accent);">${art}\n\n[ MENSAGEM ENVIADA COM SUCESSO ]</pre>`;
                    form.style.display = 'none';
                }
            };
        }
    });
}

function closeWin() { 
    if (win) win.style.display = 'none'; 
}

const canvas = document.getElementById('neural-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let pts = [];
    const res = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', res); 
    res();
    for(let i=0; i<30; i++) pts.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, vx:(Math.random()-0.5)*0.5, vy:(Math.random()-0.5)*0.5});
    function anim() {
        ctx.clearRect(0,0,canvas.width,canvas.height); 
        ctx.fillStyle = 'rgba(147, 51, 234, 0.15)'; 
        pts.forEach(p => {
            p.x+=p.vx; p.y+=p.vy;
            if(p.x<0||p.x>canvas.width) p.vx*=-1; 
            if(p.y<0||p.y>canvas.height) p.vy*=-1;
            ctx.beginPath(); 
            ctx.arc(p.x,p.y,2,0,Math.PI*2); 
            ctx.fill();
        });
        requestAnimationFrame(anim);
    }
    anim();
}
