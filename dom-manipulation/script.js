const quotedisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const newQuotetext = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
const exportButton = document.getElementById('exportQuotes');
const importFileInput = document.getElementById('importFile');
const categoryFilter = document.getElementById('categoryFilter');

let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// Load last selected category from local storage
const lastCategory = localStorage.getItem('lastSelectedCategory') || 'all';
categoryFilter.value = lastCategory;

function showRandomQuote(category = 'all') {
    const filteredQuotes = quotes.filter(q => category === 'all' || q.cat === category);
    
    if (filteredQuotes.length === 0) {
        alert("Add quotes to see output.");
        quotedisplay.innerText = "Add quotes to see output.";
        return;
    } else {
        const randIndex = Math.floor(Math.random() * filteredQuotes.length);
        const randomQuote = filteredQuotes[randIndex];
        quotedisplay.innerText = `${randomQuote.quote} - ${randomQuote.cat}`;
        
        // Optionally store the last viewed quote in session storage
        sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
    }
}

function populateCategories() {
    const categories = [...new Set(quotes.map(q => q.cat))];
    categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.innerText = cat;
        categoryFilter.appendChild(option);
    });
}

function addQuote() {
    const newQuote = newQuotetext.value.trim();
    const quoteCat = newQuoteCategory.value.trim();
    
    if (newQuote && quoteCat) {
        const newQuoteObject = { quote: newQuote, cat: quoteCat };
        quotes.push(newQuoteObject);
        saveQuotes();
        populateCategories(); // Update categories
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
        populateCategories(); // Update categories after import
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    showRandomQuote(selectedCategory);
    localStorage.setItem('lastSelectedCategory', selectedCategory); // Save last selected category
}

newQuoteButton.addEventListener('click', () => showRandomQuote(categoryFilter.value));
document.getElementById('addQuoteButton').addEventListener('click', addQuote);
exportButton.addEventListener('click', exportQuotes);
importFileInput.addEventListener('change', importFromJsonFile);

// Populate categories on load
populateCategories();

// Load last viewed quote from session storage if available
const lastQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
if (lastQuote) {
    quotedisplay.innerText = `${lastQuote.quote} - ${lastQuote.cat}`;
}

