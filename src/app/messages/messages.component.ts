import { Component, OnInit } from '@angular/core';
import {MessageService} from '../service/message.service';
import {Message} from '../model/message';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[] = [];
  senders: string[] = [];

  constructor(private messageService: MessageService,  private router: Router,  private route: ActivatedRoute) { }

  ngOnInit() {
    this.messageService.getMessages('1') // it's one agent on this frontend
      .subscribe( messages => {
        for ( const m of messages) {
          if (!this.senders.includes(m.sender)) {
            this.senders.push(m.sender);
            this.messages.push(m);
          }
        }
      });
  }

  openMessage(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }

}
