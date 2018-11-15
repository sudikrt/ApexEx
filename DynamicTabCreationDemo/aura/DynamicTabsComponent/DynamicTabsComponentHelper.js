({
	doInit : function(component, event) {
		let action = component.get ('c.getData');
        let self = this;
        action.setCallback (this, function (res){
            if (res.getState () === 'SUCCESS') {
                if (res && res.getReturnValue() && res.getReturnValue().length > 0) {
                    self.createComponent (component, res.getReturnValue());
                }
            } else {
                console.log ('Error in fetching custom MetaData');
            }
        });
        $A.enqueueAction (action);
	},
    createComponent : function (component, mdtList) {
        
        if (mdtList && mdtList.length > 0) {
            let items = {};
            var newlst =[];
            mdtList.forEach (function (val) {
                items [val.DeveloperName] = val;
            });
            component.set ('v.tabsData', items);
            mdtList.forEach (function (val) {
                $A.createComponent("lightning:tab", {
                    "label": val.MasterLabel,
                    "id":  val.DeveloperName,
                    "onactive": component.getReference("c.lazyLoadTabs")
                }, function (newTab, status, error) {
                    if (status === "SUCCESS") {
                        newlst.push(newTab);
                        component.set("v.tabs", newlst);
                    } else {
                        throw new Error(error);
                    }
                });
                
            });
            
        }
	},
    lazyLoadTabs: function (component, event) {
        var tab = event.getSource(); 
        if (tab) {
            let tabItem = component.get ('v.tabsData') [tab.get ('v.id')];
        	this.injectComponent(tabItem.foolish__ComponentName__c, JSON.parse(tabItem.foolish__Params__c), tab);
        } else {
            console.log ('Error in tab Id');
        }
        
    },
    injectComponent: function (name, params,  target) {
        if (!params) {
            params = {};
        }
        $A.createComponent(name, params, function (contentComponent, status, error) {
            if (status === "SUCCESS") {
                target.set('v.body', contentComponent);
            } else {
                throw new Error(error);
            }
        });
    }
    
})