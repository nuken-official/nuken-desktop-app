//This is how nuken writes the resources to the management menus.

var push_template = function(template){

document.getElementById('template_selection').innerHTML += `

<img id = '`+template.codename+`_icon'  class = "template_menu_item" onclick = "select_template(`+template.codename+`);" src = "`+template.icon+`" ></img>

`;

};



var select_template = function(template){

//You see why we set this up as an object? All we have to do is call the resource object here and we're good to go.  	

var cusid_ele = document.getElementsByClassName('template_menu_item');
for (var i = 0; i < cusid_ele.length; ++i) {
    var item = cusid_ele[i];  
    item.classList.remove('selected_resource');
}

    document.getElementById('template_menu').style.display = "block";
    document.getElementById('custom_template_input').style.display = "none";

setTimeout(function(){
document.getElementById(template.codename.toString()+"_icon").classList.add('selected_resource');
setTimeout(function(){
	document.getElementById(template.codename.toString()+"_icon").classList.remove('selected_resource');
},400);
},1);


// 'Welcome to nuken'
document.getElementById('template_title').innerHTML = template.title.toString();

// 'On this device'
document.getElementById('template_location').innerHTML = template.location.toString();

//Add a fancy hover title
document.getElementById('template_location').title = "nuken is pulling this resource from "+ template.location.toString().toLowerCase() + ".";

//This is just detection for what icon to display in the little info bar. Online or offline? Secure or insecure?
if (template.online === true){
	//online only
	document.getElementById('template_status').innerHTML = `<i class="ri-cloud-fill"></i>`;
	document.getElementById('template_status').title = "This resource can only be used while connected to the internet." 

} else {
	//online or offline
	document.getElementById('template_status').innerHTML = `<i class="ri-cloud-off-fill"></i>`;
document.getElementById('template_status').title = "This resource can be used offline." 
}

if (template.secure === true){
	
	//Secure
	document.getElementById('template_security').innerHTML = `<i class="ri-shield-check-fill"></i>`;
	document.getElementById('template_security').title = "This resource is from a secure location." 

} else {
	//Insecure
	document.getElementById('template_security').innerHTML = `<i class="ri-error-warning-fill"></i>`;
	document.getElementById('template_security').title = "This resource is not from a secure location." 

}

// 'Javatemplate is achsually very cool because blah blah blah blah blah blah blah blah'

document.getElementById('template_description').innerHTML = template.description.toString();

// Send the user to 'www.whyinthefudgesciclesdoesthisexist.com' for more information

document.getElementById('template_visit').onclick = function(){ 
window.open(template.visit.toString(),"_blank");

};

if (template.donate === ''){
	document.getElementById('template_donate').style.display = "none";
} else {

	document.getElementById('template_donate').style.display = "inline-block";
	
document.getElementById('template_donate').onclick = function(){ 
window.open(template.donate.toString(),"_blank");

};
}



if (template.view === ''){
	document.getElementById('template_direct_view').style.display = "none";
} else {

	document.getElementById('template_direct_view').style.display = "inline-block";

document.getElementById('template_direct_view').onclick = function(){ 
window.open(template.view.toString(),"_blank");

};

}




document.getElementById(template.stylebox_selection+"_icon").click();
document.getElementById('stylebox').value = template.style;
document.getElementById('metabox').value = template.meta;
document.getElementById('markupbox').value = template.markup;

document.getElementById(template.scriptbox_selection+"_icon").click();
document.getElementById('scriptbox').value = template.script;
document.getElementById('titlebox').value = template.title;


document.getElementById('project_author_box').value = template.author;
document.getElementById('project_audience_box').value = template.audience;
document.getElementById('project_description_box').value = template.import_description;


notify("<a uk-toggle = 'target: #template_page'><i style = 'vertical-align:middle'class='ri-file-search-fill'></i> <span style = 'vertical-align:middle'>"+template.title+"</span></a> was loaded into your workspace.</span></a>");

};

var push_custom_template = function() {
    document.getElementById('template_selection').innerHTML += `
<img id = "custom_template_icon" onerror = "this.src = 'icons/add_template.png'" src = "icons/add_template.png" class = "template_menu_item" onclick = "select_custom_template()" ></img>
`;


};

var select_custom_template = function() {

		enable_sound.currentTime = 0;
enable_sound.play();

    var cusid_ele = document.getElementsByClassName('template_menu_item');
    for (var i = 0; i < cusid_ele.length; ++i) {
        var item = cusid_ele[i];
        item.classList.remove('selected_resource');
    }

    document.getElementById('template_menu').style.display = "block";
    document.getElementById('custom_template_input').style.display = "none";

    setTimeout(function() {
        document.getElementById("custom_template_icon").classList.add('selected_resource');
    }, 1);

    document.getElementById('template_menu').style.display = "none";
    document.getElementById('custom_template_input').style.display = "block";

};

var template_load_listener = false;


