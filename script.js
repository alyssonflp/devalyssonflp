const win = document.getElementById('main-terminal');
const content = document.getElementById('content');
const title = document.getElementById('win-title');

// ASCII Art customizada com o seu nome (Reduzida para caber no mobile)
const nameAscii = `
   A L Y S S O N 
   F E L I P E
   ───────────
`;

function typeEffect(element, text, speed = 20) {
    let i = 0;
    element.innerHTML = "";
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i) === "\n" ? "<br>" : text.charAt(i);
            i++;
            setTimeout(typing, speed);
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
            <pre class="ascii-art">${nameAscii}</pre>
            <div id="bio-typing" style="margin-top:10px;"></div>
            <span class="cursor"></span>
        </div>
    `;
    
    const bioText = ">> ADS | UI/UX Designer | IoT & IA\n\nApaixonado por tecnologia e design, transito entre o código e a experiência do usuário. Atualmente cursando Análise e Desenvolvimento de Sistemas, aplico IA e IoT para criar sistemas inteligentes e interfaces que conectam, do protótipo à implementação.";
    
    // Pequeno delay para começar a digitação após abrir a janela
    setTimeout(() => {
        const target = document.getElementById('bio-typing');
        let i = 0;
        function bioType() {
            if (i < bioText.length) {
                if (bioText.substring(i, i+33) === "ADS | UI/UX Designer | IoT & IA") {
                    target.innerHTML += `<strong style="color:#3b82f6">ADS | UI/UX Designer | IoT & IA</strong>`;
                    i += 33;
                } else {
                    target.innerHTML += bioText.charAt(i) === "\n" ? "<br>" : bioText.charAt(i);
                    i++;
                }
                setTimeout(bioType, 15);
            }
        }
        bioType();
    }, 300);
}

function openEdu() {
    win.style.display = 'flex';
    title.innerText = "education.sh";
    content.innerHTML = `<span id="edu-typing"></span><span class="cursor"></span>`;
    const text = ">> ACESSANDO CARTEIRA...\n>> NOME: ALYSSON FELIPE\n>> CURSO: Análise e Desenv. de Sistemas\n>> FOCO: IA, IoT e UX Design\n>> STATUS: Em evolução constante...";
    typeEffect(document.getElementById('edu-typing'), text);
}

function openProject() {
    win.style.display = 'flex';
    title.innerText = "projects.log";
    content.innerHTML = `<span id="proj-typing"></span><span class="cursor"></span>`;
    const text = ">> PROJETO: FLOW HUB\n>> TIPO: SaaS de Gestão\n>> LINK: https://flow-hub.shop\n\n[ Clique no link para abrir ]";
    typeEffect(document.getElementById('proj-typing'), text);
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
