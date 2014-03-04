Array.prototype.remove = function(v) { 
	this.splice(this.indexOf(v) == -1 ? this.length : this.indexOf(v), 1); 
} 

Array.prototype.contains = function(v) {
	for(var i = 0; i < this.length; i++) {
		if(this[i] === v) return true; 
	} 
	return false; 
}; 
Array.prototype.unique = function() {
	var arr = []; 
	for(var i = 0; i < this.length; i++) {
		if(!arr.contains(this[i])) {
			arr.push(this[i]); 
		} 
	} 
	return arr; 
}
jQuery.fn.extend({
insertAtCaret: function(myValue, myValueE){
  return this.each(function(i) {
    if (document.selection) {
      //For browsers like Internet Explorer
      this.focus();
      sel = document.selection.createRange();
      sel.text = myValue + myValueE;
      this.focus();
    }
    else if (this.selectionStart || this.selectionStart == '0') {
      //For browsers like Firefox and Webkit based
      var startPos = this.selectionStart;
      var endPos = this.selectionEnd;
      var scrollTop = this.scrollTop;
      this.value = this.value.substring(0,     startPos)+myValue+this.value.substring(startPos,endPos)+myValueE+this.value.substring(endPos,this.value.length);
      this.focus();
      this.selectionStart = startPos + myValue.length;
      this.selectionEnd = ((startPos + myValue.length) + this.value.substring(startPos,endPos).length);
      this.scrollTop = scrollTop;
    } else {
      this.value += myValue;
      this.focus();
    }
  })
    }
});