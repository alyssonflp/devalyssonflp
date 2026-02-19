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
            <div class="insta-glow">
                <img src="./imagens/alysson.png" class="profile-img" onerror="this.src='./Imagens/alysson.png';">
            </div>
            <pre class="ascii-art">${asciiArt}</pre>
            <p class="text-blue-500" style="font-weight:bold; margin-top:5px;">> ALYSSON FELIPE</p>
            <p style="font-size:12px; margin-top:5px; opacity:0.8;">Software Engineer</p>
        </div>
    `;
}

async function openEdu() {
    win.style.display = 'flex';
    title.innerText = "formacao.sh";
    content.innerHTML = `<span id="typing" style="color:var(--text-main)"></span><span class="cursor" style="display:inline-block; width:8px; height:15px; background:#3b82f6; animation:blink 1s infinite"></span>`;
    const text = ">> ACESSANDO CARTEIRA...\n>> ID: 2024-ENG\n>> NOME: ALYSSON FELIPE\n>> CURSO: Eng. de Software\n>> STATUS: Formação em curso";
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
    content.innerHTML = `<p class="text-orange-500">> PROJETO: FLOW HUB</p><p style="margin:10px 0; font-size:12px;">SaaS de gestão inteligente.</p><a href="https://flow-hub.shop" target="_blank" style="color:#3b82f6;">[ ABRIR ]</a>`;
}

function closeWin() { win.style.display = 'none'; }

// Canvas
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
