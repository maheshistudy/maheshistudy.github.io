const form = document.getElementById('donation-form');
const materialList = document.getElementById('material-list');
const searchInput = document.getElementById('search');

let materials = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = form.name.value.trim();
  const material = form.material.value.trim();
  const description = form.description.value.trim();
  const location = form.location.value.trim();

  const item = {
    name,
    material,
    description,
    location,
  };

  materials.push(item);
  form.reset();
  displayMaterials(materials);
});

searchInput.addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();
  const filtered = materials.filter(m =>
    m.material.toLowerCase().includes(searchTerm)
  );
  displayMaterials(filtered);
});

function displayMaterials(items) {
  materialList.innerHTML = '';
  items.forEach(m => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${m.material}</strong> by ${m.name}<br>
                    <em>${m.description}</em><br>
                    Drop-off: ${m.location}`;
    materialList.appendChild(li);
  });
}
