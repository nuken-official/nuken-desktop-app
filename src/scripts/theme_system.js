var init_theme = function(){

if (!auto_theme){

console.log('theme yay');

window.api.themes().then((result) => {
  
for (var i = 0; i < result.length; ++i) {
    var item = "themes/"+result[i];  
	
		load_theme(item);
		
		
}

  
});
} else {
console.log('theme no');
}
};

var load_theme = function(theme){
	
 var cssLink = $("<link>");
  $("head").append(cssLink); //IE hack: append before setting href

  cssLink.attr({
    rel:  "stylesheet",
    type: "text/css",
    href: theme
  });
  
  setTimeout(function(){

notify('Your nuken Theme was applied. Vist the <a uk-toggle = "#settings_page"><i class="ri-settings-3-fill"></i> <span><b>Settings Menu</b></span></a> to disable Themes on startup.');

},550);
	
};