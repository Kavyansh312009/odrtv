status1 = "";
video = "";
objects= [];

function preload(){
    video= createVideo('video.mp4');
}
function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video.hide();
}
function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detcting Objects";
}
function modelLoaded(){
    console.log("hehe BOI!");
    status1 = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResults(error, results){
    if(error){
        console.log(error);
    }console.log(results);
    objects = results;
}
function draw(){
    image(video,0,0,480,380);
    if(status1 == true){
        objectDetector.detect(video,gotResults);
        for(K = 0; K < objects.length; K++){
            document.getElementById("status").innerHTML = "Status: Objects detected";
            document.getElementById("no._of_obj").innerHTML = "No. of Objects detected are: "+objects.length;

            fill("deepskyblue");
            percent = floor(objects[K].confidence * 100);
            text(objects[K].label + "" + percent + "%", objects[K].x + 15, objects[K].y + 15);
            noFill("");
            stroke("gold");
            rect(objects[K].x, objects[K].y, objects[K].width, objects[K].height);
        }
}
}