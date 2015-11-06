function Star(params) {
  /*****************************************************************************
  * set default property values.
  * private properties
  *   canvasId    = the jquery selector of the canvas element that the star will 
  *                 be drawn on
  *   vertices    = number of vertices of the star
  *   radiusP     = precentage of max canvas to use for the star radius
  *   radius      = the radius of the star.  if set, will override radiusP
  *   rotation    = the number of degrees to rotate the star
  *   vangleP     = percentage of the max vertex angle
  *   cangleP     = percentage of the max cut angle
  *   vangle      = the specific vertex angle.  if set, will override vangleP
  *   cangle      = the specific cut angle.  if set, will override cangleP
  *   originX     = the x coordinate of the origin (center of the star)
  *   originY     = the y coordinate of the origin (center of the star)
  *   fillColor   = the fill color of the star
  *   strokeColor = the stroke color of the star
  *   strokeWidth = the stroke width of the star
  *   canvas      = canvas element
  *   c           = canvas drawing context
  *****************************************************************************/
  var canvasId = "canvas";
  var vertices = 3
  var radiusP = 95;
  var radius = 0;
  var rotation = 0;
  var vangleP = 50;
  var cangleP = 0;
  var vangle = 0;
  var cangle = 0;
  var originX = '';
  var originY = '';
  var fillColor = "black";
  var strokeColor = "black";
  var strokeWidth = 3;
  var c = null;
  this.vangle = vangle;
  this.cangle = cangle;

  var PICONV = Math.PI / 180;
  setParams(params);

  /*****************************************************************************
  * Private method to set property values
  *****************************************************************************/
  function setParams(params) {
    if(params.hasOwnProperty("canvasId")) {
      canvasId = params.canvasId;
    }
    if(params.hasOwnProperty("vertices")) {
      if($.isNumeric(params.vertices)) {
        vertices = params.vertices;
      } else {
        console.log("vertices must be numeric");
        return;
      }
    }
    if(params.hasOwnProperty("radiusP")) {
      if($.isNumeric(params.radiusP) && params.radiusP > 0) {
        radiusP = params.radiusP;
      } else {
        console.log("invalid radiusP");
        return;
      }
    }
    if(params.hasOwnProperty("radius")) {
      if($.isNumeric(params.radius) && params.radius > 0) {
        radius = params.radius;
      } else {
        console.log("invalid radius");
        return;
      }
    }
    if(params.hasOwnProperty("vangleP")) {
      if($.isNumeric(params.vangleP) && params.vangleP >= 1 && params.vangleP <= 100) {
        vangleP = params.vangleP;
      } else {
        console.log("invalid vangleP");
        return;
      }
    }
    if(params.hasOwnProperty("cangleP")) {
      if($.isNumeric(params.cangleP) && params.cangleP >= 0 && params.cangleP <= 99) {
        cangleP = params.cangleP;
      } else {
        console.log("invalid cangleP");
        return;
      }
    }
    if(params.hasOwnProperty("vangle")) {
      vangle = params.vangle;
    }
    if(params.hasOwnProperty("originX")) {
      originX = params.originX;
    }
    if(params.hasOwnProperty("originY")) {
      originY = params.originY;
    }
    if(params.hasOwnProperty("fillColor")) {
      fillColor = params.fillColor;
    }
    if(params.hasOwnProperty("strokeColor")) {
      strokeColor = params.strokeColor;
    }
    if(params.hasOwnProperty("strokeWidth")) {
      strokeWidth = params.strokeWidth;
    }
  }

  /*****************************************************************************
  * Privileged method to validate property values and reset them if neccesary
  *****************************************************************************/
  this.validate = function() {
    // check to see if canvas actually exists
    if($(canvasId).length) {
      canvas = $(canvasId)[0];
      if(canvas.getContext) {
        if(c = canvas.getContext("2d")) {
          // get the width and height of element
          width = canvas.width;
          height = canvas.height;
          maxRadius = (height > width)?.5 * width:.5 * height;
          if(radius == 0 && radiusP > 0 && radiusP < 100) {
            radius = radiusP / 100 * maxRadius;
          }
          if(radius > maxRadius) {
            radius = maxRadius;
          }
          if(originX == '') {
            originX = width / 2;
          }
          if(originY == '') {
            originY = height / 2;
          }
        } else {
          console.log("not able to get 2d context of canvas");
          return false;
        }
      } else {
        console.log("element has no context");
        return false;
      }
    } else {
      console.log("Can not find canvas element.");
      return false;
    }
    return this;
  }

  /*****************************************************************************
  * Privileged method to draw the star
  *****************************************************************************/
  this.draw = function() {
    if(this.validate()) {
      angleC = cangleP;
      angleV = vangleP;


      angleVMax = 180 * (vertices - 2) / vertices;
      angleCMax = 360 / vertices;
      angleStep = angleCMax;
      angleV = (angleV / 100) * angleVMax;
      angleC = (angleC / 100) * angleCMax;
      angleA = (360 / vertices) - angleC;

      /*
      * convert degrees to radians
      */
      angleAR = angleA * PICONV;
      angleCR = angleC * PICONV;
      angleVR = angleV * PICONV;
    
      radiusCut = (radius * Math.tan(angleVR / 2)) / (Math.sin(angleAR / 2) + Math.cos(angleAR / 2) * Math.tan(angleVR / 2));
    
      /*
      * draw blades
      */
      
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.clearRect(0, 0, canvas.width, canvas.height)
      c.beginPath();
      c.translate(originX, originY);
      c.rotate(-90 * PICONV)
      for(x = 0; x < vertices; x++) {
        c.moveTo(0,0);
        angleOffset = x * angleStep;
        angleOffsetR = angleOffset * PICONV;
        angle = angleOffset - angleA / 2;
        angleR = angle * PICONV;
        c.lineTo(radiusCut * Math.cos(angleR), radiusCut * Math.sin(angleR));
        c.lineTo(radius * Math.cos(angleOffsetR), radius * Math.sin(angleOffsetR));
        angle = angleOffset + angleA / 2;
        angleR = angle * PICONV;
        c.lineTo(radiusCut * Math.cos(angleR), radiusCut * Math.sin(angleR));
        c.fillStyle = fillColor;
        c.fill();
        this.vangle = angleV;
        this.cangle = angleC;
      }
    }
  }
}
