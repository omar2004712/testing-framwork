document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    const { value } = document.querySelector('input');
    if(value.includes('@')){
        document.querySelector('h1').innerText = 'looks good'
    } else {
        document.querySelector('h1').innerText = 'invalid input'
    }
})