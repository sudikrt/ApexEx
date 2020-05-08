import { LightningElement, track, wire } from 'lwc';
import {publish, subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext} from 'lightning/messageService';
import SampleMessageChannel from'@salesforce/messageChannel/messaeChannelSample__c';

export default class MessageChannelLwcComp extends LightningElement {
    @track myMessage = '';
    @track receivedMessage = '';
    @track subscription = null;

    @wire (MessageContext) messageContext;

    constructor () {
        super ();
    }
    onInputChange (event) {
        this.myMessage = event.target.value;
    }
    onPublishClick () {
        const message = {
            message : this.myMessage,
            source : 'LWC'
        };
        publish (this.messageContext, SampleMessageChannel, message);
    }
    onSubscribeClick () {
        if (this.subscription) {
            return;
        }
        this.subscription  = subscribe (this.messageContext, SampleMessageChannel, (message) => {
            this.handleMessage (message);
        },
        {
            scope:APPLICATION_SCOPE
        }
        );
    }
    handleMessage(message) {
        this.receivedMessage = message ? JSON.stringify(message, null, '\t') : 'no message payload';
    }
    onUnSubscribeClick () {
        unsubscribe (this.subscription);
        this.subscription = null;
    }
    get subscribeStatus () {
        return this.subscription === null ? false : true; 
    }

}