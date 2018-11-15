public class DynamicTabsCntl {
	
    @AuraEnabled
    public static List< foolish__TabsOnLightningComponent__mdt > getData () {
        return [SELECT Id, foolish__ComponentName__c , DeveloperName, MasterLabel,  foolish__IsActive__c ,foolish__Params__c  
                FROM foolish__TabsOnLightningComponent__mdt WHERE  foolish__IsActive__c = true];
    }
}