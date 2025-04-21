console.log("Script Cargado");

// Obtener la fecha de hoy en formato YYYY-MM-DD
const today = new Date().toISOString().split('T')[0];
        
// Establecer la fecha de hoy como el valor predeterminado del campo de fecha
document.getElementById('fecha1').value = today;
document.getElementById('fecha2').value = today;

document.getElementById('my_form').addEventListener('submit',function(e){
    e.preventDefault();

    const form = e.target;
    const mensaje = document.getElementById('mensaje');
    
    const nombre = form.nombre.value;
    const apellidoP = form.apellidoP.value;
    const apellidoM = form.apellidoM.value;
    const email = form.email.value;
    const telefono = form.telefono.value;
    const origen = form.origen.value;
    const destino = form.destino.value;
    const salida = form.salida.value;
    const regreso = form.regreso.value;
    const pasajeros = form.pasajeros.value;
    const notas = form.notas.value;

    fetch('http://localhost:3000/guardar',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombre, apellidoP, apellidoM, email, telefono, origen, destino, salida, regreso, pasajeros, notas})

    })
    .then(response => response.text())
    .then(data => {
        alert("Respuesta del servidor: " + data);
        form.reset();
        mensaje.textContent = "✅❤️🥵 Datos enviados correctamente";
        mensaje.style.color = "green";

        //Ocultando el mensaje después de 4 segundos
        setTimeout(() => {
            mensaje.textContent = "";
        }, 4000);
        
    })
    .catch(error =>{
        console.error('Error',error);
        mensaje.textContent = "❌ Hubo un error al enviar los datos";
        mensaje.style.color = 'red';    
        mensaje.style.backgroundColor = 'yellow';
    });

});