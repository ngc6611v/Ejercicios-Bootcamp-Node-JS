const juan ={
    nombre: "Juan",
    apellido: "Rodríguez",
    edad: 30,
    direccion: {
        departamento: "Guatemala",
        municipio: "Guatemala"
    }
};
// JavaScript sí permite modificar las propiedades del objeto
//juan.apellido = "Pérez";
console.log(juan);

// juan = {} esto da error

//const juan2 = juan; // Aquí se copia la referencia
//juan2.apellido = "Pérez"; // por lo que aquí también se está modificando a juan
//console.log("juan: ", juan);
//console.log("juan2: ",juan2);

const juan3 = Object.assign({}, juan); // se crea un nuevo objeto con los valores de juan
juan3.apellido = "Pérez";
console.log("juan: ", juan);
console.log("juan3: ",juan3);

// lo mismo que lo anterior pero modificando el apellido
const juan4 = Object.assign({}, juan, {apellido: "Castro"}); // se crea un nuevo objeto con los valores de juan
console.log("juan: ", juan);
console.log("juan4: ",juan4);

//spreed operator
const juan5 = {...juan, apellido: "Batres", telefono: "123456"}
juan5.direccion.municipio = "Santa Catarina Pinula"; //este cambia al original también!!!
console.log("juan: ", juan);
console.log("juan5: ",juan5);

// solución para el ejemplo anterior de municipio
const juan6 = {
    ...juan, 
    apellido: "Dominguez", 
    telefono: "1111111",
    direccion: { // se debe copiar cada nivel que se desea modificar, lo cual si hay muchos niveles resulta dificil de mantener
        ...juan.direccion,
        municipio: "Palencia",
        aldea: "Aldea 1"
    }
}

console.log("juan: ", juan);
console.log("juan6: ",juan6);

// es importante entender este concepto de copia de objetos para trabajar con Redux posteriormente

// Arreglos inmutables
const numeros = [1,2,3];

const numeros2 = numeros;
numeros2.push(4);
console.log("numeros", numeros);
console.log("numeros2: ", numeros2);

//una de las formas para solucionar la adición de más elementos
const numeros3 = [...numeros, 5]; 
numeros3.push(6); // no se recomienda esta sintaxis porque la idea es que el arreglo ya no se pueda modificar después
console.log("numeros", numeros);
console.log("numeros3: ", numeros3);

// insertar elementos al inicio
const numeros4 = [0, ...numeros, 5,6]; 
numeros4.push(7); // no se recomienda esta sintaxis porque la idea es que el arreglo ya no se pueda modificar después
console.log("numeros", numeros);
console.log("numeros4: ", numeros4);

// insertar elementos en medio
const index = numeros.indexOf(2);
const numeros5 = [
    ...numeros.slice(0, index),
    1.5,
    ...numeros.slice(index)
]; 
console.log("numeros", numeros);
console.log("numeros5: ", numeros5);

//para eliminar
const numeros6 = numeros.filter(x => x != 2);
console.log("numeros", numeros);
console.log("numeros6: ", numeros6);

//para modificar
const numeros7 = numeros.map(x => x == 2 ? 100 : x); //utilizamos un if ternario
console.log("numeros", numeros);
console.log("numeros7: ", numeros7);

// en videos posteriores se aprenderá cómo garantizar la inmutabilidad de los objetos con librerías