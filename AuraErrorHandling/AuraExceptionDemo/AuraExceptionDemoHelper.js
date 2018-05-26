({
	doInit : function(component, event, helper) {
		let action = component.get ('c.getRecords');
        action.setCallback (this, function (response) {
            if (response.getState () === 'SUCCESS') {
                component.set ('v.accList', response.getReturnValue ());
            } else {
				if (response.getError ()) {
                    var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                        "title": "Error",
                        "type" : "error",
                        "duration" : "10000",
                        "message": response.getError ()[0].message
                    });
                    resultsToast.fire();
                }
            }
        });
        $A.enqueueAction (action);
	}
})