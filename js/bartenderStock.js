"use strict";

import $ from '../node_modules/jquery/src/jquery';
import serveWineBlend from './bartenderServe';

class Inventory {
  constructor() {
    this.cellar = [];
  }

  stockWine(grapeName, grapeColor, grapeFlavor, grapeWeight) {
    this.cellar.push({
      type: grapeName,
      color: grapeColor,
      flavor: grapeFlavor,
      weight: grapeWeight
    });
  }
}

// generate random number to return one of the wines in the cellar
function getRandomWine(currentInventory) {
  var bottlesStocked = currentInventory.cellar.length;
  var randomIndex = Math.floor(Math.random() * bottlesStocked);

  return currentInventory.cellar[randomIndex].type;
}

$(document).ready(function() {

  $('#userRole').on('click', function(e) {
      e.preventDefault();
      var role = $('input[name=userRole]:checked').val();
      $('#userRole').hide();

      if (role === 'stockWine') {

        $('#barkeepRole').show();

        var wineInventory = new Inventory();

        $('input[type=submit]').click( function(e) {
          e.preventDefault();
          wineInventory.stockWine(
            ($('input[name=grapeName]').val()),
            ($('input[name=grapeColor]:checked').val()),
            ($('input[name=grapeFlavor]:checked').val()),
            ($('input[name=grapeWeight]:checked').val()));

          $('input[name=grapeName]').val('');

        }); // end add bottle of wine to cellar

        $('.restock-done').click( function() {
          var reward = getRandomWine(wineInventory);
          $('.shift-over').prepend('<p>Well done. You get a bottle of ' + reward + ' for your efforts. Please wait until <b>after</b> you finish your shift before you open it.</p>')
          $('.shift-over').show();
          $('input[type=submit]').click( function(e) {
            e.preventDefault();

            // clear role, radio buttons, and checkbox
            role = '';
            $('input[name=grapeColor]').prop('checked', false);
            $('input[name=grapeFlavor]').prop('checked', false);
            $('input[name=grapeWeight]').prop('checked', false);
            $('input[name=restock]').prop('checked', false);
            document.location.reload(true);

          });  // end display reward message and "shift over" button

        });  // end restock-done

      } else {

          serveWineBlend();

      }  // end role of customer

  });  // end check for user role

});
