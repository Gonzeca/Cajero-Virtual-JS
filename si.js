let clave = "0000";
let nombre = "John Doe";
let dinero = 100000;
const datosBancarios = ["Avenida Maipú 587", "Cuenta Corriente en Pesos", "137524000687943156888", "BARCO.CASA.NARANJA"];

function verificar_clave() {
    let bloqueo = true;
    for (let intentos = 3; intentos > 0; intentos--) {
        claveIngresada = prompt("Ingrese la clave de la tarjeta. (Predeterminado 0000)");
        if (clave === claveIngresada) {
            bloqueo = false;
            intentos = 0;
        } else {
            alert("Clave incorrecta.");
        }
    }

    return bloqueo;
}

function menu() {
    alert("Bienvenido " + nombre);
    let opcion = prompt("¿Qué acción deseas realizar? (Seleccione el número de la opción)\n1 -  Retirar Dinero\n2 -  Ingresar Dinero\n3 -  Transferir Dinero\n4 -  Ver Datos Bancarios\n5 -  Cambiar Clave\n6 -  Cambiar Nombre\n7 - Ingresar nuevamente al banco\n8 -  Salir");
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
            cambiar_clave();

            break;

        case 6:
            cambiar_nombre();

            break;

        case 7:
            inicio();
            
            break;

        case 8:
            alert("Que tenga un buen día.");
            break;
    
        default:
            alert("El número ingresado no está dentro del rango de opciones. Intentelo nuevamente.");
            menu();

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

function cambiar_nombre() {
    const nuevoNombre = prompt("Ingrese su nuevo nombre:");
    nombre = nuevoNombre;
    menu();
}

function cambiar_clave() {
    let nuevaClave = prompt("Ingrese su nueva clave. Solo puede tener hasta 4 dígitos.");
    while (nuevaClave.length > 4) {
        alert("Error, la clave contiene más de 4 caracteres");
        nuevaClave = prompt("Ingrese su nueva clave. Solo puede tener hasta 4 dígitos.");
    }
    clave = nuevaClave;
    menu();
}

function inicio() {
    alert("Bienvenido al Cajero Virtual");
    
    if (verificar_clave()) {
        alert("Se excedieron la cantidad de intentos, pruebe nuevamente más tarde.");
    } else {
        menu();
    }
}

inicio();