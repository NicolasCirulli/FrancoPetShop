// variables
let chamber = document.querySelector("#farmacia") ? "Medicamento" : "Juguete";
let articulos = [];
let carrito = [];
let btnAgregar = [];
let totalAcumulado = document.querySelector('#total')
let largoCarrito = document.querySelector('#largoCarrito')

// Traer los productos de la api
fetch("https://apipetshop.herokuapp.com/api/articulos")
  .then((res) => res.json())
  .then((data) => {
    articulos = data.response.filter((e) => e.tipo === chamber);
    ejecucion(articulos);
  });

// Funciones
function ejecucion(articulos) {
  renderArticulos(articulos);
  agregarCarrito();
}

function renderArticulos(articulos) {
  articulos.forEach((item) => {
    let { _id, nombre, descripcion, precio, imagen, stock } = item;

    let contenedor = document.querySelector("#contenedor");
    let div = document.createElement("div");
    div.classList = "col";
    div.innerHTML = `
                        <div class="card card-h">
                          <img class="card-img-top w-75 d-block align-self-center" src=${imagen} height>
                          <div class="card card-body border-0 justify-content-between">
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

function agregarCarrito() {
  btnAgregar = document.querySelectorAll(".agregar-carrito");
  btnAgregar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      console.log(e.target.id);
      buscarEnArray(e.target.id);
      renderTabla();
      crearAlertaCarrito();
      borrarProducto()
    });
  });
}

function buscarEnArray(id) {
  let articuloAux = articulos.find((item) => item._id === id);
  if (carrito.find((item) => item._id === id)) {
    articuloAux.cantidad++;
  } else {
    articuloAux.cantidad = 1;
    carrito.push(articuloAux);
  }
}

function renderTabla() {
  const carritoModal = document.querySelector("#modal-tabla");
  let fragment = document.createDocumentFragment();
  let total = 0;
  if (carrito.length < 1) {
    carritoModal.innerHTML = `<tr><td><h5>No hay productos en tu carrito</h5></td></tr>`;
  } else {
    carritoModal.innerHTML = "";
    carrito.forEach((e) => {
      let { _id, nombre, precio, imagen, tipo,cantidad} = e;
      let tr = document.createElement("tr");
      tr.innerHTML = `  
      <th class="border-0" scope="row">
      <div class="p-2">
        <img
          class="img-fluid rounded shadow-sm me-1"
          src="${imagen}"
          alt="product0"
          width="70"
        />
        <div
          class="ml-3 d-inline-block align-middle"
        >
          <h5 class="mb-0">
            ${nombre}
          </h5>
          <span
            class="
              text-muted
              font-weight-normal font-italic
              d-block
            "
            >Categoria: ${tipo}</span
          >
        </div>
      </div>
    </th>
    <td class="border-0 align-middle">
      <strong>$${precio}</strong>
    </td>
    <td class="border-0 align-middle">
      <strong>${cantidad}</strong>
    </td>
    <td class="border-0 align-middle">
    <strong>$${precio * cantidad}</strong>
  </td>
    <td class="border-0 align-middle">
      <button class="btn btn-danger borrar-carrito" id="${_id}"" ><i class="fa fa-trash borrar-carrito" ></i></button>
    </td>
      `;
      fragment.appendChild(tr);
      
      return total += e.precio * e.cantidad
    });
    carritoModal.appendChild(fragment);
    totalAcumulado.textContent = `${total}`;
  }
  largoCarrito.textContent = carrito.length
  
}



function crearAlertaCarrito() {
  let alerta = document.querySelector("#alerta-carrito");
  alerta.classList.replace("d-none", "fixed-bottom");
  setTimeout(() => {
    alerta.classList.replace("fixed-bottom", "d-none");
  }, 1000);
  btnCarrito();
}

function btnCarrito(){
  btnBorrarTodo = document.querySelector("#borrar-todo")
  btnBorrarTodo.addEventListener("click", ()=>{
    carrito.splice(0,carrito.length)
    renderTabla()
    totalAcumulado.textContent = "0";
  })
}

function buscarEnArrayBorrar(id){
  // console.log(carrito.indexOf(  carrito.find( item => item._id === id)   ))
  carrito.splice(   carrito.indexOf(  carrito.find( item => item._id === id)   )    , 1)
  console.log('se ejecuto')
}

function borrarProducto(){
  
  btnBorrar = document.querySelectorAll(".borrar-carrito");
  btnBorrar.forEach(boton => {
    boton.addEventListener("click", e=>{
      buscarEnArrayBorrar(e.target.id);
      renderTabla();
      borrarProducto()
    })
  })
  
}

