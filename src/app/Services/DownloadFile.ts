import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
    providedIn: 'root'
})

export class DownloadFile {

    constructor(private httpClient: HttpClient, private spinner: NgxSpinnerService) {
    }
    getDownloadCSV(url, nombreArchivo) {

        this.getFile(url).subscribe((response) => {
            var csvData = new Blob([response], { type: 'text/csv;charset=utf-8;' });
            var csvURL = window.URL.createObjectURL(csvData);
            var tempLink = document.createElement('a');
            tempLink.href = csvURL;
            tempLink.setAttribute('download', nombreArchivo);
            tempLink.click();
        });
    }

    getFileDownload(url, typeFileName) {
        this.spinner.show();
        this.getFile(url).subscribe((response) => {
            const file = new Blob([response], { type: 'application/' + typeFileName });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
        });
        this.spinner.hide();
    }
    stringToArray(bufferString) {
        const uint8Array = new TextEncoder().encode(bufferString);
        return uint8Array;
    }
    getFileFromAPI(response) {
        const enc = new TextEncoder();
        const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(response)));
        console.log(base64String);
        const file = new Blob([base64String], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
    }
    stringToUint(data) {
        const file: string = btoa(unescape(encodeURIComponent(data))),
            charList = file.split(''),
            uintArray = [];
        for (let i = 0; i < charList.length; i++) {
            uintArray.push(charList[i].charCodeAt(0));
        }
        return new Uint8Array(uintArray);
    }

    getFile(strurl) {
        const httpOptions = {
            'responseType': 'arraybuffer' as 'json'
        };
        return this.httpClient.get<any>(strurl, httpOptions);
    }
    _arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

}
