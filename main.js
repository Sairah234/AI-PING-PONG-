game_status = "";
rightWristY = 0;
rightWristX = 0;
scoreRightWrist = 0;

function preload () {}

function setup() {
    canvas = createCanvas(700,700);
    canvas.parent('canvas');

    video = createCapture(VIDEO);
    video.size(700,700);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
} 

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results) 
{
    if(results.length > 0)
    {
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        scoreRightWrist  = results[0].pose.keypoints[10].score;
        console.log(scoreRightWrist);
    }
}

function startGame()
{
    game_status = "start";
    document.getElementById("status").innerHTML = "Game Is Loading"
}

function draw() {
    image(video, 0, 0, 700 ,700);

    if(scoreRightWrist > 0.2) 
    {  
    fill("black");
    stroke("black");
    circle(rightWristX , rightWristY , 29);
    }

    if(startGame == "start")
    {
        document.getElementById("status").innerHTML = "Game Is Loaded";
        
    }
}

