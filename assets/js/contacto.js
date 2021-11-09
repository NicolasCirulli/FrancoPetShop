// Constantes
const alerta = document.getElementById('alerta');
const divAlerta = document.getElementById('divAlerta');
const submit = document.getElementById('submit');
const fullName = document.getElementById('clientNamelastname');
const email = document.getElementById('clientemail');
const gato = document.getElementById('gato');
const perro = document.getElementById('perro');

submit.addEventListener('click',(e)=>{
    
    (fullName.value && pruebaemail(email.value)== "email valido")? 
    gato.checked || perro.checked?
    divAlerta.classList = 'alert alert-success d-flex justify-content-between' :'' :'';

    e.preventDefault();

})

alerta.addEventListener('click',(e)=>{
    e.target.parentElement.parentElement.classList = 'display-none'
})


function pruebaemail (valor){
    re=/^([\da-z_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/
    if(!re.exec(valor)){
        return('email no valido');
    }
    else return('email valido');
    }
    