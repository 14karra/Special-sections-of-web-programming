
let fileLoad = document.getElementById("file-input");
let audioContainer = document.getElementsByClassName("audio-container");
let audioPlayer = document.getElementById("audio-player");
let playlist = document.getElementById("playlist");
let progressBar = document.getElementById("progressBar");
let currTime = document.getElementById("currentTime");
let durationTime = document.getElementById("audioDuration");

let playPauseButton = document.getElementById("playPauseControl");
let muteButton = document.getElementById("muteButton");
let volumeScale = document.getElementById("volumeScale");
let speedSelect = document.getElementById("audioSpeed");
let prevAudio = document.getElementById("prevAudio");
let nextAudio = document.getElementById("nextAudio");
let prevTime = document.getElementById("prevTime");
let nextTime = document.getElementById("nextTime");
playlist.addEventListener("click",clickPlaylist);
playPauseButton.addEventListener("click",audioPlayStop);
audioPlayer.addEventListener("click",audioPlayStop);

progressBar.addEventListener("click",audioChangeTime);
volumeScale.addEventListener("change",audioChangeVolume);
muteButton.addEventListener("click",audioMute);
speedSelect.addEventListener("change",audioChangeSpeed);
fileLoad.addEventListener("change",fileAudio);
prevAudio.addEventListener("click",prevOrNextSong);
nextAudio.addEventListener("click",prevOrNextSong);
prevTime.addEventListener("click",nextOrPrevTime);
nextTime.addEventListener("click",nextOrPrevTime);
document.addEventListener('keydown', function(event) {
    if(event.key === keys.a||event.key===keys.A) {
        prevOrNextSong("prevAudio");
    }
    if(event.key === keys.d||event.key===keys.D) {
        prevOrNextSong("nextAudio");
    }
    if(event.key === keys.RIGHT){
        audioPlayer.currentTime += 1;
    }
    if(event.key === keys.LEFT){
        audioPlayer.currentTime -= 1;
    }
    if(event.key === keys.UP){
        let volume = Number(volumeScale.value);
        if(volume!==100)
        {
            volumeScale.value = volume + 2 > 100 ?  100 : volume + 2;
            audioChangeVolume();
        }
    }
    if(event.key === keys.DOWN){
        let volume = Number(volumeScale.value);
        if(volume!==0)
        {
            volumeScale.value = volume - 2 < 0 ?  0 : volume - 2;
            audioChangeVolume();
        }
    }
    
});
function nextOrPrevTime(e) {
    if(e.target.id==="prevTime")
    {
        if(Number(audioPlayer.currentTime)>volumeJump)
        {
            audioPlayer.currentTime -= volumeJump;
        } else {audioPlayer.currentTime = 0; }
        
    }
    if(e.target.id==="nextTime")
    {
        if(Number(audioPlayer.duration)-Number(audioPlayer.currentTime)>volumeJump)
        {
            audioPlayer.currentTime += volumeJump;
        } else {audioPlayer.currentTime = 0; }
    }
}
onload = new function(){
    loadPlaylist();
};
function fileAudio(){
    let item = URL.createObjectURL(fileLoad.files[0]);
    dataSrc.push(item);
    URL.revokeObjectURL(fileLoad.files[0]);
    let li = document.createElement('li');
    let span = document.createElement('span');
    span.setAttribute('data-src',item);
    span.setAttribute('class',"audio-control");
    span.innerHTML = fileLoad.value.replace(/.*((?=\\)|(?=\/))./,'');
    let buttonDelete = document.createElement('span');
    buttonDelete.className = "audio-control glyphicon glyphicon-trash";
    buttonDelete.onclick = musicDelete;
    li.append(span);
    li.append(buttonDelete);
    document.getElementById("list").appendChild(li);
}
function prevOrNextSong(e) {
    if(dataSrc.length===0) { alert("The list is empty! Please load audio files."); return;}
    let sources = document.querySelectorAll("audio");
    audioPlayer = document.getElementById("audio-player");
    let index;
    let targetId = isNaN(e.target)? e : e.target.id;
    for(let i=0;i<dataSrc.length;i++)
    {
        if(sources[0].getAttribute("src")===dataSrc[i])
        {
            index = i;
            break;
        }
    }
    if(targetId==="prevAudio")
    {
        if(index===0){ index= dataSrc.length-1; } else { index -= 1; }
        
    } else 
    {
        if(index===dataSrc.length-1) { index=0; } else { index += 1; }
        
    }
    sources[0].remove();
    let audio = document.createElement("audio");
    audio.className = "audio-player";
    audio.id = "audio-player";
    audio.src = dataSrc[index];
    audioContainer[0].append(audio);
    audioPlayer = document.getElementById("audio-player");
    audioPlayer.addEventListener('timeupdate',audioProgress);
    audioPlayer.play();
    audioPlayer.oncanplay = function(){
        durationTime.innerHTML = audioTime(audioPlayer.duration);
        playPauseButton.setAttribute('class','audio-control playPauseControl glyphicon glyphicon-play');
        audioChangeVolume();
        audioChangeSpeed();
    }
}
function musicDelete(e){
    if (e.target.nodeName === 'SPAN'){
        dataSrc.splice(e.target.value,1);
        e.target.closest('li').remove();
    }
}

