const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Personas = require('./models/personas')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors())


app.get('/info', (request, response) => {
  Personas.countDocuments({})
    .then(count => {
      response.send(
        `Phonebook has info for ${count} people<br>${new Date()}`
      )
    })
})

app.get('/api/persons', (request, response) => {
  Personas.find({}).then(persona => {
    response.json(persona)
  })

})

app.get('/api/persons/:id', (request, response, next) => {
  Personas.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)

      } else {
        response.status(404).end()
      }

    })
    .catch(error => next(error))



})

app.delete('/api/persons/:id', (request, response, next) => {
  Personas.findByIdAndDelete(request.params.id)
    .then(result => {
      if (result) {
        response.status(204).end() // Eliminado correctamente
      } else {
        response.status(404).end() // No se encontró el id
      }
    })
    .catch(error => next(error)) // Por si hay error en el id (malformateado)
})


app.post('/api/persons', (request, response,next) => {
  const body = request.body
  console.log(body)


  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name and number are required'
    })
  }


    // Verificar si ya existe una persona con el mismo nombre
    Personas.findOne({ name: new RegExp('^' + body.name + '$', 'i') }) // ignorar mayúsculas/minúsculas
    .then(existingPerson => {
      if (existingPerson) {
        return response.status(400).json({
          error: 'name must be unique'
        })
      }

      const person = new Personas({
        name: body.name,
        number: body.number
      })

      return person.save()
    })
    .then(savedPerson => {
      if (savedPerson) {
        response.json(savedPerson)
      }
    })
    .catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  // Validar que el número esté presente
  if (!number) {
    return response.status(400).json({
      error: 'number is required'
    })
  }

  // Actualizar la entrada
  Personas.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' } // `new: true` devuelve el documento actualizado
  )
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson)
      } else {
        response.status(404).json({ error: 'person not found' })
      }
    })
    .catch(error => next(error))
})


const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
})

app.use((error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
})
