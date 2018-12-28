import { Component, OnInit } from '@angular/core';


import { ToastService } from '../../_shared/services/toast/toast.service';
import { HttpService } from '../../_shared/services/http/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  addQuestion: boolean = false;
  questionArray: any = [];
  subjectArray: any;
  topicArray: any;
  type: any = 'MULTIPLE_CHOICE';
  subject: any;
  topic: any;
  subjectId: any;
  topicId: any;
  search:Boolean=true;
  Action:any;
  constructor(private httpService: HttpService, private toast: ToastService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      console.log({ 'SubId': data.subjectId, 'topId': data.topicId })
      let { subjectId, topicId } = data
      if (subjectId !== undefined && topicId !== undefined) {
        this.httpService.get(`question/${subjectId}/${topicId}`).subscribe((data: any) => {
          console.log(data.docs)
          this.questionArray = data.docs
          this.httpService.get(`subject/getOne/${subjectId}`).subscribe(sub => {
            this.subjectId = subjectId
            console.log(sub['docs'].name)
            this.subject = sub['docs'].name
            this.setSubject()
          })
          this.httpService.get(`topic/getOne/${topicId}`).subscribe(top => {
            console.log(top['docs'].name)
            this.topic = top['docs'].name
          })
        })
      }
    })
    this.httpService.get(`subject/getAll/`).subscribe((data: any) => {
      console.log(data.docs)
      this.subjectArray = data.docs
    })
  }

  setSubject() {
    this.search = true
    console.log(this.subject)
    this.subjectArray.forEach(element => {
      if (element.name === this.subject) {
        this.subjectId = element._id
        this.httpService.get(`topic/${this.subjectId}`).subscribe((data: any) => {
          console.log(data.docs);
          this.topicArray = data.docs
        })
      }
    });
  }

  setTopic() {
    console.log('topic selected')
    this.search = false;
    console.log(this.topic)
    this.topicArray.forEach(element => {
      if (element.name === this.topic) {
        this.topicId = element._id
        console.log(this.topicId)
      }
    });
  }

  addNewQuestion() {
    this.addQuestion = !this.addQuestion;
  }

  typeChanged() {
    console.log(this.type)
  }
  searchForQuestion() {
    console.log({ topic: this.topicId, subject: this.subjectId })
    let topic = this.topicId;
    let subject = this.subjectId;
    this.httpService.get(`question/${subject}/${topic}`).subscribe((data: any) => {
      console.log(data.docs)
      this.questionArray = data.docs
    })
  }

  delete(id) {
    console.log(id)
    let question_id = id
    this.httpService.delete(`question/delete/${question_id}`).subscribe((data: any) => {
      this.httpService.get(`question/${this.subject}/${this.topic}`).subscribe((data: any) => {
        this.questionArray = data.docs
        this.toast.addToast(this.toast.TOAST_TYPES.SUCCESS, 'Deleted')
      })
    })
  }
}
