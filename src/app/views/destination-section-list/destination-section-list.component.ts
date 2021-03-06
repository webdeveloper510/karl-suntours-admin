import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbioService } from 'src/app/services/dbio.service';

@Component({
  selector: 'app-destination-section-list',
  templateUrl: './destination-section-list.component.html',
  styleUrls: ['./destination-section-list.component.scss']
})
export class DestinationSectionListComponent implements OnInit {
  sections:any=[]
  destinationId=''
  constructor(
    private dbioService:DbioService,
    private activatedRoute : ActivatedRoute, 
    private router:Router
  ) { }

  ngOnInit(): void {
    this.destinationId =  this.activatedRoute.snapshot.params.id
   this.sectionList()
  }
  sectionList(){
    this.dbioService.getDestinationSections(this.destinationId).subscribe(res=>[
      this.sections =res
     ])
  }
  edit(id){
    this.router.navigate(['destination/'+this.destinationId+'/section/'+id])
  }
  add(){
    this.router.navigate(['destination/add-section-destination/'+this.destinationId+'/'])
  }
  delete(id){
    console.log(id)
    let data ={
      destinationId:this.destinationId,
      sectionId:id
    }
    this.dbioService.deleteDestinationpageSection(this.destinationId,id).subscribe((res:any)=>{
      console.log(res)
      if(res.success==true){
        this.sectionList()
      }
    })
 
  }
}
