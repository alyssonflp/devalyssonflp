const win = document.getElementById('main-terminal');
const content = document.getElementById('content');
const title = document.getElementById('win-title');

const roleAscii = `
     _   ___  ____  
    /_\\ |   \\/ ___| 
   / _ \\| |) \\___ \\ 
  /_/ \\_\\___/|____/ 
  | UI / UX DESIGN |
`;

function openBio() {
    win.style.display = 'flex';
    title.innerText = "profile.sh";
    
    // Prepara o container vazio
    content.innerHTML = `
        <div style="text-align:center">
            <div class="insta-glow">
                <img src="./imagens/alysson.png" class="profile-img" onerror="this.src='./Imagens/alysson.png';">
            </div>
            <pre id="ascii-target" class="ascii-art"></pre>
            <p id="name-target" style="color:var(--accent); font-weight:bold; font-size:18px; margin-bottom:10px;"></p>
            <div id="bio-typing" style="text-align:left; line-height:1.5; opacity:0.9;"></div>
            <span id="main-cursor" class="cursor"></span>
        </div>
    `;

    const nameText = "> Alysson Felipe";
    const bioDescription = "Apaixonado por tecnologia e design, transito entre o código e a experiência do usuário. Atualmente cursando Análise e Desenvolvimento de Sistemas, aplico IA e IoT para criar sistemas inteligentes e interfaces que conectam, do protótipo à implementação.";

    let i = 0;
    const asciiTarget = document.getElementById('ascii-target');
    const nameTarget = document.getElementById('name-target');
    const bioTarget = document.getElementById('bio-typing');
    const cursor = document.getElementById('main-cursor');

    // Função de Digitação Sequencial
    function step1_Ascii() {
        if (i < roleAscii.length) {
            asciiTarget.innerHTML += roleAscii.charAt(i);
            i++;
            setTimeout(step1_Ascii, 5);
        } else {
            i = 0;
            step2_Name();
        }
    }

    function step2_Name() {
        if (i < nameText.length) {
            nameTarget.innerHTML += nameText.charAt(i);
            i++;
            setTimeout(step2_Name, 30);
        } else {
            i = 0;
            step3_Bio();
        }
    }

    function step3_Bio() {
        if (i < bioDescription.length) {
            bioTarget.innerHTML += bioDescription.charAt(i) === "\n" ? "<br>" : bioDescription.charAt(i);
            i++;
            setTimeout(step3_Bio, 15);
        }
    }

    // Inicia o processo
    setTimeout(step1_Ascii, 300);
}

// Funções de apoio para os outros botões
function typeSimple(element, text) {
    let i = 0;
    element.innerHTML = "";
    function t() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i) === "\n" ? "<br>" : text.charAt(i);
            i++;
            setTimeout(t, 20);
        }
    }
    t();
}

function openEdu() {
    win.style.display = 'flex';
    title.innerText = "education.sh";
    content.innerHTML = `<span id="edu-typing"></span><span class="cursor"></span>`;
    typeSimple(document.getElementById('edu-typing'), ">> INSTITUIÇÃO: Unicesumar\n>> CURSO: Análise e Desenv. de Sistemas (ADS)\n>> FOCO: UI/UX, IoT e IA\n>> STATUS: Estudante Ativo");
}

function openProject() {
    win.style.display = 'flex';
    title.innerText = "projects.log";
    content.innerHTML = `<span id="proj-typing"></span><span class="cursor"></span>`;
    typeSimple(document.getElementById('proj-typing'), ">> PROJETO: FLOW HUB\n>> TIPO: SaaS de Gestão\n>> LINK: https://flow-hub.shop");
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
