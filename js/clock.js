var maxnumhours = 23;
var maxnummins = 59;
var maxnumsecs = 60;
var maxmilisecs = 999;

$(document).ready(function() {
  updateClock(); 
  setInterval('updateClock()', 250 );
});

function hexifyWithZeroLead(tohex){
	var rtn = tohex.toString(16);
	return ( rtn.length == 1 ? "0" : "" ) + rtn;
}

function updateClock ( )
{
  //Set Current Time Variables
  var currentTime = new Date ( );
  var currentHours = currentTime.getHours();
  var currentMinutes = currentTime.getMinutes();
  var currentSeconds = currentTime.getSeconds();
  var currentMiliSeconds = currentTime.getMilliseconds();
  var rounded = currentSeconds + (currentMiliSeconds / maxmilisecs);
  
  //Get Color Percentages based off time.
  //Percentage of 255 for Color
  //Percentage of 100 for Position
  rednum = (Math.round(255 * ((currentHours) / maxnumhours)));	 
  rednum100 = (Math.round(100 * ((currentHours) / maxnumhours)));
  greennum = (Math.round(255 * ((currentMinutes) / maxnummins)));
  greennum100 = (Math.round(100 * ((currentMinutes) / maxnummins)));
  bluenum = (Math.round(255 * ((rounded) / maxnumsecs)));
  bluenum100 = (Math.round(100 * ((rounded) / maxnumsecs)));
  
  //convert to HEX
  redhex = hexifyWithZeroLead(rednum);
  greenhex = hexifyWithZeroLead(greennum);
  bluehex = hexifyWithZeroLead(bluenum);
  
  //Create the Hex Strings
  var hex = "#" + redhex + greenhex + bluehex;		//Total HEX Value
  var fullredhex = "#"+redhex+"0000";				//RED Only Hex
  var fullgreenhex = "#00"+greenhex+"00";			//GREEN Only Hex
  var fullbluehex = "#0000"+bluehex;				//BLUE Only Hex

  //Text to indvidual color sliders
  jQuery("#red_display").html(redhex);
  jQuery("#green_display").html(greenhex);
  jQuery("#blue_display").html(bluehex);
  
  //Position and animate color sliders
  leftpos = (rednum100 * 0.01 * 575) + 25;
  jQuery('#red_display').animate({left: leftpos}, 200);
  jQuery('#red_display').css('background-color',fullredhex);

  leftpos = (greennum100 * 0.01 * 575) + 25;
  jQuery('#green_display').animate({left: leftpos}, 200);
  jQuery('#green_display').css('background-color',fullgreenhex);

  leftpos = (bluenum100 * 0.01 * 575) + 25;
  jQuery('#blue_display').animate({left: leftpos}, 200);
  jQuery('#blue_display').css('background-color',fullbluehex);

  
  //zerolead the time for display
  currentHours = ( currentHours < 10 ? "0" : "" ) + currentHours;
  currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
  currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
  
  //append the values
  jQuery("#clock").html("<span id='hours'>"+ currentHours + "</span>:<span id='minutes'>" + currentMinutes + "</span>:<span id='seconds'>" + currentSeconds + '</span>');
  jQuery("#hex").html(hex);
  
  //change the background of the page to current HEX color
  // jQuery('body').css('background-color',hex);
  jQuery('#clock').css('color',hex);
}