const win = document.getElementById('main-terminal');
const content = document.getElementById('content');
const title = document.getElementById('win-title');

// ADS | UI/UX em ASCII Art
const roleAscii = `
     _   ___  ____  
    /_\\ |   \\/ ___| 
   / _ \\| |) \\___ \\ 
  /_/ \\_\\___/|____/ 
  | UI / UX DESIGN |
`;

function typeEffect(element, text, speed = 15, callback) {
    let i = 0;
    element.innerHTML = "";
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
            <pre class="ascii-art">${roleAscii}</pre>
            <p style="color:var(--accent); font-weight:bold; font-size:16px; margin-bottom:10px;">Alysson Felipe</p>
            <div id="bio-typing" style="text-align:left; line-height:1.5; opacity:0.9;"></div>
            <span class="cursor"></span>
        </div>
    `;
    
    const bioDescription = "Apaixonado por tecnologia e design, transito entre o código e a experiência do usuário. Atualmente cursando Análise e Desenvolvimento de Sistemas, aplico IA e IoT para criar sistemas inteligentes e interfaces que conectam, do protótipo à implementação.";
    
    setTimeout(() => {
        typeEffect(document.getElementById('bio-typing'), bioDescription);
    }, 500);
}

function openEdu() {
    win.style.display = 'flex';
    title.innerText = "education.sh";
    content.innerHTML = `<span id="edu-typing"></span><span class="cursor"></span>`;
    const text = ">> INSTITUIÇÃO: Unicesumar\n>> CURSO: Análise e Desenv. de Sistemas (ADS)\n>> FOCO: UI/UX, IoT e IA\n>> STATUS: Estudante Ativo";
    typeEffect(document.getElementById('edu-typing'), text);
}

function openProject() {
    win.style.display = 'flex';
    title.innerText = "projects.log";
    content.innerHTML = `<span id="proj-typing"></span><span class="cursor"></span>`;
    const text = ">> PROJETO: FLOW HUB\n>> TIPO: SaaS de Gestão\n>> LINK: https://flow-hub.shop";
    typeEffect(document.getElementById('proj-typing'), text);
}

function closeWin() { win.style.display = 'none'; }

// Canvas Neural de Fundo
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
