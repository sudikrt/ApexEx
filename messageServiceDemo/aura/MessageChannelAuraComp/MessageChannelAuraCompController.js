({
    handleMessage : function(component, event, helper) {
        if (event && event !== null &&  event.getParam("message") !== null) {
            component.set ('v.message',  JSON.stringify(event.getParams(), null, '\t'));
        }
    },
    onPublishClick : function (component, event, helper) {
        var message = {
            message: component.get("v.myMessage"),
            source: "Aura"
        };
        component.find("messageChannel").publish(message);
    }
})
