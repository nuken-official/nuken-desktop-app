/*

The various functions are explained in more detail throught the file, but I'll summarize with a little flowchart here.

[.js files in /addons] --> Electron fs reader API --> init_addons() --> load_addon() --> push_addon() 

Find the JS files --> Have Electron read the JS files and pass them onto addons_index --> Each entry in the addons_index array is then loaded and pushed with load_addon and push_addon.

*/


var init_addons = function(){

//get all the files detected upon load via Electron

window.api.addons().then((result) => {
  
for (var i = 0; i < result.length; ++i) {
	
//because index.html is located in a different directory than the /addons directory, we have to go back a bit to find it the actual .js file.
	
var item = addon_direc+result[i];  

addons_index.push(item); //push the file to the addon index
		
load_addon(item); // load the add-on into the workspace, more on that later
		
}
  
});

};


var ready_for_addons = false; // indicates whether nuken is ready to write add-on data to the add-ons menu

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

var push_addon = function(addon){	

/*

nuken displays a "no addons?" message in the add-on menu if no add-ons are detected. If add-ons are detected, nuken removes this message and begins to push add-on icons to the dropdown. 


[Add-on Data] --- > if nuken isn't ready for add-ons, remove "no addons?" message --> ready_for_addons = true;
[Add-on Data] --- > if nuken is ready for add-ons, push the add-on icon to the add-ons menu dropdown. 

Basically, we don't want to wipe the dropdown every single time an add-on is pushed to the menu. We want to wipe it the FIRST time, and if nuken isn't ready for add-ons yet. After the "no addons?" menu is wiped, nuken is ready for add-on input, and ready_for_addons is set to true, keeping this bit of code from running over and over again.

*/
if (!ready_for_addons){
	document.getElementById('addon_selection').innerHTML = "";
		ready_for_addons = true;
}

// The following code checks for the existence of optional properties in the passed object. If the optional property doesn't exist, nuken fills in a placeholder value. However, some properties are required. These aren't checked, as they need to exist already to even get this far.

//you may notice i've used _ in place of . for the property check variables. this is intentional, having new variables we can easily modify the value of sure beats having to re-set the value of a property (that may or may not exist). This would be a headache to figure out (for me). the way i have it is easier i think. source: trust me bro plz


//TITLE 
var addon_title;

if ('title' in addon){
addon_title = addon.title;
} else {
addon_title = 'Add-on';
}


//DESCRIPTION
var addon_description;

if ('description' in addon){
addon_description = addon.description;
} else {
addon_description = "This Add-on has no description. Go bug the developers.";
}


//ICON
var addon_icon;

if ('icon' in addon){
addon_icon = addon.icon;
} else {
//if no icon is found, the icon is set to addon.png in the icons/ directory, where index.html is located.		
addon_icon = "resources/app/src/icons/addon.png";
}



//PIN
var addon_pin;

if ('pin' in addon){
addon_pin = addon.pin;
} else {
//If the value of addon.pin = false, then the display property of the "pin" button is set to none. If it's set to true, this is passed to the display property as well, but since "true" is not a valid property value for display, it's ignored - which is percisely what we want.		
addon_pin = "none";
}

//CREATOR
var addon_creator;

if ('creator' in addon){
addon_creator = addon.creator;
} else {
addon_creator = "Anonymous";
}


//DONATE LINK
var addon_donate;

if ('donate' in addon){
addon_donate = addon.donate;
} else {
//If this property does not exist in the addon object, "none" is passed in its place. This hides the "donate" button, by setting the display value to "none". If addon.donate exists, we don't interfere and modify the value. This passes a URL to the display property for the "donate" button, and since it's an invalid value, it's ignored.

//The donate button is set to open the URL dictated by addon.donate, regardless of its existence or value. If addon.donate doesn't exist, it'll probably open a blank page - but since "none" is passed as the display value when this is the case, you won't see the broken button.
addon_donate = "none";
}

//LINK / CREATOR WEBSITE
var addon_link;

if ('link' in addon){
addon_link = addon.link;
} else {
//For all intents and purposes, the link button is a clone of the donate button. Same logic applies as above - basically, if addon.link exists, show the button, if not, hide the broken button.
addon_link = "none";
}

//ONLINE STATUS
var addon_online;

if ('online' in addon){
addon_online = addon.online;
} else {
//If an Add-on creator doesn't want to spend the time to make an "add-on is offline, please connect to the internet" screen for when nuken is offline and they need to connect to the internet, we can handle this for them. Basically, if this is set to true, the add-on can only be used online and the related function below is executed. If it doesn't exist, or is set to false, obviously the add-on can be	used offline, and the related function below is ignored.
addon_online = false;
}


//VERSION
var addon_version;

if ('version' in addon){
addon_version = addon.version;
} else {
//If no version info is provided, a blank string is written to the page in its place.	
addon_version = '';
}

//SHOP ID

//Right now, shop ids are a bit problematic, as they currently have no value. We hand them out to people who've listed their content on the nuken Shop, which right now is just first-party content so it doesn't really matter. but right now we don't have a way for that ID to translate to an actual shop listing. However, in the past we've accomplished this just fine, so it's just a matter of implementing it again. But since we haven't handed out any IDs yet, we're fine.
var addon_shop_id;

if ('shop_id' in addon){
addon_shop_id = addon.shop_id;
} else {
//The shop listing button works the same as the display and link buttons. I'm not explaining it again. Cry about it
addon_shop_id = "none";
}

//FULLSCREEN SETTING
var addon_fullscreen;

//addon.fullscreen can be set to either true or false, and if true, this overrides the values of addon.resize, addon.width, and addon.height; in a related function below.

if ('fullscreen' in addon){
addon_fullscreen = addon.fullscreen;
} else {		
addon_fullscreen = false;
}

//ADDON WINDOW WIDTH IN PIXELS
var addon_width;

if ('width' in addon){
addon_width = addon.width+"px";
} else {
addon_width = "auto";
}

//ADDON WINDOW HEIGHT IN PIXELS

var addon_height;

if ('height' in addon){
addon_height = addon.height+"px";
} else {
addon_height = "auto";
}

//ADDON RESIZE

var addon_resize;

if ('resize' in addon){
addon_resize = addon.resize;
} else {

//If addon.resize doesn't exist, set addon_resize to false. In the related function below, this boolean value is used.
addon_resize = false;
}

//if addon_resize = true, the addon window is resizable ONLY horizontally, as dictated by the CSS resize property.

if (addon_resize) {
addon_resize = "horizontal";
} else {
addon_resize = "none";
}	

// if addon_fullscreen = true, then none of the resize, width, or height values matter. the window takes up all available space.

if (addon_fullscreen) {
addon_resize = "none";
addon_width = "auto";
addon_height = "auto";
}


/* write the addon to the add-on menu dropdown. here's an example element, minus the UIkit class names.

<img ondragend="pin_addon(<ADDON CODENAME>)" id="<ADDON CODENAME>_icon" uk-toggle="" target="#<ADDON CODENAME>_page" src="../../../<ADDON ICON>">

*/

document.getElementById('addon_selection').innerHTML += `<img ondragend = "pin_addon(`+addon.codename+`)" id = '`+addon.codename+`_icon' class='uk-width-expand' uk-toggle target = '#`+addon.codename+`_page' src = '`+addon_direc+addon_icon+`'></img>`;

//write the actual add-on to its own window. here, we generate a brand new UIkit modal in the div #addon_sandbox, where all the add-on windows are written. All of the attributes we defined above are written or attributed to this new add-on window modal div thingy.

document.getElementById('addon_sandbox').innerHTML += `

<div  id="`+addon.codename+`_page" class = "addon_page" uk-modal >
    <div id = "`+addon.codename+`_modal_outer" class="uk-modal-dialog uk-modal-body" style = "resize:`+addon_resize+`;width:`+addon_width+`;height:`+addon_height+`;">
	
	<div id = "`+addon.codename+`_modal_inner" >
	
        <h2><img src = "`+addon_direc+addon_icon+`"></img><span>`+addon_title+`</span> <span style = "opacity:40%">`+addon_version+`</span></h2>
		<div class = "addon_bar">
		<button onclick = "refresh_frame('`+addon.codename+`_frame')"><i class="ri-restart-line"></i> <span>Reload</span></button>
		<button ><i class="ri-information-line"></i> <span>Info</span></button>
		
		<div uk-drop="mode: click">
        <div class="uk-card uk-card-body uk-card-default">
		
			<h3><i class="ri-user-smile-fill"></i> <span>Creator</span></h3> <hr> <p>`+addon_creator+`</p>
			<h3><i class="ri-file-text-fill"></i> <span>Description</span></h3> <hr> <p>`+addon_description+`</p>
			<br>
			<button class = "addon_page_button" style = "display:`+addon_link+`" onclick = "popup_sound.currentTime = 0;popup_sound.play();window.open('`+addon.link+`','_blank')"><i class="ri-global-line"></i> <span>Creator website</span></button>
			<button class = "addon_page_button" style = "display:`+addon_donate+`" onclick = "popup_sound.currentTime = 0;popup_sound.play();window.open('`+addon.donate+`','_blank')"  ><i class="ri-hand-heart-fill"></i> <span>Donate</span></button>
			<button class = "addon_page_button" style = "display:`+addon_shop_id+`" onclick = "visit_shop('`+addon.shop_id+`')" ><i class="ri-shopping-bag-fill"></i> <span>Shop listing</span></button>


        </div>
    </div>
		
		<button class = "pin_button" style = "display:`+addon_pin+`" id = "`+addon.codename+`_pin_activate" onclick = "pin_addon(`+addon.codename+`)" ><i class="ri-pushpin-line"></i> <span>Pin</span></button>
		<button id = "`+addon.codename+`_close_button" class="uk-modal-close" type="button"><i class="ri-check-fill"></i> <span>I'm done here</span></button>
		</div>
<iframe id = "`+addon.codename+`_frame" src="`+addon_direc+addon.index+`" ></iframe>
</div>
</div>
</div>

`;

//if no value was provided for addon.pin, or it was set to false, addon_pin was set to "none". this is reflected here. no pinning the add-on plz.

if (addon_pin == "none"){
document.getElementById(addon.codename+"_icon").setAttribute('draggable', false);
}

//if the addon creator set their addon.online to true, addon_online will have been set to true. if THIS is the case, if nuken is offline, write the addon_text to the element "<ADDON CODENAME>_modal_inner" (the inside of the addon window in question). This wipes everything from the window unfortunately, so we have to rewrite the close button to the window.

if (addon_online){

if (!navigator.onLine){
document.getElementById(addon.codename+"_modal_inner").innerHTML = addon_text;
document.getElementById(addon.codename+"_modal_outer").style.width = "100%";
document.getElementById(addon.codename+"_modal_outer").style.height = "100%";
document.getElementById(addon.codename+"_modal_inner").innerHTML += `
<button id = "`+addon.codename+`_close_button" class="uk-modal-close" style = "float:right;display:inline-block;margin:0px" type="button"><i class="ri-check-fill"></i> <span>I'm done here</span></button>
`;
}

}
	
};


