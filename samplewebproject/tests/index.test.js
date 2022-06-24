const assert = require('assert')

it('it has an input element', async ()=>{
    const dom = await render('index.html')
    
    const input = dom.window.document.querySelector('input');
    assert(input)
})

it('inserting valid input test', async () => {
    const dom = await render('index.html')
    const input = dom.window.document.querySelector('input');
    const form = dom.window.document.querySelector('form');
    const h1 = dom.window.document.querySelector('h1');

    input.value = 'test@test.com';
    form.dispatchEvent(new dom.window.Event('submit'));
    assert.strictEqual(h1.innerText, 'looks good')
    
})

it('inserting invalid input test', async () => {
    const dom = await render('index.html')
    const input = dom.window.document.querySelector('input');
    const form = dom.window.document.querySelector('form');
    const h1 = dom.window.document.querySelector('h1');

    input.value = 'testtest.com';
    form.dispatchEvent(new dom.window.Event('submit'));
    assert.strictEqual(h1.innerText, 'invalid input')
    
})