const quotedisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const newQuotetext = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
const exportButton = document.getElementById('exportQuotes');
const importFileInput = document.getElementById('importFile');

let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

function showRandomQuote() {
    if (quotes.length === 0) {
        alert("Add quotes to see output.");
        quotedisplay.innerText = "Add quotes to see output.";
        return;
    } else {
        const randIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randIndex];
        quotedisplay.innerText = `${randomQuote.quote} - ${randomQuote.cat}`;
        
        // Optionally store the last viewed quote in session storage
        sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
    }
}

function addQuote() {
    const newQuote = newQuotetext.value.trim();
    const quoteCat = newQuoteCategory.value.trim();
    if (newQuote && quoteCat) {
        const newQuoteObject = { quote: newQuote, cat: quoteCat };
        quotes.push(newQuoteObject);
        saveQuotes(); // Save to local storage
        newQuotetext.value = '';
        newQuoteCategory.value = '';
        alert("Quote added!");
    } else {
        alert("Please fill in both fields.");
        newQuotetext.value = "";
        newQuoteCategory.value = "";
    }
}

function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

function exportQuotes() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    
    URL.revokeObjectURL(url); // Free up memory
}

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

newQuoteButton.addEventListener('click', showRandomQuote);
document.getElementById('addQuoteButton').addEventListener('click', addQuote);
exportButton.addEventListener('click', exportQuotes);
importFileInput.addEventListener('change', importFromJsonFile);

// Load last viewed quote from session storage if available
const lastQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
if (lastQuote) {
    quotedisplay.innerText = `${lastQuote.quote} - ${lastQuote.cat}`;
}


