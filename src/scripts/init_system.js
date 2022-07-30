var remember_workspace = false;

var init_remember_workspace = function(){

if (remember_workspace){
disable_sound.currentTime = 0;	
disable_sound.play();	
remember_workspace = false;
} else {
enable_sound.currentTime = 0;	
enable_sound.play();		
remember_workspace = true;
}

localStorage.setItem('remember_workspace',JSON.stringify(remember_workspace));

};

var init_visual = function(param){

if (param === "invert"){

if (workspace_is_inverted){
global_invert = 0;
workspace_is_inverted = false;
disable_sound.currentTime = 0;
disable_sound.play();
document.getElementById('invert_button').style.backgroundColor = "#c0c0c050";
} else {
global_invert = 100;
workspace_is_inverted = true;
enable_sound.currentTime = 0;
enable_sound.play();
notify('Classic Invert filter applied.');
document.getElementById('invert_button').style.backgroundColor = "#76db94";
}

} else if (param === "brightness"){

global_brightness = document.getElementById('brightness_setting').value;

} else {

if (workspace_is_grayscaled){
global_grayscale = 0;
workspace_is_grayscaled = false;
disable_sound.currentTime = 0;
disable_sound.play();
document.getElementById('grayscale_button').style.backgroundColor = "#c0c0c050";
} else {
global_grayscale = 100;
workspace_is_grayscaled = true;
enable_sound.currentTime = 0;
enable_sound.play();
notify('Grayscale filter applied.');
document.getElementById('grayscale_button').style.backgroundColor = "#76db94";
}

}

document.documentElement.style.filter= "brightness("+global_brightness+"%) invert("+global_invert+"%) grayscale("+global_grayscale+"%)";


localStorage.setItem('global_brightness', global_brightness);
localStorage.setItem('global_invert', global_invert);
localStorage.setItem('global_grayscale', global_grayscale);




};

var disable_project_recovery = function(){

if (recovery_allowed){
recovery_allowed = false;
localStorage.setItem('recovery_allowed',JSON.stringify(recovery_allowed));
localStorage.removeItem('recovered_project_data');
localStorage.removeItem('recovered_project_time');
enable_sound.currentTime = 0;
enable_sound.play();
} else {
recovery_allowed = true;
localStorage.setItem('recovery_allowed',JSON.stringify(recovery_allowed));
disable_sound.currentTime = 0;
disable_sound.play();
}

};

var auto_run_is_on = false;

var toggle_auto_run = function(){

if (auto_run_is_on) {

document.getElementById('auto_run_button').style.backgroundColor = "#c0c0c050";
document.getElementById('play_icon').style.color = "white";
document.getElementById('play_icon').style.animation = "none";
document.getElementById('auto_run_button').innerHTML = "Enable Auto-run";

disable_sound.currentTime = 0;
disable_sound.play();
auto_run_is_on = false;
} else {

document.getElementById('auto_run_button').style.backgroundColor = "#76db94";
document.getElementById('auto_run_button').innerHTML = "Auto-run enabled";
document.getElementById('play_icon').style.color = "#76db94";
document.getElementById('play_icon').style.animation = "1s green-pulse 1";
document.getElementById('play_icon').style.borderRadius = "100%";

notify('Auto-run enabled.');

enable_sound.currentTime = 0;
enable_sound.play();

auto_run_is_on = true;
}

};

var recover_timer;

var recover_timer_is_on = false;


var disable_notifications = function(){

if (ready_to_notify){

//notif off
localStorage.setItem('disable_notifications',JSON.stringify(true));

ready_to_notify = false;
enable_sound.currentTime = 0;
enable_sound.play();
} else {

//notif on
localStorage.setItem('disable_notifications',JSON.stringify(false));

ready_to_notify = true;
disable_sound.currentTime = 0;
disable_sound.play();
}


};


var disable_ui_animations = function(){


if (ui_animations_are_disabled){

//animation off
ui_animations_are_disabled = false;
localStorage.setItem('ui_animations_are_disabled',JSON.stringify(true));
$('body').addClass('notransition');
enable_sound.currentTime = 0;
enable_sound.play();
} else {

//animation on
ui_animations_are_disabled = true;
localStorage.setItem('ui_animations_are_disabled',JSON.stringify(false));
$('body').removeClass('notransition');
disable_sound.currentTime = 0;
disable_sound.play();
}


};

var init_auto_run = function(){

if (auto_run_is_auto == true){
auto_run_is_auto = false;
localStorage.setItem('auto_run_is_auto', JSON.stringify(auto_run_is_auto));
disable_sound.currentTime = 0;
disable_sound.play();
} else {
auto_run_is_auto = true;	
localStorage.setItem('auto_run_is_auto', JSON.stringify(auto_run_is_auto));
enable_sound.currentTime = 0;
enable_sound.play();
}

};


