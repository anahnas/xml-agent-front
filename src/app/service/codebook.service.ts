import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CodebookService {
  private readonly codebookUrl: string;
  constructor(private http: HttpClient) {
    this.codebookUrl = 'http://localhost:8086/codebook/getCodebook';
  }
  getCodeBook() {
    return this.http.get(this.codebookUrl);

  }


}
