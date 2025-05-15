document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("donation-form");
    const materialList = document.getElementById("material-list");
    const searchInput = document.getElementById("search");
  
    // Load stored materials on page load
    loadMaterials();
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const material = document.getElementById("material").value.trim();
      const description = document.getElementById("description").value.trim();
      const location = document.getElementById("location").value.trim();
  
      if (name && material && description && location) {
        const entry = {
          name,
          material,
          description,
          location,
          timestamp: new Date().toISOString()
        };
  
        saveMaterial(entry);
        appendMaterialToList(entry);
        form.reset();
      }
    });
  
    searchInput.addEventListener("input", function () {
      const searchTerm = searchInput.value.toLowerCase();
      const items = materialList.querySelectorAll("li");
  
      items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchTerm) ? "block" : "none";
      });
    });
  
    function appendMaterialToList(entry) {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${entry.material}</strong> from ${entry.name} – ${entry.description} (Drop-off: ${entry.location})`;
      materialList.appendChild(li);
    }
  
    function saveMaterial(entry) {
      const materials = JSON.parse(localStorage.getItem("materials")) || [];
      materials.push(entry);
      localStorage.setItem("materials", JSON.stringify(materials));
    }
  
    function loadMaterials() {
      const materials = JSON.parse(localStorage.getItem("materials")) || [];
      materials.forEach(appendMaterialToList);
    }
  });
  