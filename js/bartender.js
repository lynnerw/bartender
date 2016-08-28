
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
function getRandomWine(currentInventory) {
  var bottlesStocked = currentInventory.cellar.length;
  var randomIndex = Math.floor(Math.random() * bottlesStocked);
  return currentInventory.cellar[randomIndex].type;
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
        return '"Six of One"';
        } else {  // selection is red, sweet, and light
          return '"Sangria Anyone?"';
          }
      } else {  // selection includes dry
        if (customerSelection.includes('full-bodied')) {
          return '"Sinful Zinfandel"';
          } else {  //selection is red, dry, and light
            return '"A Light Finish"';
            }
        }
    } else {  // selection includes white
      if (customerSelection.includes('sweet')) {
        if (customerSelection.includes('full-bodied')) {
          return '"A Softer Shade of Sauternes"';
          } else {  // selection is white, sweet, and light
            return '"Memories of Reisling"';
            }
        } else {  // selection is white and dry
          if (customerSelection.includes('light')) {
            return '"Petite Pinot Gris"';
            } else {  //selection is white, dry, and light
              return '"Bite Your Tongue" crisp, dry';
              }
          }
      }
};

$(document).ready(function() {

  // hide barkeep-specific UI elements
  $('#barkeepRole').hide();
  $('.shift-over').hide();
  // hide customer-specific UI elements
  $('#customerIntro').hide();
  $('.wine-color').hide();
  $('.wine-flavor').hide();
  $('.wine-weight').hide();
  $('.deliver-blend').hide();
  $('.reset').hide();

  // check user role
  $('#userRole').on('click', function(e) {
      e.preventDefault();
      role = $('input[name=userRole]:checked').val();
      $('#userRole').hide();

      if (role === 'serve') {

        // role = barkeep; stock the wine cellar
        var wineInventory = new Inventory();

        $('#barkeepRole').show();
        $('.restock-done').show();

        $('input[type=submit]').click( function(e) {
          e.preventDefault();
          var grapeName = $('input[name=grapeName]').val();
          $('input[name=grapeName]').val('');
          grapeColor = $('input[name=grapeColor]:checked').val();
          grapeFlavor = $('input[name=grapeFlavor]:checked').val();
          grapeWeight = $('input[name=grapeWeight]:checked').val();

          wineInventory.stockWine(grapeName, grapeColor, grapeFlavor, grapeWeight);

        }); // end add bottle of wine to cellar

        $('.restock-done').click( function() {
          var reward = getRandomWine(wineInventory);
          $('.shift-over').prepend('<p>Well done. You get a bottle of ' + reward + ' for your efforts. Please wait until <b>after</b> you finish your shift before you open it.</p>')
          $('.shift-over').show();
          $('input[type=submit]').click( function(e) {
            e.preventDefault();

            // lear radio buttons and checkbox
            $('input[name=grapeName]').val('');
            $('input[name=grapeColor]').prop('checked', false);
            $('input[name=grapeFlavor]').prop('checked', false);
            $('input[name=grapeWeight]').prop('checked', false);
            $('input[name=restock]').prop('checked', false);
            document.location.reload(true);

          });  //end display reward message and "shift over" button

        });  //end restock-done

      } else {

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

              // customer preferences object
              BlendPreference.addPreference(wineColor, wineFlavor, wineWeight);

              // new instance of this obj
              var barkeep = new Barkeep('Lynne');

              // get new wine blend name and mix
              wineName = barkeep.newBlend(BlendPreference);

              // deliver new wine blend and display ciao button
              $('.deliver-blend').show();
              $('.deliver-blend').prepend("<p><br>" + barkeep.name + " created a " + wineName + " blend for you!</p>");
              $('.reset').show();

              // refresh page onclick
              $('input[type=submit]').click( function(e) {
                e.preventDefault();
                document.location.reload(true);
              });  // end deliver new wine blend and display ciao button

            });  // end get wine weight preference

          });  // end get wine flavor preference

        });  // end get wine color preference

      }  // end role of customer

  });  // end check for user role

});
