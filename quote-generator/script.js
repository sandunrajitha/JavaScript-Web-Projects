let quotesList = [];
const proxyURL = 'https://cors-anywhere.herokuapp.com/';
// const url = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
const url = 'http://type.fit/api/quotes';

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorName = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

// New Quote

function newQuote() {
    let quoteNumber = Math.floor(Math.random() * quotesList.length);
}

// Get Quote from API

async function getQuote() {

    const response = await fetch(proxyURL + url);
    quotesList = await response.json();
    
    try {

    } catch (error) {
        getQuote();
        console.log('error getting quote', error);
    }
}

// On Load

getQuote();