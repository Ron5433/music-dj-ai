song="";
function preload() {
    song=loadSound("hi.mp3");
}
scoreRightWrist=0;

scoreLeftWrist=0;

rightWristX=0;

rightWristY=0;

leftWristX=0;

leftWristY=0;

function setup() {
    canvas=createCanvas(600, 500);
 canvas.center();
 video=createCapture(VIDEO);
 video.hide();

 poseNet=ml5.poseNet(video, modelLoaded());
 poseNet.on("pose", gotPoses);

}

function modelLoaded() {
    console.log("pose net has started");
    
}

function gotPoses(results) {
    if(results.length>0){
        console.log (results);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("score right wrist = "+scoreRightWrist+"score left wrist = "+scoreLeftWrist);

        rightWristX=results[0].pose.rightwrist.x;
        rightWristY=results[0].pose.rightwrist.Y;
        console.log(" right wrist x = "+rightWristX+" right wrist y = "+rightWristY);

        leftWristX=results[0].pose.leftwrist.x;
        leftWristY=results[0].pose.leftwrist.Y;
        console.log(" left wrist x = "+leftWristX+" left wrist y = "+leftWristY);
    }
}


function draw() {
    image(video, 0, 0, 600, 500);
    stroke("red");
    fill("pink");
    if(scoreRightWrist>0.2){
       circle(rightWristX,rightWristY,20);

       if(rightWristY>0 && rightWristY<=100){
        document.getElementById("speed").innerHTML="speed=0.5x";
        song.rate(0.5);
        
         }

         if(rightWristY>100 && rightWristY <=200){
            document.getElementById("speed").innerHTML="speed=1x";
            song.rate(1);
            
             }

             if(rightWristY>200 && rightWristY<=300){
                document.getElementById("speed").innerHTML="speed=1.5x";
                song.rate(1.5);
                
                 }

                 if(rightWristY>300 && rightWristY<=400){
                    document.getElementById("speed").innerHTML="speed=2x";
                    song.rate(2);
                    
                     }

                     if(rightWristY>400 && rightWristY<=500){
                        document.getElementById("speed").innerHTML="speed=2.5x";
                        song.rate(2.5);
                        
                         }

                         
    }

if(scoreLeftWrist>0.2){
    circle(leftWristX,leftWristY,20);
    inNumberleftWristY=Number(leftWristY);
    remove_decimals=floor(inNumberleftWristY);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="volume = "+volume;
    song.setVolume(volume);

}








}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
