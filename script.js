let clave = "0000";
let nombre = "John Doe";
let dinero = 100000;
const datosBancarios = ["Avenida Maipú 587", "Cuenta Corriente en Pesos", "137524000687943156888", "BARCO.CASA.NARANJA"];

function inicio() {
    let claveIngresada = prompt("Ingrese la clave de la tarjeta. (Predeterminado 0000)");
    let bloqueo = true;
    for (let intentos = 3; clave === claveIngresada || intentos === 0; intentos--) {
        alert("Clave incorrecta.");
        claveIngresada = prompt("Ingrese la clave de la tarjeta. (Predeterminado 0000)");
    }
    if (clave === claveIngresada) {
        bloqueo = false;
    }

    return bloqueo;
}

function menu() {
    alert("Bienvenido " + nombre);
    let opcion = prompt("¿Qué acción deseas realizar? (Seleccione el número de la opción)\n1 -  Retirar Dinero\n2 -  Ingresar Dinero\n3 -  Transferir Dinero\n4 -  Ver Datos Bancarios\n5 -  Cambiar Clave\n6 -  Cambiar Nombre\n7 -  Salir");
    switch (parseInt(opcion)) {
        case 1:
            retirar_dinero();
            
            break;

        case 2:
            ingresar_dinero();
            
            break;

        case 3:
            transferir_dinero();
            
            break;

        case 4:
            datos_bancarios();
            
            break;

        case 5:
            
            break;

        case 6:
            
            break;

        case 7:
            
            break;
    
        default:
            break;
    }
}

function retirar_dinero() {
    let cantidadDinero = parseInt(prompt("Ingrese la cantidad de dinero a retirar (Dinero disponible: " + dinero + ")"));
    while (cantidadDinero > dinero || cantidadDinero < 0 || cantidadDinero === NaN) {
        alert("Error con la cantidad ingresada, intente nuevamente.");
        cantidadDinero = parseInt(prompt("Ingrese la cantidad de dinero a retirar (Dinero disponible: " + dinero + ")"));
    }
    dinero = dinero - cantidadDinero;
    alert("Se ha completado la transacción exitosamente (Dinero actual: " + dinero + ")");
    menu();
}

function ingresar_dinero() {
    let cantidadDinero = parseInt(prompt("Ingrese la cantidad de dinero a ingresar:"));
    while (cantidadDinero < 0 || cantidadDinero === NaN) {
        alert("Error con la cantidad ingresada, intente nuevamente.");
        cantidadDinero = parseInt(prompt("Ingrese la cantidad de dinero a ingresar:"));
    }
    dinero = dinero + cantidadDinero;
    alert("Se ha completado la transacción exitosamente (Dinero actual: " + dinero + ")");
    menu();
}

function transferir_dinero() {
    let cantidadDinero = parseInt(prompt("Ingrese la cantidad de dinero a transferir (Dinero disponible: " + dinero + ")"));
    while (cantidadDinero > dinero || cantidadDinero < 0 || cantidadDinero === NaN) {
        alert("Error con la cantidad ingresada, intente nuevamente.");
        cantidadDinero = parseInt(prompt("Ingrese la cantidad de dinero a transferir (Dinero disponible: " + dinero + ")"));
    }

    let datosBancariosPersona = prompt("Ingrese el alias o CBU de la persona a quien va a transferir.");

    dinero = dinero - cantidadDinero;
    alert("Se ha completado la transacción exitosamente a " + datosBancariosPersona + " (Dinero actual: " + dinero + ")");
    menu();
}

function datos_bancarios() {
    const modificar = confirm("Direccion: " + datosBancarios[0] + "\nCuenta Depósito: " + datosBancarios[1] + "\nCBU: " + datosBancarios[2] + "\nAlias: " + datosBancarios[3] + "\n\n¿Desea modificar el alias?");
    if (modificar) {
        let nuevoAlias = prompt("Ingrese su nuevo alias:");
        datosBancarios[3] = nuevoAlias;
    }
    menu();
}

alert("Bienvenido al Cajero Virtual");

if (inicio()) {
    
} else {
    alert("Se excedieron la cantidad de intentos, pruebe nuevamente más tarde.")
}