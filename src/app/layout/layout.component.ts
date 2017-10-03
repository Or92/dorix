import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Image } from '../model/image.model';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  images: Image[];
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'image' });

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response, status: any, headers: any) => {
      const img = JSON.parse(response);
      this.images.push({ name: img.name, src: img.src });
    };
    this.dataService.fetchImages().subscribe(data => {console.log(data);
      this.images = data;
    });
  }

  remove(i, name) {
    this.images.splice(i, 1);
    this.dataService.remove(name).subscribe(res => console.log(res));
  }

}
