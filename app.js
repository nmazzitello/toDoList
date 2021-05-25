const btnAgregar= document.querySelector("#btnSubmit");
const formulario= document.querySelector("#formulario");
const listaMsj= document.querySelector(".lista-msj");

let mensajes=[];

eventListeners();

function eventListeners(){
    //para agregar msj nuevo
    formulario.addEventListener("submit", agregarMensaje);

    //para mostrar mensajes
    document.addEventListener("DOMContentLoaded", () => {
        cargarMensajes();
        crearHTML();
    });
};

function agregarMensaje(e){
    e.preventDefault();

    const msj=document.querySelector("#msj").value;
    
    if(msj===""){
        mostrarError("You need to add something, idiot!!!");
        return;
    }
    
    const msjObj={
        id: Date.now(),
        texto: msj
    }

    mensajes=[...mensajes, msjObj];

    crearHTML();
    formulario.reset();
};

function mostrarError(mensaje){
    const msjError= document.createElement("p");
    msjError.textContent= mensaje;
    msjError.classList.add("error");

    const titulo=document.querySelector("h1");

    titulo.appendChild(msjError);

    setTimeout( ()=> {
        msjError.remove();
    }, 3000);
};

function crearHTML(){
    limpiarHTML();

    if(mensajes.length>0){
        mensajes.forEach(msj => {
            const li= document.createElement("li");
            li.innerText=msj.texto;

            const btnEliminar= document.createElement("a");
            btnEliminar.classList.add("borrarMensaje")
            btnEliminar.innerText="X"; 

            //btnEliminar.onclick= borrarMensaje(); si tengo que pasar parametros, tengo que hacerlo de 
            //                                      la siguiente forma
            btnEliminar.onclick= () => {
                borrarMensaje(msj.id);
            }

            li.appendChild(btnEliminar);
            listaMsj.appendChild(li);
        })
    }
    sincronizarStorage();
}

function cargarMensajes(){
    mensajes= JSON.parse(localStorage.getItem("mensajes")) || [];
}

function limpiarHTML(){
    while(listaMsj.firstChild){
        listaMsj.removeChild(listaMsj.firstChild);
    }
}

function sincronizarStorage(){
    localStorage.setItem("mensajes", JSON.stringify(mensajes));
}

function borrarMensaje(id){
    mensajes =mensajes.filter( (msj) => msj.id !== id)
    
    crearHTML();
}


