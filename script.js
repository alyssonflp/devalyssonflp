const win = document.getElementById('main-terminal');
const content = document.getElementById('content');
const title = document.getElementById('win-title');

const asciiArt = `
   ██████╗ ███████╗██╗   ██╗
   ██╔══██╗██╔════╝██║   ██║
   ██║  ██║█████╗  ██║   ██║
   ██║  ██║██╔══╝  ╚██╗ ██╔╝
   ██████╔╝███████╗ ╚████╔╝ 
   ╚═════╝ ╚══════╝  ╚═══╝  
`;

function openBio() {
    win.style.display = 'flex';
    title.innerText = "alysson.bio";
    content.innerHTML = `
        <div style="text-align:center">
            <div class="insta-glow"><img src="https://i.ibb.co/pWzN0XN/smart-glasses-png.png" class="profile-img"></div>
            <pre class="ascii-art">${asciiArt}</pre>
            <p style="color:#3b82f6; font-weight:bold;">> ALYSSON FELIPE</p>
            <p style="font-size:12px; margin-top:10px; color:#888;">Engenheiro de Software & UI Designer.</p>
        </div>
    `;
}

async function openEdu() {
    win.style.display = 'flex';
    title.innerText = "formacao.sh";
    content.innerHTML = `<span id="typing"></span><span class="cursor"></span>`;
    const text = ">> STATUS: ACESSANDO DADOS...\n>> UNICESUMAR: Engenharia de Software\n>> CURSO: Graduação (2024-2027)\n>> INGLÊS: Nível B1 Intermediário\n>> FOCO: Fullstack & Cloud Systems.";
    let i = 0;
    const target = document.getElementById('typing');
    function type() {
        if (i < text.length) {
            target.innerHTML += text.charAt(i) === "\n" ? "<br>" : text.charAt(i);
            i++;
            setTimeout(type, 30);
        }
    }
    type();
}

function openProject() {
    win.style.display = 'flex';
    title.innerText = "projetos.log";
    content.innerHTML = `
        <p style="color:#34d399">> PROJETO: FLOW HUB</p>
        <p style="font-size:12px; margin: 15px 0; color:#888;">Ecossistema para gestão de microempresas.</p>
        <a href="https://flow-hub.shop" target="_blank" style="color:#3b82f6; font-weight:bold;">[ ACESSAR ]</a>
    `;
}

function closeWin() { win.style.display = 'none'; }

// Canvas Neural
const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');
let pts = [];
const res = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
window.onresize = res; res();
for(let i=0; i<30; i++) pts.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, vx:(Math.random()-0.5)*0.5, vy:(Math.random()-0.5)*0.5});
function anim() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'rgba(59,130,246,0.3)';
    pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>canvas.width) p.vx*=-1; if(p.y<0||p.y>canvas.height) p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,2,0,Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(anim);
}
anim();