var init_auto_theme = function(){

if (auto_theme == true){
auto_theme = false;
localStorage.setItem('auto_theme', JSON.stringify(auto_theme));
disable_sound.currentTime = 0;
disable_sound.play();
} else {
auto_theme = true;
localStorage.setItem('auto_theme', JSON.stringify(auto_theme));
enable_sound.currentTime = 0;
enable_sound.play();
}

};

var delete_recovered_work = function(element){
trash_sound.currentTime = 0;
trash_sound.play();
localStorage.removeItem('recovered_project_data');
localStorage.removeItem('recovered_project_time');
notify('Recovered work was deleted.');
element.style.animation = "darkred-pulse 1s 1";
setTimeout(function(){
	element.style.animation = "none";
},500);
UIkit.modal('#settings_page').toggle();
init_project_recover();
};

var delete_everything = function(element){
	trash_sound.currentTime = 0;
trash_sound.play();
	localStorage.clear();
notify('All saved data was deleted.');
element.style.animation = "darkred-pulse 1s 1";
setTimeout(function(){
	element.style.animation = "none";
},500);
UIkit.modal('#settings_page').toggle();
reload_page();

};


var global_volume = 0;

var set_volume = function(){

global_volume = (document.getElementById('volume_setting').value)/100;

localStorage.setItem('global_volume', JSON.stringify(global_volume));

init_volume();


};

var init_volume = function(){
		
if (global_volume == null){
global_volume = 1;
}
	
global_volume = JSON.parse(localStorage.getItem('global_volume'));	

document.getElementById('volume_setting').value = global_volume*100;

set_all_volume_items();

success_1.play();

setTimeout(function(){
	
if (audio_is_muted ==null){
audio_is_muted = false;
global_volume = 1;
localStorage.setItem('audio_is_muted', JSON.stringify(audio_is_muted));
localStorage.setItem('global_volume', JSON.stringify(global_volume));
set_all_volume_items();
}
	
	if (audio_is_muted){
	global_volume = 0;
	set_all_volume_items();
	} else {
	global_volume = global_volume;
	set_all_volume_items();
	}
},1);

};

var set_all_volume_items = function(){
open_sound.volume = global_volume;
close_sound.volume = global_volume;
enable_sound.volume = global_volume;
disable_sound.volume = global_volume;
popup_sound.volume = global_volume;
success_1.volume = global_volume;
success_2.volume = global_volume;
notif_error_sound.volume = global_volume;
help_sound.volume = global_volume;
exit_help_sound.volume = global_volume;
trash_sound.volume = global_volume;
snap_sound.volume = global_volume;
intro_sound.volume = global_volume;
download_sound.volume = global_volume;

document.getElementById('volume_setting').value = global_volume*100;
};

var audio_is_muted = false;

var init_mute_audio = function(){

if (audio_is_muted){	
audio_is_muted = false;
disable_sound.currentTime = 0;
disable_sound.play();
} else {
audio_is_muted = true;
enable_sound.currentTime = 0;
enable_sound.play();
}

localStorage.setItem('audio_is_muted', JSON.stringify(audio_is_muted));

};

var dark_mode_is_auto = false;

var init_dark_mode = function(){

if (dark_mode_is_auto){
	disable_sound.currentTime = 0;
	disable_sound.play();
	dark_mode_is_auto = false;
} else {
	enable_sound.currentTime = 0;
	enable_sound.play();
	dark_mode_is_auto = true;
}

localStorage.setItem('dark_mode_is_auto', JSON.stringify(dark_mode_is_auto));

};

