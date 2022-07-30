//Because you're looking at this trying to figure what the hell this is and what it does, here's a walkthrough on how to define resources for nuken.

//Start with an object
var javascript_lang = {
    //The title of the resource.
    title: "JavaScript",
    //The object name, but because our onclick events don't like it for some reason, we need it in string form. This also has other uses, but we won't get into that here.
    codename: "javascript_lang",
    //The resource icon, written to the correct management menu (we begin looking at index.html's root directory, but a custom url can be used here)
    icon: "icons/javascript.png",
    //Where we're pulling this resource from
    location: 'On this device',
    //Can this be used offline? If so, this is false.
    online: false,
    //Is this from an HTTPS or local device location? If so, true.
    secure: true,
    //Where the documentation button redirects to.
    documentation: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript",
    //The description thingy that tells the user what this is.
    description: `
JavaScript is a programming language that adds interactivity to your project. It's versatile and beginner-friendly - and with more experience, you'll be able to create games, animated 2D and 3D graphics, comprehensive database-driven apps, and much more!
`,
//the actual resource - that is, what's supposed to be written to the document. so like, a <script> CDN link, or something idk
    resource: ``,
//nuken's resources are written to the project BELOW the <body> tags. if the resource needs to be loaded in before anything else, put it here instead of in resource.resource.	
    extra: '',
// the donation link that's opened when the user clicks the "donate" button.	
    donate: '',
// the resource's source code, which is opened when the user clicks "view".	
    view: ''
};

//This is how nuken writes the resources to the management menus.

var push_resource = function(resource, menu) {
    //write the resource icon to the corresponding menu (script or style), adding to what's already there
    document.getElementById(menu + '_selection').innerHTML += `

<img id = '` + resource.codename + `_icon'  class = "` + menu + `_menu_item" onclick = "select_` + menu + `(` + resource.codename + `);" src = "` + resource.icon + `" ></img>

`;

    //The image id is the resource.codename + "_icon", and it's given an onclick event: select_script or select_style. This actually loads the resource's information into the user's view. So basically, TLDR...

    /*

    1) We create an "resource" object, with the listed properties above.
    2) We push an icon to the menu, and give it an onclick event to fill in the rest of the information when clicked on, based on the "resource" object name.
    3) If the icon is actually clicked, it is "selected" and the title, info bar, description, etc. is filled in based on the properties we've passed to our "resource" object.

    */


};


//and here's everything listed above, put into practice.
var css3_sheet = {
    title: "CSS 3",
    codename: "css3_sheet",
    icon: "icons/css3.png",
    location: 'On this device',
    online: false,
    secure: true,
    documentation: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    description: `
Cascading Style Sheets (CSS) is a stylesheet language used to describe the presentation of your project. CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.
`,
    resource: ``,
    extra: '',
    donate: '',
    view: ''
};


//This is the aforementioned select function, specifically for the Script Management Menu. Yes, technically this is the same as the other select function, I want to keep them seperate just because. Much easier to automate.

