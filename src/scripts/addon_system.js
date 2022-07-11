var loaded_addons = [];

var init_addons = function(){

window.api.addons().then((result) => {
  
for (var i = 0; i < result.length; ++i) {
    var item = "addons/"+result[i];  

		addons_index.push(item);
		
		
		
		load_addon(item);
		
		


}

  
});

};


var ready_for_addons = false;

var push_addon = function(addon){	

if (!ready_for_addons){
	document.getElementById('addon_selection').innerHTML = "";
		ready_for_addons = true;
}

var resizable = "none";

var dimensions = "";

var description = "";

if ('description' in addon) {
description = addon.description;
} else {
description = "This Add-on has no description.";
}

var creator = "";

if ('creator' in addon) {
creator = addon.creator;
} else {
creator = "Anonymous";
}

var link_display = "none";

if ('link' in addon) {
link_display = "block";
}

var donate_display = "none";

if ('donate' in addon) {
donate_display = "block";
}

var shop_display = "none";

if ('shop_id' in addon) {
shop_display = "block";
}

var icon = "";

if ('icon' in addon) {
icon = "addons/"+addon.icon;
} else {
icon = "icons/addon.png";
}

var title = "";

if ('title' in addon) {
title = addon.title;
} else {
title = "Add-on by "+creator;
}


if (!addon.fullscreen){
 dimensions = "width:"+addon.width+"px;height"+addon.height+"px";
}


if (addon.resizable){
resizable = "horizontal";
}

document.getElementById('addon_selection').innerHTML += `<img ondragend = "pin_addon(`+addon.codename+`)" id = '`+addon.codename+`_icon' class='uk-width-expand' uk-toggle target = '#`+addon.codename+`_page' src = '`+icon+`'></img>`;

document.getElementById('addon_sandbox').innerHTML += `

<div  id="`+addon.codename+`_page" class = "addon_page" uk-modal >
    <div class="uk-modal-dialog uk-modal-body" style = "resize:`+resizable+`;`+dimensions+`">
        <h2><img src = "`+icon+`"></img><span>`+title+`</span> <span style = "opacity:40%">`+addon.version+`</span></h2>
		<div class = "addon_bar">
		<button onclick = "refresh_frame('`+addon.codename+`_frame')"><i class="ri-restart-line"></i> <span>Reload</span></button>
		<button ><i class="ri-information-line"></i> <span>Info</span></button>
		
		<div uk-drop="mode: click">
        <div class="uk-card uk-card-body uk-card-default">
		
			<h3><i class="ri-user-smile-fill"></i> <span>Creator</span></h3> <hr> <p>`+creator+` | `+addon.version+`</p>
			<h3><i class="ri-file-text-fill"></i> <span>Description</span></h3> <hr> <p>`+description+`</p>
			<br>
			<button class = "addon_page_button" style = "display:`+link_display+`" onclick = "popup_sound.currentTime = 0;popup_sound.play();window.open('`+addon.link+`','_blank')"><i class="ri-global-line"></i> <span>Creator website</span></button>
			<button class = "addon_page_button" style = "display:`+donate_display+`" onclick = "popup_sound.currentTime = 0;popup_sound.play();window.open('`+addon.donate+`','_blank')"  ><i class="ri-hand-heart-fill"></i> <span>Donate</span></button>
			<button class = "addon_page_button" style = "display:`+shop_display+`" onclick = "visit_shop('`+addon.shop_id+`')" ><i class="ri-shopping-bag-fill"></i> <span>Shop listing</span></button>


        </div>
    </div>
		
		<button class = "pin_button" id = "`+addon.codename+`_pin_activate" onclick = "pin_addon(`+addon.codename+`)" ><i class="ri-pushpin-line"></i> <span>Pin</span></button>
		<button id = "`+addon.codename+`_close_button" class="uk-modal-close" type="button"><i class="ri-check-fill"></i> <span>I'm done here</span></button>
		</div>
<iframe id = "`+addon.codename+`_frame" src="addons/`+addon.index+`" ></iframe>

</div>
</div>

`;
	
};


var load_addon = function(url){
	
$.getScript(url, function(){
    //script loaded and parsed
	
}).fail(function(){
    if(arguments[0].readyState==0){
        //script failed to load
		
		notify('Your nuken Add-on at <a href = "'+url+'" target = "_blank">this location</a> failed to load.');

    }else{

    }
});
};


function replaceAll(str, find, replace) {
    var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, 'g'), replace);

}

var refresh_frame = function(frame){

success_1.currentTime = 0;
success_1.play();
document.getElementById(frame).src = document.getElementById(frame).src;

};


var visit_shop = function(shopid){
		
var modal = UIkit.modal('#shop_page');
modal.toggle();	

document.getElementById('shop_frame').src = "https://nuken.xyz/shop/directory/addons.html#ad_"+shopid.toString();

};