var init_localstorage = function(){
	
global_brightness = JSON.parse(localStorage.getItem('global_brightness'));

if (global_brightness == null){
global_brightness = 100;
}


ui_animations_are_disabled = JSON.parse(localStorage.getItem("ui_animations_are_disabled"));


if ( ui_animations_are_disabled == null){
ui_animations_are_disabled = false;
}


if (ui_animations_are_disabled){
document.getElementById('disable_ui_animations_button').checked = true;
ui_animations_are_disabled = true;
} 

disable_ui_animations();

recovery_allowed = JSON.parse(localStorage.getItem('recovery_allowed'));
recovered_project_data = localStorage.getItem('recovered_project_data');

if (recovery_allowed == null || recovery_allowed == true){
localStorage.setItem('recovery_allowed',JSON.stringify(true));
document.getElementById('disable_recovery_check').checked = false;
if (recovered_project_data === ''|| recovered_project_data == null || recovered_project_data === ' '){
document.getElementById('recover_project_button').style.opacity = "25%";
document.getElementById('recover_project_button').style.pointerEvents = "none";
document.getElementById('recover_project_button').innerHTML = '<i class="ri-download-cloud-line"></i> <span> Recover this project</span>';
} else {
document.getElementById('recover_project_button').style.opacity = "100%";
document.getElementById('recover_project_button').style.pointerEvents = "auto";
document.getElementById('recover_project_button').innerHTML = '<i class="ri-download-cloud-line"></i> <span> Recover this project</span>';
}
} 




document.getElementById('brightness_setting').value = global_brightness;

init_visual('brightness');

global_invert = JSON.parse(localStorage.getItem('global_invert'));
global_grayscale = JSON.parse(localStorage.getItem('global_grayscale'));

if (global_invert == null || global_invert === 'undefined'){
global_invert = 0;
}

if (global_grayscale == null  || global_invert === 'grayscale'){
global_grayscale = 0;
}

if(global_invert == 100){
init_visual('invert');
}

if(global_grayscale == 100){
init_visual('grayscale');
}


auto_run_is_auto = JSON.parse(localStorage.getItem('auto_run_is_auto'));

if ( auto_run_is_auto == null){
auto_run_is_auto == false;
}

if (auto_run_is_auto == true){
document.getElementById('init_auto_run_button').checked = true;

document.getElementById('auto_run_button').click();
document.getElementById('auto_run_button').innerHTML = "Auto-run locked";
document.getElementById('auto_run_button').style.pointerEvents = "none";
document.getElementById('auto_run_button').style.opacity = "50%";

}


auto_theme = JSON.parse(localStorage.getItem('auto_theme'));

if ( auto_theme == null){
auto_theme == false;
}

if (auto_theme == true){
document.getElementById('init_auto_theme_button').checked = true;

}
set_all_volume_items();

setTimeout(function(){
init_volume();
},1000);

audio_is_muted = JSON.parse(localStorage.getItem('audio_is_muted'));

if (audio_is_muted){
global_volume = 0;
set_all_volume_items();
document.getElementById('volume_slider').style.pointerEvents = "none";
document.getElementById('volume_slider').style.opacity = "25%";
document.getElementById('volume_slider').innerHTML = `
<i style = "margin-right:1.5vmin" class="ri-volume-mute-fill"></i>
<span style = "vertical-align:middle" >UI audio has been muted.</span>
<input style = "display:none" id = "volume_setting" oninput = "set_volume()"  value = "1" min = "0" max = "100" class = "uk-range" type = "range"/>
`;
document.getElementById('mute_audio_button').checked = true;
}


remember_workspace = JSON.parse(localStorage.getItem('remember_workspace'));

recovered_project_data = localStorage.getItem('recovered_project_data');


if (remember_workspace == null){
remember_workspace = false;
localStorage.setItem('remember_workspace',JSON.stringify(remember_workspace));
}

if (recovered_project_data == null){
recovered_project_data = '';
localStorage.setItem('recovered_project_data',recovered_project_data);
}

if (remember_workspace) {
	document.getElementById('remember_workspace_button').checked = true;
	//okay so we can remember
	console.log('okay so we can rmember');
	if (recovery_allowed){
		
		if (recovered_project_data == null || recovered_project_data ==='' ){
		//but there is nothing to remember
		console.log('but there is nothing to rememer');
		setTimeout(function(){
		notify("There's nothing to recover. Start creating, and nuken will remember your work!");
		},501);
		} else {
			remember_workspace = true;
			setTimeout(function(){
			recover_project();
			},1);
			
		//and here we go, yay
		console.log('and here we go, yya');
		}
	} else {
	//but recovery is disabled, so no.
	console.log('but the user disabled recovery, gr');
	document.getElementById('remember_workspace_button').checked = false;
	remember_workspace = false;
localStorage.setItem('remember_workspace',JSON.stringify(remember_workspace));
setTimeout(function(){
	notify(`nuken can't remember your workspace without project recovery enabled. Please visit the <a uk-toggle = "#settings_page"><i class="ri-settings-3-fill"></i> <span><b>Settings Menu</b></span></a>.`);
},501);
	}
	
}

if (dark_mode_is_auto == null){
dark_mode_is_auto = false;
localStorage.setItem('dark_mode_is_auto',JSON.stringify(dark_mode_is_auto));
}

dark_mode_is_auto = JSON.parse(localStorage.getItem('dark_mode_is_auto'));

if (dark_mode_is_auto){
document.getElementById('init_dark_mode_button').checked = true;
enable_dark_mode();
}

};