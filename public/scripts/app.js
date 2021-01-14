const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    
    const location = search.value
    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    fetch(`/weather?address=${encodeURIComponent(location)}`)
    .then((response) => {
        response.json().then((data) => {
            if(data.error){
                // return console.log(data.error);
                msg1.textContent = data.error
                return
            }
            // console.log(data.forecast);
            // console.log(data.location);
            msg1.textContent = data.location
            msg2.textContent = data.forecast
        })
    })
})
