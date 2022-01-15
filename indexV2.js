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


//console.log(Redux);
const preloadedState = {
    producto: {},
    productos: []
}

let indice = 0;

const reducer = (state, action)=> {
    if(action.type == "producto-agregado"){

        indice++;
        const producto = action.payload;
        const codigo = indice;
        const total = producto.cantidad * producto.precio;
        
        // retornar un nuevo estado y no modificar el que ya tenemos
        return {
            ...state, 
            productos: [
                ...state.productos,
                {
                    ...producto,
                    codigo, // esto es igual a codigo: codigo, (aplica cuando el nombre de la propiedad es igual al nombre de variable que se asigna a esta)
                    total //esto es igual a total: total
                }                
            ]
        };
    }

    if(action.type == "producto-modificado"){
        const producto = action.payload;
        const productos = state.productos.slice(); //copia del arreglo original
        const codigo = producto.codigo;
        const total = producto.cantidad * producto.precio;
        const old = productos.find((item) => item.codigo == codigo);
        const index = productos.indexOf(old);
        productos[index] = {...producto, total};
        return {
            ...state,
            productos
        };
    }

    if(action.type == "producto-eliminado"){
        const codigo = action.payload.codigo;
        const productos = state.productos.filter((item) => item.codigo != codigo);
        return {
            ...state,
            productos
        }
    }


    return state;
}

const store = Redux.createStore(reducer, preloadedState);

let latestState;

const  unsuscribe = store.subscribe(()=>{
    let currentState = store.getState();
    if(currentState != latestState){
        latestState = currentState;
        console.log("estado: ", currentState);
        renderTable(currentState.productos);
    }
    //console.log("estado: ", store.getState());
})

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
            store.dispatch({
                type: "producto-eliminado",
                payload: {
                    codigo: item.codigo
                }
            });
        });
        return tr;
    });

    tbody.innerHTML = "";

    filas.forEach((tr) => {
        tbody.appendChild(tr);
    });

    const cantidadTotal = productos
        .map(x => x.cantidad)
        .reduce((a,b) => a + b, 0);

    const precioTotal = productos
        .map(x => x.precio)
        .reduce((a,b) => a + b, 0);

    const granTotal = productos
        .map(x => x.total) // x.total puede ser también x.cantidad * x.precio
        .reduce((a,b) => a + b, 0);

    cantidadTotalElement.innerText = cantidadTotal;
    precioTotalElement.innerText = precioTotal;
    granTotalElement.innerText = granTotal;
}

store.dispatch({
    type: "producto-agregado",
    payload: {
        nombre: "prueba a",
        cantidad: 3,
        precio: 10,
        categoria: 2
    }
});

store.dispatch({
    type: "producto-modificado",
    payload: {
        codigo: 1,
        nombre: "prueba a v2",
        cantidad: 4,
        precio: 11,
        categoria: 3
    }
});

store.dispatch({
    type: "producto-agregado",
    payload: {
        nombre: "prueba b",
        cantidad: 6,
        precio: 8,
        categoria: 3
    }
});

//unsuscribe();

store.dispatch({
    type: "producto-agregado",
    payload: {
        nombre: "prueba c",
        cantidad: 2,
        precio: 4,
        categoria: 4
    }
});

store.dispatch({
    type: "producto-eliminado",
    payload: {
        codigo: 2
    }
});

console.log(store);