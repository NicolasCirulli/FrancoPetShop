// variables
let chamber = document.querySelector("#farmacia") ? "Medicamento" : "Juguete";
let articulos = [];
let carrito = JSON.parse( localStorage.getItem('carrito') ) || []
let btnAgregar = [];


// Traer los productos de la api
fetch("https://apipetshop.herokuapp.com/api/articulos")
  .then((res) => res.json())
  .then((data) => {
    articulos = data.response.filter((e) => e.tipo === chamber)
    ejecucion(articulos)
  });

// Funciones
function ejecucion(articulos) {
  renderArticulos(articulos)
  agregarCarrito()
}


function renderArticulos(articulos){
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
}

function agregarCarrito(){
  btnAgregar = document.querySelectorAll(".agregar-carrito");
  btnAgregar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      console.log(e.target.id);
      buscarEnArray(e.target.id);
      añadirProductosCarrito();
    });
  });
}

function buscarEnArray(id) {
  carrito.push(articulos.find((item) => item._id === id));
  console.table(carrito);
}

function añadirProductosCarrito() {
  const carritoModal = document.querySelector("#modal-tabla");
  if (carrito.length < 1) {
    carritoModal.innerHTML = `<tr><td><h5>No hay productos en tu carrito</h5></td></tr>`;
  } else {
    carritoModal.innerHTML += `
          <tr>
          <th class="border-0" scope="row">
            <div class="p-2">
              <img
                class="img-fluid rounded shadow-sm me-1"
                src="${carrito[carrito.length-1].imagen}"
                alt="product0"
                width="70"
              />
              <div
                class="ml-3 d-inline-block align-middle"
              >
                <h5 class="mb-0">
                  ${carrito[carrito.length-1].nombre}
                </h5>
                <span
                  class="
                    text-muted
                    font-weight-normal font-italic
                    d-block
                  "
                  >Categoria: ${carrito[carrito.length-1].tipo}</span
                >
              </div>
            </div>
          </th>
          <td class="border-0 align-middle">
            <strong>$${carrito[carrito.length-1].precio}</strong>
          </td>
          <td class="border-0 align-middle">
            <strong>3</strong>
          </td>
          <td class="border-0 align-middle">
            <button class="btn btn-danger"><i class="fa fa-trash"></i></button>
          </td>
        </tr>
      `;
  }
}


