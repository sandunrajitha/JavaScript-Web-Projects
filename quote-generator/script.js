// Get Quote from API

async function getQuote(){
    const url = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    try {

    } catch (error) {
        console.log('error getting quote', error);
    }
}

// On Load

getQuote();