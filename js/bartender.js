
var wineColor = "";
var wineFlavor = "";
var wineWeight = "";
var custQuestion = [];
var preference = "";

$('.wine-color').hide();
$('.wine-flavor').hide();
$('.wine-weight').hide();

var CustPreferences = function(preferences) {
    this.preferences = preferences;
    console.log("preferences are " + this.preferences);
};

CustPreferences.prototype.addPreference = function(preferences) {
    this.preferences.push(preferences);
    console.log('this addpreferences is ' + this.preferences);
};

var Bartender = function(name) {
    this.name = name;
};

Bartender.prototype.newBlend = function createBlend(preferences)  {
    // logic to create a drink
    if (CustPreferences.preferences.contains("red") && CustPreferences.preferences.contains("sweet")) {
      return new blendName("Six of One");
    } else {
      if (CustPreferences.preferences.contains("white") && CustPreferences.preferences.contains("dry")) {
        return new blendName("Bite Your Tongue");
      }
    };
};

var blendName = function(name) {
    this.name = name;
};

$(document).ready( function() {

      // get wine color preference
    $('.wine-color').show();
    $('.wine-color').click( function(e){
        e.preventDefault();
        var wineColor = $('input[name=wineColor]:checked').val();

        if (wineColor == ('red')) {
            var NewPreference = new CustPreferences('red');
            $('.wine-flavor').prepend("<p>And do you like your red wine sweet or dry?</p>");
            $('.wine-flavor').show();

        } else {

          var NewPreference = new CustPreferences('white');
          $('.wine-flavor').prepend("<p>And do you like your white wine sweet or dry?</p>");
          $('.wine-flavor').show();
        };

          // get wine flavor preference
        $('.wine-flavor').click( function(e){
            e.preventDefault();
            var wineFlavor = $('input[name=wineFlavor]:checked').val();

            if (wineColor == 'red') {

              if (wineFlavor == 'sweet') {
                  var NewPreference = new CustPreferences.addPreference('sweet');
                  $('.wine-weight').prepend("<p>Do you like your sweet red wine to resemble a substantial desert wine or to be more light and fruity?</p>");
                  $('.wine-weight').show();
              } else {
                  var NewPreference = new CustPreferences.addPreference('dry');
                  $('.wine-weight').prepend("<p>Do you like your dry red wine to be complex and full-bodied or light, with a crisp finish?</p>");
                  $('.wine-weight').show();
                }

            }  else {  // wineColor must be 'white'

              if (wineFlavor == 'sweet') {
                  var NewPreference = new CustPreferences.addPreference('sweet');
                  $('.wine-weight').prepend("<p>Do you like your sweet white wine to be a little buttery or more on the fruity side?</p>");
                  $('.wine-weight').show();
              } else {
                  var NewPreference = new CustPreferences.addPreference('dry');
                  $('.wine-weight').prepend("<p>Do you like your dry white wine to be complex and full-bodied or light, with a crisp finish?</p>");
                  $('.wine-weight').show();
                };
          };  // end of if wineFlavor
        });
    });
    var bartender = new Bartender("Lynne");
    //var blend = bartender.createBlend(preferences);
    //$('wine-weight').append("<br><p>" + bartender + " created a " + createBlend.name + " for you!</p>");
    //console.log(bartender + " created a " + createBlend.name + "for you!");
});

/*
var wineCellar =
    red.dry.full = "Malbec";
    red.dry.light = "Pinot Noir";
    red.sweet.full = "Port";
    red.sweet.light = "Lambrusco";
    white.dry.full = "Viognier";
    white.dry.light = "Pinot Grigio";
    white.sweet.full = "Muscato";
    white.sweet.light = "Reisling";
*/
/*
var wineChoice.prototype.wineFlavor = function(flavor) {
    this.wineFlavor = flavor;
};
/*
var wineChoice.prototype.wineWeight = function(weight) {
    this.wineWeight = weight;
};
*/
