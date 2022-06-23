const { forEach } = require('../index');
const assert = require('assert')
let arr;

beforeEach(()=>{
    arr = [1, 2, 3];
})

it('must get the sum of an array', () => {
    let total = 0;
    forEach(arr, (val) => {
        total += val;
    })

    assert.strictEqual(total, 6);
})

it('tests before each func', ()=>{
    assert.strictEqual(arr.length, 4);
})
