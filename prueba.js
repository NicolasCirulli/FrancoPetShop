let articulos = [];
let chamber = document.querySelector("#farmacia") ? "Medicamento" : "Juguete";
let carrito = [];
let btnAgregar = []

fetch("https://apipetshop.herokuapp.com/api/articulos")
  .then((res) => res.json())
  .then((data) => {
    articulos = data.response.filter((e) => e.tipo === chamber)
    ejecucion(articulos)
  });

function ejecucion(articulos) {
  articulos.forEach((item) => {
    let { _id, nombre, descripcion, precio, imagen, stock } = item;
    let contenedor = document.querySelector("#contenedor");
    let div = document.createElement("div");
    div.classList = "col";
    div.innerHTML = `
                        <div class="card">
                    <img class="card-img-top w-75 d-block align-self-center" src=${imagen}>
                    <div class="card-body">
                        <h4 class="card-title text-center">${nombre}</h4>
                        <p class="card-text">${descripcion}</p>
                        <p class="card-text">$${precio}</p>
                        <p class="card-text">Unidades disponibles : ${stock}</p>
                        <button id=${_id} class="btn btn-primary agregar-carrito" type="button">Agregar al carrito</button>
                    </div>
                    </div>  
   `;
    contenedor.appendChild(div);
  })

  btnAgregar = document.querySelectorAll(".agregar-carrito")
  btnAgregar.forEach( boton => {
      boton.addEventListener('click', (e)=>{
          console.log(e.target.id)
          buscarEnArray(e.target.id)
      })
  })
}

function buscarEnArray (id){
    carrito.push(articulos.filter( item => item._id === id))
    console.table(carrito);
}
