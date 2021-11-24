const express = require('express')
const router = new express.Router()

const items = require('.././fakeDb')
const {findItemInFakeDb, findIndex} = require('.././helper.js')
const { ExpressError } = require('../expressError')

router.get('/', function(req, res) {
    return res.status(200).json(items)
})

router.post('/', function(req, res) {
    const newItem = {name: req.body.name, price: req.body.price}
    items.push(newItem)
    
    return res.status(201).json({"added": newItem})
})

router.get('/:name', function(req, res) {
    let item = findItemInFakeDb(req.params.name)

    return res.status(200).json(item)
})

router.patch('/:name', function(req, res) {
    const newItem = {"name": req.body.name, "price": req.body.price}

    let itemIndex = findIndex(req.params.name)
    items.splice(itemIndex, 1, newItem)

    return res.status(200).json({"update": newItem})
})

router.delete('/:name', function(req, res) {
    let itemIndex = findIndex(req.params.name)
    items.splice(itemIndex, 1)

    return res.status(200).json({"message": "Deleted"})
})

module.exports = router