let size=3;

let LightSkinTone = ('#d69f87');
let MedSkinTone = ('#d69f87');
let DarkSkinTone = ('#d69f87');

function setup() {
    createCanvas(800, 800);
    skinTone = 0;
    
    scaleFactor = width/800;
}

function draw() {
    background(220);

    scale(width/800);    
    
    fill(skinTone);
    noStroke();

    //round face
    ellipse(width/2, height/2, 400, 500);
    // ****    

    // wide face
    beginShape();
    curveVertex(145, 250);
    curveVertex(145, 250);
    curveVertex(196, 150);
    curveVertex(400, 100);
    curveVertex(596, 150);
    curveVertex(641, 250);
    curveVertex(641, 450);
    curveVertex(400, 650);
    curveVertex(145, 450);
    curveVertex(145, 250);
    curveVertex(145, 250);
    endShape();
    // ***

}