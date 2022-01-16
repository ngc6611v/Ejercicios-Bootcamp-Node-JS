const preloadedState = {
    producto: {},
    productos: []
}

const middlewares = Redux.applyMiddleware(
    loggerMiddleware,
    agregarOModificarProductoMiddleware,
    generadorCodigoProductoBuilder(1000)
    );
const store = Redux.createStore(reducer, preloadedState, middlewares);

let latestState;

store.subscribe(()=>{
    let currentState = store.getState();
    if(currentState != latestState){
        latestState = currentState;
        //console.log("estado: ", currentState);
        ui.renderForm(currentState.producto)
        ui.renderTable(currentState.productos);
    }
    //console.log("estado: ", store.getState());
});

ui.onFormSubmit = (producto) => { store.dispatch(agregarOModificarProducto(producto)); }

ui.onEliminarClick = (codigo) => store.dispatch(productoEliminado(codigo));

ui.onEditarClick = (codigo) => store.dispatch(productoSeleccionado(codigo));

