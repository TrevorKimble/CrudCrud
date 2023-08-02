const router = require(`express`).Router()
require(`dotenv`).config()

const baseurl = `https://crudcrud.com/api/${process.env.apiKey}/people`

router.get(`/`, (req, res) => {
    const search = req.query.search

    fetch(baseurl)
        .then(data => data.json())
        .then(data => {
            if (search) {
                const filteredData = data.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
                res.json(filteredData)
            } else {
                res.json(data)
            }
        })
        .catch(`Error:`, error => console.log(error))
    
})

router.get(`/:id`, (req, res) => {
    const id = req.params.id

    fetch(`${baseurl}/${id}`)
        .then(data => data.json())
        .then(data => {
            const containId = data._id == id
            if (containId) {
                res.json(data)
            } else {
                res.status(404).end()    
            }
        })
        .catch(() => res.status(404).end(`error`))
})

router.post(`/`, (req, res) => {
    if (req.body.name && req.body.occupation && req.body.age) {
        fetch(baseurl, {
            headers: { "Content-Type": `application/json; charset=utf-8` },
            method: `POST`,
            body: JSON.stringify(req.body)
        })
            .then(response => response.json())
            .then(data => res.json(data))
            .catch(error => console.log(error))
    } else {
        res.status(500).end()
    }
})

router.put(`/:id`, (req, res) => {
    if (req.body.name && req.body.occupation && req.body.age) {
        const id = req.params.id

        fetch(`${baseurl}/${id}`, {
            headers: { "Content-Type": `application/json; charset=utf-8` },
            method: `PUT`,
            body: JSON.stringify(req.body)
        })
            .then(res.end())
            .catch(error => console.log(error))
    } else {
        res.status(500).end()
    }
})

router.patch(`/:id`, (req, res) => {
    const id = req.params.id
    
    fetch(`${baseurl}/${id}`, {
        headers: { "Content-Type": `application/json; charset=utf-8` },
        method: `PATCH`,
        body: JSON.stringify(req.body)
    })
        .then(() => console.log(id, req.body))
        .then(() => res.end())
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: `An error occurred` })
        })
})

router.delete(`/:id`, (req, res) => {
    const id = req.params.id
    fetch(`${baseurl}/${id}`)
        .then(data => data.json())
        .then(data => {
            if (data._id === id) {
                fetch(`${baseurl}/${id}`, {
                    headers: { "Content-Type": `application/json; charset=utf-8` },
                    method: `DELETE`
                })
                    .then(res.end())
                    .catch(error => console.log(error))
            } else {
                console.log(`TEST`, id)
                res.status(404).end()   
            }
        })
        .catch(() => res.status(404).end(`Error`))
        
})
    
module.exports = router