//stupid little refresh function. works, don't question it lmao
var refresh_frame = function(frame){

success_1.currentTime = 0;
success_1.play();
document.getElementById(frame).src = document.getElementById(frame).src;

};


//this was an attempt as the whole "shopID" system, idk if i'm going to run with it or now. it doesn't really work ¯\_(ツ)_/¯

var visit_shop = function(shopid){
		
var modal = UIkit.modal('#shop_page');
modal.toggle();	

document.getElementById('shop_frame').src = "https://nuken.xyz/shop/directory/addons.html#ad_"+shopid.toString();

};

var pin_addon = function(addon){
	
	//if the pin button says "pinned", that means the addon is already pinned. don't pin it again, and don't let the user drag the icon to pin it.
	
if (document.getElementById(addon.codename+"_pin_activate").innerHTML.toString().toLowerCase().includes('pinned')){
	document.getElementById(addon.codename+"_icon").setAttribute('draggable', false);
}	else {
	
disable_sound.currentTime = 0;
disable_sound.play();

// here, we do another series of checks for optional properties a pinned add-on needs. there are explained above in load_addon(), so go read those.


//TITLE
var addon_title;

if ('title' in addon){
addon_title = addon.title;
} else {
addon_title = 'Add-on';
}


//DESCRIPTION
var addon_description;

if ('description' in addon){
addon_description = addon.description;
} else {
addon_description = "This Add-on has no description. Go bug the developers.";
}


//ICON
var addon_icon;

if ('icon' in addon){
addon_icon = addon.icon;
} else {
addon_icon = "resources/app/src/icons/addon.png";
}

//DONATE LINK
var addon_donate;

if ('donate' in addon){
addon_donate = addon.donate;
} else {
addon_donate = "none";
}

//VISIT WEBSITE LINK
var addon_link;

if ('link' in addon){
addon_link = addon.link;
} else {
addon_link = "none";
}


//SHOP ID THING THAT DOESN'T WORK
var addon_shop_id;

if ('shop_id' in addon){
addon_shop_id = addon.shop_id;
} else {
addon_shop_id = "none";
}

//If you open DevTools, you'll see that nuken is split into some organizational divs. this div ('#menus') is where all the menus are written to, and where we'll write our draggable mini pinned addon thingy. 


document.getElementById('menus').innerHTML+= `
<div onmouseleave = "window.location.replace('#')" id = "`+addon.codename+`_pin" class = "addon_pin">
<img id = "`+addon.codename+`_pin_icon" src = "`+addon_direc+addon_icon+`"></img>
<iframe id = "`+addon.codename+`_pin_frame" src = '`+addon_direc+addon.index+`'></iframe>
<div id = "`+addon.codename+`_pin_menu" class = "addon_pin_menu">
<i onclick = "unpin_addon('`+addon.codename+`_pin')" class="ri-close-fill"></i>
<div style= "float:right">
<i onclick = "refresh_frame('`+addon.codename+`_pin_frame')" class="ri-refresh-line"></i>
<i onclick = "toggle_pinned_addon(`+addon.codename+`)" class="ri-indeterminate-circle-line"></i>
<i class="ri-information-line"></i>
		<div uk-drop="mode: click">
        <div class="uk-card uk-card-body uk-card-default">
		
			<button class = "addon_page_button" style = "display:`+addon_link+`" onclick = "popup_sound.currentTime = 0;popup_sound.play();window.open('`+addon_link+`','_blank')"><i class="ri-global-line"></i> <span>Creator website</span></button>
			<button class = "addon_page_button" style = "display:`+addon_donate+`" onclick = "popup_sound.currentTime = 0;popup_sound.play();window.open('`+addon_donate+`','_blank')"  ><i class="ri-hand-heart-fill"></i> <span>Donate</span></button>
			<button class = "addon_page_button" style = "display:`+addon_shop_id+`" onclick = "visit_shop('`+addon_shop_id+`')" ><i class="ri-shopping-bag-fill"></i> <span>Shop listing</span></button>


        </div>
    </div>
</div>
</div>
<i onclick = "toggle_pinned_addon(`+addon.codename+`)" id = "`+addon.codename+`_pin_maximize_button" class="addon_maximize_button ri-add-circle-line"></i>
</div>

`;

//change the "pin" button to "pinned"

document.getElementById(addon.codename+"_pin_activate").style.opacity = "50%";
document.getElementById(addon.codename+"_pin_activate").style.pointerEvents = "none";
document.getElementById(addon.codename+"_pin_activate").innerHTML = '<i class="ri-pushpin-line"></i> <span>Pinned</span>';


//set the bounds for this draggable, pinned add-on: pinned add-ons can only be dragged around the bounds of the div #workspace. the user's cursor is set to the "grabbing" state when dragging.

$( function() {
    $( "#"+addon.codename+"_pin" ).draggable({
	
	cursor:"grabbing",
	containment:'#workspace'
	
	});
  } );


$(".addon_pin_menu i").click(function(e) {
        e.stopPropagation();
   });


document.getElementById(addon.codename+"_close_button").click();	

}
};


