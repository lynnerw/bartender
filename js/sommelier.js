var wineColor = "";
var wineFlavor = "";
var wineWeight = "";
var custQuestion = [];

$('.wine-color').hide();
$('.wine-flavor').hide();
$('.wine-weight').hide();

var CustPreferences = function(preferences) {
    this.preferences = preferences;
}

CustPreferences.prototype.addPreference = function(preferences) {
    this.preferences.push(preferences);
}

/*var Bartender = function(name) {
    this.name = name;
}

Bartender.prototype.createBlend = function(custPreferences) {
    // create wine blend
    if (custPreferences.preferences.includes("red") && custPreferences.preferences.includes("sweet"))
        then
}
*/

    var custQuestion = ["<p>Do you prefer red wine or white?</p>", "<p>And do you like your wine on the sweet side or dry?</p>", "<p>Do you like your wine to be complex and full-bodied or light, with a crisp finish?</p>"];
    var custQuestDisplay = ['.wine-color', '.wine-flavor', '.wine-weight'];

    getWineInfo: function(custQuestion, custQuestDisplay) {
        for (var i=0; i<custQuestion.length); i++) {
            $(custQuestDisplay[i]).prepend(custQuestion[i]);
            $('.wine-info').click( function(e){
              e.preventDefault();

            var custPreferences.wineColor = $('input[name=wineColor]:checked').val();
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
//everything that handles the user interaction is here
$(document).ready( function() {

    var getStarted = "false";
    $('.simpleAns').click( function(e) {
      e.preventDefault();
    var getStarted = $('input[name=trueFalse]:checked').val();

    if (getStarted == "true") {
        $('.simpleAns').hide();

        custPreferences.getWineInfo();
    } else {
        return;
      }
    });

});
