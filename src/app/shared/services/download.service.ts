import { Injectable, inject, isDevMode, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, finalize } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private http = inject(HttpClient);
  private ngZone = inject(NgZone);
  constructor() { }

  downloadFile(fileName: string, customUrl?: string): void {
    const isLocal = isDevMode();
    const assetsPath = isLocal ? 'assets/downloads/' : 'assets/downloads/';
    const fileUrl = customUrl || `${assetsPath}${fileName}`;
    this.localDownload(fileUrl, fileName);
  }

  private getContentType(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    switch (extension) {
      case 'pdf': return 'application/pdf';
      case 'doc': case 'docx': return 'application/msword';
      case 'xls': case 'xlsx': return 'application/vnd.ms-excel';
      case 'zip': return 'application/zip';
      case 'txt': return 'text/plain';
      default: return 'application/octet-stream';
    }
  }

  private localDownload(url: string, fileName: string): void {
    const contentType = this.getContentType(fileName);

    this.ngZone.runOutsideAngular(() => {
      this.http.get(url, { responseType: 'blob' })
        .pipe(
          map(response => {
            return new Blob([response], { type: contentType });
          }),
          catchError(error => {
            console.error(`Error downloading file: ${error.message}`);
            this.ngZone.run(() => {
              alert(`Download fehlgeschlagen: ${error.status ? `HTTP error ${error.status}` : 'Netzwerkfehler'}`);
            });
            return of(null);
          }),
          finalize(() => {
          })
        )
        .subscribe(blob => {
          if (!blob) return;
          
          this.ngZone.run(() => {
            this.triggerBrowserDownload(blob, fileName);
          });
        });
    });
  }


  private triggerBrowserDownload(blob: Blob, fileName: string): void {
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    
    link.style.display = 'none';
    document.body.appendChild(link);
    
    link.click();
    
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    }, 100);
    
  }
}