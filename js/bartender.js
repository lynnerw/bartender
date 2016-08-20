
var wineColor = "";
var wineFlavor = "";
var wineWeight = "";
var selection = "";

$('.wine-color').hide();
$('.wine-flavor').hide();
$('.wine-weight').hide();
$('.deliver-blend').hide();

var CustPreferences = function(preferences) {
    this.preferences = preferences;
};

CustPreferences.prototype.addPreference = function(selection) {
    this.preferences.push(selection);
    //console.log('this addPreferences.preferences are ' + this.preferences);
};

var Bartender = function(name) {
    this.name = name;
};

// object method is logic to create and name a drink based on selections
Bartender.prototype.newBlend = function(customerSelection)  {
    if (customerSelection.includes('red')) {

        if(customerSelection.includes('sweet')) {
            if (customerSelection.includes('full-bodied')) {
                return "Six of One";
            } else {  // selection is red, sweet, and light
                return "Sangria Anyone?";
                }
        } else {  // selection includes dry
            if (customerSelection.includes('light')) {
                return "Sinful Zinfandel";
                } else {  //selection is red, dry, and light
                    return "A Light Finish";
                    }
            }
    } else {  // selection includes white
        if (customerSelection.includes('sweet')) {
            if (customerSelection.includes('full-bodied')) {
                return "A Softer Sancerne";
                } else {  // selection is white, sweet, and light
                    return "Memories of Reisling";
                    }
            } else {  // selection is white and dry
                if (customerSelection.includes('light')) {
                      return "A Petite Pinot Gris";
                      } else {  //selection is white, dry, and light
                          return "Bite Your Tongue";
                          }
                    }
            }
};

$(document).ready( function() {

      // get wine color preference
    $('.wine-color').prepend("<p>Do you prefer red wine or white wine?</p>");
    $('.wine-color').show();
    $('.wine-color').click( function(e) {
        e.preventDefault();
        wineColor = $('input[name=wineColor]:checked').val();

        var Preference = new CustPreferences([]);

        Preference.addPreference(wineColor);
        $('.wine-color').hide();

        // get wine flavor preference
        $('.wine-flavor').prepend("<p>And do you like your " + wineColor + " wine sweet or dry?</p>");
        $('.wine-flavor').show();
        $('.wine-flavor').click( function(e) {
            e.preventDefault();
            wineFlavor = $('input[name=wineFlavor]:checked').val();

            Preference.addPreference(wineFlavor);
            $('.wine-flavor').hide();

            // get wine weight - heavy or light - preference
            $('.wine-weight').prepend("<p>Do you like a full-bodied " + wineFlavor + " " + wineColor + " " + " wine or a lighter blend?</p>");
            $('.wine-weight').show();

            $('.wine-weight').click( function(e) {
                e.preventDefault();
                wineWeight = $('input[name=wineFlavor]:checked').val();

                Preference.addPreference(wineWeight);
                $('.wine-weight').hide();

                // bartender delivers new wine blend
                var bartender = new Bartender('Lynne');

                wineName = bartender.newBlend(Preference.preferences);

                $('.deliver-blend').show();
                $('.deliver-blend').prepend("<p><br>" + bartender.name + " created a \"" + wineName + "\" wine blend for you!</p>");
                console.log(bartender.name + " created a " + wineName + " for you! Enjoy!");

                });  // end get wine weight preference

          }); // end get wine flavor preference

    }); // end get wine color preference

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
