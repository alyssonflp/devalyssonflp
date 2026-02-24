// js/modules/hologram.js

// ✨ Responsável apenas por exibir e ocultar o holograma
// Não decide quando abrir. Só executa.

let hologramContainer = null;

export function toggleHologram(section, rotationY) {

    if (!hologramContainer) {
        hologramContainer = document.createElement("div");
        hologramContainer.id = "hologram-panel";
        document.body.appendChild(hologramContainer);
    }

    hologramContainer.innerHTML = `
        <div class="hologram-content">
            <h2>${section.toUpperCase()}</h2>
            <p>Conteúdo da seção ${section}</p>
        </div>
    `;

    hologramContainer.style.transform = `rotateY(${rotationY}deg)`;
    hologramContainer.classList.add("active");
}
