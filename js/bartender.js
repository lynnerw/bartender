
// user role to display correct UI
var role = '';

// variables for barkeep wine cellar input
var grapeName = '';
var grapeColor = '';
var grapeFlavor = '';
var grapeWeight = '';

// variables for customer wine preference input
var wineColor = '';
var wineFlavor = '';
var wineWeight = '';

// collecting a customer's preferences
var CustPreferences = function(preferences) {
  this.preferences = preferences;
};

CustPreferences.prototype.addPreference = function(wineColor, wineFlavor, wineWeight) {
  this.preferences.push(wineColor, wineFlavor, wineWeight)
};

// adding to inventory and tagging it
var Inventory = function() {
  this.cellar = [];
};

Inventory.prototype.stockWine = function(grapeName, grapeColor, grapeFlavor, grapeWeight) {
  this.cellar.push({
    type: grapeName,
    color: grapeColor,
    flavor: grapeFlavor,
    weight: grapeWeight
  });
};

// generate random number to return one of the wines in the cellar
function getRandomWine(inventory) {
  var bottlesStocked = inventory.cellar.length;
  var randomIndex = Math.floor(Math.random() * bottlesStocked);
  return inventory.cellar[randomIndex];
}

// constructor function for barkeep name and wineblend name
var Barkeep = function(personName) {
  this.name = personName;
};

// object method is logic to create and name a drink based on selections
Barkeep.prototype.newBlend = function(customerPreferences)  {
  var customerSelection = customerPreferences.preferences;
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

$(document).ready(function() {

  $('#barkeepRole').hide();
  $('#customerIntro').hide();
  $('.wine-color').hide();
  $('.wine-flavor').hide();
  $('.wine-weight').hide();

  // check user role
  $('#userRole').on('click', function(e) {
      e.preventDefault();
      role = $('input[name=userRole]:checked').val();
      $('#userRole').hide();

      if (role === 'serve') {

        // role = barkeep; stock the wine cellar
        var wineInventory = new Inventory();

        $('#barkeepRole').show();

        $('input[type=submit]').click( function(e) {
          e.preventDefault();
          var grapeName = $('input[name=grapeName]').val();
          $('input[name=grapeName]').val('');
          grapeColor = $('input[name=grapeColor]:checked').val();
          grapeFlavor = $('input[name=grapeFlavor]:checked').val();
          grapeWeight = $('input[name=grapeWeight]:checked').val();

          wineInventory.stockWine(grapeName, grapeColor, grapeFlavor, grapeWeight);

        }); // end add bottle of wine to cellar

        $('#restock').click( function(e) {
          e.preventDefault();

          $('#restock-done').append('<p>Well done. You get a bottle of ' + getRandomWine(inventory) + ' for your efforts. Please wait until after your shift to enjoy.')
          $('#shiftover').show();
          $('#shiftover').click( function(e) {
            e.preventDefault();

            // hide barkeep content, clear user role, clear radio buttons and checkbox
            $('#barkeepRole').hide();
            role = '';
            $('input[name=grapeName]').val('');
            $('input[name=grapeColor]').prop('checked', false);
            $('input[name=grapeFlavor]').prop('checked', false);
            $('input[name=grapeWeight]').prop('checked', false);
            $('input[name=restock]').prop('checked', false);
          });

          // provide opportunity for another UI role selection
          $('#userRole').show();

        });   //end restock-done

      } else {     // end role = barkeep

        // role = customer; get wine preferences
        $('#customerIntro').show();

        var BlendPreference = new CustPreferences([]);

        // get wine color preference
        $('.wine-color').prepend("<p>Do you prefer red wine or white wine?</p>");
        $('.wine-color').show();
        $('.wine-color').on('click', function(e) {
          e.preventDefault();
          wineColor = $('input[name=wineColor]:checked').val();
          $('.wine-color').hide();

          // get wine flavor preference
          $('.wine-flavor').prepend("<p>And do you like your " + wineColor + " wine sweet or dry?</p>");
          $('.wine-flavor').show();
          $('.wine-flavor').on('click', function(e) {
            e.preventDefault();
            wineFlavor = $('input[name=wineFlavor]:checked').val();
            $('.wine-flavor').hide();

            // get wine weight - heavy or light - preference
            $('.wine-weight').prepend("<p>Do you like a full-bodied " + wineFlavor + " " + wineColor + " " + " wine or a lighter blend?</p>");
            $('.wine-weight').show();
            $('.wine-weight').on('click', function(e) {
              e.preventDefault();
              wineWeight = $('input[name=wineWeight]:checked').val();
              $('.wine-weight').hide();

              // biold customer preferences object
              BlendPreference.addPreference(wineColor, wineFlavor, wineWeight);

              // new instance of this obj
              var barkeep = new Barkeep('Lynne');

              // get new wine blend name and mix
              wineName = barkeep.newBlend(BlendPreference);

              // deliver new wine blend
              $('.deliver-blend').show();
              $('.deliver-blend').prepend("<p><br>" + barkeep.name + " created " + wineName + " blend for you!</p>");

            });  // end get wine weight preference
          }); // end get wine flavor preference
        }); // end get wine color preference

      } // end role of customer

  }); // end check for user role

});
