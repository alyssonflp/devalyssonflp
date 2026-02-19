const win = document.getElementById('main-terminal');
const content = document.getElementById('content');
const title = document.getElementById('win-title');

// Sua ASCII Art que representa sua identidade de Dev
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
                <img src="imagens/alysson.png" class="profile-img" onerror="this.src='https://via.placeholder.com/100'">
            </div>
            
            <pre class="ascii-art" style="font-size: 6px; line-height: 1; color: #3b82f6; overflow: hidden;">${asciiArt}</pre>
            
            <p style="color:#3b82f6; font-weight:bold; margin-top:10px;">> ALYSSON FELIPE</p>
            <p style="font-size:12px; margin-top:10px; opacity:0.8;">Engenheiro de Software & UI Designer.</p>
        </div>
    `;
}

async function openEdu() {
    win.style.display = 'flex';
    title.innerText = "formacao.sh";
    content.innerHTML = `<span id="typing"></span><span class="cursor"></span>`;
    
    const text = ">> ACESSANDO CARTEIRA ESTUDANTIL...\n>> ID: 2024-SW-ENGINEER\n>> NOME: ALYSSON FELIPE\n>> CURSO: Engenharia de Software\n>> INSTITUIÇÃO: Unicesumar\n>> STATUS: Ativo";
    
    let i = 0;
    const target = document.getElementById('typing');
    target.innerHTML = ""; // Limpa antes de começar

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
        <p style="font-size:12px; margin: 15px 0; opacity:0.7;">SaaS de gestão inteligente para microempresas.</p>
        <a href="https://flow-hub.shop" target="_blank" style="color:#3b82f6; font-weight:bold;">[ ABRIR LINK ]</a>
    `;
}

function closeWin() { 
    win.style.display = 'none'; 
}

// Lógica do Canvas Neural (Fundo animado)
const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');
let pts = [];

const res = () => { 
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
};

window.onresize = res; 
res();

for(let i=0; i<30; i++) {
    pts.push({
        x: Math.random() * canvas.width, 
        y: Math.random() * canvas.height, 
        vx: (Math.random() - 0.5) * 0.5, 
        vy: (Math.random() - 0.5) * 0.5
    });
}

function anim() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
    pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if(p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); 
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2); 
        ctx.fill();
    });
    requestAnimationFrame(anim);
}
anim();
