var q = function(id){
	return document.getElementById(id);
}
q('name').oninput=function(){
	debounce(function(){
		if(q('email').value || q('email').value){
			var pwnd =q('pwnd').style;
			pwnd.height='auto';
			pwnd.transform='scale(1)';
			document.activeElement.blur();
		} else {
			q('pwnd').style.transform='scale(0.01)';
		}
	})
}
var timer = null;
function debounce(callback){
	if(timer){
		clearTimeout(timer);
	}
	timer = setTimeout(callback,500);
}

