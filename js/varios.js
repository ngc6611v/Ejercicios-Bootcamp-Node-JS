/**
 * Esto es un JSdoc comment
 * @param {Event} event 
 */
 function onSubmit(event){
    event.preventDefault(); //esto evita que el evento realice lo que tiene programado el navegador por defecto
          

    if(codigo)
    {
        store.dispatch({
            type: "producto-modificado",
            payload: {
                codigo, // esto puede ser codigo: codigo pero se simplificó porque el nombre de la propiedad y de la variable asignada es el mismo
                nombre,
                cantidad,
                precio,
                categoria
            }
        });
    }
    else{
        store.dispatch({
            type: "producto-agregado",
            payload: {
                codigo, // esto puede ser codigo: codigo pero se simplificó porque el nombre de la propiedad y de la variable asignada es el mismo
                nombre,
                cantidad,
                precio,
                categoria
            }
        });
    }

    store.dispatch({
        type: "producto-seleccionado",
        payload: {
            codigo: null
        }
    });
}