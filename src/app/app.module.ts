import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {  FileUploadModule } from 'ng2-file-upload';

import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FileUploadModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
