
function download(filename, text) {
	text = text.replace(file_path_insert,'');
	console.log('Downloader initiated.');
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

var download_project = function(){
console.log('Project downloaded successfully.');
var project_title = document.getElementById('filebox').value;

download(project_title, completed_project);
};


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

var file_path_insert = "";

var init_custom_file_paths = function(){

	var keep_html = document.getElementById('markupbox').value;
	var keep_css = document.getElementById('stylebox').value;
	var keep_js = document.getElementById('scriptbox').value;

	var loc = document.getElementById('custom_file_path_input').value.toString();
	
	if (loc == ""){
		
	file_path_insert = "";	
		
	} else {

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

document.getElementById('markupbox').value = keep_html;
document.getElementById('stylebox').value = keep_css;
document.getElementById('scriptbox').value = keep_js;


}