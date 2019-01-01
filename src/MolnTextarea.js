var MolnTextarea = new Class({
	div:false,
	pre:false,
	span:false,
	textarea:false,

	initialize:function(a){
		this.textarea=document.id(a);
		if ( ! this.textarea || this.textarea.get("tag") != "textarea") {
			return;
		}
		this.textarea.store('molntextarea_object', this);
		this._createMarkup();
		this.textarea.addEvent('input', this.input.bind(this));
		this.input();
	},
	
	_createMarkup:function(){
		this.div = new Element('div.molnTextarea.active');
		this.pre = new Element('pre',{html: '<br/>'});
		this.span = new Element('span');
		this.span.inject(this.pre, 'top');
		this.div.inject(this.textarea, 'after').adopt(this.pre).adopt(this.textarea);
	},
	
	input:function(){
		this.span.set('text', this.textarea.get('value'));
	}
});

Elements.implement({
	molnTextarea:function(){
		this.each(function(a){
			new MolnTextarea(a)
		});
		return this
	}
});

Element.implement({
	molnTextarea:function(){
		new MolnTextarea(document.id(this));
		return this
	}
});

Element.Properties.molnTextarea={
	get:function(){
		return this.retrieve('molntextarea_object')
	}
};