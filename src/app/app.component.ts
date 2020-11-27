import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-table-upload';

  fileToUpload: File = null;

  constructor(private httpClient: HttpClient ) {}

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  postFile(fileToUpload: File): Observable<any> {
    console.log(fileToUpload)
    const endpoint = 'https://localhost:8000/';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
     return this.httpClient
      .post(endpoint, formData);
  }
  
  // async postFileArchive(fileToUpload: File): Promise<Observable<any>> {
  //   let file = new Archieve;
  //   file.base64 = await this.convertFile(fileToUpload);
  //   file.name = fileToUpload.name;
  //   file.size = fileToUpload.size;
  //   const endpoint = 'https://localhost:8000/';
  //    return this.httpClient
  //     .post(endpoint, file);
  // }

  // convertFile(file: File): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onload = () => resolve(reader.result.toString());
  //     } catch(error) {
  //       reject(error);
  //     }
  //   })
  // }

  uploadFileToActivity() {
    //base64
    // const reader = new FileReader();
    // reader.readAsDataURL(this.fileToUpload);
    // reader.onload = () => console.log(reader.result);
    this.postFile(this.fileToUpload)
    .subscribe(
      data => console.log('success'),
      error => console.log(error)
    );
  }
}

export class Archieve{
  name: string;
  size: number;
  base64: string;
}
