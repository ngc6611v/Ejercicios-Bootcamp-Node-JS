//console.log(Redux);
const preloadedState = {
    producto: {},
    productos: []
}

const reducer = (state, action)=> {
    if(action.type == "producto-agregado"){
        //state.productos.push(action.payload); esto no se puede porque se debe trabajar con objetos inmutables en Redux
        
        // retornar un nuevo estado y no modificar el que ya tenemos
        return {...state, 
            productos: [
                ...state.productos,
                action.payload
            ]
        };
    }

    return state;
}

const store = Redux.createStore(reducer, preloadedState);

let latestState;

store.subscribe(()=>{
    let currentState = store.getState();
    if(currentState != latestState){
        latestState = currentState;
        console.log("estado: ", currentState);
    }
    //console.log("estado: ", store.getState());
})

store.dispatch({
    type: "producto-agregado",
    payload: {
        id: 0,
        nombre: "prueba a"
    }
})

store.dispatch({
    type: "producto-modificado",
    payload: {
        id: 1,
        nombre: "prueba a v2"
    }
})

store.dispatch({
    type: "producto-agregado",
    payload: {
        id: 2,
        nombre: "prueba b"
    }
})

console.log(store);