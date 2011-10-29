/**
 *
 * script: Modal.js
 * name: Phi.UI.Modal
 * 
 * description: This component is used by PopUp component to display itself as
 * 				modal PopUp.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/Component
 * 
 */
Phi.UI.Modal = new Class({
	Extends: Phi.UI.Component,
	Binds: ['onAdded','onWindowResize'],
	
	initialize: function()
	{
		this.parent();
		this.addEvent('added', this.onAdded);
	},
	
	
	createElement: function()
	{
		return new Element("div", {'class':'phi-Modal'});
	}.protect(),
	
	initElement: function()
	{
		this.parent();
		
		$(this).setStyle('position', 'absolute');
		$(this).setStyle('top', '0px');
		$(this).setStyle('left', '0px');
		
	}.protect(),
	
	updateSize: function()
	{
		var size = window.getSize();
		this.setSize(size.x, size.y);
	},
	
	onAdded: function()
	{
		this.updateSize();
	}
	
});