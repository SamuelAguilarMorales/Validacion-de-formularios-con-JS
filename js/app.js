//Variables

const btnEnviar = document.querySelector('#enviar')
const formulario = document.querySelector('#enviar-mail')

//variables para campos
const email = document.querySelector('#email')
const asunto = document.querySelector('#asunto')
const mensaje = document.querySelector('#mensaje')

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

eventListeners()
function eventListeners (){
    //Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp)

    //Campos del formulario 
    email.addEventListener('blur', validarFormulario)
    asunto.addEventListener('blur', validarFormulario)
    mensaje.addEventListener('blur', validarFormulario)

}

    //Enviar formulario
    formulario.addEventListener('submit', enviarEmail);


//Funciones

function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

//Funciones de validar formulario 

function validarFormulario(e){
    if(e.target.value.length > 0){

        //Elimina los errores
        const error = document.querySelector('p.error')
        if(error){
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500'); 
    }else{
        e.target.classList.remove('border', 'border-green-500'); 
        e.target.classList.add('border', 'border-red-500');
        mostarError('Todos los campos estan vacios');
    }

    if(e.target.type === 'email'){

        if(er.test(e.target.value)){
            const error = document.querySelector('p.error')
            if(error){
                error.remove();
            }
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');     
        }else{
            e.target.classList.remove('border', 'border-green-500'); 
            e.target.classList.add('border', 'border-red-500');
            mostarError('Email no valido');
        }
    }

    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    }
}

function mostarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error' )
    
    const errores = document.querySelectorAll('.error')
    if(errores.length === 0){
        formulario.appendChild(mensajeError)
    }   
}

function enviarEmail(e){
    e.preventDefault();
    
    //Mostrar spinner

    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //Despues de 3 segundos ocultar spinner y mostrar mensaje

    setTimeout(() =>{
        spinner.style.display = 'none';
        //crear parrafo
        const parrafo = document.createElement('p')
        parrafo.textContent = 'El mensaje se envio correctamente'
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')
        formulario.insertBefore(parrafo, spinner)

        setTimeout(() =>{
            parrafo.remove() //Eliminar mensaje de exito
            reseteaFormulario();
        }, 5000)
    }, 3000);
}

//Funcion para resetear formulario
function reseteaFormulario(){
    formulario.reset();
    iniciarApp();
}