/*
Pretty much we're just appending a custom stylesheet to the document here. Nothing special. nuken detects CSS files from the /themes directory.
*/

var init_theme = function(){

if (!auto_theme){
	
	
//yes, theme was detected

console.log('Theme detected.');

window.api.themes().then((result) => {
  
for (var i = 0; i < result.length; ++i) {
    var item = theme_direc+result[i];  
	
		//once themes is init, load_theme
		load_theme(item);
}	
});
} else {
//no themes	 :(
console.log('No theme detected.');
}
};


var load_theme = function(theme){
	
	//append a link tag to the head of the document with our selected attributes (most notably, the theme href)
	
 var cssLink = $("<link>");
  $("head").append(cssLink);

  cssLink.attr({
    rel:  "stylesheet",
    type: "text/css",
    href: theme
  });
  
  //notify the user that a theme was loaded
  
  setTimeout(function(){

notify('Your theme was applied. Visit the <a uk-toggle = "#settings_page"><i class="ri-settings-3-fill"></i> <span><b>Settings Menu</b></span></a> to disable themes on startup.');

},550);
	
};