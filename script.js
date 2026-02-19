const win = document.getElementById('main-terminal');
const content = document.getElementById('content');
const title = document.getElementById('win-title');

// SEQUÊNCIA ACELERADA
window.onload = () => {
    setTimeout(startBoot, 1200); // 1.2 segundos no login
};

function startBoot() {
    const loginScreen = document.getElementById('login-screen');
    const helloScreen = document.getElementById('hello-screen');
    const dock = document.getElementById('dock-main');
    const canvas = document.getElementById('neural-canvas');

    loginScreen.style.opacity = '0';
    setTimeout(() => {
        loginScreen.style.display = 'none';
        helloScreen.style.display = 'flex';
        setTimeout(() => { helloScreen.style.opacity = '1'; }, 50);
        
        setTimeout(() => {
            helloScreen.style.opacity = '0';
            setTimeout(() => {
                helloScreen.style.display = 'none';
                dock.style.display = 'flex';
                setTimeout(() => { 
                    dock.style.opacity = '1'; 
                    canvas.style.opacity = '1';
                    openBio(); 
                }, 50);
            }, 400); // Transição de saída do Hello World mais rápida
        }, 1000); // 1 segundo no Hello World
    }, 400);
}

// CONTEÚDO DO TERMINAL
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
        if (i >= html.length) { clearInterval(timer); if (callback) callback(); }
    }, speed);
}

function openBio() {
    win.style.display = 'flex';
    title.innerText = "profile.sh";
    content.innerHTML = `
        <div style="text-align:center">
            <div style="margin-bottom:10px;"><img src="./imagens/alysson.png" class="profile-img" onerror="this.src='https://ui-avatars.com/api/?name=Alysson+Felipe&background=3b82f6&color=fff';"></div>
            <pre id="ascii-target" class="ascii-art"></pre>
            <p id="ads-target" style="color:var(--accent); font-weight:bold; font-size:13px;"></p>
            <div id="bio-typing" style="text-align:left; opacity:0.9;"></div>
            <span class="cursor"></span>
        </div>
    `;
    const adsText = "> ADS | UI/UX Designer | IoT & IA";
    const bioText = "Apaixonado por tecnologia e design, transito entre o código e a experiência do usuário. Atualmente cursando ADS, aplico IA e IoT para criar sistemas inteligentes.";
    let i = 0;
    function drawAscii() {
        if (i < nameAscii.length) {
            document.getElementById('ascii-target').innerHTML += nameAscii.charAt(i);
            i++; setTimeout(drawAscii, 1);
        } else {
            typeTerminal(document.getElementById('ads-target'), adsText, 25, () => {
                typeTerminal(document.getElementById('bio-typing'), bioText, 10);
            });
        }
    }
    drawAscii();
}

function openEdu() {
    win.style.display = 'flex';
    title.innerText = "education.sh";
    content.innerHTML = `<div><strong style="color:var(--accent)">alyssonfelipe@root:~$</strong> <span id="edu-cmd"></span></div><div id="edu-res" style="margin-top:15px;"></div><span class="cursor"></span>`;
    const data = `<strong>[ EDUCAÇÃO ]</strong><br><br>• <strong>ESTÁCIO</strong><br>ADS (Cursando) | Previsão: 2027<br><br>• <strong>MICROCAMP CURITIBA</strong><br><strong>Informática Avançada:</strong> Windows, Linux, Redes e Firewall`;
    typeTerminal(document.getElementById('edu-cmd'), "cat education.sh", 40, () => {
        setTimeout(() => typeTerminal(document.getElementById('edu-res'), data, 5), 150);
    });
}

function openExp() {
    win.style.display = 'flex';
    title.innerText = "experiences.sh";
    content.innerHTML = `<div><strong style="color:var(--accent)">alyssonfelipe@root:~$</strong> <span id="exp-cmd"></span></div><div id="exp-res" style="margin-top:15px;"></div><span class="cursor"></span>`;
    const data = `<strong>[ EXPERIÊNCIAS ]</strong><br><br>• <strong>ALUARTS</strong> (2020-2024)<br><strong>Marketing Digital & ADM</strong><br><br>• <strong>MUNDIAL MARCAS</strong> (2015-2017)<br><strong>Web Designer</strong>`;
    typeTerminal(document.getElementById('exp-cmd'), "cat experiences.sh", 40, () => {
        setTimeout(() => typeTerminal(document.getElementById('exp-res'), data, 5), 150);
    });
}

function openProject() {
    win.style.display = 'flex';
    title.innerText = "projects.log";
    content.innerHTML = `<div><strong style="color:var(--accent)">alyssonfelipe@root:~$</strong> <span id="proj-cmd"></span></div><div id="proj-res" style="margin-top:15px;"></div><span class="cursor"></span>`;
    const text = `>> <strong>PROJETO:</strong> FLOW HUB<br>>> <strong>URL:</strong> https://flow-hub.shop`;
    typeTerminal(document.getElementById('proj-cmd'), "./list_projects.sh", 40, () => {
        setTimeout(() => typeTerminal(document.getElementById('proj-res'), text, 15), 150);
    });
}

function closeWin() { win.style.display = 'none'; }

// Canvas Neural
const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');
let pts = [];
const res = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
window.onresize = res; res();
for(let i=0; i<25; i++) pts.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, vx:(Math.random()-0.5)*0.5, vy:(Math.random()-0.5)*0.5});
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
