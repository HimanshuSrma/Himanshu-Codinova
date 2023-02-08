import { Component, Inject, NgZone, OnInit, Sanitizer, SecurityContext } from '@angular/core';
import { ApiService } from './services/api-service.service';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { FilterPipe } from './filter.pipe';

import { SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = "Himanshu-Codinova"
  sanitizer: any;

  gifData: any;
  allGifData: any;
  startIndex: any = 0;
  endIndex: any = 10;
  logoUrl: any = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Giphy-logo.svg/1280px-Giphy-logo.svg.png";

  public safeSrc: SafeResourceUrl | undefined;
searchedVal: any;

  constructor(@Inject(Sanitizer) private readonly: Sanitizer,private zone:NgZone,@Inject(DOCUMENT) document: Document, public apiService:ApiService) {
    this.renderData()
  }


  sanitizeHTML(value: string | null): string {
    return this.sanitizer.sanitize(SecurityContext.HTML, value) || '';
  }

  renderData(){
    this.apiService.apiCall("https://api.giphy.com/v1/gifs/trending?api_key=Dst7UyI10lCaZeA9seXlAWA2qaXf0uGY" ).subscribe(async (result:any) => {
      if(result.meta.status=="200" || result.meta.status==200){
        console.log("result is => ",result);
        this.allGifData = result.data;
        this.gifData = this.allGifData.slice(this.startIndex,this.endIndex);

      }else{
        alert(result.message)
        console.log("else  result", result);
      }
    },err=>{
      alert("Something went wrong");
    });
  }

  pagination(type:any){
    if(type=="prev"){
      this.endIndex = this.startIndex;
      this.startIndex = this.startIndex-10;
      this.renderData();

    }else{
      this.startIndex = this.endIndex;
      this.endIndex = this.endIndex+10;
      this.renderData();
    }
  }

  ngOnInit(): void {
  }
}
