const form = document.getElementsByTagName("form")[0];
const tbody = document.getElementsByTagName("tbody")[0];
const cantidadTotalElement = document.getElementById("tdCantidadTotal");
const precioTotalElement = document.getElementById("tdPrecioTotal");
const granTotalElement = document.getElementById("tdGranTotal");

/** @type {HTMLInputElement} */
const inputCodigo = document.getElementById("codigo");
/** @type {HTMLInputElement} */
const inputNombre = document.getElementById("nombre");
/** @type {HTMLInputElement} */
const inputCantidad = document.getElementById("cantidad");
/** @type {HTMLInputElement} */
const inputPrecio = document.getElementById("precio");
/** @type {HTMLElement} */
const selectCategoria = document.getElementById("categoria");

let indice = 0;
let cantidadTotal = 0;
let preciosTotales = 0;
let granTotal = 0;
let currentRow;

form.addEventListener("submit", onSubmit);

/**
 * Esto es un JSdoc comment
 * @param {Event} event 
 */
function onSubmit(event){
    event.preventDefault(); //esto evita que el evento realice lo que tiene programado el navegador por defecto
    
    //capturar la información que ingresa el usuario
    const data = new FormData(form); //se quiere consultar la data del formulario form
    const values = Array.from(data.entries()); //Convierte la data del formulario en un arreglo

    const [frmCodigo, frmNombre, frmCantidad, frmPrecio, frmCategoria] = values;

    let codigo= frmCodigo[1];
    const nombre = frmNombre[1];
    const cantidad = frmCantidad[1];
    const precio = frmPrecio[1];
    const categoria = frmCategoria[1];    
    const total = cantidad * precio; //Esto se puede hacer dentro del string, pero para separar responsabilidades es mejor colocarlo aquí
    
    cantidadTotal = cantidadTotal + parseInt(cantidad);
    preciosTotales = preciosTotales + parseFloat(precio);
    granTotal = granTotal + parseFloat(total);

    let tr = document.createElement("tr");

    if(!codigo)//verificar si codigo tiene un valor
    {
        indice++;
        codigo = indice;
        tr = document.createElement("tr");
        tbody.appendChild(tr);
    }
    else {
        tr = currentRow;
    }
    
    //prueba
    //prueba

    tr.dataset.categoria = categoria; //esto no es visible para el usuario
    //Strings literals y string interpolations
    tr.innerHTML = `
        <td>${codigo}</td>
        <td>${nombre}</td>
        <td>${cantidad}</td>
        <td>${precio}</td>
        <td>${total}</td>
        <td><a href="#" onclick="onEdit(event)">Editar</a>|<a href="#" onclick="onDelete(event)">Eliminar</a></td>
    `;

    cantidadTotalElement.innerText = cantidadTotal;
    precioTotalElement.innerText = preciosTotales;
    granTotalElement.innerText = granTotal;    

    form.reset();
    inputNombre.focus();
}
/**
 * 
 * @param {Event} event 
 */
function onEdit(event)
{
    event.preventDefault();  
    /** @type {HTMLAnchorElement} */
    const anchor = event.target; //es la referencia del elemento que disparó el evento
    const tr = anchor.parentElement.parentElement;
    const celdas = tr.getElementsByTagName("td");
    const [tdCodigo, tdNombre, tdCantidad, tdPrecio] = celdas;
    
    inputCodigo.value = tdCodigo.innerText;
    inputNombre.value = tdNombre.innerText;
    inputCantidad.value = tdCantidad.innerText;
    inputPrecio.value = tdPrecio.innerText;
    selectCategoria.value = tr.dataset.categoria;

    currentRow = tr;
}

/**
 * 
 * @param {Event} event 
 */
function onDelete(event){
    event.preventDefault();

    /** @type {HTMLAnchorElement} */
    const anchor = event.target; //es la referencia del elemento que disparó el evento
    const tr = anchor.parentElement.parentElement;
    tbody.removeChild(tr);
    console.log(anchor.parentElement.parentElement);
}