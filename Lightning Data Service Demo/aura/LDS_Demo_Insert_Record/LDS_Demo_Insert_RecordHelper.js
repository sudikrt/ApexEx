({
	validateContactForm : function(component) {
		let validContact = true;
        let allValid  = component. find ('contactField').reduce (
            function (validFields, inputComp){
                inputComp.showHelpMessageIfInvalid();
                return validFields && inputComp.get ('v.validity').valid;
            }, true);
        
        if (allValid) {
            let account = component.get ("v.newContact");
            if($A.util.isEmpty(account)) {
                validContact = false;
                console.log("Quick action context doesn't have a valid account.");
            }
        	return(validContact);
            
        }
	}
})