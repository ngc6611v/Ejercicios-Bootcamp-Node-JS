//Ejemplo 1
function mensaje(prefijo) // 1. función de primer nivel
{
    return function(texto) // 2. función anónima
    {
        return prefijo + " " + texto;
        
    }
}

const bienvenida = mensaje("hola"); // 3. función en una constante (se puede almacenar también en variable)
const despedida = mensaje("adiós");


console.log(bienvenida("mundo"));
console.log(despedida("mundo"));

//Ejemplo 2
function mensaje2(prefijo, formateador){
    return function(texto){
        return formateador(prefijo, texto);
        
    }
}

const formatoBienvenida = function(prefijo, texto){
    return "¡" + prefijo + " " + texto + "!";
}

const formatoDespedida = function(prefijo, texto){
    return prefijo + " " + texto + ".. :(";
}

const formatoArrowBienvenida = (prefijo, texto) => "Arrow: " + prefijo + " " + texto ; // 4. arrow function


const bienvenida2 = mensaje2("hola", formatoBienvenida);
const despedida2 = mensaje2("adiós", formatoDespedida);

console.log(bienvenida2("mundo2"));
console.log(despedida2("mundo2"));

const despedidaArrow = mensaje2("adiosArrow",(a, b) => `Arrow Function: ${a} ${b}`);
console.log(despedidaArrow("pruebaArrow"));

const mensajeEquivalente = (prefijo, format)=>(texto)=>format(prefijo,texto); // Esta arrow function es equivalente a la función mensaje2
const constEquivalente = mensajeEquivalente("hola", formatoBienvenida);
console.log(constEquivalente("planeta"));


