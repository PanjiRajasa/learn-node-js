const moduleStuffs = require('./moduleStuffs')

const array = [1,2,3,"Hi"];
// console.log(moduleStuffs.arrayLengthMessage(array));
// console.log(moduleStuffs.PI);

const secondModule = require('./anotherModule');
//console.log(secondModule.hi);

//event emitter (built in node js module)
const events = require('events');

//custom event
const eventEmitter = new events.EventEmitter();

const customLog = ([tag, message]) => console.log(`${tag}| message:${message}`);

eventEmitter.on("custom log", customLog);

//eventEmitter.emit("custom log", ["app.js", "Debug info"] );

//util event
const util = require('util');

//object constructor that will inherits utils later
const Identity = function(name) {
    this.name = name;
};

util.inherits(Identity, events.EventEmitter);

//make new objects
const panji = new Identity("Panji");
const ryan = new Identity("Ryan");
const vx = new Identity("Vx");

const people = [panji, ryan, vx];

people.forEach( function(it) {
    it.on("saySomething", function(message) {console.log(`${it.name} said ${message}`) });
})

// panji.emit("saySomething", "hi");
// ryan.emit("saySomething", "hi");
// vx.emit("saySomething", "hi");

//readfile
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, './folderTest/pleaseReadme.txt')
const readMe = fs.readFileSync(filePath, 'utf8');
//console.log(readMe);

//write file
const pathWrite = path.join(__dirname, "./folderTest/writeMe.txt")
const writeMe = fs.writeFileSync(pathWrite, readMe);
//console.log(writeMe); //undefined -> fs.writeFileSync not return anything

//asynchronus readFile
fs.readFile(filePath, 'utf-8', function(err, data) { 
    if(err) {
        console.log(err); 
        return;
    }

    //console.log(`${data}`)

    //asynchronus writeFile
    fs.writeFile(pathWrite, data, function(err) {
        if(err) {
            console.log(err);
        }
    });
} );

//async and await read and write file (modern node)
const fsPromise = require("fs/promises")

async function readAndWrite() {

    //readFile using async await
    const readFileAsyncAwaitPath = path.join(__dirname, "./anotherDummyFolder/easy.txt")
    const readFileAsyncAwait = await fsPromise.readFile(readFileAsyncAwaitPath, "utf-8");
    //console.log(readFileAsyncAwait);

    //writeFile using async await
    const writeFileAsyncAwaitPath = path.join(__dirname, "./anotherDummyFolder/writeFromEasy.txt")
    await fsPromise.writeFile(writeFileAsyncAwaitPath, readFileAsyncAwait, "utf-8");
    //console.log("successfully write the file")
}

readAndWrite();

//