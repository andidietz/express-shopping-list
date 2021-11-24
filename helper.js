const items = require('./fakeDb')

function findItemInFakeDb(name) {
    const foundItem = items.find(v => v.name === name);

    if(foundItem === undefined) {
      throw { message: "Not Found", status: 404 }
    }
    return foundItem
}

function findIndex(name) {
    const index = items.findIndex(v => v.name === name)
    
    if(index === -1) {
        throw { message: "Not Found!", status: 404}
    }
    return index
}

module.exports = {findItemInFakeDb, findIndex}