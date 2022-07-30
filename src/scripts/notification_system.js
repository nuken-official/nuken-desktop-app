//Okay, so the notification system is pretty straightforward. I thought the default UIkit notif system was a bit on the complicated side for what we're trying to accomplish, so I reskinned it a bit.

//If you want to disable notifications, set this to 'false'. This is just so that we can control when notifs appear onscreen (like maybe not showing notifs before the page loads, etc.)
var ready_to_notify = false;

//This is the number of mini-notifications in the mini-nav log area, in the bell icon dropdown. When it hits zero (like when the user deletes all of them), the default placeholder graphic fills the empty space. In any other case, it disappears to let the mini-notifs fill the space.
var number_of_notifs = 0;


//This is the number badge that appears above the bell icon. When the user hovers over it, and enters the menu, this will always be reset to zero (while the number_of_notifs actually IN the menu might remain the same).
var notification_count = 0;
var project_notification_count = 0;

//Check to see how many mini-notifs are left in the log and display "notification_placeholder" accordingly
var check_notif_count = function(){
if (number_of_notifs === 0){
	document.getElementById('notification_placeholder').style.display = "block";
	notification_count = 0;
} else {
document.getElementById('notification_placeholder').style.display = "none";
}

};

var notification_list = document.getElementById('notification_list');

//The nuken notify function has three parameters: the message, the time it's displayed for (in milliseconds), and the priority of the message. You can see more information on the priority parameter (you shouldn't really need it, I kept it in just in case though) in the UIkit documentation.

var notify = function(message, time, priority){
//UIkit.notification(message,{pos: 'bottom-right',timeout:time,status:priority});

if (ready_to_notify){
//If we're ready to show notifications

//update the notification count
number_of_notifs=number_of_notifs+1;

notification_count = notification_count+1;

//display the badge, show the number 
document.getElementById('notification_count').style.display = "inline-block";
document.getElementById('notification_count').innerHTML = notification_count;

//add the mini-notif to the log
notification_list.innerHTML += 

`<div ondblclick = "remove(this)" style = "cursor:pointer"  class = "dropdown-notif">`+message+`</div>

`;


check_notif_count();
//update the notif count in the system so nuken can check to see if the empty placeholder should be displayed

//log it to the actual program console
console.log(message);

} 

//get the user's setting from localstorage, if this is false don't show any notifs at all and overwrite the menu with some placeholder text
var disabled =  JSON.parse(localStorage.getItem('disable_notifications'));	
if (disabled){
document.getElementById('notification_placeholder').innerHTML = `<i class="ri-cloud-windy-fill"></i><br>Notifications <br>are disabled`;
};

};


//notification system for the project console
var project_console_notify = function(message,type){	
	
	//the display property value for the "what does this mean?" button that appears under project errors. by default, it isn't seen unless the notification is an error, so we hide it in every other case. 
	var errorbutton = "none";
	
	if (type === "error"){
		//this is an error notif
	fillcolor = "#a00000";
	errorbutton = "block";
	} else if (type === "warning"){
		//this is a warning notif, so we change the background-color property, but still hide the error button
	fillcolor = "#a55000;";	
	errorbutton = "none";
	} else {
		//just a normal console.log, we still hide the error button
		fillcolor = "#1a1a1a";
		errorbutton = "none";
	}
	
	//actually write the notification to the project console
	
document.getElementById('project_console_notification_list').innerHTML +=`

<div ondblclick = "remove(this)" style = "cursor:pointer;background-color:`+fillcolor+`"  class = "console-dropdown-notif"><div class = "console-dropdown-notif-message">`+message+`

<button class = "project_console_error_button" style = "display:`+errorbutton+`" onclick = "web_search(this.parentElement.querySelector('span').innerHTML)">What does that mean?</button>
</div>
<i onclick = "copy_text(this.parentElement.querySelector('span').innerHTML,this)" style = "float:right" class = "ri-file-copy-line copy_button"></i>
</div>
`;

//update the project notification count
project_notification_count = project_notification_count+1;

//show the notif badge
document.getElementById('console_notification_count').style.opacity = "100%";
document.getElementById('console_notification_count').innerHTML = project_notification_count;


};


//a global remove function, but i use it to get rid of the mini-notifs on click. Like using a power washer on a saltine cracker. ;)

var remove = function(element){
element.style.transition = "all 0.1s";
element.style.transform = "scale(0.975)";
element.style.opacity = "0%";
setTimeout(function(){
	element.style.display = "none";
},250);
number_of_notifs = number_of_notifs-1;
notification_count = notification_count-1;

check_notif_count();

};

//the text that fills a always-online menu when we're offline.

var offline_text = `

<div class = 'offline-text' >
<h1><i class='ri-cloud-off-fill'></i>
<br>No connection</h1>
<button onclick = 'window.location.href = "ms-settings://network";' >Check your settings</button>

`;

//the text that fills the recovery iframe element when there's nothing there.

var recover_text = `

<div class = 'recover-text' >
<h1 style = "text-align:center"><i class="ri-rainbow-line"></i>
<br>Nothing here yet</h1>
<button class="uk-modal-close" href = "" style = "    border-radius: 100vmin;
    position: relative;
    margin: 0;
    width: 100%;" >Go make something amazing</button>

`;


//the default offline message for addon menus

var addon_text = `

<div class = 'offline-text' >
<h1><i style = "font-size:7.5vmin" class='ri-cloud-off-fill'></i>
<br><span style = "font-size:5vmin">No connection</span></h1>
<button style = "font-size:2vmin;" onclick = 'window.location.href = "ms-settings://network";' >This Add-on requires an internet connection.</button>

`;


//set the notif badge to 0 and then hide it until we send another notification
var reset_notif_badge = function(){
document.getElementById('notification_count').innerHTML = "0";
document.getElementById('notification_count').style.display = "none";
notification_count = 0;
};

//reset the project console, hide the notif badge, set the notif count to 0, etc.
var reset_project_console_badge = function(){
document.getElementById('console_notification_count').innerHTML = "0";
document.getElementById('console_notification_count').style.opacity = "0%";
project_notification_count = 0;
};

//open a stackoverflow page with the function input passed as a search query
var web_search = function(query){
popup_sound.currentTime = 0;
popup_sound.play();
window.open('https://www.stackoverflow.com/search?q='+encodeURIComponent(query),"_blank");
};


//literally copies text to the clipboard, and updates the button icons to match the status ("copy", copied, "copy")
var copy_text = function(text,element){
navigator.clipboard.writeText(text);
notify('nuken wrote some text to your clipboard.',0);

if(element){
element.classList.remove('ri-file-copy-line');	
element.classList.add('ri-check-fill');
setTimeout(function(){
element.classList.add('ri-file-copy-line');	
element.classList.remove('ri-check-fill');
},500);
}

};

