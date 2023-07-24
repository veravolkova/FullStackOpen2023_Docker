//test file, is not needed in the project anymore
const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://...${password}..`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)

if (!name && !number) {
  Person.find({}).then(result => {
    console.log('Phonebook: ')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

if (name && number) {
  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(response => {
    console.log(`person ${name} number ${number} saved!`)
    mongoose.connection.close()
  })
}
