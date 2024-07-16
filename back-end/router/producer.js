const express = require('express');
const router = express.Router();

const producers = [
    { id: 1, name: 'Producer 1' },
    { id: 2, name: 'Producer 2' },
    { id: 3, name: 'Producer 3' },
    { id: 4, name: 'Producer 4' },
    { id: 5, name: 'Producer 5' }
];

router.get("/", (req, res) => {
    res.json(producers);
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const producer = producers.find(p => p.id === id);
    if (producer) {
        res.json(producer);
    } else {
        res.status(404).send({ message: 'Producer not found' });
    }
});

router.post("/", (req, res) => {
    const newProducer = {
        id: Date.now(),
        name: req.body.name
    };
    producers.push(newProducer);
    res.status(201).send(newProducer);
});

router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = producers.findIndex(p => p.id === id);
    if (index !== -1) {
        producers[index].name = req.body.name;
        res.send(producers[index]);
    } else {
        res.status(404).send({ message: 'Producer not found' });
    }
});

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = producers.findIndex(p => p.id === id);
    if (index !== -1) {
        producers.splice(index, 1);
        res.send({ message: 'Producer deleted', id: id });
    } else {
        res.status(404).send({ message: 'Producer not found' });
    }
});

module.exports = router;