const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const colors = require('colors');

const forbiddenDirs = ['node_modules']

class Runner {
    constructor(){
        this.testFiles = [];
    }

    runTests(){
        for(let file of this.testFiles){
            console.log(`---- ${file.shortName}`.gray)
            const beforeEaches = [];
            global.beforeEach = (func) => {
                beforeEaches.push(func);
            }
            global.it = (desc, test) => {
                beforeEaches.forEach(func => func());
                try{
                    test();
                    console.log(`\t✓ - ${desc}\n`.green);
                }
                catch (err){
                    const message = err.message.replace(/\n/g, '\n\t\t')
                    console.log(`\t✘ - ${desc}\n`.red)
                    console.log('\t', message.red);
                }
            }
            try{
                require(file.name);
            } catch (err){
                console.log(err);
            }
        }
    }

    async collectFiles(dir){
        const files = await readdir(dir);
        for(let file of files){
            const filePath = path.join(dir, file)
            const stats = await stat(filePath);

            if(stats.isFile() && file.includes('.test.js')){
                this.testFiles.push({ 
                    name: filePath,
                    shortName: file
                });
            }
            else if(stats.isDirectory() && !forbiddenDirs.includes(file)){
                const childFiles = await readdir(filePath);
                files.push(...childFiles.map(f => path.join(file, f)));
            }
        }
        return;
    }
}

module.exports = Runner;