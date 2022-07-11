var welcome_to_nuken = { 
//The title of the resource.
title: "Welcome to nuken!",
//The object name, but because our onclick events don't like it for some reason, we need it in string form. This also has other uses, but we won't get into that here.
codename: "welcome_to_nuken",
//The resource icon, written to the .menu_scroll
icon: "icons/temp/icon.png",
//Where we're pulling this resource from
location: 'On this device',
//Can this be used offline? If so, this is false.
online: false,
//Is this from an HTTPS or local device location? If so, true.
secure: true,
//Where the documentation button redirects to.
visit: "https://nuken.xyz",
//The description thingy that tells the user what this is.
description: 
`
Not sure where to begin? Check out this template. It's a neat little demo, showing you what nuken has to offer. Feel free to add your own code, or borrow ours for your own project - the sky's the limit.

`,
stylebox_selection:'css3_sheet',
style: `body, html {
background-color:red;
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
donate:'',
view:'templates/welcome_to_nuken.js',

audience:'',
author:'',
import_description:''

};

push_template(welcome_to_nuken);


setTimeout(function(){
select_template(welcome_to_nuken);	
document.getElementById('titlebox').value = "New Project";
},250);
