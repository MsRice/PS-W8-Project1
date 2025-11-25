import  {builder}  from './utils/apiResponse.js';
const shortening_form = document.getElementById('shortening--form')

shortening_form.addEventListener('submit',async function(event){
    event.preventDefault()
    const link_form = document.getElementById('origin-link')
    const shortUrl  = await builder(link_form.value)
    console.log(shortUrl)
})