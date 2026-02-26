// terminal.js
const terminalOutput = document.querySelector(".terminal-output");

// Função para adicionar linha centralizada no terminal
function addLine(text) {
    const line = document.createElement("div");
    line.style.textAlign = "center";      // centraliza horizontalmente
    line.style.margin = "6px 0";
    line.textContent = text;
    terminalOutput.appendChild(line);
}

// Busca dados da API
fetch("/api/ip")
    .then(res => res.json())
    .then(data => {
        // Pega navegador simplificado
        let browserName = "Desconhecido";
        const ua = data.userAgent || "";
        const match = ua.match(/(Chrome|Firefox|Edge|Safari|Opera|Brave)/i);
        if (match) browserName = match[0];

        // Adiciona linhas centralizadas
        addLine(`IP: ${data.ip}`);
        addLine(`Cidade: ${data.city || "Indisponível"}`);
        addLine(`Navegador: ${browserName}`);
    })
    .catch(err => {
        addLine("Erro ao obter informações de rede.");
        console.error(err);
    });
