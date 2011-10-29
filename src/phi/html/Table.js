
//--------------------------------------------------------
// Phi.HTML: HtmlTable
//--------------------------------------------------------

Phi.HTML.Table = new Class({
	Extends: HtmlTable,
		
	pushElement: function( element, trIndex, tdIndex)
	{
		var tr = new Element('tr', {});
		var td = new Element('td', {align:"left"});
		
		// If this is first TR just insert this using HtmlTable
		// push function.
		if( trIndex === null || this.body.rows.length === 0 || trIndex == this.body.rows.length )
		{
			tr.inject( this.body );
			td.inject( tr );
			element.inject(	td );
			
			return {tr: tr, td: td}; 
		}
	
		tr = this.tr( trIndex );
	
		// This creates a new TR and TD and insert the new
		// created TR at specific index.
		if( tdIndex === null )
		{
			var nextTr = tr;
			
			tr = new Element('tr', {});
			tr.inject( nextTr, 'before');
			
			td.inject( tr );
			element.inject(	td );
			
			return {tr: tr, td: td};
		}
		
		// This use an existing TR and create
		// only a new TD.
		if( tdIndex !== null && tdIndex < (tr.children.length) )
		{
			var nextTd = this.td( trIndex, tdIndex );
			
			if( nextTd )
				td.inject(nextTd, 'before' );
		}
		else
		{
			td.inject( tr );
		}
		
		element.inject(	td );
		return {tr: tr, td: td};
	},
	
	tr: function( trIndex )
	{
		return this.body.rows[trIndex];
	},
	
	td: function( trIndex, tdIndex )
	{
		return this.tr( trIndex ).getChildrenByTag('td')[tdIndex];
	}
});