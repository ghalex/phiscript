/**
 *
 * script: ThemeManager.js
 * name: Phi.Mn.ThemeManager
 * 
 * description: Used to load themes
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 * 
 */

Phi.Mn.ThemeManager = {};
Phi.Mn.ThemeManager.directory = "assets/themes/"
Phi.Mn.ThemeManager.theme = "default";

Phi.Mn.ThemeManager.setDirectory = function( value )
{
	Phi.Mn.ThemeManager.directory = value;
}

Phi.Mn.ThemeManager.load = function( theme )
{
	var themeDir = Phi.Mn.ThemeManager.directory;
	var linkElement =  new Element('link', {
		id: "theme_" + theme,
		rel: "stylesheet",
		href: themeDir + theme + "/css/"+ theme +".css",
		type: "text/css"
	})
	
	// Unload current loaded theme
	Phi.Mn.ThemeManager.unload( Phi.Mn.ThemeManager.theme )
	
	// Load new theme
	Phi.Mn.ThemeManager.theme = theme;
	linkElement.inject( $$('head')[0] );
}

Phi.Mn.ThemeManager.unload = function( theme )
{
	var el = $("theme_" + theme );
	
	if( el )
		el.dispose();
	
}
