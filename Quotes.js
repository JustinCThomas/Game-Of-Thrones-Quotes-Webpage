var quoteContainer = document.getElementById("quote-here");
var btn = document.getElementById("btn");
var tweet = document.getElementById("twitter");

btn.addEventListener("click", function () {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://got-quotes.herokuapp.com/quotes');
  request.onload = function () {
    var theData = JSON.parse(request.responseText);
    renderHTML(theData);
    
    /*  The quote may be too large for Twitter.
        You may have to manually shorten it in order to tweet it out. 
        
        This part is for Twitter button functionality.   
    */
   
    var charQuote = theData.quote;
    var quotedChar = theData.character;
   
    if ((charQuote.length > 110) && (quotedChar.length > 14)) {
      charQuote = charQuote.slice(0, 100) + "...";
    }
    else if (charQuote.length > 110) {
      charQuote = charQuote.slice(0, 110) + "...";
    }
   
    charQuote = encodeURIComponent(charQuote);
    
    quotedChar = encodeURIComponent(quotedChar);
    tweet.setAttribute('href', "https://twitter.com/intent/tweet?hashtags=GameofThrones&text=" + charQuote + " " + quotedChar);
    
  };
  request.send();
    
});


function renderHTML(data) {
  quoteContainer.innerHTML = "";
  var htmlString = "";
  var author = "";
  
  htmlString += "<p>" + data.quote + "</p>";
  
  author += '<span id="author"><br>- ' + data.character + "</span>";
  
  quoteContainer.insertAdjacentHTML('beforeend', htmlString);
  quoteContainer.insertAdjacentHTML('beforeend', author);
}