function loadPlaylist(){
    let ul = document.createElement('ul');
    ul.id = "list";
    for(let i=0;i<dataSrc.length;i++)
    {
        let li = document.createElement('li');
        let span = document.createElement('span');
        span.setAttribute('data-src',dataSrc[i]);
        span.setAttribute('class',"audio-control");
        span.innerHTML = dataSrc[i].replace(/.*((?=\\)|(?=\/))./,'');
        let buttonDelete = document.createElement('span');
        buttonDelete.value = i;
        buttonDelete.className = "audio-control glyphicon glyphicon-trash";
        buttonDelete.onclick = musicDelete;
        li.append(span);
        li.append(buttonDelete);
        ul.append(li);
    }
    playlist.append(ul);
}
function clickPlaylist(e){
    audioPlayer = document.getElementById('audio-player');
    let esrc = e.target.getAttribute('data-src');
    let sources = document.querySelectorAll('audio');
    if(sources.length!==0)
    {
        if(sources[0].getAttribute('src')===esrc)
        {
            return;
        } else {
            sources[0].remove();
        }
    }
    let audio = document.createElement('audio');
    audio.className = "audio-player";
    audio.id = "audio-player";
    audio.src = esrc;
    audioContainer[0].append(audio);
    audioPlayer = document.getElementById('audio-player');
    audioPlayer.addEventListener('timeupdate',audioProgress);
    audioPlayer.play();
    audioPlayer.oncanplay = function(){
        durationTime.innerHTML = audioTime(audioPlayer.duration);
        playPauseButton.setAttribute('class','audio-control playPauseControl glyphicon glyphicon-play');
        audioChangeVolume();
        audioChangeSpeed();
    }
}
function audioPlayStop() {
    if(audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.setAttribute('class','audio-control playPauseControl glyphicon glyphicon-play');
    } else {
        audioPlayer.pause();
        playPauseButton.setAttribute('class','audio-control playPauseControl glyphicon glyphicon-pause');
    }

    if(durationTime.innerHTML === '00:00') {
    durationTime.innerHTML = audioTime(audioPlayer.duration);
    }

}
function audioTime(time) {
    time = Math.floor(time);
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);
    let minutesVal = minutes;
    let secondsVal = seconds;
    if(minutes < 10) {
        minutesVal = '0' + minutes;
    }
    if(seconds < 10) {
        secondsVal = '0' + seconds;
    }
    return minutesVal + ':' + secondsVal;
}
function audioProgress() {
    let progress = (Math.floor(audioPlayer.currentTime) / (Math.floor(audioPlayer.duration) / 100));
    if(isNaN(progress)){ 
        progress = 0.0;
    }
    progressBar.value = progress;
    currTime.innerHTML = audioTime(audioPlayer.currentTime);
}
function audioChangeTime(e) {
    let progress;
    if(isNaN(e.pageX)){
        let progress = (Math.floor(audioPlayer.currentTime) / (Math.floor(audioPlayer.duration) / 100));
        audioPlayer.currentTime = audioPlayer.duration * (progress / 100);
    } else {
        let mouseX = Math.floor(e.pageX - progressBar.offsetLeft);
        progress = mouseX / (progressBar.offsetWidth / 100);
        audioPlayer.currentTime = audioPlayer.duration * (progress / 100);
    }
    
}
function audioChangeVolume() {
    audioPlayer.volume = volumeScale.value / 100;
    if(audioPlayer.volume === 0) {
        muteButton.setAttribute('class','audio-control muteButton glyphicon glyphicon-volume-off');
    } else {
        muteButton.setAttribute('class','audio-control muteButton glyphicon glyphicon-volume-up');
    }
}
function audioChangeSpeed() {
    audioPlayer.playbackRate = speedSelect.value / 100;
}
function audioMute() {
    if(audioPlayer.volume === 0) {
        audioPlayer.volume = volumeScale.value / 100;
        muteButton.setAttribute('class','audio-control muteButton glyphicon glyphicon-volume-up');
    } else {
        audioPlayer.volume = 0;
        muteButton.setAttribute('class','audio-control muteButton glyphicon glyphicon-volume-off');
    }
}