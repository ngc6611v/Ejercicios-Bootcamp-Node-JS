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

    if(action.type == "producto-seleccionado"){
        const codigo = action.payload.codigo;
        return{
            ...state,
            producto: state.productos.find(x=> x.codigo==codigo) || {}
        }
    }

    return state;
}

// esto es un action builder
const productoSeleccionado = (codigo) => ({
    type: "producto-seleccionado",
    payload: {
        codigo
    }
});

const productoEliminado = (codigo) => ({
    type: "producto-eliminado",
    payload: {
        codigo
    }
});

const productoModificado = (payload) => ({
    type: "producto-modificado",
    payload
});

const productoAgregado = (payload) => ({
    type: "producto-agregado",
    payload
});

/*const productoStore = { //esto se puede utilizar para que productoSeleccionado sea privado
    reducer,
    productoSeleccionado
}*/