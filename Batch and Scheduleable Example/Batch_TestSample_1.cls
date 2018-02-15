global class Batch_TestSample_1 implements Database.Batchable<sObject>, Database.Stateful {
    private Integer execCount  = 0;
    global Database.QueryLocator start (Database.BatchableContext context) {
        return Database.getQueryLocator ('SELECT ID, Name from Account WHERE Name LIKE \'Test Acc%\' ');
    }
    
    global void execute (Database.BatchableContext context, List<Sobject> scope) {
        
        List<Account> acList = new List<Account> ();
        for (sObject accObj : scope) {
            Account acc = (Account) accObj;
            acc.Email__c = 'sam@mail.com';
            acList.add (acc);
            execCount++;
        }
        update acList;
       
    }
    global void finish (Database.BatchableContext context) {
    	System.debug('Finished : ' + execCount);
    }
}