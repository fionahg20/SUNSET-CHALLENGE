// Get canvas
const canvas = document.getElementById("myCanvas");
//Create drawing object
const ctx = canvas.getContext('2d');

const bldgWidth = 50;
const canvasHeight = 300;
const road = 40;
const offsetY = 5;// Keep 5px away from top of canvas
const maxHeight = canvasHeight - road - offsetY;
let heightsArray = [];

// Draw buildings according to user input heights
function build() {
    // Get building heights entered by user
    const height1 = $("#height1").val();
    const height2 = $("#height2").val();
    const height3 = $("#height3").val();
    const height4 = $("#height4").val();
    const height5 = $("#height5").val();
    const height6 = $("#height6").val();

    heightsArray.push(height1, height2, height3, height4, height5, height6);
    let startX = 110;  // offset first building
    // create buildings
    for (let i = 0; i < heightsArray.length; i++) {
        let startY = maxHeight - (heightsArray[i] * maxHeight / 10) + 5;
        let bldgHeight = (heightsArray[i] * maxHeight / 10);
        ctx.beginPath();
        ctx.rect(startX, startY, bldgWidth, bldgHeight);
        ctx.fillStyle = "darkgray";
        ctx.fill();
        startX += 60;
    }
}

// Reset inputs and clear canvas of buildings when 'DEMOLISH' button clicked
function demolish() {
    document.querySelector("form").reset();
    ctx.beginPath();
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, 6 * bldgWidth + 160, maxHeight + 6);
    ctx.fill();
}
$("#demolish").on("click", demolish);


function init() {
    // Draw picture on load

    // road
    ctx.beginPath();
    ctx.rect(0, 260, 580, 40);
    ctx.fillStyle = "lightgray";
    ctx.fill();

    // white lines in road
    ctx.beginPath();
    ctx.setLineDash([20, 15]);
    ctx.moveTo(0, 280);
    ctx.lineTo(580, 280);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.stroke();

    // sun in sky
    ctx.beginPath();
    ctx.arc(530, 55, 30, 0, Math.PI * 2, true);
    ctx.fillStyle = "rgb(258,218,70)"
    ctx.fill();

    // Trees x2
    ctx.font = "80px FontAwesome";
    ctx.fillStyle = "green";
    ctx.fillText("\uf1bb", 500, 250);
    ctx.fillText("\uf1bb", 460, 250);

    // Car animation? - enhancement for later
    // ctx.font = "80px FontAwesome";
    // ctx.fillStyle = "red";
    // ctx.fillText("\uf5e4", 300, 290);
}

$("#buildButton").on('click', build);

// Return array with heights of buildings that can see sunset
//  ie Find those heights with only lower values before it

function sunset() {
    // remove sun in sky
    ctx.beginPath();
    ctx.fillStyle = "skyblue";
    ctx.fillRect(500, 0, 90, 90);
    ctx.fill();

    // draw sun set
    ctx.beginPath();
    ctx.arc(35, 260, 30, 0, Math.PI, true);
    ctx.fillStyle = "rgb(255, 187, 0)";
    ctx.fill();

    heightsArray = heightsArray.map(Number);
    let tallest = 0;
    let results = [];
    // check which buildings can see sunset 
    for (let i = 0; i < heightsArray.length; i++) {
        if (heightsArray[i] > tallest) {
            tallest = heightsArray[i];
            results.push(heightsArray[i]);
        }
    }
    // Display results 
    $("p").css("visibility", "visible");
    $("#resultsNum").text(results.length);
    $("#resultsArray").text(results);
}
$("#sunsetButton").on('click', sunset);
heightsArray = [];  // reset building height values to 0
