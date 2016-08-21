
var wineColor = '';
var wineFlavor = '';
var wineWeight = '';
var selection = '';

/*
$('.wine-color').hide();
$('.wine-flavor').hide();
$('.wine-weight').hide();
$('.deliver-blend').hide();
*/

// collecting a customer's preferences
var CustPreferences = function(preferences) {
    this.preferences = preferences;
};

CustPreferences.prototype.addPreference = function(selection) {
    this.preferences.push(selection);
};

// adding to inventory and tagging it
var Restock = function(item) {
    this.cellar = item;
};

Restock.prototype.stockWine = function(wineType, wineColor, wineFlavor, wineWeight) {
    this.cellar.push({
      type: wineType,
      color: wineColor,
      flavor: wineFlavor,
      weight: wineWeight
    });
};

// constructor function for barkeep to create and serve a wineblend or a burger
var Barkeep = function(personName, makeItem) {
    this.name = personName;
    this.create = makeItem;
};

// object method is logic to create and name a drink based on selections
Barkeep.prototype.newBlend = function(customerSelection)  {
    if (customerSelection.includes('red')) {
        if (customerSelection.includes('sweet')) {
            if (customerSelection.includes('full-bodied')) {
                return 'Six of One';
            } else {  // selection is red, sweet, and light
                return 'Sangria Anyone?';
                }
        } else {  // selection includes dry
            if (customerSelection.includes('full-bodied')) {
                return 'Sinful Zinfandel';
                } else {  //selection is red, dry, and light
                    return 'A Light Finish';
                    }
            }
    } else {  // selection includes white
        if (customerSelection.includes('sweet')) {
            if (customerSelection.includes('full-bodied')) {
                return 'A Softer Sancerne';
                } else {  // selection is white, sweet, and light
                    return 'Memories of Reisling';
                    }
            } else {  // selection is white and dry
                if (customerSelection.includes('light')) {
                      return 'A Petite Pinot Gris';
                      } else {  //selection is white, dry, and light
                          return 'Bite Your Tongue';
                          }
                    }
            }
};

$(document).ready( function() {

    $('.barkeep').hide();
    $('.customer').hide();

    // check user role
    $('.user-role').click( function(e) {
        e.preventDefault();
        role = $('input[name=serveOrsip]:checked').val();
        $('.user-role').hide();

        if (role === 'serve') {
            // stock the wine cellar
            $('.barkeep').show();

            var WineDelivery = new Restock([]);

            $('input[type=submit]').click( function(e) {
                e.preventDefault();
                var wineType = $('input[name=wineName]').val();
                $('input[name=wineName]').val('');
                wineColor = $('input[name=wineColor]:checked').val();
                wineFlavor = $('input[name=wineFlavor]:checked').val();
                wineWeight = $('input[name=wineWeight]:checked').val();

                WineDelivery.stockWine(wineType, wineColor, wineFlavor, wineWeight);

            });
        } else {
            // get wine color preference
            $('.customer').show();

            var Preference = new CustPreferences([]);

            $('.wine-color').prepend("<p>Do you prefer red wine or white wine?</p>");
            $('.wine-color').show();
            $('.wine-color').click( function(e) {
                e.preventDefault();
                wineColor = $('input[name=wineColor]:checked').val();

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
                        wineWeight = $('input[name=wineWeight]:checked').val();

                        Preference.addPreference(wineWeight);
                        $('.wine-weight').hide();

                        // bartender delivers new wine blend
                        var barkeep = new Barkeep('Lynne', 'makeWineBlend');

                        wineName = barkeep.newBlend(Preference.preferences);

                        $('.deliver-blend').show();
                        $('.deliver-blend').prepend("<p><br>" + barkeep.name + " created a \"" + wineName + "\" wine blend for you!</p>");
                        console.log(barkeep.name + " created a " + wineName);

                        });  // end get wine weight preference

                  }); // end get wine flavor preference

            }); // end get wine color preference

          }; // end role of customer

      }); // end identify role
});
