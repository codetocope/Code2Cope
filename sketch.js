let mic;
let vol=0
function setup() {
  createCanvas(500, 500);
  //slider=createSlider(200,400,250);
  //slider.position(10,10);
  
  mic = new p5.AudioIn ();
  mic.start();
}

function draw() {
  //let val=slider.value();
  let v = mic.getLevel();
  vol += (v-vol)/3;
  background(38, 38, 32);
  angleMode(DEGREES);
  
 let a=map(vol,0,0.02,200,250)
  
//lightning right
strokeWeight(5);
stroke(255, 251, 0);
push();
translate(-190+a/2,0);
//translate(val/5,0);
beginShape();
  noFill();
  vertex(340,271);
  vertex(385,244);
  vertex(380,260);
  vertex(419,239);
  vertex(408,253);
  vertex(440,235);
endShape();
  
 beginShape();
  vertex(340,280);
  vertex(377,272);
  vertex(364,282);
  vertex(397,277);
  vertex(382,291);
  vertex(428,279);
endShape();
pop();

//lightning left
push();
  translate(200-a/2,0)
  translate(width-25,height+75);
  rotate(185);
beginShape();
  noFill();
  vertex(340,271);
  vertex(385,244);
  vertex(380,260);
  vertex(419,239);
  vertex(408,253);
  vertex(440,245);
endShape();
  
 beginShape();
  vertex(340,280);
  vertex(377,272);
  vertex(364,282);
  vertex(397,277);
  vertex(382,291);
  vertex(428,279);
endShape();
pop();
  
//body
  stroke(0);
  fill(191, 109, 33);
beginShape();
  vertex(190,375);
  vertex(150,398);
  bezierVertex(150,398,157,473,250,478);
  bezierVertex(250,478,343,473,350,398);
  vertex(310,375)
endShape();
  
beginShape();
  vertex(183,420);
  bezierVertex(183,420,205,385,183,325);
  vertex(317,325);
  bezierVertex(317,325,295,385,317,420);
endShape();
  
//R ear
beginShape();

  vertex(344,237);
  bezierVertex(344,237,355,228,361,240);
  bezierVertex(361,240,361,250,345,292);
  bezierVertex(345,292,345,300,331,299);
endShape();
  
beginShape();
  vertex(353,245);
  bezierVertex(353,245,338,268,340,279);
endShape();
  
//L ear 
beginShape();
  vertex(156,237);
  bezierVertex(156,237,145,228,139,240);
  bezierVertex(139,240,139,250,155,292);
  bezierVertex(155,292,155,300,169,299);
endShape();
  
beginShape();
  vertex(147,245);
  bezierVertex(147,245,162,268,160,279);
endShape();
  
//head 
beginShape();
  vertex(160,250);
  bezierVertex(160,250,130,155,180,109);
  bezierVertex(180,109,250,70,320,109);
  bezierVertex(320,109,370,155,340,250);
  vertex(330,300);
  
  bezierVertex(330,300,323,318,277,375);
  bezierVertex(277,375,250,390,223,375);
  bezierVertex(223,375,177,318,170,300);
  vertex(170,300);
endShape(CLOSE); 
  
//hair
  fill(20, 20, 16);
beginShape();
  vertex(160,250);
  bezierVertex(160,250,130,155,180,109);
  bezierVertex(180,109,250,70,320,109);
  bezierVertex(320,109,370,155,340,250);
  vertex(337,228);
  vertex(322,185);
  vertex(314,145);
  bezierVertex(314,145,250,120,186,145);
  vertex(186,145);
  vertex(178,185);
  vertex(163,228);
endShape(CLOSE); 
 
//L pupil
beginShape();
  fill('brown');
  vertex(194,230)
  bezierVertex(194,230,191,240,204,244)
  bezierVertex(204,244,212,243,213,230);
endShape();    
  
//R pupil  
beginShape();
  vertex(306,230)
  bezierVertex(306,230,309,240,296,244)
  bezierVertex(296,244,288,243,287,230);
endShape();  
  
//L eye
noFill();
push();
  translate(220,220+a/20);
  rotate(155+a/12);
  beginShape();
  vertex(0,0);
  bezierVertex(0,0,26,12,40,0);
  endShape();  
pop();
  
//R eyes
push();
translate(280,220+a/20);
rotate(385-a/12);
  beginShape();
  vertex(0,0);
  bezierVertex(0,0,26,-12,40,0);
  endShape(); 
  pop();

//L eyelid
push();
translate(224,214+a/20);
rotate(155+a/12);
  beginShape();
  vertex(0,0);
  bezierVertex(0,0,20,12,33,8);
  endShape(); 
pop();
  
//R eyelid
push();
translate(276,214+a/20);
rotate(385-a/12);
  beginShape();
  vertex(0,0);
  bezierVertex(0,0,20,-12,33,-8);
  endShape();
pop();  
  
//L eyebrow
fill(20, 20, 16)
push();
translate(229,200+a/20);
rotate(155+a/10)
  beginShape();
  vertex(0,0);
  vertex(1,10);
  bezierVertex(1,10,25,21,49,10);
  bezierVertex(49,10,33,17,0,0);
  endShape();
pop();

/*R eyebrow 
beginShape();
  vertex(271,217);
  vertex(272,207);
  bezierVertex(272,207,296,196,320,207);
  bezierVertex(320,207,304,200,271,217);
endShape();  */
  
//R eyebrow 
push();
translate(271,200+a/20);
  rotate(379-a/12);
beginShape();
  vertex(0,0);
  vertex(1,-10);
  bezierVertex(1,-10,25,-21,49,-10);
  bezierVertex(49,-10,33,-17,0,0);
endShape();  
pop();
  

//nose
push();
translate(0,15)
translate(0,0-a/20)
beginShape();
  noFill();
  vertex(230-a/30,278);
  bezierVertex(228-a/35,278,224,284,233,284);
  bezierVertex(233,284,250,295,267,284);
  bezierVertex(267,284,276,284,270+a/35,278);
  vertex(270+a/35,278);
endShape();  
  
//noselines
  line(230-a/35,278, 230-a/20, 278+a/30);
  line(270+a/35,278, 270+a/20, 278+a/30);
pop();
  
  
//mouth
fill(255);
push();
translate(width,height+100);
  angleMode(DEGREES);
rotate(180);
beginShape();
  vertex(230-a/12,255+a/8);
  bezierVertex(230-a/12,255+a/8,250,230,270+a/12,255+a/8);
   bezierVertex(270+a/12,255+a/8,250,220+a/8,230-a/12,255+a/8);
  endShape(CLOSE);
pop();
  
push();
  translate(0,15);
  translate(0,0-a/20)
beginShape();
  vertex(233,343);
  bezierVertex(233,343,250,350,267,343);
endShape();
pop();
  
//hat
push();
translate(0,35-a/4);
  beginShape();
  fill(50+a/2, 0, 0);
  vertex(145,210);
  bezierVertex(145,210,140,155,180,109);
  bezierVertex(180,109,250,70,320,109);
  bezierVertex(320,109,360,155,355,210);
  bezierVertex(355,210,333,180,307,180);
  bezierVertex(307,180,301,124,275,115);
  bezierVertex(275,115,250,107,225,115);
  bezierVertex(225,115,202,122,200,152);
  bezierVertex(200,152,250,140,300,152);
  vertex(307,180);
  bezierVertex(307,180,190,160, 145,210);
  endShape();
pop();
}