/*
    Creting two image object for display image which is yeild after the image proceesing
    */
var img = new Image();
img.src = "lemons.jpg";
var img2 = new Image();
img2.src = "lemons.jpg";
img.onload = function() {
  draw(this, img2);
};

function draw(img, img2) {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  img.style.display = "none";
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;

  /*
     
     Converting into Gray Scale image 
     */
  for (var i = 0; i < data.length; i += 4) {
    var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg; // red
    data[i + 1] = avg; // green
    data[i + 2] = avg; // blue
  }
  ctx.putImageData(imageData, 0, 0);

  var canvas1 = document.getElementById("canvas1");
  var ctx1 = canvas1.getContext("2d");
  ctx1.drawImage(img2, 0, 0);
  img2.style.display = "none";
  var imageData1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
  var data1 = imageData1.data;
  var width = canvas1.width;
  var height = canvas1.height;

  kernel = [5, 5, 5, 5, -40, 5, 5, 5, 5]; //Laplacian Filter with heigher degree

  var size = Math.sqrt(kernel.length);
  var half = Math.floor(size / 2);

  var output = ctx1.createImageData(width, height);
  var outputData = output.data;

  /*
     
     applying Laplacian function such that yeilds edge diagram of image using convolution
     */

  for (var pixelY = 0; pixelY < height; ++pixelY) {
    var pixelsAbove = pixelY * width;
    for (var pixelX = 0; pixelX < width; ++pixelX) {
      var r = 0,
        g = 0,
        b = 0,
        a = 0;
      for (var kernelY = 0; kernelY < size; ++kernelY) {
        for (var kernelX = 0; kernelX < size; ++kernelX) {
          var weight = kernel[kernelY * size + kernelX];
          var neighborY = Math.min(
            height - 1,
            Math.max(0, pixelY + kernelY - half)
          );
          var neighborX = Math.min(
            width - 1,
            Math.max(0, pixelX + kernelX - half)
          );
          var inputIndex = (neighborY * width + neighborX) * 4;
          r += data[inputIndex] * weight;
          g += data[inputIndex + 1] * weight;
          b += data[inputIndex + 2] * weight;
          a += data[inputIndex + 3] * weight;
        }
      }
      var outputIndex = (pixelsAbove + pixelX) * 4;
      outputData[outputIndex] = r;
      outputData[outputIndex + 1] = g;
      outputData[outputIndex + 2] = b;
      outputData[outputIndex + 3] = kernel.normalized ? a : 255;
    }
  }

  /*
     
     converting HexCode to RGB
     */
  ctx.putImageData(output, 0, 0);
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  }

  //Due To limitation of calling api it called iteratively 90 times
  for (var j = 0; j < 90; j++) {
    var mydata;
    $.ajax({
      async: false,
      url:
        "https://api.noopschallenge.com/hexbot?count=1000&width=300&height=220&seed=FF7F50,FFD700,FF8C00",
      success: function(data) {
        mydata = data;
      }
    });
    // console.log(mydata);

    for (var i = 0; i < 1000; i++) {
      var x,
        y,
        w = 300,
        r,
        g,
        b;
      if (mydata.colors[i].value) {
        var xz = hexToRgb(mydata.colors[i].value);
        //console.log(x);
        r = xz.r;
        b = xz.b;
        g = xz.g;
      }
      if (mydata.colors[i].coordinates.x) {
        //console.log(data.colors[i].coordinates.x);
        x = mydata.colors[i].coordinates.x;
      }

      if (mydata.colors[i].coordinates.y) {
        // console.log(data.colors[i].coordinates.y);
        y = mydata.colors[i].coordinates.y;
      }
      var index = (y * w + x) * 4;
      /*
         applying pointillism to the image
         */
      if (
        outputData[index] == 0 &&
        outputData[index + 1] == 0 &&
        outputData[index + 2] == 0
      ) {
        outputData[index] = r;
        outputData[index + 1] = g;
        outputData[index + 2] = b;
      }
    }
  }
  ctx1.putImageData(output, 0, 0);
}