var select_script = function(resource) { 	

enable_sound.currentTime = 0;
enable_sound.play();


//when we click on a resource icon, first we remove the "selected_resource" class from ALL of the icons.

    var cusid_ele = document.getElementsByClassName('script_menu_item');
    for (var i = 0; i < cusid_ele.length; ++i) {
        var item = cusid_ele[i];
        item.classList.remove('selected_resource');
    }

    document.getElementById('script_menu').style.display = "block";
    document.getElementById('custom_script_input').style.display = "none";

//then, we add the "selected_resource" class to the icon we've just clicked on. the "selected_resource" class gives the icon an orange border, full opacity, slightly larger size, etc.

    setTimeout(function() {
        document.getElementById(resource.codename.toString() + "_icon").classList.add('selected_resource');
    }, 1);


//then, we fill in the rest of the menu, using our selected "resource" object's properties.

    //TITLE
    document.getElementById('script_title').innerHTML = resource.title.toString();

    // LOCATION 
    document.getElementById('script_location').innerHTML = resource.location.toString();
		
		
	//when the script_location text is clicked,  we take that text, slap "http" in front of it, and open it in a new window.	
	document.getElementById('script_location').onclick = function(){
	window.open("http://"+resource.location.toString(),"_blank");
		popup_sound.currentTime = 0;
	popup_sound.play();
	};

    //Add a fancy hover title
    document.getElementById('script_location').title = "nuken is pulling this resource from " + resource.location.toString().toLowerCase() + ".";

    //This is just detection for what icon to display in the little info bar. Online or offline? Secure or insecure?
    if (resource.online === true) {
        //online only
        document.getElementById('script_status').innerHTML = `<i class="ri-cloud-fill"></i>`;
        document.getElementById('script_status').title = "This resource can only be used while connected to the internet."

    } else {
        //online or offline
        document.getElementById('script_status').innerHTML = `<i class="ri-cloud-off-fill"></i>`;
        document.getElementById('script_status').title = "This resource can be used offline."
    }

    if (resource.secure === true) {

        //Secure
        document.getElementById('script_security').innerHTML = `<i class="ri-shield-check-fill"></i>`;
        document.getElementById('script_security').title = "This resource is from a secure location."

    } else {
        //Insecure
        document.getElementById('script_security').innerHTML = `<i class="ri-error-warning-fill"></i>`;
        document.getElementById('script_security').title = "This resource is not from a secure location."

    }

    // DESCRIPTION 

    document.getElementById('script_description').innerHTML = resource.description.toString();

    // DOCUMENTATION - set the onclick event for the documentation button

    document.getElementById('script_documentation').onclick = function() {
        window.open(resource.documentation.toString(), "_blank");
			popup_sound.currentTime = 0;
	popup_sound.play();

    };
	
	//do some checking for a donation link - if it doesn't exist, don't show the button.

    if (resource.donate === '') {
        document.getElementById('script_donate').style.display = "none";
    } else {

        document.getElementById('script_donate').style.display = "inline-block";

        document.getElementById('script_donate').onclick = function() {
            window.open(resource.donate.toString(), "_blank");
				popup_sound.currentTime = 0;
	popup_sound.play();

        };
    }

// same thing for the source "view" button.

    if (resource.view === '') {
        document.getElementById('script_direct_view').style.display = "none";
    } else {

        document.getElementById('script_direct_view').style.display = "inline-block";

        document.getElementById('script_direct_view').onclick = function() {
            window.open(resource.view.toString(), "_blank");
				popup_sound.currentTime = 0;
	popup_sound.play();

        };

    }
	

	// you know those icons in the Export Menu that show what resources you currently have selected? this updates the script icon there.
	document.getElementById('script_preview').src = resource.icon;
	document.getElementById('script_preview').title = "This project uses "+resource.title+".";


//set the value for extra_script, this will eventually be written to the project in the preview area
    extra_script += resource.extra.toString();
	
    selected_script = resource.resource.toString();
	selected_script_icon = resource.codename.toString();

localStorage.setItem('selected_script',resource.codename);

    notify("<a href= '" + resource.documentation + "' target = '_blank'>" + resource.title + "</a> was selected in the <a uk-toggle = 'target: #script_page' ><i class='ri-file-paper-2-fill'></i> <span>Script Management Menu.</span></a>");

};

//I'm not going to go over this again, it seems pretty self explanatory by this point. Go read everying up there ^^^ if you're not sure about something. It's literally the same function, I'm keeping it seperate because it's nice for third-party devs to be able to populate the menus seperately.

var select_style = function(resource) {

enable_sound.currentTime = 0;
enable_sound.play();

    var cusid_ele = document.getElementsByClassName('style_menu_item');
    for (var i = 0; i < cusid_ele.length; ++i) {
        var item = cusid_ele[i];
        item.classList.remove('selected_resource');
    }


    document.getElementById('style_menu').style.display = "block";
    document.getElementById('custom_style_input').style.display = "none";

    setTimeout(function() {
        document.getElementById(resource.codename.toString() + "_icon").classList.add('selected_resource');
    }, 1);


    document.getElementById('style_title').innerHTML = resource.title.toString();


    document.getElementById('style_location').innerHTML = resource.location.toString();
	document.getElementById('style_location').onclick = function(){
	window.open("http://"+resource.location.toString(),"_blank");
		popup_sound.currentTime = 0;
	popup_sound.play();
	};

    document.getElementById('style_location').title = "nuken is pulling this resource from " + resource.location.toString().toLowerCase() + ".";


    if (resource.online === true) {
        document.getElementById('style_status').innerHTML = `<i class="ri-cloud-fill"></i>`;
        document.getElementById('style_status').title = "This resource can only be used while connected to the internet.";

    } else {
        document.getElementById('style_status').innerHTML = `<i class="ri-cloud-off-fill"></i>`;
        document.getElementById('style_status').title = "This resource can be used offline.";
    }

    if (resource.secure === true) {
        document.getElementById('style_security').innerHTML = `<i class="ri-shield-check-fill"></i>`;
        document.getElementById('style_security').title = "This resource is from a secure location.";

    } else {
        document.getElementById('style_security').innerHTML = `<i class="ri-error-warning-fill"></i>`;
        document.getElementById('style_security').title = "This resource is not from a secure location.";

    }

    document.getElementById('style_description').innerHTML = resource.description.toString();

    document.getElementById('style_documentation').onclick = function() {
        window.open(resource.documentation.toString(), "_blank");
			popup_sound.currentTime = 0;
	popup_sound.play();

    };


    if (resource.donate === '') {
        document.getElementById('style_donate').style.display = "none";
    } else {

        document.getElementById('style_donate').style.display = "inline-block";

        document.getElementById('style_donate').onclick = function() {
            window.open(resource.donate.toString(), "_blank");
				popup_sound.currentTime = 0;
	popup_sound.play();

        };
    }



    if (resource.view === '') {
        document.getElementById('style_direct_view').style.display = "none";
    } else {

        document.getElementById('style_direct_view').style.display = "inline-block";

        document.getElementById('style_direct_view').onclick = function() {
            window.open(resource.view.toString(), "_blank");
				popup_sound.currentTime = 0;
	popup_sound.play();

        };

    }
	
		document.getElementById('style_preview').src = resource.icon;
		document.getElementById('style_preview').title = "This project uses "+resource.title+".";


    extra_style += resource.extra.toString();
    selected_style = resource.resource.toString();
	selected_style_icon = resource.codename.toString();
	
	localStorage.setItem('selected_style',resource.codename);

    notify("<a href= '" + resource.documentation + "' target = '_blank'>" + resource.title + "</a> was selected in the <a uk-toggle = 'target: #style_page' ><i class='ri-attachment-fill'></i> <span>Stylesheet Management Menu.</span></a>");

};


