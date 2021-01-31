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
    let quote = quotesList[quoteNumber];

    // replace author name 'null' with 'Unknown'

    if (!quote.text){
        authorName.textContent = 'Unknown';
    } else {
        authorName.textContent = quote.author;
    }

    // Change font size for long quotes

    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text;
}

// Get Quote from API

async function getQuote() {

    const response = await fetch(proxyURL + url);
    quotesList = await response.json();
    console.log(quotesList);
    newQuote();
    try {

    } catch (error) {
        getQuote();
        console.log('error getting quote', error);
    }
}

// On Load
getQuote();