var toggle_pinned_addon = function(addon){

// is the add-on pinned (minimized)? SORRY FOR THE HORRIBLE TERMINOLOGY LMAO, I DID THIS ALL BY MYSELF PLZ DON'T KILL ME
var ispinned = document.getElementById(addon.codename+"_pin").pinned;


if(ispinned){


//if the pinned add-on is minimized, maximize it.

open_sound.currentTime = 0;	
open_sound.play();	
	
// set some attributes 

document.getElementById(addon.codename+"_pin").style.width = "45vmin";
document.getElementById(addon.codename+"_pin_menu").style.display = "block";
	
document.getElementById(addon.codename+"_pin_icon").style.width = "5vmin";
document.getElementById(addon.codename+"_pin_icon").style.margin = "unset";
document.getElementById(addon.codename+"_pin_icon").style.padding = "1vmin";
document.getElementById(addon.codename+"_pin_icon").style.transform = "scale(1)";	
	
document.getElementById(addon.codename+"_pin_maximize_button").style.display = "none";	
	
document.getElementById(addon.codename+"_pin").pinned = false;
} else {
//if the pinned add-on is maximized, minimize it.		

close_sound.currentTime = 0;	
close_sound.play();	

// set some attributes

document.getElementById(addon.codename+"_pin").style.width = "7.5vmin";
document.getElementById(addon.codename+"_pin_menu").style.display = "none";

document.getElementById(addon.codename+"_pin_icon").style.width = "100%";
document.getElementById(addon.codename+"_pin_icon").style.margin = "0px";
document.getElementById(addon.codename+"_pin_icon").style.padding = "0px";
document.getElementById(addon.codename+"_pin_icon").style.transform = "scale(0.8)";


document.getElementById(addon.codename+"_pin_maximize_button").style.display = "block";	

document.getElementById(addon.codename+"_pin").pinned = true;

}

};  


var unpin_addon = function(addon){
	
//this does not hide the pinned add-on, it deletes the element entirely.
	
trash_sound.currentTime = 0;
trash_sound.play();	

document.getElementById(addon).style.transform = "scale(0.95)";
document.getElementById(addon).style.opacity = "0%";
document.getElementById(addon).style.pointerEvents = "none";

//reset pin button, making it an option again

document.getElementById(addon+"_activate").style.opacity = "100%";
document.getElementById(addon+"_activate").style.pointerEvents = "auto";
document.getElementById(addon+"_activate").innerHTML = '<i class="ri-pushpin-line"></i> <span>Pin</span>';


setTimeout(function(){
document.getElementById(addon).remove();
},500);

};


  





