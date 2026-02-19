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

// Função principal de digitação
function typeEffect(element, text, speed = 10, callback) {
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i) === "\n" ? "<br>" : text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else if (callback) {
            callback();
        }
    }
    typing();
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
    const bioDescription = "Apaixonado por tecnologia e design, transito entre o código e a experiência do usuário. Atualmente cursando Análise e Desenvolvimento de Sistemas, aplico IA e IoT para criar sistemas inteligentes e interfaces que conectam, do protótipo à implementação.";

    let i = 0;
    const asciiTarget = document.getElementById('ascii-target');
    const adsTarget = document.getElementById('ads-target');
    const bioTarget = document.getElementById('bio-typing');

    function step1() {
        if (i < nameAscii.length) {
            asciiTarget.innerHTML += nameAscii.charAt(i);
            i++; setTimeout(step1, 1);
        } else { i = 0; step2(); }
    }
    function step2() {
        if (i < adsText.length) {
            adsTarget.innerHTML += adsText.charAt(i);
            i++; setTimeout(step2, 20);
        } else { i = 0; step3(); }
    }
    function step3() {
        typeEffect(bioTarget, bioDescription, 15);
    }
    setTimeout(step1, 300);
}

function openEdu() {
    win.style.display = 'flex';
    title.innerText = "education.sh";
    content.innerHTML = `<div id="edu-content" style="line-height:1.6;"></div><span class="cursor"></span>`;
    
    const eduTarget = document.getElementById('edu-content');
    
    // O comando sendo "digitado" primeiro
    const commandLine = "alyssonfelipe@root:~$ cat education.sh\n\n";
    const fullEduText = `[ EDUCAÇÃO ]\n\n` +
        `• FACULDADE ESTÁCIO\n` +
        `  Tecnólogo em Análise e Desenvolvimento de Sistemas\n` +
        `  Situação: Cursando (1º Período) | Previsão: 2027\n\n` +
        `• MICROCAMP CURITIBA\n` +
        `  Informática Avançada (Windows, Linux, HW, SW, Redes, Firewall)\n` +
        `  Status: Concluído\n\n` +
        `• COLÉGIO ESTADUAL ARNALDO FAIVRO BUSATO\n` +
        `  Ensino Médio | Status: Concluído\n\n` +
        `[ QUALIFICAÇÕES & EXTRA ]\n\n` +
        `- Design & Web: Photoshop, Identidade Visual, WordPress (SEO/SEM).\n` +
        `- Sistemas Inteligentes: IA/IoT, Reconhecimento Facial e Hardware.\n` +
        `- Office: Pacote completo (Excel, Word, PPT).\n` +
        `- Idiomas: Inglês (Nível A1).`;

    // Digita o prompt em negrito e depois o conteúdo
    eduTarget.innerHTML = `<strong style="color:var(--accent)">alyssonfelipe@root:~$</strong> `;
    
    let j = 18; // Pula o prompt já escrito
    const cmd = "cat education.sh\n\n";
    let k = 0;

    function typeCommand() {
        if (k < cmd.length) {
            eduTarget.innerHTML += cmd.charAt(k) === "\n" ? "<br>" : cmd.charAt(k);
            k++; setTimeout(typeCommand, 50);
        } else {
            typeEffect(eduTarget, fullEduText, 8);
        }
    }
    typeCommand();
}

function openProject() {
    win.style.display = 'flex';
    title.innerText = "projects.log";
    content.innerHTML = `<div id="proj-content"></div><span class="cursor"></span>`;
    const projTarget = document.getElementById('proj-content');
    projTarget.innerHTML = `<strong style="color:var(--accent)">alyssonfelipe@root:~$</strong> list-projects --active\n\n`;
    const text = ">> PROJETO: FLOW HUB\n>> TIPO: SaaS de Gestão Inteligente\n>> LINK: https://flow-hub.shop\n>> STATUS: Online";
    setTimeout(() => typeEffect(projTarget, text, 20), 500);
}

function closeWin() { win.style.display = 'none'; }

// Canvas Neural
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
