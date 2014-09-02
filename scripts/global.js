var PI = Math.PI;

$(document).ready(function() {
  height = $(".canvas-container").height();
  width = $(".canvas-container").width();
  $('canvas').attr("width",width);
  $('canvas').attr("height",height);


  $("#vangle").slider({
    min: 1,
    max: 100,
    value: 50,
    slide: function( event, ui ) {
      setValues();
    },
    stop: function( event, ui ) {
      setValues();
    }
  });
  $("#cangle").slider({
    min: 0,
    max: 99,
    value: 0,
    slide: function( event, ui ) {
      setValues();
    },
    stop: function( event, ui ) {
      setValues();
    }
  });
  $(".vertices").change(function() {
    setValues();
  });
  setValues();
});


function setValues() {
  star = new Star({
    vertices: $(".vertices")[0].value,
    vangleP: $("#vangle").slider("value"),
    cangleP: $("#cangle").slider("value"),
  }).draw();
}
