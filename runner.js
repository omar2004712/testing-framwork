const fs = require('fs');
const path = require('path');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

class Runner {
    constructor(){
        this.testFiles = [];
    }

    async collectFiles(dir){
        const files = await readdir(dir);
        for(let file of files){
            const filePath = path.join(dir, file)
            const stats = await stat(filePath);

            if(stats.isFile() && file.includes('.test.js')){
                this.testFiles.push(file);
            }
            else if(stats.isDirectory()){
                const childFiles = await readdir(filePath);
                files.push(...childFiles.map(f => path.join(file, f)));
            }
        }
        return;
    }
}

module.exports = Runner;