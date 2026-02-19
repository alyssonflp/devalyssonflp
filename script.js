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

function typeTerminal(element, html, speed, callback) {
    let i = 0;
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
    content.innerHTML = `
        <div><strong style="color:var(--accent)">alyssonfelipe@root:~$</strong> <span id="cmd-edu"></span></div>
        <div id="edu-output" style="margin-top:15px;"></div>
        <span class="cursor"></span>
    `;
    const eduData = 
        `<strong>[ EDUCAÇÃO ]</strong><br><br>` +
        `• <strong>FACULDADE ESTÁCIO</strong><br>` +
        `  Tecnólogo em ADS | Cursando (1º Período) | Previsão: 2027<br><br>` +
        `• <strong>MICROCAMP CURITIBA</strong><br>` +
        `  <strong>Informática Avançada:</strong> Windows, Linux, Redes e Firewall<br><br>` +
        `• <strong>COLÉGIO ARNALDO FAIVRO BUSATO</strong><br>` +
        `  Ensino Médio | Concluído<br><br>` +
        `<strong>[ QUALIFICAÇÕES ]</strong><br><br>` +
        `- <strong>Design & Web:</strong> Photoshop, ID Visual e WordPress.<br>` +
        `- <strong>Sistemas Inteligentes:</strong> IA/IoT e Hardware.<br>` +
        `- <strong>Ferramentas:</strong> Pacote Office completo.<br>` +
        `- <strong>Idiomas:</strong> Inglês nível A1.`;

    typeTerminal(document.getElementById('cmd-edu'), "cat education.sh", 50, () => {
        setTimeout(() => typeTerminal(document.getElementById('edu-output'), eduData, 5), 200);
    });
}

function openExp() {
    win.style.display = 'flex';
    title.innerText = "experiences.sh";
    content.innerHTML = `
        <div><strong style="color:var(--accent)">alyssonfelipe@root:~$</strong> <span id="cmd-exp"></span></div>
        <div id="exp-output" style="margin-top:15px;"></div>
        <span class="cursor"></span>
    `;
    const expData = 
        `<strong>[ EXPERIÊNCIAS ]</strong><br><br>` +
        `• <strong>ALUARTS ESQUADRIAS</strong> – Pinhais, PR<br>` +
        `  <strong>Aux. Administrativo & Marketing Digital</strong> | 2020 – 2024<br>` +
        `  - Atuação estratégica em Marketing Digital e processos administrativos.<br><br>` +
        `• <strong>MUNDIAL MARCAS</strong> – Curitiba, PR<br>` +
        `  <strong>Web Designer</strong> | 2015 – 2017<br>` +
        `  - Elaboração de conceitos visuais e identidades visuais.<br><br>` +
        `• <strong>OMAR CALÇADOS</strong> – Curitiba, PR<br>` +
        `  <strong>Consultor de Vendas</strong> | 2013 – 2014<br>` +
        `  - Estudo de mercado e estratégias de venda.`;

    typeTerminal(document.getElementById('cmd-exp'), "cat experiences.sh", 50, () => {
        setTimeout(() => typeTerminal(document.getElementById('exp-output'), expData, 5), 200);
    });
}

function openProject() {
    win.style.display = 'flex';
    title.innerText = "projects.log";
    content.innerHTML = `<div><strong style="color:var(--accent)">alyssonfelipe@root:~$</strong> <span id="cmd-proj"></span></div><div id="proj-output" style="margin-top:15px;"></div><span class="cursor"></span>`;
    const text = `>> <strong>PROJETO:</strong> FLOW HUB<br>>> <strong>STATUS:</strong> ONLINE<br>>> <strong>URL:</strong> https://flow-hub.shop`;
    typeTerminal(document.getElementById('cmd-proj'), "./list_projects.sh", 50, () => {
        setTimeout(() => typeTerminal(document.getElementById('proj-output'), text, 20), 200);
    });
}

function closeWin() { win.style.display = 'none'; }

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
