var welcome_to_nuken = { 

title: "Welcome to nuken!",

codename: "welcome_to_nuken",

icon: "welcome_to_nuken.png",

location: 'On this device',

online: false,

secure: true,

visit: "https://nuken.xyz",

description: `
Not sure where to begin? Check out this template. It's a neat little demo, showing you what nuken has to offer. Feel free to add your own code, or borrow ours for your own project - the sky's the limit.

`,

stylebox_selection:'css3_sheet',

style: `body, html {
background-color:gray;
color:white;
}

h1 {
font-family:Courier;
text-align:center;
padding:5%;
}`,

markup:'<h1>Welcome to nuken!</h1>',

meta:`<meta charset = 'UTF-8'>&#10;
<meta name='viewport' content='width=device-width, initial-scale=1.0'>`,

scriptbox_selection:'javascript_lang',

script:`window.onclick = function(){

console.log('This is console.log');
console.warn('This is console.warn');

//This will fail, check the console!
alert(variable);

};`,


view:'welcome_to_nuken.js',

import_description: "",

};

push_template(welcome_to_nuken);


setTimeout(function(){
	document.getElementById('titlebox').value = "New Project";
},250);
