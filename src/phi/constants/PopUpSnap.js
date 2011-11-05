/**
 *
 * script: PopUpSnap.js
 * name: PopUpSnap
 */
var PopUpSnap = {};

PopUpSnap.LEFT = "left";
PopUpSnap.TOP = "top";
PopUpSnap.RIGHT = "right";
PopUpSnap.BOTTOM = "bottom";

PopUpSnap.mapSide = {
	left: "topLeft",
	top: "topLeft",
	right: "topRight",
	bottom: "bottomLeft"
};

PopUpSnap.mapEdge = {
	left: "topRight",
	top: "bottomLeft",
	right: "topLeft",
	bottom: "topLeft"
}
