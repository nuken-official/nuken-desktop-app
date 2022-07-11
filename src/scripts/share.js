var share_menu_is_open = true;

var write_preview = function(){

if (share_menu_is_open){
	snap_sound.currentTime = 0;
snap_sound.play();
}

document.getElementById('share_project_container').innerHTML = "";

document.getElementById('share_project_bar').style.display = "block";

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
  
  
var copy_preview = function(){

enable_sound.currentTime = 0;
enable_sound.play();

document.getElementById('copy_project_share').classList.remove('ri-checkbox-multiple-blank-line');
document.getElementById('copy_project_share').classList.add('ri-checkbox-multiple-fill');

setTimeout(function(){
	document.getElementById('copy_project_share').classList.add('ri-checkbox-multiple-blank-line');
document.getElementById('copy_project_share').classList.remove('ri-checkbox-multiple-fill');
},1000);

var canvas = document.querySelector("canvas");	
canvas.toBlob(function(blob) { 
    const item = new ClipboardItem({ "image/png": blob });
    navigator.clipboard.write([item]); 
});



};  

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
  