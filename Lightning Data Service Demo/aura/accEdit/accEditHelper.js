({
	handleSaveRecord : function(component, event) {
		component.find ('record').saveRecord ($A.getCallback (function (saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                console.log ("Save Completed");
            }  else if (saveResult.state === 'INCOMPLETE') {
  				console.log ("Save Incompelete");              
            } else if (saveResult.state === 'ERROR' ) {
                console.log ("ERROr", saveResult.error);
            } else {
                console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
            }
         }));
	}
})