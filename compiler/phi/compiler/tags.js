
/**
 *
 * name: Tag
 * description: Base class for all tags.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 * 
 */
var Tag = new Class({
   
    tagName: null,
    tagParent: null,
    jsClassName: null,
    
    options: {},
   
    initialize: function()
    {
        console.log('tag created');       
    }
});

/**
 *
 * name: ContainerTag
 * description: Base class for all container tags.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *      - Tag
 * 
 */
var ContainerTag = new Class({
    Extends: Tag,
    
    tags: [],
    
    initialize: function()
    {
        console.log('container tag created');       
    },
    
    addChild: function( tag )
    {
        tag.parent = this;
        this.tags.push( tag );
    },
    
    removeChild: function( tag )
    {
        tag.parent = null;
        this.tags.splice(this.tags.indexOf( tag ), 1);
    },
    
    getChildren: function()
    {
        return tags;
    }
});

exports.Tag = Tag;
exports.ContainerTag = ContainerTag;