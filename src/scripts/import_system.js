var project = "";

var imported_filename = "";

var import_project = function(){


window.api.selectFolder().then(result=>{


imported_filename = result.replace(/\\/g, "/");
imported_filename = /[^/]*$/.exec(imported_filename)[0];


window.api.send("toMain", result);

 window.api.receive("fromMain", (data) => {
	  
	 
if (data == "NOTHING") {
notify("You didn't import a project. Would you like to <a onclick = 'import_project()'>try again?</a>");	
}	else {
	 
project = data.toString();
assign_project(project);

}

/* Do something with the folder path*/
});	 


       });
	   

};

var assign_project = function(project){


right_frame.innerHTML = '';
var project_frame = document.getElementById('project_frame');

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





var style = project.split('<!--nuken_style_begin-->\n<style>\n').pop().split('</style>\n<!--nuken_style_end-->')[0];

var script = project.split('<!--nuken_script_begin-->\n<script>\n').pop().split('\n</script>\n<!--nuken_script_end-->')[0];

var meta = project.split('<!--nuken_meta_begin-->\n').pop().split('\n<!--nuken_meta_end-->')[0];

var markup = project.split('<!--nuken_markup_begin-->\n<body>\n').pop().split('\n</body>\n<!--nuken_markup_end-->')[0];

var title = project.split('<title>').pop().split('</title>')[0];

var file = imported_filename;

stylebox_editor.getSession().setValue(style);
markupbox_editor.getSession().setValue(markup);
scriptbox_editor.getSession().setValue(script);

document.getElementById('metabox').value = meta;
document.getElementById('titlebox').value = title;

document.getElementById('filebox').value = file;

var nuken_style_tag = $('#project_frame').contents().find('meta[name=nuken_style]').attr("content");
var nuken_script_tag = $('#project_frame').contents().find('meta[name=nuken_script]').attr("content");
var nuken_author_tag = $('#project_frame').contents().find('meta[name=author]').attr("content");
var nuken_description_tag = $('#project_frame').contents().find('meta[name=description]').attr("content");
var nuken_audience_tag = $('#project_frame').contents().find('meta[name=nuken_audience]').attr("content");


document.getElementById(nuken_script_tag+"_icon").click();
document.getElementById(nuken_style_tag+"_icon").click();

document.getElementById('project_author_box').value = nuken_author_tag;

document.getElementById('project_description_box').value = nuken_description_tag;

document.getElementById('project_audience_box').value = nuken_audience_tag;

if (nuken_author_tag == ''){
	document.getElementById('project_author_text').innerHTML = "an anonymous user";
} else {
	document.getElementById('project_author_text').innerHTML = nuken_author_tag;
UIkit.modal('#welcome_page').show();
}

if (nuken_description_tag == ''){
	document.getElementById('project_description_text').innerHTML = "Nothing to declare :)";
} else {
		document.getElementById('project_description_text').innerHTML = nuken_description_tag;
	UIkit.modal('#welcome_page').show();
}

if (nuken_audience_tag == ''){
	document.getElementById('project_audience_text').innerHTML = "anyone to use";
} else {
		document.getElementById('project_audience_text').innerHTML = nuken_audience_tag;
	UIkit.modal('#welcome_page').show();
}

project_write();



};

