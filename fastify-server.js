const fastify = require('fastify')({ logger: true })

// Array of students
const students = [
    {
      id: 1,
      last: "Range",
      first: "Aidan",
    },
    {
      id: 2,
      last: "Student2",
      first: "UO",
    },
    {
      id: 3,
      last: "Student3",
      first: "UO",
    }
  ]
  
// GET /cit/student
fastify.get('/cit/student', async (request, reply) => {
    return students
})

// GET /cit/student/:id
fastify.get('/cit/student/:id', async (request, reply) => {
    const id = parseInt(request.params.id)
    const student = students.find(student => student.id === id)

    if (student) {
        return student
    } else {
        reply.code(404)
        return { error: 'Not Found' }
    }
})

// Unmatched route handler
fastify.all('*', async (request, reply) => {
    return { error: 'Unmatched route' }
})

// Server listener
const start = async () => {
    try {
        await fastify.listen(3000)
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
