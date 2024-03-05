let textoIngresado = ''; // Variable para almacenar el texto ingresado

function encriptar() {
    // Ocultar texto e imagen
    ocultarTextoImagen();
    
    // Obtener el texto ingresado
    textoIngresado = document.querySelector('.input').value;
    // Obtener el texto encriptado
    let textoEncriptado = encriptacion(textoIngresado);
    // Mostrar el texto encriptado en el mensaje
    asignarTextoElemento('.mensajeNoEncontrado', textoEncriptado);
    
    // Mostrar botón copiar
    mostrarBotonCopiar();
}

function desencriptar() {
    // Ocultar texto e imagen
    ocultarTextoImagen();
    
    // Obtener el texto que ha sido ingresado
    textoIngresado = document.querySelector('.input').value;
    
    let textoDesencriptado = desencriptacion(textoIngresado);
    // Mostrar el texto desencriptado
    asignarTextoElemento('.mensajeNoEncontrado', textoDesencriptado);
    
    // Mostrar botón copiar
    mostrarBotonCopiar();
}

function copiarTexto() {
    // Copiar el texto al portapapeles
    let textoCopiado = document.querySelector('.mensajeNoEncontrado').textContent;
    navigator.clipboard.writeText(textoCopiado)
        .then(() => {
            // Limpiar el campo de entrada
            document.querySelector('.input').value = '';
            // Mostrar texto e imagen
            mostrarTextoImagen();
            // Ocultar botón copiar
            ocultarBotonCopiar();
        })
        .catch(err => {
            console.error('Error al copiar texto: ', err);
        });
}

function asignarTextoElemento(selector, texto) {
    let elementoHTML = document.querySelector(selector);
    elementoHTML.textContent = texto;
}

function encriptacion(texto) {
    const encriptacion = {
         "e": "enter",
         "i": "imes",
         "a": "ai",
         "o": "ober",
         "u": "ufat"
    };
        
    let textoEncriptado = '';
    for (let letra of texto) {
        if (encriptacion.hasOwnProperty(letra)) {
            textoEncriptado += encriptacion[letra];
        } else {
            textoEncriptado += letra; // Si la letra no está en el objeto de encriptación, se mantendrá igual
        }
    }
    return textoEncriptado;
}

function desencriptacion(texto) {
    const encriptacion = {
         "e": "enter",
         "i": "imes",
         "a": "ai",
         "o": "ober",
         "u": "ufat"
    };

    let textoDesencriptado = texto;

    // Reemplazar cada palabra encriptada por su equivalente desencriptado
    for (let letra in encriptacion) {
        if (encriptacion.hasOwnProperty(letra)) {
            const regex = new RegExp(encriptacion[letra], 'g');
            textoDesencriptado = textoDesencriptado.replace(regex, letra);
        }
    }

    return textoDesencriptado;
}

function ocultarTextoImagen() {
    document.querySelector('.img-muñeco').style.display = 'none';
    document.querySelector('.text').style.display = 'none';
}

function mostrarTextoImagen() {
    document.querySelector('.img-muñeco').style.display = 'block';
    document.querySelector('.mensajeNoEncontrado').style.display = 'block';
    document.querySelector('.text').style.display = 'block';
}

function mostrarBotonCopiar() {
    let botonCopiar = document.querySelector('.btn-copiar');
    botonCopiar.style.display = 'block';
}

function ocultarBotonCopiar() {
    let botonCopiar = document.querySelector('.btn-copiar');
    botonCopiar.style.display = 'none';
}

function validarTexto() {
    let textoIngresado = document.querySelector('.input').value;
    let regex = /^[a-z\s]*$/; // Expresión regular para validar letras minúsculas, espacios en blanco y ningún otro carácter especial
    let mensajeAdvertencia = document.querySelector('.advertencia');

    if (!regex.test(textoIngresado)) {
        mensajeAdvertencia.textContent = '¡Solo letras minúsculas y sin acentos!';
        mensajeAdvertencia.classList.add('error'); // Agregar clase 'error' para cambiar color del texto a rojo
        document.querySelector('.btn-encriptar').disabled = true; // Deshabilitar botón encriptar
        document.querySelector('.btn-desencriptar').disabled = true; // Deshabilitar botón desencriptar
    } else {
        mensajeAdvertencia.textContent = 'Solo letras minúsculas y sin acentos';
        mensajeAdvertencia.classList.remove('error'); // Remover clase 'error' para restaurar color original del texto
        document.querySelector('.btn-encriptar').disabled = false; // Habilitar botón encriptar
        document.querySelector('.btn-desencriptar').disabled = false; // Habilitar botón desencriptar
    }
}
