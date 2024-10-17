const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const addQuoteButton = document.getElementById('addQuoteButton');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');

// Array to store quotes
let quotes = [
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspiration" },
    { text: "The way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "You only live once, but if you do it right, once is enough.", category: "Life" },
];

// Function to display a random quote
function showRandomQuote() {
    if (quotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        quoteDisplay.innerHTML = `"${randomQuote.text}" - <em>${randomQuote.category}</em>`;
    } else {
        quoteDisplay.innerHTML = "No quotes available.";
    }
}

// Function to add a new quote
function addQuote() {
    const quoteText = newQuoteText.value.trim();
    const quoteCategory = newQuoteCategory.value.trim();
    
    if (quoteText && quoteCategory) {
        const newQuote = { text: quoteText, category: quoteCategory };
        quotes.push(newQuote);
        
        // Clear input fields
        newQuoteText.value = '';
        newQuoteCategory.value = '';

        // Optionally, show the new quote immediately
        showRandomQuote();
    } else {
        alert('Please fill in both fields.');
    }
}

// Event listeners
newQuoteButton.addEventListener('click', showRandomQuote);
addQuoteButton.addEventListener('click', addQuote);

// Show a quote on initial load
showRandomQuote();

