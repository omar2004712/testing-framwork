#!/usr/bin/env node

const Runner = require('./runner');

const runner = new Runner();

const test  = async ()=>{
    await runner.collectFiles(process.cwd())
    await runner.runTests()
    console.log('finished')
}

test();