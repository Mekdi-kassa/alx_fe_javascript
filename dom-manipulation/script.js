const quoteDisplay=document.getElementById('quoteDisplay')
const newQuote=document.getElementById('newQuote')
const newQuoteText=document.getElementById('newQuoteText')
const newQuoteCategory=document.getElementById('newQuoteCategory')
const addQuoteButton=document.getElementById('addQuoteButton')
const quote=[
    {text:"Live the life you not other wants for you!!",cat:"motivation"},
    {text:"Live love life laugh",cat:"happy"},
    {text:"i love you Barney",cat:"draw"}
]
function showRandomQuote(){
    if(quote.length===0){
        document.getElementById('quoteDisplay').innerText = "No quotes available.";
        return;
    }
    const RandomIndex=Math.floor(Math.random()*quote.length)
    const randomQuote = quote[RandomIndex];
    document.getElementById('quoteDisplay').innerText = `"${randomQuote.text}" - ${randomQuote.cat}`;
}
function add(){
    const  newQuote=newQuoteText.value.trim()
    const quotcat=newQuoteCategory.value.trim()
    if(newQuote && quotcat){
        const newq={
            text:newQuote,
            cat:quotcat
        }
        quote.push(newq)
        document.getElementById('newQuoteText').value = ''; // Clear input
        document.getElementById('newQuoteCategory').value = ''; // Clear input
        alert("Quote added!");
    }
    else {
        alert("Please fill in both fields.");
    }
}
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('addQuoteButton').addEventListener('click', addQuote);
