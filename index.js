const express = require('express');
const app = express();

app.use(express.json());

const tecnico = [
    {id: 1, name: 'Álgebra Vectorial y Matrices', credits: 4, enrolled: true},
    {id: 2, name: 'Lenguajes de Marcado y Estilo Web', credits: 4, enrolled: true},
    {id: 3, name: 'Programación de Algoritmos', credits: 4, enrolled: true},
    {id: 4, name: 'Redes de Comunicación', credits: 4, enrolled: true},
    {id: 5, name: 'Análisis y Diseño de Sistemas y Base de Datos', credits: 4, enrolled: true},
    {id: 6, name: 'Desarrollo de Aplic. Web con Soft. Interpret. en el Cliente', prerequirements:[2],credits: 4, enrolled: true},
    {id: 7, name: 'Desarrollo de Aplicaciones con Software Propietario', prerequirements:[3],credits: 4, enrolled: true},
    {id: 8, name: 'Programación Orientada a Objetos', prerequirements:[3], credits: 4, enrolled: true},
    {id: 9, name: 'Administración de Servicios en la Nube', prerequirements:[3,4], credits: 4, enrolled: true},
    {id: 10, name: 'Diseño y Programación de Software Multiplataforma',prerequirements:[5,6] ,credits: 4, enrolled: true},
]

const ingenieria = [
    {id: 1, name: 'Ecuaciones Diferenciales', credits: 4, enrolled: true},
    {id: 2, name: 'Aplicacion de Metodos Numericos', credits: 4, enrolled: true},
    {id: 3, name: 'Quimica General', credits: 4, enrolled: true},
    {id: 4, name: 'Sistemas Operativos', credits: 4, enrolled: true},
    {id: 5, name: 'Ingenieria de Software', credits: 4, enrolled: true},
    {id: 6, name: 'Lenguajes Interpretados en el Cliente',prerequirements:[4,5], credits: 4, enrolled: true},
    {id: 7, name: 'Lenguajes Interpretados en el Servidor', prerequirements:[4,5],credits: 4, enrolled: true},
    {id: 8, name: 'Programación Estructurada', prerequirements:[4,5],credits: 4, enrolled: true},
    {id: 9, name: 'Estadistica Aplicada', prerequirements:[1,2],credits: 4, enrolled: true},
    {id: 10, name: 'programacion Orientada a Objetos',prerequirements:[4,5], credits: 4, enrolled: true},
]

app.get('/', (req, res) => {
    res.send('Node JS api');
})

app.get('/api/tecnico', (req, res) =>{
    res.send(tecnico);
})
app.get('/api/ingenieria', (req, res) =>{
    res.send(ingenieria);
})
//ruta de prerequisitos por materia en ingenieria.
app.get('/api/ingenieria/:id', (req, res) =>{
    const MateriaIngenieria =  ingenieria.find( materia => materia.id === parseInt(req.params.id))
    if(!MateriaIngenieria)
    {
     return res.status(404).send('Oops, no hemos encontrado resultado.');
    }
    else
    {
     if(MateriaIngenieria.hasOwnProperty('prerequirements'))
     {
         const newMateria =  ingenieria.filter(c =>  MateriaIngenieria.prerequirements.includes(c.id) )
         res.send(newMateria);
     }
     else
    {
      res.send(`La siguiente materia "${MateriaIngenieria.name}" no necesita ningun prerequisito para cursar`);
    }
 }
})
//ruta prerequisitos por materia en tecnico.
app.get('/api/tecnico/:id', (req, res) =>{
    const MateriaTecnico =  tecnico.find( materia => materia.id === parseInt(req.params.id))
    if(!MateriaTecnico)
    {
     return res.status(404).send('Oops, no hemos encontrado resultado.');
    }
    else
    {
     if(MateriaTecnico.hasOwnProperty('prerequirements'))
     {
         const newMateria =  tecnico.filter(c =>  MateriaTecnico.prerequirements.includes(c.id) )
         res.send(newMateria);
     }
     else
    {
      res.send(`La siguiente materia "${MateriaTecnico.name}" no necesita ningun prerequisito para cursar`);
    }
 }
})

const port = process.env.port || 80;
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));