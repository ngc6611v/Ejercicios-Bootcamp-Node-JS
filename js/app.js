const preloadedState = {
    producto: {},
    productos: []
}

const store = Redux.createStore(reducer, preloadedState);

let latestState;

store.subscribe(()=>{
    let currentState = store.getState();
    if(currentState != latestState){
        latestState = currentState;
        console.log("estado: ", currentState);
        ui.renderForm(currentState.producto)
        ui.renderTable(currentState.productos);
    }
    //console.log("estado: ", store.getState());
});

ui.onFormSubmit = (producto) => {
    if(producto.codigo)
    {
        store.dispatch(productoModificado(producto));
    }
    else{
        store.dispatch(productoAgregado(producto));
    }

    store.dispatch(productoSeleccionado(null));
}

ui.onEliminarClick = (codigo) => store.dispatch(productoEliminado(codigo));

ui.onEditarClick = (codigo) => store.dispatch(productoSeleccionado(codigo));