// =====================================================
// axiomOS - Dock Module
// =====================================================

export async function initDock() {

  const dock = document.getElementById("terminal-dock");
  const input = document.getElementById("terminal-input");

  if (!dock || !input) return;

  const commands = [
    { name: "help", icon: "fa-solid fa-circle-info" },
    { name: "about", icon: "fa-solid fa-user" },
    { name: "projects", icon: "fa-solid fa-code" },
    { name: "contact", icon: "fa-solid fa-envelope" }
  ];

  dock.innerHTML = "";

  commands.forEach(cmd => {
    const btn = document.createElement("div");
    btn.className = "dock-item";
    btn.dataset.command = cmd.name;

    btn.innerHTML = `<i class="${cmd.icon}"></i>`;

    btn.onclick = () => {
      activateDockItem(cmd.name);
      executeCommand(cmd.name);
    };

    dock.appendChild(btn);
  });

  // 🔥 SINCRONIZA COM O TERMINAL
  input.addEventListener("input", () => {
    const value = input.value.replace("/", "").trim();
    activateDockItem(value);
  });

  function activateDockItem(command) {
    document.querySelectorAll(".dock-item")
      .forEach(el => el.classList.remove("active"));

    const target = document.querySelector(`.dock-item[data-command="${command}"]`);
    if (target) {
      target.classList.add("active");
    }
  }

  function executeCommand(command) {
    input.value = `/${command}`;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new KeyboardEvent("keydown", {
      key: "Enter",
      bubbles: true
    }));
  }
}
