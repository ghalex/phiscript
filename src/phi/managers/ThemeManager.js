/**
 *
 * script: ThemeManager.js
 * name: phi.mn.ThemeManager
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

phi.mn.ThemeManager = {};
phi.mn.ThemeManager.directory = "assets/themes/";
phi.mn.ThemeManager.theme = "default";

phi.mn.ThemeManager.setDirectory = function( value )
{
	phi.mn.ThemeManager.directory = value;
};

phi.mn.ThemeManager.load = function( theme )
{
	var themeDir = phi.mn.ThemeManager.directory;
	var linkElement =  new Element('link', {
		id: "theme_" + theme,
		rel: "stylesheet",
		href: themeDir + theme + "/css/"+ theme +".css",
		type: "text/css"
	});
	
	// Unload current loaded theme
	phi.mn.ThemeManager.unload( phi.mn.ThemeManager.theme );
	
	// Load new theme
	phi.mn.ThemeManager.theme = theme;
	linkElement.inject( $$('head')[0] );
};

phi.mn.ThemeManager.unload = function( theme )
{
	var el = $("theme_" + theme );
	
	if( el )
		el.dispose();
	
};
