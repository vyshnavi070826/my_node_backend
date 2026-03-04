async function getDepartments() {
  try {
    const response = await fetch("https://my-node-backend-6zba.onrender.com/api/departments");
    const data = await response.json();

    const grid = document.getElementById("dept-grid");

    grid.innerHTML = "";

    data.forEach((dept) => {
      const card = document.createElement("div");

      card.className = "p-6 bg-white rounded-xl shadow";

      card.innerHTML = `
        <h2>${dept.name}</h2>
      `;

      grid.appendChild(card);
    });

  } catch (error) {
    console.error(error);
  }
}

getDepartments();