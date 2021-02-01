let quotesList = [];
const proxyURL = 'https://rajitha-cors-anywhere-server.herokuapp.com/';
// const url = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
const url = 'http://type.fit/api/quotes';

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorName = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Loading animation

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function loadingComplete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}


// New Quote

function newQuote() {
    loading();
    let quoteNumber = Math.floor(Math.random() * quotesList.length);
    let quote = quotesList[quoteNumber];

    // replace author name 'null' with 'Unknown'

    if (!quote.author){
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
    loadingComplete();
}

// Get Quote from API

async function getQuote() {
    loading();
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

// Tweet a Quote

function tweetQuote() {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
    window.open(twitterURL, '_blank');
}

// Event Listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);

// On Load
getQuote();