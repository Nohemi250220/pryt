const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'moonlicour'
});

connection.connect((error) => {
    if (error) throw error;
    console.log('Conexión exitosa a la base de datos');
});

// Obtener todas las bebidas
app.get('/bebidas', (req, res) => {
    connection.query('SELECT * FROM bebidas', (error, result) => {
        if (error) throw error;
        res.send(result);
    });
});

// Obtener una bebida por ID
app.get('/bebidas/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM bebidas WHERE id = ?', id, (error, result) => {
        if (error) throw error;
        res.send(result);
    });
});

// Crear una nueva bebida
app.post('/bebidas', (req, res) => {
    const { nombre, alcohol, complemento1, complemento2, descripcion, imagen } = req.body;
    connection.query('INSERT INTO bebidas (nombre, alcohol, complemento1, complemento2, descripcion, imagen) VALUES (?, ?, ?, ?, ?, ?)', [nombre, alcohol, complemento1, complemento2, descripcion, imagen], (error, result) => {
        if (error) throw error;
        res.send('Bebida creada exitosamente');
    });
});

// Eliminar una bebida
app.delete('/bebidas/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM bebidas WHERE id = ?', id, (error, result) => {
        if (error) throw error;
        res.send('Bebida eliminada exitosamente');
    });
});

// Obtener información de la API
app.head('/', (req, res) => {
    res.send('API de Moonlicour');
});

// Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    connection.query('SELECT * FROM usuario', (error, result) => {
        if (error) throw error;
        res.send(result);
    });
});

// Obtener un usuario por ID
app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM usuario WHERE id = ?', id, (error, result) => {
        if (error) throw error;
        res.send(result);
    });
});

// Crear un nuevo usuario
app.post('/usuarios', (req, res) => {
    const { nombre, correo, contrasena, favoritos } = req.body;
    connection.query('INSERT INTO usuario (nombre, correo, contrasena, favoritos) VALUES (?, ?, ?, ?)', [nombre, correo, contrasena, favoritos], (error, result) => {
        if (error) throw error;
        res.send('Usuario creado exitosamente');
    });
});

// Eliminar un usuario
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM usuario WHERE id = ?', id, (error, result) => {
        if (error) throw error;
        res.send('Usuario eliminado exitosamente');
    });
});

// Obtener todos los dispensadores
app.get('/dispensadores', (req, res) => {
    connection.query('SELECT * FROM dispensador', (error, result) => {
        if (error) throw error;
        res.send(result);
    });
});

// Obtener un dispensador por ID
app.get('/dispensadores/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM dispensador WHERE id = ?', id, (error, result) => {
        if (error) throw error;
        res.send(result);
    });
});

// Crear un nuevo dispensador
app.post('/dispensadores', (req, res) => {
    connection.query('INSERT INTO dispensador (id) VALUES (NULL)', (error, result) => {
        if (error) throw error;
        res.send('Dispensador creado exitosamente');
    });
});

// Eliminar un dispensador
app.delete('/dispensadores/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM dispensador WHERE id = ?', id, (error, result) => {
        if (error) throw error;
        res.send('Dispensador eliminado exitosamente');
    });
});


// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});

const request = require('request');

function enviarBebida(idBebida) {
  const url = 'file:///C:/Users/alexis/Desktop/pryt%20Web/moonlicour.html?bebida=Margarita'; // Cambiar por la dirección IP de tu placa esp32
  const options = {
    method: 'POST',
    uri: url,
    body: {
      id_bebida: idBebida
    },
    json: true
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error(error);
    } else {
      console.log(body);
    }
  });
}

app.post('/dispensar/:id', (req, res) => {
    const { id } = req.params;
    enviarBebida(id);
    res.send('Bebida dispensada exitosamente');
  });
  