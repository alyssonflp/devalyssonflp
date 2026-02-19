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

function typeEffect(element, htmlText, speed = 10, callback) {
    let i = 0;
    element.innerHTML = "";
    // Criamos um array de partes para lidar com o HTML
    const parts = htmlText.split(/(<[^>]*>)/g);
    let partIdx = 0;
    let charIdx = 0;

    function typing() {
        if (partIdx < parts.length) {
            if (parts[partIdx].startsWith("<")) {
                element.innerHTML += parts[partIdx];
                partIdx++;
                typing();
            } else {
                if (charIdx < parts[partIdx].length) {
                    element.innerHTML += parts[partIdx].charAt(charIdx);
                    charIdx++;
                    setTimeout(typing, speed);
                } else {
                    partIdx++;
                    charIdx = 0;
                    typing();
                }
            }
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
    function step1() {
        if (i < nameAscii.length) {
            document.getElementById('ascii-target').innerHTML += nameAscii.charAt(i);
            i++; setTimeout(step1, 1);
        } else { i = 0; step2(); }
    }
    function step2() {
        if (i < adsText.length) {
            document.getElementById('ads-target').innerHTML += adsText.charAt(i);
            i++; setTimeout(step2, 20);
        } else { i = 0; step3(); }
    }
    function step3() {
        typeEffect(document.getElementById('bio-typing'), bioDescription, 15);
    }
    setTimeout(step1, 300);
}

function openEdu() {
    win.style.display = 'flex';
    title.innerText = "education.sh";
    content.innerHTML = `<div id="edu-content" style="line-height:1.6;"></div><span class="cursor"></span>`;
    
    const eduTarget = document.getElementById('edu-content');
    eduTarget.innerHTML = `<strong style="color:var(--accent)">alyssonfelipe@root:~$</strong> `;

    const fullEduText = `[ EDUCAÇÃO ]\n\n` +
        `• <strong>FACULDADE ESTÁCIO</strong>\n` +
        `  Tecnólogo em Análise e Desenvolvimento de Sistemas\n` +
        `  Situação: Cursando (1º Período) | Previsão: 2027\n\n` +
        `• <strong>MICROCAMP CURITIBA</strong>\n` +
        `  Informática Avançada (Windows, Linux, HW, SW, Redes, Firewall)\n` +
        `  Status: Concluído\n\n` +
        `• <strong>COLÉGIO ESTADUAL ARNALDO FAIVRO BUSATO</strong>\n` +
        `  Ensino Médio | Status: Concluído\n\n` +
        `[ QUALIFICAÇÕES & EXTRA ]\n\n` +
        `- <strong>Design & Web:</strong> Domínio em Photoshop, identidades visuais e WordPress.\n` +
        `- <strong>Sistemas Inteligentes:</strong> IA/IoT, reconhecimento facial e hardware.\n` +
        `- <strong>Ferramentas de Escritório:</strong> Pacote Office completo.\n` +
        `- <strong>Idiomas:</strong> Inglês nível A1.`;

    let k = 0;
    const cmd = "cat education.sh\n\n";
    function typeCommand() {
        if (k < cmd.length) {
            eduTarget.innerHTML += cmd.charAt(k) === "\n" ? "<br>" : cmd.charAt(k);
            k++; setTimeout(typeCommand, 50);
        } else {
            typeEffect(eduTarget, fullEduText, 5);
        }
    }
    typeCommand();
}

function openProject() {
    win.style.display = 'flex';
    title.innerText = "projects.log";
    content.innerHTML = `<div id="proj-content"></div><span class="cursor"></span>`;
    const target = document.getElementById('proj-content');
    target.innerHTML = `<strong style="color:var(--accent)">alyssonfelipe@root:~$</strong> `;
    
    const text = "list-projects --active\n\n>> <strong>PROJETO:</strong> FLOW HUB\n>> <strong>TIPO:</strong> SaaS de Gestão\n>> <strong>LINK:</strong> https://flow-hub.shop";
    typeEffect(target, text, 20);
}

function closeWin() { win.style.display = 'none'; }

// Canvas
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
