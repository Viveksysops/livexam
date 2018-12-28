import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../_shared/services/http/http.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  subjectsArray: any;
  subjectData:FormGroup = this.fb.group(
    {
      subjectName: ['',Validators.required],
    }
  )
  constructor( private http:HttpService,private route:ActivatedRoute,private fb:FormBuilder) { }

  ngOnInit() {
    this.http.get(`subject/getAll/`).subscribe((data: any) => {
      this.subjectsArray = data.docs
      console.log(this.subjectsArray)
    })
  }
delete(subject){
  let _id = subject._id
  this.http.delete(`subject/delete/${_id}`).subscribe(data=>{
    console.log(data)
    this.http.get(`subject/getAll/`).subscribe((data: any) => {
      this.subjectsArray = data.docs
      console.log(this.subjectsArray)
    })
  })
}

submit(formData){
let subject = formData.value.subjectName
this.http.post(`subject/save/${subject}`).subscribe(data=>{
  this.http.get(`subject/getAll/`).subscribe((data: any) => {
    this.subjectsArray = data.docs
    console.log(this.subjectsArray)
    this.subjectData.reset()
  })
})
}
}
