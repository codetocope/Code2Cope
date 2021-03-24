var pos;
var pre = []; // presets container

function setHTML(pgName){
    
    var rawframe = document.getElementById('code');
    var framedoc = rawframe.contentDocument;
    if (!framedoc && rawframe.contentWindow) {
        framedoc = rawframe.contentWindow.document;
    }

    var s = document.createElement('script'); // for sound
    var p = document.createElement('script'); // for p5js
    var d = document.createElement('script'); // for dom
    var m = document.createElement('script'); // for ml5
    
    p.type = "text/javascript";    
    p.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.2.0/p5.min.js";
    s.crossOrigin = " ";
    framedoc.head.appendChild(p);

    s.type = "text/javascript";
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.2.0/addons/p5.sound.js";
    s.crossOrigin = " ";
    framedoc.head.appendChild(s);

    d.type = "text/javascript";
    d.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js";
    d.crossOrigin = " ";
    framedoc.head.appendChild(d);

    m.type = "text/javascript";
    m.src = "https://unpkg.com/ml5@latest/dist/ml5.min.js";
    m.crossOrigin = " ";
    framedoc.head.appendChild(m);

    var htmlSrc;
    if(pgName=='FACE'){
        htmlSrc = 
        `let mic;

// SKIN TONE
var skintone = ('#bdbdbd');
// EYE COLOR
var eyecolor = ('#fffff');
// BROW COLOR
var haircolor = ('#fffff');

function setup(){
  createCanvas(windowWidth - 20, windowHeight - 20);
  mic =  new p5.AudioIn();  
  rectMode(CENTER);
  mic.start();
} 
    
function draw(){
  let vol = mic.getLevel();
  let s = map(vol, 0, 1, 0, height);
  background(220);
  translate(width/2, height/2);
  noStroke();
  scale(height/800);

  // BODY
  fill(100, 0, 100);
  ellipse(0, 430, 400, 490);
  fill(skintone);
  ellipse(0, 200, 170, 170);
  fill(80, 0, 0, 70);
  ellipse(0, 200, 170, 170); 

  // FACE
  // EYES
  // MOUTH
  // HAT
  // ACCESSORY
}`;

    } else if(pgName == 'BODY') {
        htmlSrc =     
`let video;
let poseNet;
let poses = [];
let osc, currFreq;
let playingNote = false;

let leftHand, rightHand;  
let handColor;

let freqs = [261.63, 293.66, 329.63, 349.23, 391.99, 440, 493.88];
let noteColors;

function setup() {
    let c = createCanvas(windowWidth-200, windowWidth*0.6);
    
    video = createCapture(VIDEO);
    video.size(width, height);

    // Create a new poseNet method with a single detection
    poseNet = ml5.poseNet(video, modelReady);
    // This sets up an event that fills the global variable "poses"
    // with an array every time new poses are detected
    poseNet.on('pose', function(results) {
    poses = results;
    });
    // Hide the video element, and just show the canvas
    video.hide();
    createP('...loading Model').id('status');
    osc = new p5.Oscillator('sine');
    
    handColor = color(255);
    noteColors = [color(255, 0, 0, 150), 
                  color(0, 100, 50, 150), 
                  color(0, 0, 200, 150),
                  color(100, 100, 0, 150),
                  color(50, 50, 100, 150), 
                  color(100, 0, 100, 150), 
                  color(80, 90, 90, 150)
                 ];
    masterVolume(0.9);
}

function modelReady() {
    select('#status').html('Model Loaded');
}

function draw() {
    push();
    translate(width,0);
    scale(-1, 1);
    image(video, 0, 0, width, height);    

    // We can call both functions to draw all keypoints and the skeletons
    drawCharacter();
    drawHands();
  
    pop();
    drawNoteBlocks();
  
    if(poses.length > 0)
      genFreq();      
    
    if(playingNote){
      osc.amp(0.3, 0.5);
      osc.freq(currFreq, 0.1);
    }    
  
}

function drawHands(){
  
  if(poses.length > 0) {
    let pose = poses[0].pose;
    rightHand = pose.rightWrist;
    leftHand = pose.leftWrist;

    fill(handColor);
    ellipse(rightHand.x, rightHand.y, 50);
    ellipse(leftHand.x, leftHand.y, 50);
  }
}

function genFreq(){
  if(leftHand.x > width-200) {
    currFreq = freqs[floor(leftHand.y/(height/4))];
    handColor = 'red';
    playNote();
  }
  else if (rightHand.x < 200) {
    currFreq = freqs[4 + floor(rightHand.y/(height/3))];
    handColor = 'red';
    playNote();
  }
  else {
    handColor = 'white';
    stopNote();
  }  
}

function playNote(){
  if(playingNote == false){
    osc.start();
    playingNote = true;
  }
}

function stopNote() {
  // ramp amplitude to 0 over 0.5 seconds
  osc.amp(0, 0.5);
  playingNote = false;
}

function drawNoteBlocks(){
  let notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];  
 
  for(var i = 0; i < notes.length; i++){    
    fill(200, 0, 200, 100);
    noStroke();
    textSize(32);
    textAlign(CENTER);
    fill(noteColors[i]);
    
    if(i < 4){
      rect(0, i * height/4, 200, height/4);
      fill(255);
      text(notes[i], 100, i * height/4 + height/8);
    }
    else {
      rect(width-200, (i-4) * height/3, 200, height/3);
      fill(255);
      text(notes[i], width-100, (i-4) * height/3 + height/6);
    }
  }
}

function drawCharacter(){
  if(poses.length > 0){
    let pose = poses[0].pose;

    // CHARACTER
    drawKeypoints();
  }
}

function drawKeypointsExcluded(pose, exclude){
    for (let j = 0; j < pose.keypoints.length; j++) {    
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2 && exclude.indexOf(keypoint.part) < 0) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
    // Loop through all the poses detected
    for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
        for (let j = 0; j < pose.keypoints.length; j++) {
            // A keypoint is an object describing a body part (like rightArm or leftShoulder)
            let keypoint = pose.keypoints[j];
            // Only draw an ellipse is the pose probability is bigger than 0.2
            if (keypoint.score > 0.2) {
            fill(255, 0, 0);
            noStroke();
            ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
            }
        }
    }
}

// A function to draw the skeletons
function drawSkeleton() {
    // Loop through all the skeletons detected
    for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
        // For every skeleton, loop through all body connections
        for (let j = 0; j < skeleton.length; j++) {
            let partA = skeleton[j][0];
            let partB = skeleton[j][1];
            stroke(255, 0, 0);
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }
    }
}
`;
    }


    document.getElementById("js").innerHTML = htmlSrc;
    parsePresets();

    document.getElementById('js').addEventListener('mouseup', e => {
        pos = e.target.selectionStart;
        //console.log('Caret at: ', e.target.selectionStart)
    });
}

