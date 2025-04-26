const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://jntobar:${password}@cluster0.uyt5jyy.mongodb.net/agendaApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery', false)

mongoose.connect(url)

const personaSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Persona = mongoose.model('Persona', personaSchema)


if (process.argv.length === 3) {
    Persona.find({}).then(result => {
        console.log('Agenda:')
        result.forEach(persona => {
            console.log(`${persona.name} ${persona.number}`)
        })
        mongoose.connection.close()
    })
} else {
    // Si se proporcionan nombre y número, agregar una nueva entrada
    const persona = new Persona({
        name: process.argv[3],
        number: process.argv[4]
    })

    persona.save().then(result => {
        console.log(`Added ${result.name} number ${result.number} to agenda`)
        mongoose.connection.close()
    })
}


