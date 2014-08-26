var PI = Math.PI;

$(document).ready(function() {
  $("#vangle").slider({
    min: 1,
    max: 100,
    value: 50,
    slide: function( event, ui ) {
      setValues();
    }
  });
  $("#cangle").slider({
    min: 0,
    max: 100,
    value: 1,
    slide: function( event, ui ) {
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
  for(x = 0; x < vertices; x++) {
    //angleOffset = x * angleStep - (angleStep / (vertices - 1));
    angleOffset = x * angleStep;
    angleOffsetR = angleOffset * (PI / 180);
    c.beginPath();
    // move to origin
    c.moveTo(originX, originY);
    // first point
    angle = angleOffset - angleA
    angleR = angle * (PI / 180);
    newX = radiusCut * Math.cos(angleR);
    newY = radiusCut * Math.sin(angleR);
if(x == 0) {
  console.log(angleOffset + ':' + angleR + ':' +radiusCut + ':'+ newX + ':' + newY);
}
    c.lineTo(newX + originX, newY + originY);
    c.lineTo(radius * Math.cos(angleOffsetR) + originX, radius * Math.sin(angleOffsetR) + originY);
    angle = angleOffset + angleA
    angleR = angle * (PI / 180);
    c.lineTo(radiusCut * Math.cos(angleR) + originX, radiusCut * Math.sin(angleR) + originY);
    c.fill();
  }
}
