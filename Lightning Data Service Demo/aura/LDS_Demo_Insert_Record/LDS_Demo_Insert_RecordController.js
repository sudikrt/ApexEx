({
	doInit : function(component, event, helper) {
		component.find ('contactCreator').getNewRecord (
        "Contact",
        null,
        false,
            $A.getCallback(function () {
                let record = component.get ('v.newContact');
                let error = component.get ('v.errMsg');
                if (error || record == null) {
                    console.log("Error initializing record template: " + error);
                } else {
                    console.log("Record template initialized: " + record.sobjectType);
                }
            }));
	},
    handleSaveContact :function (component , event, helper) {
        if (helper.validateContactForm (component)) {
            component.set ('v.simpleContact.AccountId', component.get ('v.recordId'));
            component.find ('contactCreator').saveRecord (function (saveResult) {
                if (saveResult.state === 'SUCCESS' || saveResult.state === 'DRAFT') {
                    let resultToast = $A.get ('e.force:showToast');
                    resultToast.setParams ({
                        "title" : "Saved",
                        "message" : "This Record is saved"
                    });
                    
                    resultToast.fire ();
                    $A.get("e.force:refreshView").fire();

                   // $A.enqueueAction(component.get('c.doInit'));
                    
                } else if (saveResult.state === 'INCOMPLETE') {
                    console.log("User is offline, device doesn't support drafts.");
                } else if (saveResult.state === 'ERROR') {
                    console.log('Problem saving contact, error: ' + 
                                 JSON.stringify(saveResult.error));
                } else {
                     console.log('Unknown problem, state: ' + saveResult.state +
                                ', error: ' + JSON.stringify(saveResult.error));
                }
            });
        }
    }
})