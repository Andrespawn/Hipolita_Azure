import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class DownloadFile {

        constructor(private httpClient: HttpClient) {
        }
        getFileDownload(url, typeFileName ) {
            this.getFile(url).subscribe((response) => {
                const file = new Blob([response], { type: 'application/' + typeFileName });
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL); } );
        }
        getFile(strurl) {
            // const url = `${this.serviceUrl}/pdf`;
            const httpOptions = {
              'responseType'  : 'arraybuffer' as 'json'
               // 'responseType'  : 'blob' as 'json'        //This also worked
            };
              return this.httpClient.get<any>(strurl , httpOptions);
            }
}
