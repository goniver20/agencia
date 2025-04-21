const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const connection = require('./database');


const app = express();
const port = 3000;


const userName1 = 'oscarvelb20@gmail.com';
const password = 'dhuj djcw azvw nzoh';

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: userName1,
        pass: password   
    },
});

app.use(cors({
    origin: 'http://localhost:5500', 
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());
app.use(express.json());


app.post('/guardar', (req, res) => {
    console.log(req.body);
    const { nombre, apellidoP, apellidoM, email, telefono, origen, destino, salida, regreso, pasajeros, notas } = req.body;

    const insertCliente = 'INSERT INTO clientes (nombre, apellidoP, apellidoM, email, telefono) VALUES (?,?,?,?,?)';
    connection.query(insertCliente, [nombre, apellidoP, apellidoM, email, telefono], (err, resultCliente) => {
        if (err) {
            console.error('Error al insertar al cliente', err);
            return res.status(500).send('Error al guardar al cliente');
        }

        const cliente_id = resultCliente.insertId;

        //Conexión con la otra tabla con el mismo Id
        const insertReserva = 'INSERT INTO reservas (IdClientes, origen, destino, salida, regreso, pasajeros, notas) VALUES (?,?,?,?,?,?,?)';
        connection.query(insertReserva, [cliente_id, origen, destino, salida, regreso, pasajeros, notas], (err, resultReserva) => {
            if (err) {
                console.error('Error al insertar la reserva', err);
                return res.status(500).send('Error al guardar la reserva');
            }

            const mailOptions  ={
                from: userName1,
                to: email,
                subject: "Reserva de su viaje - AeroMex",
                text: `Tus boletos estan listos ${nombre} ¡Tu aventura comienza aquí!: \n
                Detalle de tus DATOS.\n
                Nombre: ${nombre}
                Apellido Paterno: ${apellidoP}
                Apellido Materno: ${apellidoM}
                Correo: ${email}    
                Telefono: ${telefono}
                \nDetalle de tu VIAJE!\n
                Origen: ${origen}   
                Destino: ${destino}
                Fecha de SALIDA: ${salida}
                Fecha de REGRESO: ${regreso}
                Num. de Pasajeros: ${pasajeros} 
                Notas de tu Viaje: ${notas}`,
            }

            transporter.sendMail(mailOptions, (error, info) =>  {
                if(error){
                    console.log(error);
                }
                console.log("Email sent: " + info.response);
            })

            res.send('Cliente y Reserva guardados correctamente');
        });


    });


});
app.get('/', (req, res) => {
    res.json({ mensaje: 'Servidor funcionando correctamente' });
});
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
