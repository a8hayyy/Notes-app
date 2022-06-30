const fs = require('fs')
const chalk = require('chalk')
const { load } = require('nodemon/lib/config')

const getNotes = function () {
    return 'Your notes...'
}

const addNote = function (title, body){
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function(note) {
        return note.title === title
    })

    if(duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New node added!'))
    }else{
        console.log(chalk.red.inverse('Node title taken!'))
    }
    // console.log(notes)
}

const removeNote = function (title) {
    // console.log(title)
    const notes =loadNotes()
    const notesToKeep = notes.filter(function (note) {
        return note.title !== title
    })

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note Removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }

}

const listNotes =function () {
    const notes = loadNotes()
    console.log(chalk.inverse('Your Notes: '))
    notes.forEach((notes) => {
        console.log(chalk.bold(notes.title))
    })
}

const readNote = function (title) {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if(note){
        console.log(chalk.inverse(note.title))
        console.log(chalk.bold(note.body))
    }else{
        console.log("Note not found!")
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function() {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes : getNotes,
    addNote : addNote,
    removeNote : removeNote,
    listNotes: listNotes,
    readNote: readNote
}