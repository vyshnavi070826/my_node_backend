async function getDepartments() {
  const response = await fetch("https://my-node-backend-6zba.onrender.com/api/departments");
  const data = await response.json();
  console.log(data);
}

getDepartments();