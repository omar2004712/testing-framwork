const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const render = require('./render');
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
            global.render = render;
            global.beforeEach = (func) => {
                beforeEaches.push(func);
            }
            global.it = async (desc, test) => {
                beforeEaches.forEach(func => func());
                try{
                    await test(); //to wait for any async function
                    console.log(`\t✓ - ${desc}\n`.green);
                }
                catch (err){
                    const message = err.message.replace(/\n/g, '\n\t\t')
                    console.log(`\t✘ - ${desc}\n`.red)
                    console.log('\t', message.red);
                }
            }
            global.test = (tests) => { 
                //to make all it functions run sequentially
                tests();
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