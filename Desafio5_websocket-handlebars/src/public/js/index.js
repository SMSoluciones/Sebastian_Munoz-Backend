const socket = io("http://localhost:8080");
let productList = [];

document.getElementById("send").addEventListener("click", postProduct);

function postProduct() {
  let product = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    category: document.getElementById("category").value,
    price: document.getElementById("price").value,
    stock: document.getElementById("stock").value,
  };

  socket.emit("newProduct", product);
}

function deleteProduct(id) {
  console.log(id);
  socket.emit("deleteProduct", id);
}

socket.on("productList", (data) => {
  let productsOnList = document.getElementById("history");
  productsOnList.innerHTML = "";

  data.forEach((element) => {
    productsOnList.innerHTML += `
      <tr>
      <td> ${element.title} </td>
      <td>${element.description}</td>
      <td>${element.categoria}</td>
      <td>$ ${element.price}</td>
      <td>${element.stock} Unidades</td>
      </tr>
      <button onclick="deleteProduct(${element.id})">Eliminar</button>
    `;
  });
});
