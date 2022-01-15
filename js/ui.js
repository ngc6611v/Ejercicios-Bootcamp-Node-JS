const ui ={
    onFormSubmit: (data) => {},
    onEliminarClick: (codigo) => {},
    onEditarClick: (codigo) => {},
    //sum: (elementos,selector) => {}, algo así se podría hacer para desacoplar la función sum() en renderTable
    renderForm,   
    renderTable 
};

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

//form.addEventListener("submit", () => ui.onFormSubmit());
form.addEventListener("submit", (event) => {

    event.preventDefault();

    //capturar la información que ingresa el usuario en el formulario
    const data = new FormData(form); //se quiere consultar la data del formulario form
    const values = Array.from(data.entries()); //Convierte la data del formulario en un arreglo

    const [frmCodigo, frmNombre, frmCantidad, frmPrecio, frmCategoria] = values;

    const codigo= parseInt(frmCodigo[1]);
    const nombre = frmNombre[1];
    const cantidad = parseFloat(frmCantidad[1]);
    const precio = parseFloat(frmPrecio[1]);
    const categoria = parseInt(frmCategoria[1]); 

    ui.onFormSubmit({
        codigo, // lo mismo que codigo:codigo, porque la propiedad y la variable asignada tienen el mismo nombre
        nombre,
        cantidad,
        precio,
        categoria
    });
});

function renderForm(producto){

    inputCodigo.value = producto.codigo || "";
    /*if(producto.nombre){ // es lo mismo que if(producto.nombre  != undefined)
        inputNombre.value = producto.nombre;
    }*/    
    inputNombre.value = producto.nombre || "";
    inputCantidad.value = producto.cantidad || "";
    inputPrecio.value = producto.precio || "";
    selectCategoria.value = producto.categoria || 1;
}

function renderTable(productos){ 
    
    const filas = productos.map((item) => {    
        const tr = document.createElement("tr");    
        tr.innerHTML = `
            <td>${item.codigo}</td>
            <td>${item.nombre}</td>
            <td>${item.cantidad}</td>
            <td>${item.precio}</td>
            <td>${item.total}</td>
            <td>
                <div class="btn-group">
                <a title="Editar" href="#" class="btn btn-sm btn-outline-secondary">
                    <i class="bi bi-pencil-square"></i>
                </a>            
                <a title="Eliminar" href="#" class="btn btn-sm btn-outline-danger">
                    <i class="bi bi-trash"></i>
                </a>
                </div>
            </td>              
        `;

        const [editar, eliminar] = tr.getElementsByTagName("a");

        eliminar.addEventListener("click", (event) => {
            event.preventDefault();
            ui.onEliminarClick(item.codigo);            
        });

        editar.addEventListener("click", (event)=> {
            event.preventDefault();
            ui.onEditarClick(item.codigo);
        });

        return tr;
    });

    tbody.innerHTML = "";

    filas.forEach((tr) => {
        tbody.appendChild(tr);
    });

    cantidadTotalElement.innerText = sum(productos, x=>x.cantidad);
    precioTotalElement.innerText = sum(productos, x=>x.precio);
    granTotalElement.innerText = sum(productos, x=>x.total);

    function sum(elementos, selector){
        return elementos
            .map(selector)
            .reduce((a,b) => a + b, 0);
    }
}