//Because you're looking at this trying to figure what the f**k this is and what it does, here's a walkthrough on how to define resources for nuken.

//Start with an object
var javascript_lang = {
    //The title of the resource.
    title: "JavaScript",
    //The object name, but because our onclick events don't like it for some reason, we need it in string form. This also has other uses, but we won't get into that here.
    codename: "javascript_lang",
    //The resource icon, written to the .menu_scroll
    icon: "icons/script/javascript.png",
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

    resource: ``,
    extra: '',
    donate: '',
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

    1) We create an object with the correct attributes nuken is looking for.
    2) We push an icon to the menu, and give it an event listener to fill in the rest of the information when clicked on.
    3) If the icon is actually clicked, it is "selected" and the title, info bar, description, etc. is filled in.

    */


};

var css3_sheet = {
    title: "CSS 3",
    codename: "css3_sheet",
    icon: "icons/style/css3.png",
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


//This is the aforementioned select function, specifically for the Script Management Menu. Yes, technically this is the same as the other select function, but for f**k's sake, I want to keep them seperate just because. Much easier to automate.

var select_script = function(resource) {

    //You see why we set this up as an object? All we have to do is call the resource object here and we're good to go.  	

enable_sound.currentTime = 0;
enable_sound.play();

    var cusid_ele = document.getElementsByClassName('script_menu_item');
    for (var i = 0; i < cusid_ele.length; ++i) {
        var item = cusid_ele[i];
        item.classList.remove('selected_resource');
    }

    document.getElementById('script_menu').style.display = "block";
    document.getElementById('custom_script_input').style.display = "none";

    setTimeout(function() {
        document.getElementById(resource.codename.toString() + "_icon").classList.add('selected_resource');
    }, 1);


    // 'JavaScript'
    document.getElementById('script_title').innerHTML = resource.title.toString();

    // 'On this device'
    document.getElementById('script_location').innerHTML = resource.location.toString();
		
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

    // 'JavaScript is achsually very cool because blah blah blah blah blah blah blah blah'

    document.getElementById('script_description').innerHTML = resource.description.toString();

    // Send the user to 'www.whyinthefudgesciclesdoesthisexist.com' for more information

    document.getElementById('script_documentation').onclick = function() {
        window.open(resource.documentation.toString(), "_blank");
			popup_sound.currentTime = 0;
	popup_sound.play();

    };

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
	
	document.getElementById('script_preview').src = resource.icon;
	document.getElementById('script_preview').title = "This project uses "+resource.title+"."


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

//Since obviously JS and CSS can be used offline, they're pushed to the menu regardless of whether the user is offline or online.

var push_custom_script = function() {
    document.getElementById('script_selection').innerHTML += `
<img id = "custom_script_icon" onerror = "this.src = 'icons/add.png'" src = "icons/add.png" class = "script_menu_item" onclick = "select_custom_script()" ></img>
`;


};

var push_custom_style = function() {
    document.getElementById('style_selection').innerHTML += `
<img id = "custom_style_icon" src = "icons/add.png" class = "style_menu_item" onclick = "select_custom_style()" ></img>
`;
};

var select_custom_script = function() {

enable_sound.currentTime = 0;
enable_sound.play();

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

var link_detection_regex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;


var detect_url = function(input) {

    return input.match(link_detection_regex);

};


const get_domain = (input) => {
    return new URL(input).hostname;
}


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

var fill_in_style_info = function() {
	
	selected_style = document.getElementById('custom_style_textarea').value;

    var string = document.getElementById('custom_style_textarea').value;

    var full_url = detect_url(string);



    var protocol = full_url.toString().toLowerCase().includes('https');

    var file = full_url.toString().toLowerCase().includes('file://');


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




    document.getElementById('custom_style_location').innerHTML = get_domain(full_url);
	
	var temp_name= "https://"+get_domain(full_url).toString();


    var domains = temp_name
        .split(/\n/)
        .map(href => {
            let hostnameParts = new URL(href).hostname.split(".");
            let domain = hostnameParts.slice(hostnameParts.length > 3 ? -2 : -1)
            document.getElementById('custom_style_title').innerHTML = hostnameParts[1].toString();
            return domain.join(".");
        })


    notify("A custom stylesheet was selected in the <a uk-toggle = 'target: #style_page' ><i class='ri-attachment-fill'></i> <span>Stylesheet Management Menu.</span></a>");
	
			enable_sound.currentTime = 0;
enable_sound.play();


};

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


push_resource(javascript_lang, 'script');
push_resource(css3_sheet, 'style');