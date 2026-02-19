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

// Função que digita sem quebrar as tags HTML e sem apagar o que já existe
function typeHTML(element, html, speed, callback) {
    let i = 0;
    const interval = setInterval(() => {
        if (html.charAt(i) === '<') {
            let tag = '';
            while (html.charAt(i) !== '>') {
                tag += html.charAt(i);
                i++;
            }
            tag += '>';
            element.innerHTML += tag;
            i++;
        } else {
            element.innerHTML += html.charAt(i);
            i++;
        }
        if (i >= html.length) {
            clearInterval(interval);
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

    let i = 0;
    const asciiTarget = document.getElementById('ascii-target');
    const adsTarget = document.getElementById('ads-target');
    const adsText = "> ADS | UI/UX Designer | IoT & IA";
    const bioText = "Apaixonado por tecnologia e design, transito entre o código e a experiência do usuário. Atualmente cursando Análise e Desenvolvimento de Sistemas, aplico IA e IoT para criar sistemas inteligentes e interfaces que conectam, do protótipo à implementação.";

    function step1() {
        if (i < nameAscii.length) {
            asciiTarget.innerHTML += nameAscii.charAt(i);
            i++; setTimeout(step1, 1);
        } else { i = 0; step2(); }
    }
    function step2() {
        if (i < adsText.length) {
            adsTarget.innerHTML += adsText.charAt(i);
            i++; setTimeout(step2, 30);
        } else { i = 0; typeHTML(document.getElementById('bio-typing'), bioText, 15); }
    }
    setTimeout(step1, 300);
}

function openEdu() {
    win.style.display = 'flex';
    title.innerText = "education.sh";
    // Mantemos o root fixo e criamos um container para o output
    content.innerHTML = `
        <div><strong style="color:var(--accent)">alyssonfelipe@root:~$</strong> cat education.sh</div>
        <div id="edu-output" style="margin-top:15px; line-height:1.6;"></div>
        <span class="cursor"></span>
    `;
    
    const output = document.getElementById('edu-output');
    const eduData = 
        `<strong>[ EDUCAÇÃO ]</strong><br><br>` +
        `• <strong>FACULDADE ESTÁCIO</strong><br>` +
        `  Tecnólogo em Análise e Desenvolvimento de Sistemas<br>` +
        `  Situação: Cursando (1º Período) | Previsão: 2027<br><br>` +
        `• <strong>MICROCAMP CURITIBA</strong><br>` +
        `  Informática Avançada (Windows, Linux, Redes e Firewall)<br>` +
        `  Status: Concluído<br><br>` +
        `• <strong>COLÉGIO ARNALDO FAIVRO BUSATO</strong><br>` +
        `  Ensino Médio | Status: Concluído<br><br>` +
        `<strong>[ QUALIFICAÇÕES ]</strong><br><br>` +
        `- <strong>Design & Web:</strong> Photoshop, ID Visual e WordPress.<br>` +
        `- <strong>Sistemas Inteligentes:</strong> IA/IoT e Hardware.<br>` +
        `- <strong>Ferramentas:</strong> Pacote Office completo.<br>` +
        `- <strong>Idiomas:</strong> Inglês nível A1.`;

    setTimeout(() => typeHTML(output, eduData, 5), 500);
}

function openProject() {
    win.style.display = 'flex';
    title.innerText = "projects.log";
    content.innerHTML = `
        <div><strong style="color:var(--accent)">alyssonfelipe@root:~$</strong> ./list_projects.sh</div>
        <div id="proj-output" style="margin-top:15px;"></div>
        <span class="cursor"></span>
    `;
    const output = document.getElementById('proj-output');
    const text = `>> <strong>PROJETO:</strong> FLOW HUB<br>>> <strong>STATUS:</strong> ONLINE<br>>> <strong>URL:</strong> https://flow-hub.shop`;
    
    setTimeout(() => typeHTML(output, text, 20), 500);
}

function closeWin() { win.style.display = 'none'; }
