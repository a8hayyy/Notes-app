const notes=require('./notes.js')
const yargs=require('yargs')
// const chalk =require('chalk')
// const validator=require('validator')
// const { argv } = require('process')
// const { string } = require('yargs')

//Coustomise yargs version
yargs.version('1.1.0')

//Create add command
yargs.command({
    command:'add',
    describe:'Add a new note',
    builder: {
        title: {
            describe:'Note title',
            demandOption: true,
            type:'string'
        },
        body: {
            describe:'Note body',
            demandOption: true,
            type:'string'
        }
    },
    handler: function (argv){
        // console.log('Title: '+argv.title)
        // console.log('Body: '+argv.body)
        notes.addNote(argv.title,argv.body)
    }
})

//Create remove command 
yargs.command({
    command:'remove',
    describe:'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (agrv){
        notes.removeNote(agrv.title)
    }
})
//Create list command
yargs.command({
    command: 'list',
    describe: 'Listing all notes',
    handler: function () {
        notes.listNotes()
    }
})
//Create read command
yargs.command({
    command: 'read',
    describe: 'Reading the note',
    builder: {
        title: {
            describe:'Note title',
            demandOption:true,
            type:'string'
        }
    },
    handler: function (agrv) {
        notes.readNote(agrv.title)
    }
})


yargs.parse()
// console.log(yargs.argv)