//this pushes the custom script icon to the Script Management Menu.
var push_custom_script = function() {
    document.getElementById('script_selection').innerHTML += `
<img id = "custom_script_icon" onerror = "this.src = 'icons/add.png'" src = "icons/add.png" class = "script_menu_item" onclick = "select_custom_script()" ></img>
`;


};


//this pushes the custom stylesheet icon to the Stylesheet Management Menu
var push_custom_style = function() {
    document.getElementById('style_selection').innerHTML += `
<img id = "custom_style_icon" src = "icons/add.png" class = "style_menu_item" onclick = "select_custom_style()" ></img>
`;
};


//when the custom script icon is clicked
var select_custom_script = function() {

enable_sound.currentTime = 0;
enable_sound.play();

//do the typical selection stuff, but this time specify the custom script icon as being selected

    var cusid_ele = document.getElementsByClassName('script_menu_item');
    for (var i = 0; i < cusid_ele.length; ++i) {
        var item = cusid_ele[i];
        item.classList.remove('selected_resource');
    }

    document.getElementById('script_menu').style.display = "block";
    document.getElementById('custom_script_input').style.display = "none";

    setTimeout(function() {
        document.getElementById("custom_script_icon").classList.add('selected_resource');
    }, 1);

    document.getElementById('script_menu').style.display = "none";
    document.getElementById('custom_script_input').style.display = "block";

};


// a regex for detecting links
var link_detection_regex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;


//okay imma level with you a lot of the following code is weird but idk, i think i was half asleep while writing it so i'm not going to question why it works. you shouldn't either until we have to replace it. 

var detect_url = function(input) {

    return input.match(link_detection_regex);

};


const get_domain = (input) => {
    return new URL(input).hostname;
}

//same thing but for the custom stylesheet icon
var select_custom_style = function() {

enable_sound.currentTime = 0;
enable_sound.play();

    var cusid_ele = document.getElementsByClassName('style_menu_item');
    for (var i = 0; i < cusid_ele.length; ++i) {
        var item = cusid_ele[i];
        item.classList.remove('selected_resource');
    }

    document.getElementById('style_menu').style.display = "block";
    document.getElementById('custom_style_input').style.display = "none";

    setTimeout(function() {
        document.getElementById("custom_style_icon").classList.add('selected_resource');
    }, 1);

    document.getElementById('style_menu').style.display = "none";
    document.getElementById('custom_style_input').style.display = "block";

};

//fills in the contents of the custom stylesheet area based on the user's input.

