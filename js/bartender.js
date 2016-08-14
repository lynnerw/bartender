
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

/*interviewCust.prototype.questions = function(length) {
    var questions = "";
    for (i-0; i < interviewCust.length; i++) {

   question[i].push() to html
   getCustomerInput
}
*/

var wineColor = "";
var wineFlavor = "";
var wineWeight = "";

$('.wine-flavor').hide();
$('.wine-weight').hide();

function getWineFlavor(wineColor) {

    $('.wine-flavor').click( function(e){
        e.preventDefault();
    var wineFlavor = $('input[name=wineFlavor]:checked').val();
    console.log('User selection is ' + wineColor + ' and ' + wineFlavor);

    if (wineColor == 'red') {

        if (wineFlavor == 'sweet') {
            $('.wine-weight').prepend("<p>Do you like your sweet red wine to resemble a substantial desert wine or to be more light and fruity?</p>");
            $('.wine-weight').show();
        } else {
            $('.wine-weight').prepend("<p>Do you like your dry red wine to be complex and full-bodied or light, with a crisp finish?</p>");
            $('.wine-weight').show();
          }
      }  else {  // wineColor must be 'white'

        if (wineFlavor == 'sweet') {
            $('.wine-weight').prepend("<p>Do you like your sweet white wine to be a little buttery or more on the fruity side?</p>");
            $('.wine-weight').show();
        } else {
            $('.wine-weight').prepend("<p>Do you like your dry white wine to be complex and full-bodied or light, with a crisp finish?</p>");
            $('.wine-weight').show();
          };
      };  // end of if (wineColor)

    // getWineWeight();
    });
}

/*var wineChoice = function(wineType) {
    this.wineType = wineType;
    console.log("Wine type is " + wineType);
}*/

$(document).ready( function() {

    $('.wine-color').click( function(e){
        e.preventDefault();
        var wineColor = $('input[name=wineColor]:checked').val();

        if (wineColor == ("red")) {
          $('.wine-flavor').prepend("<p>And do you like your red wine sweet or dry?</p>");
          $('.wine-flavor').show();
        } else {
          $('.wine-flavor').prepend("<p>And do you like your white wine sweet or dry?</p>");
          $('.wine-flavor').show();

        };
        getWineFlavor(wineColor);
    });

});
