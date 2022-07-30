var recover_project = function(){

var project = localStorage.getItem('recovered_project_data');
assign_project(project);

notify('Project recovered successfully.')

};


var save_recovered_project = function(){
	
if (recovery_allowed){	
	
var project_to_recover = saved_project;	

var recover_iframe = document.createElement('iframe');
document.getElementById('recover_text').innerHTML = "";
document.getElementById('recover_text').appendChild(recover_iframe);
recover_iframe.id = "recover_frame";


recover_iframe.contentWindow.document.open();

recover_iframe.contentWindow.document.write(project_to_recover);
localStorage.setItem('recovered_project_data', project_to_recover);


var static_date = new Date();	
var static_hour = date.getHours();
var static_minute = date.getMinutes();
var static_second = date.getSeconds();
var ampm = "AM";

let [static_month, static_day, static_year] = new Date().toLocaleDateString("en-US").split("/");


if (static_hour>=12){

if (static_hour === 12){
static_hour = static_hour = 12;
ampm = "PM";
} else {
static_hour = static_hour - 12;
ampm = "PM";
}


}

if (static_minute<10){
static_minute = "0" + static_minute;
}

if (static_second<10){
static_second = "0" + static_second;
}


document.getElementById('recover_time').innerHTML = "Last saved on "+static_month+"/"+static_day+"/"+static_year+" at "+static_hour+":"+static_minute+" "+ampm;
localStorage.setItem('recovered_project_time', document.getElementById('recover_time').innerHTML.toString());

}

};


var init_project_recover = function(){

recovery_allowed = JSON.parse(localStorage.getItem('recovery_allowed'));

if (recovery_allowed){
		
	var project = localStorage.getItem('recovered_project_data');
	var time = localStorage.getItem('recovered_project_time');
	
if (project === 'undefined' || project == null || project === ' ' || project === ''){
	document.getElementById('recover_project_button').style.opacity = "25%";
document.getElementById('recover_project_button').style.pointerEvents = "none";
document.getElementById('recover_project_button').innerHTML = '<i class="ri-download-cloud-line"></i> <span> Recover this project</span>';
		document.getElementById('recover_text').innerHTML = recover_text;
	} else {
var recover_iframe = document.createElement('iframe');
document.getElementById('recover_text').innerHTML = "";
document.getElementById('recover_text').appendChild(recover_iframe);
recover_iframe.id = "recover_frame";

recover_iframe.contentWindow.document.open();

recover_iframe.contentWindow.document.write(project);
localStorage.setItem('recovered_project_data', project);

document.getElementById('recover_time').innerHTML = time;

	}
	
} else {

}
};

var save_project_to_memory = function(){
if (recovery_allowed){

enable_sound.currentTime = 0;
enable_sound.play();
save_recovered_project();
notify('Project saved to memory. You can access it from the <a uk-toggle target = "#recover_page"><i class="ri-device-recover-fill"></i> <span>Recovery Menu</span></a>.');
document.getElementById('memory_save_button').style.animation = "1s green-pulse 1";
document.getElementById('memory_save_button').style.backgroundColor = "#76db94";
document.getElementById('memory_save_button').innerHTML = '<i class="ri-check-fill"></i> <span>Save to memory</span>';

setTimeout(function(){
document.getElementById('memory_save_button').style.animation = "none";
document.getElementById('memory_save_button').style.backgroundColor = "#c0c0c050";
document.getElementById('memory_save_button').innerHTML = '<i class="ri-bubble-chart-fill"></i> <span>Save to memory</span>';
},1000);
} else {
	notif_error_sound.currentTime = 0;
	notif_error_sound.play();
notify('Save failed. Please enable project recovery in the <a uk-toggle = "#settings_page" ><i class="ri-settings-3-fill"></i> <span>Settings Menu</span></a>.');
}

};

