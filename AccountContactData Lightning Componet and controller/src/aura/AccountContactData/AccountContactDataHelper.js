({
	getContactByAccount : function(component, event) {
        console.log('Entered Helper');
        var action = component.get ('c.getContactByAccount');
        action.setParams ({accId : component.get ("v.recordId")});
        
        action.setCallback (this, function (response) {
            var state  = response.getState ();
            console.log(state);
            if (state == 'SUCCESS') {
             	var contactList = response.getReturnValue ();
                console.log('Contact List : ');
                console.log(contactList);
                if (contactList != null && contactList.length  > 0) {
                    component.set ('v.contactList', contactList);
                } else {
                    component.set ('v.errMsg', 'List is empty');
                }
            }
        });
        
        $A.enqueueAction (action);
	}
})