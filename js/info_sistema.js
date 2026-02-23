export async function initSystemInfo() {
    const footer = document.getElementById("info-footer");
    if (!footer) {
        console.error("❌ Erro: Elemento #info-footer não encontrado no HTML.");
        return;
    }

    console.log("🔍 Coletando dados do sistema...");

    // Detectar Navegador e Sistema Operacional
    const ua = navigator.userAgent;
    const platform = navigator.platform || ""; // Fallback para evitar erro .includes
    
    let browser = ua.includes("Chrome") ? "CHROME" : ua.includes("Firefox") ? "FIREFOX" : "BROWSER";
    let os = platform.includes("Win") ? "WINDOWS" : "LINUX/MOBILE";

    try {
        // Busca os dados de IP e Localização
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error("Falha na resposta da API");
        
        const data = await response.json();

        // Injeta os dados no HTML usando a estrutura que definimos no CSS
        footer.innerHTML = `
            <div class="footer-group">
                <div class="info-item"><span class="label">IP:</span> <span class="value">${data.ip}</span></div>
                <div class="info-item hide-mobile"><span class="label">BRW:</span> <span class="value">${browser}</span></div>
            </div>
            <div class="footer-group">
                <div class="info-item hide-mobile"><span class="label">SYS:</span> <span class="value">${os}</span></div>
                <div class="info-item"><span class="label">LOC:</span> <span class="value">${data.city}, ${data.region_code}</span></div>
            </div>
        `;
        console.log("✅ Dados do sistema carregados com sucesso.");

    } catch (error) {
        console.warn("⚠️ Usando modo de segurança (AdBlock ou erro de conexão).");
        // Mantém o layout mesmo se a API falhar
        footer.innerHTML = `
            <div class="footer-group">
                <div class="info-item"><span class="label">SYS:</span> <span class="value">${os}</span></div>
                <div class="info-item"><span class="label">BRW:</span> <span class="value">${browser}</span></div>
            </div>
            <div class="footer-group">
                <div class="info-item"><span class="label">STATUS:</span> <span class="value">SECURE_MODE</span></div>
            </div>
        `;
    }
}
