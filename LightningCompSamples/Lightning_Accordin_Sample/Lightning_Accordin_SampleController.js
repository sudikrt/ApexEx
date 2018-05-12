({
	showActiveSection : function(component, event, helper) {
		alert (component.find ('accordion').get ('v.activeSectionName'));
	},
    setActiveSection : function(component, event, helper) {
		component.find ('accordion').set ('v.activeSectionName', 'B');
	},
    toggleCSection : function(component, event, helper) {
		component.set ('v.isVisible', !component.get ('v.isVisible'));
	}
})