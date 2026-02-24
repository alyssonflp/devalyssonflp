// =====================================================
// axiomOS - System Info
// =====================================================
//
// Captura informações do sistema (IP, localização, navegador)
// e exibe no footer.
//

export async function initSystemInfo() {
  const footer = document.getElementById("info-footer");
  if (!footer) return;

  let ip = "Indisponível", city = "", country = "", browser = navigator.userAgent;

  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    ip = data.ip || ip;
  } catch {
    console.warn("Falha ao buscar IP");
  }

  footer.innerHTML = `
    <div>
      <strong>IP:</strong> ${ip} <br>
      <strong>LOC:</strong> ${city} ${country} <br>
      <strong>BRW:</strong> ${browser}
    </div>
  `;
}
