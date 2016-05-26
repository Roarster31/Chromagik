//hide original button to prevent flickering
var clone = $('#play-btn').clone();
clone.css({"cursor": "pointer", "background-color": "#1BA3EA"});
clone.text("Chromagik!");
clone.attr("id", "");
clone.appendTo($('#play-btn').parent());
$('#play-btn').css({"display": "none"});

setTimeout(function(){ 
  //trigger woodwind click to show alto sax
  $('div[data-name="WOODWINDS"]').click();
  setTimeout(function(){ 
    //trigger alto sax click to show id
    $('div[data-name="ALTO SAXOPHONE"]').click();
    setTimeout(function(){ 
      //get id
      var id = $('#play-btn').attr("data-score-id");

      //remove cookies on click
      clone.click(function(){
        chrome.runtime.sendMessage({action: "remove_cookies", id: id});
      });
    }, 100);
  }, 100);
 }, 100);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    if (request.action == "cookies_removed") {
      //redirect to page
      window.location = "https://www.chromatik.com/presentations/"+request.id+"/score_viewer";
    }

  });

//hide any promotional alerts
$('.promotion-alert-container').css({"display": "none"});
$('.ui-widget-overlay').css({"display": "none"});
$('.ui-widget-content').css({"display": "none"});