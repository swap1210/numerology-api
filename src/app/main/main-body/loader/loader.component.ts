import { Component } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  constructor(public be: BackendService) {}
  fileName = '';
  fileContent: string | ArrayBuffer | null | undefined;
  public onChange(fileList: any): void {
    let file = fileList.files[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    self.fileName = file.name; //console.log(file);
    fileReader.onloadend = function (x) {
      self.fileContent = fileReader.result;
      self.be.load_dictionary(String(self.fileContent));
    };
    fileReader.readAsText(file);
  }
}
