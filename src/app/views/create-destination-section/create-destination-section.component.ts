import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbioService } from 'src/app/services/dbio.service';

@Component({
  selector: 'app-create-destination-section',
  templateUrl: './create-destination-section.component.html',
  styleUrls: ['./create-destination-section.component.scss']
})
export class CreateDestinationSectionComponent implements OnInit {
  constructor(
    private dbioService:DbioService,
    private router:Router
  ) { }

  slides:string[]=[]
  destination={
    title:"",
    metatitle:"",
    metadescription:"",
    type:"",
  }

  subsections:{ 
    "title": string,
    "description": string,
    "image": string,
    "percentage": string,
    "type":string
  }[]=[]


  ngOnInit(): void {
  }
  addSection(){
    this.subsections.push({
      "title": "",
      "description": "",
      "image": "",
      "percentage": "",
      "type":""
    })
  }
  addSlide(){
    this.slides.push("")
  }
  deleteSlide(i){
    console.log(i)
    this.slides.splice(i,1)
  }
  submit(){
    this.destination['sections']=this.subsections
    this.destination['slides']=this.slides
    this.dbioService.createDestination(this.destination).subscribe(res=>{
      this.router.navigate(['destination/update-destination/'+res['id']])
    })
  }
}
