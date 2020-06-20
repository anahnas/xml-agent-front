import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MessageService} from '../service/message.service';
import {Message} from '../model/message';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  sender: string;
  messageId: string;
  userId = '1';
  messages: Message[] = [];
  inputValue: string;

  constructor(private messageService: MessageService, private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      this.messageId = params.id;
      this.messageService.getMessage(this.messageId)
        .subscribe(message => {
          this.sender = message.sender;
          this.messageService.getMessageList(this.userId, this.sender)
            .subscribe(messages => {
              for (const m of messages) {
                if (m.receiver === 'agent') {
                  m.flag = 'received';
                } else {
                  m.flag = 'sent';
                }
                this.messages.push(m);
                console.log(m);
              }
            });
        });



    });
  }
  onKey(event) {this.inputValue = event.target.value; }

  sendMessage() {
     const msg = new Message();
     msg.sender = 'agent';
     msg.receiver = this.sender;
     msg.content = this.inputValue;
     this.messageService.sendMessage(msg)
       .subscribe(response => {
         alert('Message sent.');
         window.location.reload();
       }, error => {
         alert('Error while trying to send a message.');
         window.location.reload();
       });
  }
}
