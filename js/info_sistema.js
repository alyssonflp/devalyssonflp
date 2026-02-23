// =====================================================
// Sistema de Informações (Frontend)
// Busca dados do backend do Vercel
// =====================================================

export async function initSystemInfo() {

    const footer = document.getElementById("info-footer");
    if (!footer) return;

    let ip = "Indisponível";
    let country = "";
    let city = "";
    let browser = navigator.userAgent;

    try {
        // 👇 AQUI FICA O FETCH
        const response = await fetch("/api/ip");

        if (!response.ok) throw new Error("Erro na API");

        const data = await response.json();

        ip = data.ip;
        country = data.country || "";
        city = data.city || "";

    } catch (error) {
        console.warn("Falha ao buscar IP do backend");
    }

    footer.innerHTML = `
        <div>
            <strong>IP:</strong> ${ip}<br>
            <strong>LOC:</strong> ${city} ${country}
        </div>
    `;
}
