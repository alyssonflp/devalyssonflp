// ... (mantenha o início do script igual ao anterior)

function openAI() {
    win.style.display = 'flex';
    title.innerText = `PROTOCOLO_${IA_NAME}_ATIVO`;
    content.innerHTML = `<div><strong>root@alysson:~$</strong> <span id="ai-cmd"></span></div><div id="ai-res" style="margin-top:15px;"></div>`;
    
    typeTerminal(document.getElementById('ai-cmd'), `init --protocol ${IA_NAME.toLowerCase()}`, 40, () => {
        document.getElementById('ai-res').innerHTML = `
            <div class="jarvis-card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <span style="color:var(--accent); font-weight: 800; font-size: 14px; letter-spacing: 2px;">${IA_NAME} INTERFACE</span>
                    <span style="font-size: 10px; color: var(--accent-2);">STATUS: ONLINE</span>
                </div>
                
                <p style="font-size: 12px; margin-bottom: 20px; color: #b4b4b4; line-height: 1.4;">
                    Bem-vindo, Senhor. Os sistemas estão operando em 100%. Deseja consultar algum dado do portfólio?
                </p>

                <div class="flex flex-col gap-3">
                    <input type="text" id="ai-input" class="terminal-input" placeholder="Digite seu comando aqui...">
                    <button onclick="askAI()" class="terminal-btn">PERGUNTAR</button>
                </div>
                
                <div id="ai-response-display" style="margin-top:25px; min-height:60px; font-size: 14px; color: #fff; border-left: 2px solid var(--accent); padding-left: 15px;">
                    <span style="opacity: 0.5;">Aguardando entrada de dados...</span>
                </div>
            </div>
        `;
        document.getElementById('ai-input').addEventListener('keypress', (e) => { if(e.key === 'Enter') askAI(); });
    });
}

async function askAI() {
    const input = document.getElementById('ai-input');
    const display = document.getElementById('ai-response-display');
    const prompt = input.value;
    if(!prompt) return;

    display.innerHTML = `<div class="typing-loader"></div> <span style="color:var(--accent-2)">Processando...</span>`;
    input.value = "";

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `Você é o ${IA_NAME}, assistente de Alysson Felipe. Use tom elegante e técnico. Se for algo fora do portfólio, foque na carreira dele. Pergunta: ${prompt}` }]
                }]
            })
        });

        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;
        
        display.innerHTML = "";
        typeTerminal(display, `<strong style="color:var(--accent)">${IA_NAME}:</strong> ${aiText}`, 15);

    } catch (err) {
        display.innerHTML = `<span style="color:#ff4b2b">ERRO: Falha na sincronização com o mainframe.</span>`;
    }
}
