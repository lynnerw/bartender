var wineColor = "";
var wineFlavor = "";
var wineWeight = "";
var custQuestion = [];

$('.wine-color').hide();
$('.wine-flavor').hide();
$('.wine-weight').hide();

var custPreferences = {

    var custQuestion = ["<p>Do you prefer red wine or white?</p>", "<p>And do you like your wine on the sweet side or dry?</p>", "<p>Do you like your wine to be complex and full-bodied or light, with a crisp finish?</p>"];

    getWineInfo: function(custQuestion) {
          for (var i=0; i<custQuestion.length); i++) }

          $('.wine-info').prepend(custQuestion[i]);

          $('.wine-info').click( function(e){
              e.preventDefault();
        var wineColor = $('input[name=wineColor]:checked').val();
        console.log("wine color preference is " + wineColor);
    });
  }
/*  getWineFlavor: function() {
    $('.wine-flavor').prepend("<p>Do you prefer your wine to be on the sweet side or dry?</p>");
    $('.wine-flavor').click( function(e){
        e.preventDefault();
        var wineFlavor = $('input[name=wineFlavor]:checked').val();
        console.log("wine flavor preference is " + wineFlavor);
    });
  }
*/
};

$(document).ready( function() {

    var getStarted = "false";
    $('.simpleAns').click( function(e) {
      e.preventDefault();
    var getStarted = $('input[name=trueFalse]:checked').val();

    if (getStarted == "true") {
        $('.simpleAns').hide();
        $('.wine-color').show();
        custPreferences.getWineInfo();
    } else {
        return;
      }
    });

});

/*
var winePreferences = {
  color: ["red","white"],
  flavor: ["sweet","dry"],
  weight: ["full=bodied","light and crisp"]
  wineCustomer:function() {
    this.preferences = preferences;
};
var solange = new wineCustomer(['red', 'dry', 'light']);
console.log(solange,preferences);
*/
