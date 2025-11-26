import  {builder}  from './utils/apiResponse.js';
const shortening_form = document.getElementById('shortening--form')

shortening_form.addEventListener('submit',async function(event){
    event.preventDefault()
    const link_form = document.getElementById('origin-link')
    const shortUrl  = await builder(link_form.value)
    if(typeof shortUrl == 'undefined'){
        // error handling here
        alert("please enter an actual url")
    }else if(typeof shortUrl == 'string'){

        try {
            await navigator.clipboard.writeText(shortUrl);
            alert('Text copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy text: ', err);
        }
    }
})