function parsePresets(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.status == 200 && xmlhttp.readyState == 4){  
            //var regex = /(?=\/{4})|(\/{2})/;
            //var regex = /(?=\/{4})|\/\*\*\/([\s\S]*?)\/\*\*\//;
            var regex = /(?=\/{4})/;
            var words = xmlhttp.responseText.split(regex);

            for(var i = 0; i < words.length; i++){
                //var re = /\/\*\*\/(.*)\/\*\*\//gm;
                var re =/\/\*\*\/([\s\S^\r]*?)\/\*\*\//;
                var tmp =  words[i].split(re);
                
                //console.log(tmp);
                pre.push(tmp[0]);
                pre.push(tmp[1]);
            }
            console.log(pre);
        }
    }
    xmlhttp.open("GET","presets.txt",true);
    xmlhttp.send();
}
function setCode(partName){
    var newSetting = "";
    var index = document.getElementById(partName).selectedIndex;
    var nextTag = "";
    var currTag = "";

    pos = document.getElementById("js").value.indexOf(currTag) + currTag.length;

    if(partName == 'face'){ // assign current and next tags based on given part
        currTag = "  // FACE";
        nextTag = "  // EYES";
        newSetting = pre[index * 2 + 1];
    }
    if(partName == 'eyes'){
        currTag = "  // EYES";
        nextTag = "  // MOUTH";
        newSetting = pre[index * 2 + 11];
    }
    if(partName == 'mouth'){
        currTag = "  // MOUTH";
        nextTag = "  // HAT";
        newSetting = pre[index * 2 + 7];
    }
    if(partName == 'skintone'){
        currTag = "// SKIN TONE";
        nextTag = "// EYE COLOR";
        newSetting = pre[index * 2 + 15];
    }
    if(partName == 'eyecolor'){
        currTag = "// EYE COLOR";
        nextTag = "// BROW COLOR";
        newSetting = pre[index * 2 + 21];
    }
    if(partName == 'haircolor'){
        currTag = "// BROW COLOR";
        nextTag = "function setup(){";
        newSetting = pre[index * 2 + 27];
    }
    if(partName == 'accessory'){
        currTag = "  // ACCESSORY";
        nextTag = "}";
        newSetting = pre[index * 2 + 37];
    }    
    if(partName == 'hat'){
        currTag = "  // HAT";
        nextTag = "  // ACCESSORY";
        newSetting = pre[index * 2 + 45];
    }
    if(partName == 'character'){
        currTag = "    // CHARACTER";
        nextTag = "  }";
        newSetting = pre[index * 2 + 51];
    }

    /*
    var newStart = js.value.substring(0, pos) + newSetting + '\n';
    var old = js.value.substring(0, js.value.length);
    console.log("pos: " + pos);
    console.log("js : " + js.value.length);
    console.log("new: " + newSetting.length);
    var newEnd = js.value.substring(newStart.length, js.value.length);
    //js.value = js.value.substring(0, pos) + newSetting + '\n' + old.substring(pos, js.value.length);
    //js.value = js.value.replace(/(?<=FACE )(.*?)(?= \/\/ EYES)/gi, newSetting) + "\n";
    //console.log(js.value.search(/(?<=FACE )(.*?)(?= \/\/ EYES)/gi));
    */

    var lines = js.value.split(/(\n)/); // split current code into an array
    //console.log(lines);

    for(var i = 0; i < lines.length; i++){ // read current code, replacing everything between starting tag and ending tag
        if(lines[i] == currTag){
            console.log("starting");            
            for(j = i+1; j < lines.length; j++){
                if (j == i + 1) { lines[j] = newSetting + "\n"} // on line immediately after tag, insert new setting
                else if(lines[j] != nextTag){
                    lines[j] = ""; // clear following lines until we reach the next tag
                } else {
                    console.log("end");
                    break;
                }                
            }
            break;
        }
    }
    
    js.value = lines.join(""); // rejoin code and place back into textarea
}

function compile() {

    // Stop/Play Button instead of just Compile
    var btn = document.getElementById("playButton");
    
    if (btn.innerHTML == "Run"){
        btn.innerHTML = "Stop";      
    } else {
        btn.innerHTML = "Run";
        document.getElementById("code").srcdoc = ""
        return;
    }    

    //document.getElementById('code').src = '';

    var html = document.getElementById("html");
    var p5js = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.2.0/p5.min.js";
    var js = document.getElementById("js");
    var code = document.getElementById("code").contentDocument;

    document.getElementById("code").srcdoc = "<!DOCTYPE HTML> <html lang='en'><head> <script src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.js' crossorigin=''></script>"
       + "<script src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/addons/p5.sound.min.js' crossorigin=''></script>"
       + "<script src='https://unpkg.com/ml5@latest/dist/ml5.min.js' crossorigin=''></script>"
       + "<script src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js' crossorigin=''></script>"
       + "<meta charset='utf-8'>" 
       + "<script>" + js.value + "<\/script>";
}