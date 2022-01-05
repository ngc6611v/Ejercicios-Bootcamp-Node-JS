const form = document.getElementsByTagName("form")[0];
const tbody = document.getElementsByTagName("tbody")[0];

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
    //console.log(data);
    //console.log(values);

    const nombre = values[0][1];
    const cantidad = values[1][1];
    const precio = values[2][1];
    const categoria = values[3][1];

    console.log(nombre);
    console.log(cantidad);
    console.log(precio);
    console.log(categoria);
    
    const tr = document.createElement("tr");
    tr.innerHTML = "<td>X</td><td>"
    +nombre+"</td><td>"
    +cantidad+ "</td><td>"
    +precio+"</td><td>"
    //+categoria+"</td><td>"
    + 0 + '</td><a href="#">Editar</a>|<a href="#">Eliminar</a></td>';
    tbody.appendChild(tr);
}