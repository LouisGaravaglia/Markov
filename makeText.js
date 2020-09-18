// /** Command-line tool to generate Markov text. */
const markov = require("./markov")
const fs = require("fs")
const axios = require("axios")
const process = require("process")


function generateText(text){
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

function readFile(src) {
    fs.readFile(src, 'utf8', (err, data) => {
        if (err) {
            console.log("Error reading: ", src);
            console.log(err);
            process.kill(1)
        } else {
            generateText(data)
        }
    });
}

async function readHTML(src) {
     try {
        const response = await axios.get(src);
        generateText(response.data)
    } catch (err) {
        console.log("ERROR with making HTTP request to URL");
        console.log(err);
        process.exit(1);
    }
}



// ==================================== OUTPUT ====================================

if (process.argv[2] == "file") {
    if (process.argv[3].includes('txt')) {
        readFile(process.argv[3]);
    } else {
        console.log("file type not supported");
    }
} else if (process.argv[2] == "url"){
    if (process.argv[3].includes('http')) {
        readHTML(process.argv[3]);
    } else {
        console.log("link not recognized. Please include 'http.'");
    }
} else {
    console.log("Command not supported. Please enter either 'file' or 'url' as an argument.");
}
