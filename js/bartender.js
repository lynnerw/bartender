
var wineColor = "";
var wineFlavor = "";
var wineWeight = "";
var selection = "";

$('.wine-color').hide();
$('.wine-flavor').hide();
$('.wine-weight').hide();

var CustPreferences = function(preferences) {
    this.preferences = preferences;
};

CustPreferences.prototype.addPreference = function(selection) {
    this.preferences.push(selection);
    console.log('this addPreferences.preferences are ' + this.preferences);
};

var Bartender = function(name) {
    this.name = name;
};

Bartender.prototype.newBlend = function(customerSelection)  {
    // logic to create and name a drink
    if (customerSelection.contains("red") && customerSelection.contains("sweet")) {
        return "Six of One";
    } else {
        if (customerSelection.contains("white") && customerSelection.contains("dry")) {
        return "Bite Your Tongue";
        }
    };
};

$(document).ready( function() {

      // get wine color preference
    $('.wine-color').show();
    $('.wine-color').click( function(e){
        e.preventDefault();
        wineColor = $('input[name=wineColor]:checked').val();

        var newPreference = new CustPreferences([]);

        newPreference.addPreference(wineColor);
        $('.wine-flavor').prepend("<p>And do you like your " + wineColor + " wine sweet or dry?</p>");
        $('.wine-flavor').show();

      // get wine flavor preference
    $('.wine-flavor').click( function(e){
        e.preventDefault();
        wineFlavor = $('input[name=wineFlavor]:checked').val();

        newPreference.addPreference(wineFlavor);
        //$('.wine-weight').prepend("<p>Do you like your " + wineColor + " " + wineFlavor + " wine to resemble a substantial desert wine or to be more light and fruity?</p>");
        $('.wine-weight').show();

        var bartender = new Bartender('Lynne');

        wineName = bartender.newBlend(newPreference.preferences);

        $('wine-weight').append("<br><p>" + bartender.name + " created a " + wineName + " for you!</p>");
        console.log(bartender.name + " created a " + wineName + " for you!");

      });

    });
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