var fill_in_style_info = function() {
	
	//set our selected_style value (which gets appended to the document) to whatever the user's inputted
	
	selected_style = document.getElementById('custom_style_textarea').value;

//get the user's input

    var string = document.getElementById('custom_style_textarea').value;

//run it through the link detection regex to get the resource url

    var full_url = detect_url(string);


//see if the resource is https or not
    var protocol = full_url.toString().toLowerCase().includes('https');
//see if it's a local file or not. local files don't exactly work 100% problem free yet, but still, we might as well check.
    var file = full_url.toString().toLowerCase().includes('file://');

//depending on the status of protocol and file, we display different icons in the little status bar thingy.
    if (file) {

        document.getElementById('custom_style_status').innerHTML = `<i class="ri-cloud-off-fill"></i>`;
        document.getElementById('custom_style_status').title = "This resource can be used offline."

    } else {

        document.getElementById('custom_style_status').innerHTML = `<i class="ri-cloud-fill"></i>`;
        document.getElementById('custom_style_status').title = "This resource can only be used while connected to the internet."

    }


    if (protocol) {
        document.getElementById('custom_style_security').innerHTML = '<i class="ri-shield-check-fill"></i>';
        document.getElementById('custom_style_security').title = "This resource is from a secure location. Good job!"

    } else {

        if (file) {

            document.getElementById('custom_style_security').innerHTML = '<i class="ri-shield-check-fill"></i>';
            document.getElementById('custom_style_security').title = "This resource is from a secure location. Good job!"

        } else {

            document.getElementById('custom_style_security').innerHTML = '<i class="ri-error-warning-fill"></i>';
            document.getElementById('custom_style_security').title = "This resource is not from a secure location.";


        }

    }



//this is displayed as the custom resource's location. essentially here we're just stripping the URL down to its domain.
    document.getElementById('custom_style_location').innerHTML = get_domain(full_url);
	
	//really quickly do a check and remove any remaining parts of the URLs
	var temp_name= "https://"+get_domain(full_url).toString();


    var domains = temp_name
        .split(/\n/)
        .map(href => {
            let hostnameParts = new URL(href).hostname.split(".");
            let domain = hostnameParts.slice(hostnameParts.length > 3 ? -2 : -1)
            document.getElementById('custom_style_title').innerHTML = hostnameParts[1].toString();
            return domain.join(".");
        })


//notify the user that the process succeeded

    notify("A custom stylesheet was selected in the <a uk-toggle = 'target: #style_page' ><i class='ri-attachment-fill'></i> <span>Stylesheet Management Menu.</span></a>");
	
			enable_sound.currentTime = 0;
enable_sound.play();


};

//fills in the contents of the custom script area based on the user's input.

//pretty much the same function as above, but for the script management menu.

var fill_in_script_info = function() {
	
	selected_script = document.getElementById('custom_script_textarea').value;

    var string = document.getElementById('custom_script_textarea').value;

    var full_url = detect_url(string);

    var protocol = full_url.toString().toLowerCase().includes('https');

    var file = full_url.toString().toLowerCase().includes('file://');


    if (file) {

        document.getElementById('custom_script_status').innerHTML = `<i class="ri-cloud-off-fill"></i>`;
        document.getElementById('custom_script_status').title = "This resource can be used offline."

    } else {

        document.getElementById('custom_script_status').innerHTML = `<i class="ri-cloud-fill"></i>`;
        document.getElementById('custom_script_status').title = "This resource can only be used while connected to the internet."

    }


    if (protocol) {
        document.getElementById('custom_script_security').innerHTML = '<i class="ri-shield-check-fill"></i>';
        document.getElementById('custom_script_security').title = "This resource is from a secure location. Good job!"

    } else {

        if (file) {

            document.getElementById('custom_script_security').innerHTML = '<i class="ri-shield-check-fill"></i>';
            document.getElementById('custom_script_security').title = "This resource is from a secure location. Good job!"

        } else {

            document.getElementById('custom_script_security').innerHTML = '<i class="ri-error-warning-fill"></i>';
            document.getElementById('custom_script_security').title = "This resource is not from a secure location.";


        }

    }




    document.getElementById('custom_script_location').innerHTML = get_domain(full_url);

	
	var temp_name= "https://"+get_domain(full_url).toString()


    var domains = temp_name
        .split(/\n/)
        .map(href => {
            let hostnameParts = new URL(href).hostname.split(".");
            let domain = hostnameParts.slice(hostnameParts.length > 3 ? -2 : -1)
            document.getElementById('custom_script_title').innerHTML = hostnameParts[1].toString();
            return domain.join(".");
        })
	
	


    notify("A custom script was selected in the <a uk-toggle = 'target: #script_page' ><i class='ri-file-paper-2-fill'></i> <span>Script Management Menu.</span></a>");

		enable_sound.currentTime = 0;
enable_sound.play();
};


//push the JS and CSS resource icons to their respective management menus, regardless of whether the user is online or not (since these resources can obviously be used either way)
push_resource(javascript_lang, 'script');
push_resource(css3_sheet, 'style');