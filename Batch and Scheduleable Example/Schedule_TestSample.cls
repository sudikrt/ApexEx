global class Schedule_TestSample implements Schedulable {
    global void execute (SchedulableContext ct) {
		System.scheduleBatch(new Batch_TestSample_1 (), 'Inner Job', 10); 
    }
}