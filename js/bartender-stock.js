
// user role to display correct UI
var role = '';

// variables for barkeep wine cellar input
var grapeName = '';
var grapeColor = '';
var grapeFlavor = '';
var grapeWeight = '';

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

$(document).ready(function() {

  // hide barkeep-specific UI elements
  $('#barkeepRole').hide();
  // hide customer-specific UI elements
  $('#customerRole').hide();

  // check user role
  $('#userRole').on('click', function(e) {
      e.preventDefault();
      role = $('input[name=userRole]:checked').val();
      $('#userRole').hide();

      if (role === 'stock') {

        // role = barkeep; stock the wine cellar
        var wineInventory = new Inventory();

        $('#barkeepRole').show();
        $('.shift-over').hide();

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

            // clear radio buttons and checkbox
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
