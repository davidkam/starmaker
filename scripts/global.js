var PI = Math.PI;

$(document).ready(function() {
  $("#vangle").slider({
    min: 1,
    max: 100,
    value: 50,
    slide: function( event, ui ) {
      setValues();
    },
    change: function( event, ui ) {
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
    change: function( event, ui ) {
      setValues();
    }
  });
  $(".vertices").change(function() {
    setValues();
  });
  setValues();
});


function setValues() {
  vertices = $(".vertices")[0].value;
  vangle = $("#vangle").slider("value");
  cangle = $("#cangle").slider("value");
  height = $(".canvas-container").height();
  width = $(".canvas-container").width();
  $('canvas').attr("width",width);
  $('canvas').attr("height",height);
  radius = (height > width)?.45 * width:.45 * height;
  originX = width / 2;
  originY = height / 2;
  drawStar(vertices, radius, vangle, cangle, originX, originY);
}


function drawStar(vertices, radius, angleV, angleC, originX, originY) {
  /*
  * Set constants
  */
  angleVMax = 180 * (vertices - 2) / vertices;
  angleCMax = 360 / vertices;
  angleStep = angleCMax;
  angleV = (angleV / 100) * angleVMax;
  angleC = (angleC / 100) * angleCMax;
  angleA = (360 / vertices) - angleC;

  /*
  * convert degrees to radians
  */
  angleAR = angleA * (PI / 180);
  angleCR = angleC * (PI / 180);
  angleVR = angleV * (PI / 180);

  radiusCut = (radius * Math.tan(angleVR / 2)) / (Math.sin(angleAR / 2) + Math.cos(angleAR / 2) * Math.tan(angleVR / 2));

  /*
  * draw blades
  */
  c = $("canvas")[0].getContext('2d');
  c.beginPath();
  c.translate(originX, originY);
  c.rotate(-1 * PI/2);

  for(x = 0; x < vertices; x++) {
    //angleOffset = x * angleStep - (angleStep / (vertices - 1));
    angleOffset = x * angleStep;
    angleOffsetR = angleOffset * (PI / 180);
    // move to origin
    c.moveTo(0, 0);
    // first point
    angle = angleOffset - angleA / 2;
    angleR = angle * (PI / 180);
    c.lineTo(radiusCut * Math.cos(angleR), radiusCut * Math.sin(angleR));
    c.lineTo(radius * Math.cos(angleOffsetR), radius * Math.sin(angleOffsetR));
    angle = angleOffset + angleA / 2;
    angleR = angle * (PI / 180);
    c.lineTo(radiusCut * Math.cos(angleR), radiusCut * Math.sin(angleR));
    c.fill();
  }
}
