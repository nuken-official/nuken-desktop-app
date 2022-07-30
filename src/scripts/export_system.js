//a function for downloading files, pretty much we create a link element, click it, which triggers a file download.
function download(filename, text) {
	//MAKE SURE we remove any SENSITIVE project config data from the project before exporting
	text = text.replace(file_path_insert,'');
	console.log('Downloader initiated.');
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();
//and now that we're done, we get rid of the link.
  document.body.removeChild(element);
}

//this is the function that's called when the "Export project" button is clicked. it essentially tells nuken to download the user's project based on a selected filename and some text (this is written to the file we're downloading).

var export_project = function(){

var text = project.replace(file_path_insert,'');

var filename = document.getElementById('filebox').value;
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};


//if the project config menu is set up to look for an absolute file path on the user's system, this bit of code is appended to the project to add it to every relative file path. 

var file_path_insert = "";

var init_custom_file_paths = function(){

var keep_css = stylebox_editor.getSession().getValue();
var keep_html = markupbox_editor.getSession().getValue();
var keep_js = scriptbox_editor.getSession().getValue();
	
	//first, we save the values of the html, css, and js code boxes;; plus we get what's written to the custom file path input box.

	var loc = document.getElementById('custom_file_path_input').value.toString();
	
	if (loc == ""){
		
	file_path_insert = "";	
		
	} else {
		
	//this bit of code looks for every element with a link, src, href, etc. tag and appends the LOC variable to the beginning of the relative file path.	

	file_path_insert = `
<!--nuken_file_path_insert_begin-->	
<script>
//Don't worry about the code below, it'll be removed when you export your project :)
var all_images=document.getElementsByTagName('img');for(var i=0;i<all_images.length;++i){var img=all_images[i];img.src='`+loc+`'+img.src.replace('`+nuken_location+`','')}
var all_anchors=document.getElementsByTagName('a');for(var j=0;j<all_anchors.length;++j){var anc=all_anchors[i];anc.href='`+loc+`'+anc.href.replace('`+nuken_location+`','')}
var all_areas=document.getElementsByTagName('area');for(var k=0;k<all_areas.length;++k){var are=all_areas[k];are.href='`+loc+`'+are.href.replace('`+nuken_location+`','')}
var all_bases=document.getElementsByTagName('base');for(var l=0;l<all_bases.length;++l){var bas=all_bases[l];bas.href='`+loc+`'+bas.href.replace('`+nuken_location+`','')}
var all_links=document.getElementsByTagName('link');for(var m=0;m<all_links.length;++m){var lnk=all_links[m];lnk.href='`+loc+`'+lnk.href.replace('`+nuken_location+`','')}
var all_audios=document.getElementsByTagName('audio');for(var n=0;n<all_audios.length;++n){var aud=all_audios[n];aud.src='`+loc+`'+aud.src.replace('`+nuken_location+`','')}
var all_embeds=document.getElementsByTagName('embed');for(var o=0;o<all_embeds.length;++o){var emb=all_embeds[o];emb.src='`+loc+`'+emb.src.replace('`+nuken_location+`','')}
var all_iframes=document.getElementsByTagName('iframe');for(var p=0;p<all_iframes.length;++p){var fra=all_iframes[p];fra.src='`+loc+`'+fra.src.replace('`+nuken_location+`','')}
var all_inputs=document.getElementsByTagName('input');for(var q=0;q<all_inputs.length;++q){var inp=all_inputs[q];inp.src='`+loc+`'+inp.src.replace('`+nuken_location+`','')}
var all_scripts=document.getElementsByTagName('script');for(var r=0;r<all_scripts.length;++r){var scr=all_scripts[r];scr.src='`+loc+`'+scr.src.replace('`+nuken_location+`','')}
var all_sources=document.getElementsByTagName('source');for(var s=0;s<all_sources.length;++s){var sou=all_sources[s];sou.src='`+loc+`'+sou.src.replace('`+nuken_location+`','')}
var all_tracks=document.getElementsByTagName('track');for(var t=0;t<all_tracks.length;++t){var tra=all_tracks[t];tra.src='`+loc+`'+tra.src.replace('`+nuken_location+`','')}
var all_videos=document.getElementsByTagName('video');for(var u=0;u<all_videos.length;++u){var vid=all_videos[u];vid.src='`+loc+`'+vid.src.replace('`+nuken_location+`','')}
</script>
<!--nuken_file_path_insert_end-->	
	`;
	
	}
	
	//reset the text boxes with our saved data (see the beginning of this function), for safekeeping.

stylebox_editor.getSession().setValue(keep_css);
markupbox_editor.getSession().setValue(keep_html);
scriptbox_editor.getSession().setValue(keep_js);


}