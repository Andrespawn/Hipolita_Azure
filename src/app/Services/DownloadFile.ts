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
         stringToArray(bufferString) {
            const uint8Array = new TextEncoder().encode(bufferString);
            return uint8Array;
        }
        getFileFromAPI(response) {
            // window.open('data:application/octet-stream;charset=utf-16le;base64,' + response);
            // window.open('data:application/pdf,' + encodeURI(response));
            const enc = new TextEncoder();
            const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(response)));
            console.log(base64String);
                const file = new Blob([base64String], { type: 'application/pdf'  });
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
               // window.open('data:application/pdf;base64', response, '_blank');
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
        /* b64DecodeUnicode(str) {
            // Going backwards: from bytestream, to percent-encoding, to original string.
              return decodeURIComponent(atob(str).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
              }).join(''));
            }*/
        getFile(strurl) {
            // const url = `${this.serviceUrl}/pdf`;
            const httpOptions = {
              'responseType'  : 'arraybuffer' as 'json'
               // 'responseType'  : 'blob' as 'json'        //This also worked
            };
              return this.httpClient.get<any>(strurl , httpOptions);
            }
            _arrayBufferToBase64( buffer ) {
                var binary = '';
                var bytes = new Uint8Array( buffer );
                var len = bytes.byteLength;
                for (var i = 0; i < len; i++) {
                    binary += String.fromCharCode( bytes[ i ] );
                }
                return window.btoa( binary );
            }

}
