import { Component, OnInit } from '@angular/core';
import 'fecha';
import fechaObj from 'fecha';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  fecha = '';
  image;
  uploadedImage: Blob;
  constructor(
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.fecha = fechaObj.format(new Date(), 'D [de] MMMM [de] YYYY');
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const ima = inputValue.files[0];
   // let container = inputValue.parentNode;
   // container.file = ima;
    /* this.ng2ImgMax.compressImage(ima, 0.030).subscribe( */
    this.ng2ImgMax.resizeImage(ima, 400, 400).subscribe(
      result => {
        this.uploadedImage = result;
        const myReader: FileReader = new FileReader();
        myReader.readAsDataURL(this.uploadedImage);
        myReader.onload = (e) => {
          this.image = myReader.result;
          /* this.element.avatar = <string>myReader.result; */
          console.log(myReader.result);
        //  container.style.backgroundImage = `url(${myReader.result})`;
        };
        //  myReader.readAsDataURL(ima);
      },
      error => {
        console.log('ߘ Oh no!', error);
      }
    );
  }
}
