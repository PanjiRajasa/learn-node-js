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

//readAndWrite();

//removing file (sync way)
if(fs.existsSync(path.join(__dirname, "./thirdFolder/forDelete.txt"))) {
    fs.unlinkSync(path.join(__dirname, "./thirdFolder/forDelete.txt"));
} else {
    //console.log("file not found.")
}

//removing file (async way)
async function deleteFile() {

    const deletePath = path.join(__dirname, "./thirdFolder/hi.txt");
    try {
        await fsPromise.unlink(deletePath);
        //console.log("successfully deleted the file")
    } catch(err) {

        if(err.code == "ENOENT") {
            //console.log("file not found");
        } else {
            //console.log(`error while deleting the file ${err}`)
        }
        
    }
}

//deleteFile();

//creating and removing directories

//creating (sync)
//fs.mkdirSync('stuff');

//removing directory (sync)
//fs.rmdirSync('stuff');

//creating (sync)
async function createFileAsync() {
    try {
        await fsPromise.mkdir("stuff");
        console.log("Successfully make directory");

        const data = "File in stuff directory 🤑🥰";
        await fsPromise.writeFile(path.join(__dirname, "./stuff/stuffFile.txt"), data);
        console.log("Successfully created a new file in the directory");

    } catch(err) {

        //error handling
        if(err.code == "EEXIST") {
            console.log("Directory already exist");
        } else if(err.code == "ENOENT") {
            console.log("Directory did not exist");
        } else if(err.code == "ERR_INVALID_ARG_TYPE") {
            console.log('The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView. Received undefined');
        } 
        else {
            console.log(`${err}`);
        }
    }
}

//createFileAsync();

//delete file (async)
async function deleteFileAsync() {
    try {
        await fsPromise.rmdir("stuff");
        console.log("Successfully remove directory");
    } catch(err) {
        if(err.code == "ENOENT") {
            console.log("Directory did not exist");
        } else {
            console.log(err);
        }
    }
}

//deleteFileAsync();

//create a server

//plain text server
const http = require('http');

// const server = http.createServer(function(req, res) { 
//     console.log(`request was made ${req.url}`); //every time request was made

//     res.writeHead(200, {"content-type": "text/plain"});  //header settings
//     res.end('UwU from my first server!'); //end the server
// });

//server.listen(3000, "127.0.0.1"); //set the port

//console.log("server is now listening to port 3000");

//JSON response server
// const server2 = http.createServer(function(req, res) {
//     console.log(`request was made ${req.url}`);

//     res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
//     res.setHeader("Access-Control-Allow-Methods", "GET");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//     res.writeHead(200, {"content-type": "application/json"});

//     const readableStream = fs.createReadStream(path.join(__dirname, "./server/serverData.json"), 'utf-8');

//     //Log when the process is complete
//     readableStream.on("end", function() { 
//         console.log("server data received!"); 
//     })

//     //Pipe the read stream data to the response
//     readableStream.pipe(res);
// });

//server2.listen(4000, "127.0.0.1");

//console.log("Second server is now listening to port 4000");


//Create a readable stream to read data from a file or other source
//Create a writable stream that allows us to write data to a file
const readableStreamPath = path.join(__dirname, "./data/dummyData.txt");
const readableStream = fs.createReadStream(readableStreamPath, "utf-8");

const writableStreamPath = path.join(__dirname, "./data/writableDummyData.txt");
const writableStream = fs.createWriteStream(writableStreamPath, "utf-8");

//Use the 'data' event to read chunks emitted by the readable stream. 
readableStream.on("data", function(chunk) { 
    //console.log("new chunk received"); 

    //Write data from the readable stream to the writable stream
    writableStream.write(chunk, function(error) { 
        if(error) {console.log(error)} //Log any errors to the console
    });
}); 

//Close the streams after writing is complete
readableStream.on("end", function() {
    //console.log("done reading");
    writableStream.end(); //close the writable stream
});

//pipe
const readableStreamPipePath = path.join(__dirname, "./pipeFile/readableFile.txt");
const readableStreamPipe = fs.createReadStream(readableStreamPipePath, "utf-8");

const writableStreamPipePath = path.join(__dirname, "./pipeFile/writableFile.txt");
const writableStreamPipe = fs.createWriteStream(writableStreamPipePath, "utf-8");

readableStreamPipe.pipe(writableStreamPipe);
//console.log("pipe transfer success!");

//pipe from sever to console
//http.get("http://127.0.0.1:4000", function(res) {
    //res.pipe(process.stdout)
// });

//pipe from server to file
const writableStreamServerPath = path.join(__dirname, "./pipeFile/writableServerFile.txt");
const writableStreamServer = fs.createWriteStream(writableStreamServerPath, "utf-8");

//http.get("http://127.0.0.1:4000", function(res) {res.pipe(writableStreamServer)});

// Serve HTML page using server
// http.createServer(function(req, res) {

//     console.log(`request was made ${req.url}`)
//     res.writeHead(200, {"content-type": "text/html"}); //content type

//     const readStream = fs.createReadStream(path.join(__dirname, "./myWebsite.html"), "utf-8"); //readable stream

//     readStream.on("end", function() {
//         console.log("server data received!");
//     })

//     readStream.pipe(res);

// }).listen(5000, "127.0.0.1");


//Basic routing
// const server = http.createServer(function(req, res) {
//     console.log(`[${new Date().toISOString()}] Incoming request: ${req.method} ${req.url}`);//Log incoming request

//     //Handle route paths
//     if(req.url === "/" || req.url === "/home") {

//         res.writeHead(200, {"content-type": "text/html"}); //Write response header with HTML content type

//         const readableStream = fs.createReadStream(path.join(__dirname, "./myWebsite.html"), "utf-8"); //Create readable stream from HTML file

//         readableStream.pipe(res); //Pipe HTML stream directly to response

//     } 
//     else if(req.url === "/contact") {
        
//         res.writeHead(200, {"content-type": "text/html"}); //Write response header with HTML content type

//         const readableStream = fs.createReadStream(path.join(__dirname, "./contact.html"), "utf-8"); //Create readable stream from HTML file

//         readableStream.pipe(res); //Pipe HTML stream directly to response

//     }
//     else if(req.url === "/api/data") {
        
//         res.writeHead(200, {"content-type": "application/json"}); //Write response header with JSON content type

//         const readableStream = fs.createReadStream(path.join(__dirname, "./server/serverData.json"), "utf-8"); //Create readable stream from JSON file

//         readableStream.pipe(res); //Pipe JSON stream directly to response
//     }
//     else if(req.url === "/kakure_meme.webp") {
//         res.writeHead(200, {"content-type": "image/webp"});//Write response header with WebP image content type

//         fs.createReadStream(path.join(__dirname, "./kakure_meme.webp")).pipe(res);//Stream the WebP image directly to the response

//     }
//     else {

//         res.writeHead(404, {"content-type": "text/html"}); //Return 404 status and serve 

//         const readableStream = fs.createReadStream(path.join(__dirname, "./404.html"), "utf-8"); //Create readable stream from HTML file

//         readableStream.pipe(res); //Pipe HTML stream directly to response

//     }

// });
//server.listen(3000, "127.0.0.1"); //Set server on specified port and hostname