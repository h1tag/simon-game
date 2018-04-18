
// global vars
var game_count = 0;
var user_count = 0;
var strict_check = false;
var seriesArr = [];
var tile_id;
var tile_trigger_colors = ["#07e543", "#ff0101", "#f4f607", "#6eccf0"]; // 1st tile trigger color, 2nd ...
var tile_original_colors = ["#148d34", "#831313", "#a8a919", "#1f7ea3"];
var audio_arr = ["audio-1", "audio-2", "audio-3", "audio-4"];

// generate a random tile number between 1 and 4
function generateRandTile() {
  return (Math.floor(Math.random() * (4 - 1 + 1)) + 1);
}

function checkUserInput(clicked_id) {
  if(strict_check === true){ // strict mode
    if(clicked_id === seriesArr[user_count]){
      user_count++;
    }else{
      reset();
    }
  }else{
    if(clicked_id === seriesArr[user_count]){ // normal mode
      user_count++;
    }else{
      restart();
    }
  }

  if(user_count === game_count) {
    if(!checkGameEnd()){
      user_count = 0;
      pcPlay();
    }else{
      displayCount("Win!")
      reset();
      return;
    }
  }
  return true;
}


function triggerColor(tile_id){
  var regEx = /s/;
  var tile_id = tile_id.replace(regEx, "");
  $("#s" + tile_id).css("background-color", tile_trigger_colors[tile_id - 1]); // removed the s in the id selector

  playSound(tile_id);
  // after a second change it back
  setTimeout(originalColor, 1000, tile_id);
}

function originalColor(tile_id){
  $("#s" + tile_id).css("background-color", tile_original_colors[tile_id - 1]);
}

function playSound(tile_id) {
  document.getElementById("audio-" + tile_id).play();
}

function displayCount(what_to_display) {
  $("#screen").html(what_to_display);
}

function pcPlay(){
  tile_id = generateRandTile();
  seriesArr.push("s" + tile_id);
  console.log(seriesArr);

  for(var i = 0; i < seriesArr.length; i++){
    (function(){
      var j = i;
      console.log(seriesArr[j]);
      setTimeout(triggerColor, 1000 * (j+1), seriesArr[j]);
    })();
  }

  game_count++;
  displayCount(game_count);

  //test(seriesArr);
}

// where it all starts
function start() {
  if(game_count === 0){
  pcPlay();
  }else{
    reset();
  }
}

function restart(){
  setTimeout(displayCount, 1000, "try again!");

  for(var i = 0; i < seriesArr.length; i++){
    (function () {
      var j = i;
      setTimeout(triggerColor, 1000 * (j+1), seriesArr[j]);
    })();
  }
}

function checkGameEnd() {
  if(game_count === 20){
    return true;
  }else{
    return false;
  }
}

function reset() {
  game_count = 0;
  displayCount(game_count);
  seriesArr = [];
  user_count = 0;
}

function setStrict() {
  if(game_count === 0){
    strict_check = true;
  }else{
    reset();
    strict_check = true;
  }
}

function test(arr) {
  for (var i = 0; i < arr.length; i++) {
      $("#" + arr[i]).click();
    }
  }
