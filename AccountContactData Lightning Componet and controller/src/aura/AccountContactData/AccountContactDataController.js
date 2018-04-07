({
	doInit : function(component, event, helper) {
        console.log('Entred Controller');
		helper.getContactByAccount(component, event);
	}
})