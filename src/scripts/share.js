var share_menu_is_open = true; //indicates whether the Share Menu is open or not.


//write a preview to the snapshot preview area
var write_preview = function(){

if (share_menu_is_open){
	snap_sound.currentTime = 0;
snap_sound.play();

 //When the user creates a snapshot and the menu is OPEN, the camera shutter sound plays. However, since we don't want the shutter sound to play if the user isn't actually in the menu, we detect whether it's open or not first. (Remember, when the user hits the play button, a snapshot is automatically generated).

}

//clear previous snapshot
document.getElementById('share_project_container').innerHTML = "";


//show the save / copy button container
document.getElementById('share_project_bar').style.display = "block";


//here, we create a (hidden) iframe based on the project currently being previewed in the preview area (taking a snapshot of the preview area doesn't work - we need to create a new iframe e can manipulate for this to work. trust me bro). Then, we use html2canvas to take a snapshot of this iframe, and display the result to the user.

var iframe = document.createElement('iframe');

document.getElementById('share_project_container').appendChild(iframe);
iframe.id = "share_frame";

iframe.contentWindow.document.open();

iframe.contentWindow.document.write(saved_project);


const element = iframe.contentWindow.document.documentElement;

html2canvas(element).then(canvas => {
	document.getElementById('share_project_container').innerHTML = "";
	document.getElementById('share_project_container').appendChild(canvas);
});


  };
  
//copy the current snapshot 
var copy_preview = function(){

enable_sound.currentTime = 0;
enable_sound.play();

//the copy button changes on success, then reverts back
document.getElementById('copy_project_share').classList.remove('ri-checkbox-multiple-blank-line');
document.getElementById('copy_project_share').classList.add('ri-checkbox-multiple-fill');

setTimeout(function(){
	document.getElementById('copy_project_share').classList.add('ri-checkbox-multiple-blank-line');
document.getElementById('copy_project_share').classList.remove('ri-checkbox-multiple-fill');
},1000);


//write the image blob to the user's clipboard
var canvas = document.querySelector("canvas");	
canvas.toBlob(function(blob) { 
    const item = new ClipboardItem({ "image/png": blob });
    navigator.clipboard.write([item]); 
});



};  

//download the current snapshot
var download_preview= function(){
enable_sound.currentTime = 0;
enable_sound.play();
var canvas = document.querySelector("canvas");
  image = canvas.toDataURL("image/png");
  var link = document.createElement('a');
  link.download = "My Project.png";
  link.href = image;
  link.click();
  
  };
  