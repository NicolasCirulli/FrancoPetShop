// Constantes
const alerta = document.getElementById('alerta');
const divAlerta = document.getElementById('divAlerta');
const submit = document.getElementById('sendMessageButton');
const fullName = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone')
const gato = document.getElementById('gato');
const perro = document.getElementById('perro');
const mensaje = document.getElementById('message')
spanMensaje = document.getElementById('mensajeForm');

submit.addEventListener('click', (e) => {

    (fullName.value && pruebaemail(email.value) == "email valido") ?
        gato.checked || perro.checked ? mensaje.value ? 

        (divAlerta.classList = 'alert alert-success d-flex justify-content-between',
        spanMensaje.innerText = 'Formulario enviado correctamente',
        fullName.value = '',email.value = '',phone.value = '',mensaje.value = '',
        gato.checked = false,perro.checked = false)
        
        :(divAlerta.classList = 'alert alert-danger d-flex justify-content-between',
        spanMensaje.innerText = 'Debe escribir un mensaje'):
        
        (divAlerta.classList = 'alert alert-danger d-flex justify-content-between',
        spanMensaje.innerText = 'Debe seleccionar al menos una mascota') :
        
        (divAlerta.classList = 'alert alert-danger d-flex justify-content-between',
        spanMensaje.innerText = 'Verifique que el campo nombre no esté vacio y que el email sea valido')
            
         
    e.preventDefault();

})

alerta.addEventListener('click', (e) => {
    e.target.parentElement.parentElement.classList = 'display-none'
})


function pruebaemail(valor) {
    re = /^([\da-z_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/
    if (!re.exec(valor)) {
        return ('email no valido');
    }
    else return ('email valido');
}


 


