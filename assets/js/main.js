let articulos = [];
let chamber = document.querySelector("#farmacia") ? "Medicamento" : "Juguete";
let carrito = [];
let btnAgregar = [];

fetch("https://apipetshop.herokuapp.com/api/articulos")
  .then((res) => res.json())
  .then((data) => {
    chamber === "Medicamento"
      ? (articulos = data.response.filter((e) => e.tipo === chamber))
      : (articulos = data.response.filter((e) => e.tipo === chamber));
    articulos.sort((a, b) => a.descripcion.length - b.descripcion.length);
    chamber === "Medicamento" ? ejecucion(articulos) : ejecucion(articulos);
  });

function ejecucion(articulos) {
  articulos.forEach((item) => {
    let { _id, nombre, descripcion, precio, imagen, stock } = item;
    let contenedor = document.querySelector("#contenedor");
    let div = document.createElement("div");
    div.classList = "col";
    div.innerHTML = `
                        <div class="card">
                          <img class="card-img-top w-75 d-block align-self-center" src=${imagen} height>
                          <div class="card card-body border-0">
                            <h5 class="card-title text-center">${nombre}</h5>
                            <p class="card-text">${descripcion}</p>
                            <p class="card-text">$${precio}</p>
                            <p class="card-text">Unidades disponibles : ${stock}</p>
                            ${
                              stock <= 5
                                ? "<p class='card-text fw-bold'>🔴ULTIMAS UNIDADES!🔴</p>"
                                : ""
                            }
                            <button id=${_id} class="btn btn-danger agregar-carrito" type="button">Agregar al carrito</button>
                          </div>
                        </div>  
   `;
    contenedor.appendChild(div);
  });

  btnAgregar = document.querySelectorAll(".agregar-carrito");
  btnAgregar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      console.log(e.target.id);
      buscarEnArray(e.target.id);
    });
  });
}

function buscarEnArray(id) {
  carrito.push(articulos.filter((item) => item._id === id));
  console.table(carrito);
}
