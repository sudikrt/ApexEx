public class AccountContactHandler {
	@auraEnabled
    public static List<Contact> getContactByAccount (String accId) {
        return [SELECT Id, Name FROM Contact where AccountId =: accId ];
    }
}