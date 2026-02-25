// =====================================================
// axiomOS - System Info Module
// =====================================================

export function initSystemInfo() {
  const footer = document.getElementById("info-footer");
  if (!footer) return;

  renderSystemInfo(footer);
}

async function renderSystemInfo(footer) {
  try {
    // 1️⃣ Buscar IP
    const ipRes = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipRes.json();
    const ip = ipData.ip || "Unknown";

    // 2️⃣ Buscar Cidade
    let city = "Unknown";
    try {
      const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
      const geoData = await geoRes.json();
      city = geoData.city || "Unknown";
    } catch (e) {
      console.warn("Erro ao buscar cidade:", e);
    }

    // 3️⃣ Navegador
    const browser = getBrowserName();

    // 4️⃣ Renderização
    footer.innerHTML = `
      <div class="system-info-line">
        ${ip} &nbsp;&nbsp;|&nbsp;&nbsp; ${city} &nbsp;&nbsp;|&nbsp;&nbsp; ${browser}
      </div>
    `;
  } catch (error) {
    console.warn("Erro system-info:", error);
    footer.textContent = "System Info Unavailable";
  }
}

// 🔎 Detectar navegador limpo
function getBrowserName() {
  if (navigator.userAgentData && navigator.userAgentData.brands) {
    const brands = navigator.userAgentData.brands;
    const browser = brands.find(b =>
      b.brand !== "Not A;Brand" &&
      b.brand !== "Chromium"
    );
    return browser ? browser.brand : brands[0].brand;
  }

  const ua = navigator.userAgent;

  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";

  return "Unknown";
}
