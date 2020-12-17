
const fs = require('fs');
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ignore = ["clearDesktop.js"]

const imagesExt = ["jpeg", "jpg", "png"];
const docExt = ["pdf", "docx", "txt", "ppt", "xlsx"];
const comprExt = ["rar", "zip"];
const lnkExt = ["lnk", "url"];
// aminek nincs kiterjesztése az mappa
//Egyéb

let imagesFound = [];
let docsFound = [];
let comprFound = [];
let lnkFound = [];
let others = [];
let dirs = [];



filenames = fs.readdirSync('./');
filenames.forEach(file => {
    if (!ignore.includes(file)) {

        let splitted = file.split(".");
        

            let ext = splitted[splitted.length - 1];

            if (imagesExt.includes(ext)) {
                imagesFound.push(file);
            } else if (docExt.includes(ext)) {
                docsFound.push(file);
            } else if (comprExt.includes(ext)) {
                comprFound.push(file);
            } else if (lnkExt.includes(ext)) {
                lnkFound.push(file);
            } else if (ext > 4 || splitted.length == 1) {
                dirs.push(file);
            } else {
                others.push(file);
            }
        

        console.log(file)
    }
});

let sum = imagesFound.length + docsFound.length + comprFound.length + lnkFound.length + others.length + dirs.length;

console.log(`Talált fájlok száma: ${sum}`);
console.log(`- Kép(ek): ${imagesFound.length}`);
console.log(`- Dokumentum(ok): ${docsFound.length}`);
console.log(`- Tömörített(ek): ${comprFound.length}`);
console.log(`- Parancsikon(ok): ${lnkFound.length}`);
console.log(`- Mappák: ${dirs.length}`);
console.log(`- Egyéb: ${others.length}`);

let answer = null;

rl.question("Biztosan átrendezed ezt a mappát? Y/N: ", function (input) {
    if (input.toUpperCase() == "Y") {
        isInput = false;
        answer = "Y";
    } else if (input.toUpperCase() == "N") {
        isInput = false;
        answer = "N";
    } else {
        console.log("Hibás parancs. 'Y'(igen) 'N'(nem)");
    }

    rl.close();

});

rl.on("close", function () {
    if (answer == "Y") {       
        sort();
    } else if (answer == "N") {
        console.log("Szomorú :(");
    }
    process.exit(0);
});


/* let imagesFound = [];
let docsFound = [];
let comprFound = [];
let lnkFound = [];
let others = [];
let dirs = []; */
const sort = () => {

    let dirCount = 0;
    let count = 0;

    if (imagesFound.length > 0) {
        
        if (!fs.existsSync('./Képek/')) {
            fs.mkdir('./Képek/', (err) => { 
                if (err) { 
                    return console.error(err); 
                }           
            }); 
           
            dirCount++;
        }
    }

    if (docsFound.length > 0) {
        
        if (!fs.existsSync('./Dokumentumok/')) {
            fs.mkdir('./Dokumentumok/', (err) => { 
                if (err) { 
                    return console.error(err); 
                }           
            }); 
            
            dirCount++;
        }
    }

    if (comprFound.length > 0) {
        
        if (!fs.existsSync('./Tömörített/')) {
            fs.mkdir('./Tömörített/', (err) => { 
                if (err) { 
                    return console.error(err); 
                }           
            }); 
            
            dirCount++;
        }
    }

    if (others.length > 0) {
        
        if (!fs.existsSync('./Egyéb/')) {
            fs.mkdir('./Egyéb/', (err) => { 
                if (err) { 
                    return console.error(err); 
                }           
            }); 
            
            dirCount++;
        }
    }

    imagesFound.map((element) => {
        fs.renameSync(`./${element}`, `./Képek/${element}`, function (err) {
            
            if (err) throw err           
          })
          count++;
    });


    docsFound.map((element) => {
        fs.renameSync(`./${element}`, `./Dokumentumok/${element}`, function (err) {
           
            if (err) throw err           
          })
          count++;
    });


    comprFound.map((element) => {
        fs.renameSync(`./${element}`, `./Tömörített/${element}`, function (err) {
           
            if (err) throw err           
          })
          count++;
    });

    others.map((element) => {
        if (!(fs.lstatSync(`./${element}`).isDirectory())) {
            
            fs.renameSync(`./${element}`, `./Egyéb/${element}`, function (err) {
                
                if (err) throw err           
              })
              count++;
        } 
    });

    console.log(`Rendezés kész! ${count} fájl mozgatva.`);
    console.log(`${dirCount} mappa létrehozva.`);
} 