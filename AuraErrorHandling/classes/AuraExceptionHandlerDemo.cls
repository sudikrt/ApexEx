public class AuraExceptionHandlerDemo {

    @AuraEnabled
    public static List<Account> getRecords () {
        List<Account> result;
        try {
            String query = 'SELECT Id, Name, FR__c from Account LIMIT 10';
            /*
             * Uncomment this line to disable throwing error
            	String query = 'SELECT Id, Name from Account LIMIT 10';
			*/
            result = (List<Account>) DataBase.query(query);
        } catch (Exception e) {
            AuraHandledException exept = new AuraHandledException (e.getMessage ());
            exept.setMessage (e.getMessage());
			throw exept;
        }
        return result;
    }
}