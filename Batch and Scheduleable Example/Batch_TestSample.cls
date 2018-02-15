/*
 * 
 * This is simple Demo Batch Apex With DataBase StatFul, Chain of Batch 
*/

global class Batch_TestSample implements Database.Batchable<sObject>, Database.Stateful {
    private Integer execCount  = 0;
    global Database.QueryLocator start (Database.BatchableContext context) {
        return Database.getQueryLocator ('SELECT ID, Name from Account WHERE Name LIKE \'Test Acc%\' ');
    }
    
    global void execute (Database.BatchableContext context, List<Sobject> scope) {
		System.debug('************** : ExecCount :  ' + ++execCount );
        
        
        // Do Some Big Process:
        // 
        
       	//  System.debug('>>> execute start at ' + DateTime.now().format('yyyy/MM/dd hh:mm:ss'));
        // Reference: https://www.xgeek.net/salesforce/a-way-to-make-thread-sleep-in-apex/
        //Long startTime = DateTime.now().getTime();
        //Long finishTime = DateTime.now().getTime();
        //while ((finishTime - startTime) < 5000) {
          //sleep 5s
          //finishTime = DateTime.now().getTime();
       	// }
        //System.debug('>>> execute end at ' + DateTime.now().format('yyyy/MM/dd hh:mm:ss'));
    }
    global void finish (Database.BatchableContext context) {
    	System.debug('Finished : ' + execCount);
        
       	AsyncApexJob job = [SELECT Id, Status FROM AsyncApexJob WHERE Id = :context.getJobId()]; 
    	System.debug('******** JOB Status ' + job.Status);
 
        System.debug('Inner BatchId :' + Database.executeBatch(new Batch_TestSample_1 (), 150));
    }
}