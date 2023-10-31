// Big shout out to Chris Courses 
// https://www.youtube.com/watch?v=EO6OkltgudE&t=213s

// var canvas = document.querySelector('canvas');

// canvas.width = window.innerWidth * 2 / 3;
// canvas.height = window.innerHeight * 1/4 ;
// var ctx = canvas.getContext("2d"); // passing a ton of methods through ctx; it's a magic paintbrush

///////////////////////////////////////////////////////////////////////////////
// rectangle

// ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
// ctx.fillRect(300, 400, 300, 400) // arguments are x, y, width, height


///////////////////////////////////////////////////////////////////////////////
// line

// ctx.beginPath();
// ctx.moveTo(50, 300); // arugments are x and y
// ctx.lineTo(300, 100);
// ctx.lineTo(400, 300)
// ctx.strokeStyle = "#fa34a3";
// ctx.stroke();


///////////////////////////////////////////////////////////////////////////////
// circle/arcs

// ctx.beginPath();
// ctx.arc(1200, 700, 200,  0, Math.PI * 2, true) // arguments are x, y, radius, start angle and end angle (in radians), draw counterclockwise (bool)
// ctx.stroke();


// Animation!

// var x = 200;
// var dx = 10;
// var y = 200;
// var dy = 10;

// function animateCircle() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height); // takes in the starting coordinates and the area to clear within the canvas
//     requestAnimationFrame(animateCircle);
//     ctx.beginPath();
//     ctx.arc(x, y, 30, 0, Math.PI * 2, false);
//     ctx.strokeStyle = 'blue';
//     ctx.stroke();

    
    
//     if ((x + 30 > canvas.width) || (x - 30 < 0)) {
//         dx *= -1;
//     }

//     if (y + 30 > canvas.height || y - 30 < 0) {
//         dy *= -1;
//     }
//     x += dx;
//     y += dy;
  
    
// }
// animateCircle();
 