var pin_addon = function(addon){
	
if (document.getElementById(addon.codename+"_pin_activate").innerHTML.toString().toLowerCase().includes('pinned')){
	document.getElementById(addon.codename+"_icon").setAttribute('draggable', false);
}	else {
	
disable_sound.currentTime = 0;
disable_sound.play();
	
	document.getElementById(addon.codename+"_icon").setAttribute('draggable', true);

document.getElementById('menus').innerHTML+= `
<div onmouseleave = "window.location.replace('#')" id = "`+addon.codename+`_pin" class = "addon_pin">
<img id = "`+addon.codename+`_pin_icon" src = "addons/`+addon.icon+`"></img>
<iframe id = "`+addon.codename+`_pin_frame" src = 'addons/`+addon.index+`'></iframe>
<div id = "`+addon.codename+`_pin_menu" class = "addon_pin_menu">
<i onclick = "unpin_addon('`+addon.codename+`_pin')" class="ri-close-fill"></i>
<div style= "float:right">
<i onclick = "refresh_frame('`+addon.codename+`_pin_frame')" class="ri-refresh-line"></i>
<i onclick = "minimize_addon('`+addon.codename+`_pin')" class="ri-indeterminate-circle-line"></i>
<i class="ri-information-line"></i>
		<div uk-drop="mode: click">
        <div class="uk-card uk-card-body uk-card-default">
		
			<h3><i class="ri-user-smile-fill"></i> <span>Creator</span></h3> <hr> <p>`+addon.creator+` | `+addon.version+`</p>
			<h3><i class="ri-file-text-fill"></i> <span>Description</span></h3> <hr> <p>`+addon.description+`</p>
			<br>
			<button class = "addon_page_button" style = "display:`+addon.link+`" onclick = "popup_sound.currentTime = 0;popup_sound.play();window.open('`+addon.link+`','_blank')"><i class="ri-global-line"></i> <span>Creator website</span></button>
			<button class = "addon_page_button" style = "display:`+addon.donate+`" onclick = "popup_sound.currentTime = 0;popup_sound.play();window.open('`+addon.donate+`','_blank')"  ><i class="ri-hand-heart-fill"></i> <span>Donate</span></button>
			<button class = "addon_page_button" style = "display:`+addon.shop_id+`" onclick = "visit_shop('`+addon.shop_id+`')" ><i class="ri-shopping-bag-fill"></i> <span>Shop listing</span></button>


        </div>
    </div>
</div>
</div>
<i id = "`+addon.codename+`_pin_maximize_button" class="addon_maximize_button ri-add-circle-line"></i>
</div>

`;

document.getElementById(addon.codename+"_pin_activate").style.opacity = "50%";
document.getElementById(addon.codename+"_pin_activate").style.pointerEvents = "none";
document.getElementById(addon.codename+"_pin_activate").innerHTML = '<i class="ri-pushpin-line"></i> <span>Pinned</span>';


document.getElementById(addon.codename+"_pin_maximize_button").onclick = function(){
document.getElementById(addon.codename+"_pin").dispatchEvent(doubleclick);
};


$( function() {
    $( "#"+addon.codename+"_pin" ).draggable({
	
	cursor:"grabbing",
	containment:'#workspace'
	
	});
  } );
  

  
document.getElementById(addon.codename+"_pin").ondblclick = function(){

var ispinned = document.getElementById(addon.codename+"_pin").getAttribute('pinned');


if(ispinned){

//unminimize

open_sound.currentTime = 0;	
open_sound.play();	
	
document.getElementById(addon.codename+"_pin").style.width = "45vmin";
document.getElementById(addon.codename+"_pin_menu").style.display = "block";
	
document.getElementById(addon.codename+"_pin_icon").style.width = "5vmin";
document.getElementById(addon.codename+"_pin_icon").style.margin = "unset";
document.getElementById(addon.codename+"_pin_icon").style.padding = "1vmin";
document.getElementById(addon.codename+"_pin_icon").style.transform = "scale(1)";	
	
document.getElementById(addon.codename+"_pin_maximize_button").style.display = "none";	
	
 document.getElementById(addon.codename+"_pin").setAttribute("pinned",false);
} else {
		
 document.getElementById(addon.codename+"_pin").setAttribute("pinned",true);
}

};

$(".addon_pin_menu i").click(function(e) {
        e.stopPropagation();
   });


document.getElementById(addon.codename+"_close_button").click();	

}
};

var unpin_addon = function(addon){
	
trash_sound.currentTime = 0;
trash_sound.play();	

document.getElementById(addon).style.transform = "scale(0.95)";
document.getElementById(addon).style.opacity = "0%";
document.getElementById(addon).style.pointerEvents = "none";

document.getElementById(addon+"_activate").style.opacity = "100%";
document.getElementById(addon+"_activate").style.pointerEvents = "auto";
document.getElementById(addon+"_activate").innerHTML = '<i class="ri-pushpin-line"></i> <span>Pin</span>';


setTimeout(function(){
document.getElementById(addon).remove();
},500);

};

var minimize_addon = function(addon){
	
close_sound.currentTime = 0;	
close_sound.play();	
//minimize
document.getElementById(addon).style.width = "7.5vmin";
document.getElementById(addon+"_menu").style.display = "none";

document.getElementById(addon+"_icon").style.width = "100%";
document.getElementById(addon+"_icon").style.margin = "0px";
document.getElementById(addon+"_icon").style.padding = "0px";
document.getElementById(addon+"_icon").style.transform = "scale(0.8)";


document.getElementById(addon+"_maximize_button").style.display = "block";

 document.getElementById(addon).setAttribute("pinned",true);
};

var doubleclick = new MouseEvent('dblclick', {
    'view': window,
    'bubbles': true,
    'cancelable': true
  });
  