var add_template = function(url){

template_load_listener = true;
	
$.getScript(url, function(){
    //script loaded and parsed
	if (template_load_listener){
	    document.getElementById('custom_template_icon').parentNode.removeChild(document.getElementById('custom_template_icon'));
		setTimeout(function(){
		document.getElementsByClassName('template_menu_item')[document.getElementsByClassName('template_menu_item').length - 1].click();
		},1);
		setTimeout(function(){
			push_custom_template();

notify('A new <a href = "'+url+'" target = "_blank">template pack</a> was added to the <a uk-toggle target = "#template_page"><i class="ri-file-search-fill"></i> <span>Template Menu</span></a>.');

document.getElementById('custom_template_input').style.display = "none";

    var cusid_ele = document.getElementsByClassName('template_menu_item');
    for (var i = 0; i < cusid_ele.length; ++i) {
        var item = cusid_ele[i];
        item.classList.remove('selected_resource');
    }
			
		},2);
}
	
}).fail(function(){
    if(arguments[0].readyState==0){
        //script failed to load
document.getElementById('custom_template_source').value = "";
document.getElementById('custom_template_source').placeholder = "We couldn't load that file. Please try again.";

    }else{

document.getElementById('custom_template_source').value = "";
document.getElementById('custom_template_source').placeholder = "That file doesn't exist. Please try again.";

    }
});



};



var write_template = function(){

var style = document.getElementById('stylebox').value;
var markup = document.getElementById('markupbox').value;
var script = document.getElementById('scriptbox').value;
var title = document.getElementById('titlebox').value;
var meta = document.getElementById('metabox').value.toString();
var author = document.getElementById('project_author_box').value;
var description = document.getElementById('project_description_box').value;
var audience = document.getElementById('project_audience_box').value;

right_frame.innerHTML = '';
var project_frame = document.getElementById('project_frame');

project = `

<!DOCTYPE html>
<html>

<head>

<title>`+title+`</title>

<meta name = "nuken_style" content = "`+selected_style_icon+`"/>
<meta name = "nuken_script" content = "`+selected_script_icon+`"/>
<meta name = "author" content = "`+author+`"/>
<meta name = "description" content = "`+description+`"/>
<meta name = "nuken_audience" content = "`+audience+`"/>


<!--nuken_meta_begin-->
`+meta+`
<!--nuken_meta_end-->

`+extra_style+`
`+extra_script+`

`+selected_style+`
<!--nuken_style_begin-->
<style>
`+style+`
</style>
<!--nuken_style_end-->

`+selected_script+`
</head>

<!--nuken_markup_begin-->
<body>
`+markup+`
</body>
<!--nuken_markup_end-->

<!--nuken_script_begin-->
<script>
`+script+`
</script>
<!--nuken_script_end-->

</html>


`;




var iframe = document.createElement('iframe');
document.getElementById('right_frame').appendChild(iframe);
iframe.id = "project_frame";
if (!auto_run_is_on){
iframe.classList.add("animated","tdFadeInDown");
} else {
document.getElementById('project_frame').style.opacity = "100%";
}
iframe.contentWindow.document.open();

iframe.contentWindow.onerror = function(e){
project_console_notify('<i class="ri-spam-2-line"></i> <span style = "margin-left: 0.5vmin" >'+ e+'</span> <span class = "timestamp">'+timestamp+'</span>','error');
};

iframe.contentWindow.console.log = function(c){
project_console_notify('<i class="ri-arrow-right-s-line"></i> <span>'+ c+'</span> <span class = "timestamp">'+timestamp+'</span>','log');
};


iframe.contentWindow.console.warn = function(w){
project_console_notify('<i class="ri-alert-line"></i> <span style = "margin-left: 0.5vmin">'+ w+'</span> <span class = "timestamp">'+timestamp+'</span>','warning');
};
iframe.contentWindow.document.write(project);




var recover_iframe = document.createElement('iframe');
document.getElementById('recover_text').innerHTML = "";

document.getElementById('recover_text').appendChild(recover_iframe);
recover_iframe.id = "recover_frame";

recover_iframe.contentWindow.document.open();

recover_iframe.contentWindow.document.write(project);




var share_iframe = document.createElement('iframe');
document.getElementById('share_project_container').innerHTML = "";
document.getElementById('share_project_container').appendChild(share_iframe);
share_iframe.id = "share_frame";

share_iframe.contentWindow.document.open();

share_iframe.contentWindow.document.write(project);


saved_project = project;


const iWindow = iframe.contentWindow;
const iDocument = iWindow.document;

const element = iDocument.documentElement;

html2canvas(element).then(canvas => {
    document.body.appendChild(canvas);
	canvas.id = "project_canvas";
	document.getElementById('project_canvas').remove();
	document.body.appendChild(canvas);
});

var canvas = document.getElementById('project_canvas');

canvas_url = document.getElementById('project_canvas').toDataURL();

var c = canvas.getContext('2d');
var p = c.getImageData(1, 1, 1, 1).data;
var rgb = "rgb(" + p[0]+", "+p[1]+", "+p[2]+")";

document.getElementById('right_frame').style.backgroundImage = "linear-gradient(to left, "+rgb+", "+rgb+")";
//document.getElementById('console_button').style.color = rgb;

};

var templates_index = [];

var init_templates = function(){

window.api.templates().then((result) => {
  
for (var i = 0; i < result.length; ++i) {
    var item = "templates/"+result[i];  

		templates_index.push(item);
		
		
		
		add_template(item);


}

  
});

}





