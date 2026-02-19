const win = document.getElementById('main-terminal');
const content = document.getElementById('content');
const title = document.getElementById('win-title');

const nameAscii = `
██████╗ ██╗  ██╗   ██╗███████╗███████╗ ██████╗ ███╗   ██╗
██╔══██╗██║  ╚██╗ ██╔╝██╔════╝██╔════╝██╔═══██╗████╗  ██║
███████║██║   ╚████╔╝ ███████╗███████╗██║   ██║██╔██╗ ██║
██╔══██║██║    ╚██╔╝  ╚════██║╚════██║██║   ██║██║╚██╗██║
██║  ██║███████╗██║   ███████║███████║╚██████╔╝██║ ╚████║
╚═╝  ╚═╝╚══════╝╚═╝   ╚══════╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝
`;

// FUNÇÃO MESTRE DE DIGITAÇÃO: Suporta HTML e não apaga o anterior
function typeTerminal(element, html, speed, callback) {
    let i = 0;
    const timer = setInterval(() => {
        if (html.charAt(i) === '<') {
            // Se encontrar uma tag HTML (como <strong> ou <br>), pula para o final dela para não quebrar o código
            let endTag = html.indexOf('>', i);
            element.innerHTML += html.substring(i, endTag + 1);
            i = endTag + 1;
        } else {
            element.innerHTML += html.charAt(i);
            i++;
        }
        
        // Auto-scroll para acompanhar a digitação
        content.scrollTop = content.scrollHeight;

        if (i >= html.length) {
            clearInterval(timer);
            if (callback) callback();
        }
    }, speed);
}

function openBio() {
    win.style.display = 'flex';
    title.innerText = "profile.sh";
    content.innerHTML = `
        <div style="text-align:center">
            <div class="insta-glow">
                <img src="./imagens/alysson.png" class="profile-img" onerror="this.src='./Imagens/alysson.png';">
            </div>
            <pre id="ascii-target" class="ascii-art"></pre>
            <p id="ads-target" style="color:var(--accent); font-weight:bold; font-size:14px; margin-bottom:10px;"></p>
            <div id="bio-typing" style="text-align:left; line-height:1.5; opacity:0.9;"></div>
            <span class="cursor"></span>
        </div>
    `;

    const adsText = "> ADS | UI/UX Designer | IoT & IA";
    const bioText = "Apaixonado por tecnologia e design, transito entre o código e a experiência do usuário. Atualmente cursando Análise e Desenvolvimento de Sistemas, aplico IA e IoT para criar sistemas inteligentes e interfaces que conectam, do protótipo à implementação.";

    let i = 0;
    function step1() {
        if (i < nameAscii.length) {
            document.getElementById('ascii-target').innerHTML += nameAscii.charAt(i);
            i++; setTimeout(step1, 1);
        } else { 
            i = 0; 
            typeTerminal(document.getElementById('ads-target'), adsText, 30, () => {
                typeTerminal(document.getElementById('bio-typing'), bioText, 15);
            });
        }
    }
    setTimeout(step1, 300);
}

function openEdu() {
    win.style.display = 'flex';
    title.innerText = "education.sh";
    
    // 1. Define o prompt inicial (root)
    content.innerHTML = `
        <div><strong style="color:var(--accent)">alyssonfelipe@root:~$</strong> <span id="cmd-span"></span></div>
        <div id="edu-output" style="margin-top:15px; line-height:1.6;"></div>
        <span class="cursor"></span>
    `;
    
    const cmdSpan = document.getElementById('cmd-span');
    const output = document.getElementById('edu-output');

    // 2. Texto formatado com <strong> para os títulos
    const eduData = 
        `<strong>[ EDUCAÇÃO ]</strong><br><br>` +
        `• <strong>FACULDADE ESTÁCIO</strong><br>` +
        `  Tecnólogo em Análise e Desenvolvimento de Sistemas<br>` +
        `  Situação: Cursando (1º Período) | Previsão: 2027<br><br>` +
        `• <strong>MICROCAMP CURITIBA</strong><br>` +
        `  Informática Avançada (Windows, Linux, Redes e Firewall)<br>` +
        `  Status: Concluído<br><br>` +
        `• <strong>COLÉGIO ARNALDO FAIVRO BUSATO</strong><br>` +
        `  Ensino Médio | Status: Concluído<br><br>` +
        `<strong>[ QUALIFICAÇÕES ]</strong><br><br>` +
        `- <strong>Design & Web:</strong> Photoshop, ID Visual e WordPress.<br>` +
        `- <strong>Sistemas Inteligentes:</strong> IA/IoT e Hardware.<br>` +
        `- <strong>Ferramentas:</strong> Pacote Office completo.<br>` +
        `- <strong>Idiomas:</strong> Inglês nível A1.`;

    // 3. Execução sequencial: Primeiro digita o comando, depois o resultado
    typeTerminal(cmdSpan, "cat education.sh", 50, () => {
        setTimeout(() => {
            typeTerminal(output, eduData, 5);
        }, 200);
    });
}

function openProject() {
    win.style.display = 'flex';
    title.innerText = "projects.log";
    content.innerHTML = `
        <div><strong style="color:var(--accent)">alyssonfelipe@root:~$</strong> <span id="cmd-proj"></span></div>
        <div id="proj-output" style="margin-top:15px;"></div>
        <span class="cursor"></span>
    `;
    
    const cmdProj = document.getElementById('cmd-proj');
    const output = document.getElementById('proj-output');
    const text = `>> <strong>PROJETO:</strong> FLOW HUB<br>>> <strong>STATUS:</strong> ONLINE<br>>> <strong>URL:</strong> https://flow-hub.shop`;
    
    typeTerminal(cmdProj, "./list_projects.sh", 50, () => {
        setTimeout(() => {
            typeTerminal(output, text, 20);
        }, 200);
    });
}

function closeWin() { win.style.display = 'none'; }

// Canvas Neural (Otimizado)
const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');
let pts = [];
const res = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
window.onresize = res; res();
for(let i=0; i<25; i++) pts.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, vx:(Math.random()-0.5)*0.4, vy:(Math.random()-0.5)*0.4});
function anim() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'rgba(59,130,246,0.2)';
    pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>canvas.width) p.vx*=-1; if(p.y<0||p.y>canvas.height) p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,2,0,Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(anim);
}
anim();
