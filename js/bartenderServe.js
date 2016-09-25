"use strict";

class CustPreferences {

  constructor(preferences) {
    this.preferences = preferences;
  }
  addPreference(customerPref) {
    this.preferences.push(customerPref);
  }
}

class Barkeep {

  constructor(personName) {
    this.name = personName;
  }
  newBlend(customerPreferences) {
    this.customerSelection = customerPreferences.preferences;

    if (this.customerSelection.includes('red')) {
      if (this.customerSelection.includes('sweet')) {
        if (this.customerSelection.includes('full-bodied')) {
          return '"Six of One"';
          } else {  // selection is red, sweet, and light
            return '"Sangria Anyone?"';
            }
        } else {  // selection includes dry
          if (this.customerSelection.includes('full-bodied')) {
            return '"Sinful Zinfandel"';
            } else {  //selection is red, dry, and light
              return '"A Light Finish"';
              }
          }
      } else {  // selection includes white
        if (this.customerSelection.includes('sweet')) {
          if (this.customerSelection.includes('full-bodied')) {
            return '"A Softer Shade of Sauternes"';
            } else {  // selection is white, sweet, and light
              return '"Memories of Reisling"';
              }
          } else {  // selection is white and dry
            if (this.customerSelection.includes('light')) {
              return '"Petite Pinot Gris"';
              } else {  //selection is white, dry, and light
                return '"Bite Your Tongue" crisp, dry';
                }
            }
      }
  }
}

function serveWineBlend() {

  // role = customer; get wine preferences
  $('#customerRole').show();
  $('.wine-color').hide();
  $('.wine-flavor').hide();
  $('.wine-weight').hide();
  $('.deliver-blend').hide();
  $('.reset').hide();

  var BlendPreference = new CustPreferences([]);

  // get wine color preference
  $('.wine-color').prepend("<p>Do you prefer red wine or white wine?</p>");
  $('.wine-color').show();
  $('.wine-color').on('click', function(e) {
    e.preventDefault();
    BlendPreference.addPreference($('input[name=wineColor]:checked').val());
    $('.wine-color').hide();

    // get wine flavor preference
    $('.wine-flavor').prepend("<p>And do you like your wine sweet or dry?</p>");
    $('.wine-flavor').show();
    $('.wine-flavor').on('click', function(e) {
      e.preventDefault();
      BlendPreference.addPreference($('input[name=wineFlavor]:checked').val());
      $('.wine-flavor').hide();

      // get wine weight - heavy or light - preference
      $('.wine-weight').prepend("<p>Do you like a full-bodied wine or a lighter blend?</p>");
      $('.wine-weight').show();
      $('.wine-weight').on('click', function(e) {
        e.preventDefault();
        BlendPreference.addPreference($('input[name=wineWeight]:checked').val());
        $('.wine-weight').hide();

        // new instance of this obj
        var barkeep = new Barkeep('Lynne');

        // deliver new wine blend and display ciao button
        $('.deliver-blend').show();
        $('.deliver-blend').prepend("<p><br>" + barkeep.name + " created a " + barkeep.newBlend(BlendPreference) + " blend for you!</p>");
        $('.reset').show();

        // refresh page onclick
        $('input[type=submit]').click( function(e) {
          e.preventDefault();
          document.location.reload(true);

        });  // end deliver new wine blend and display ciao button

      });  // end get wine weight preference

    });  // end get wine flavor preference

  });  // end get wine color preference

};  // end check for user role

module.exports = serveWineBlend;
