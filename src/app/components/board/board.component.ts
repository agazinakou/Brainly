
import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import {
  Base64ToGallery,
  Base64ToGalleryOptions
} from '@ionic-native/base64-to-gallery/ngx';
import { OcrService } from 'src/app/services/ocr.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements AfterViewInit {

  @ViewChild('imageCanvas', { static: false }) canvas: any;
  canvasElement: any;
  saveX: number;
  saveY: number;
  drawing = false;

  selectedColor = '#9e2956';
  colors = [
    '#9e2956',
    '#c2281d',
    '#de722f',
    '#edbf4c',
    '#5db37e',
    '#459cde',
    '#4250ad',
    '#802fa3'
  ];
  lineWidth = 14;

  exercices: any[]= [];

  constructor(
    private plt: Platform,
    private base64ToGallery: Base64ToGallery,
    private toastCtrl: ToastController,
    private ocr: OcrService,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) {
    this.exercices = [{
      image: 'assets/data/a.png',
      word: 'a'
    },{
      image: 'assets/data/b.png',
      word: 'b'
    }];
  }

  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.plt.width() + '';
    this.canvasElement.height = this.plt.height() - 100;
  }

  async check(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });

    await loading.present();

    const dataUrl = this.canvasElement.toDataURL();

    const result = await this.ocr.doOCR(dataUrl);
    let msg = '';
    if(result === 'a'){
      msg = 'Congratulations you wrote the word very well';
    } else {
      msg = 'Congratulations you wrote the word very well';
    }

    await loading.dismiss();

    const alert = await this.alertController.create({
      header: 'Result',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }


  selectColor(color) {
    this.selectedColor = color;
  }

  startDrawing(ev) {
    console.log(ev);
    this.drawing = true;
    const canvasPosition = this.canvasElement.getBoundingClientRect();

    this.saveX = ev.pageX - canvasPosition.x;
    this.saveY = ev.pageY - canvasPosition.y;
  }

  startDrawingMobile(ev) {
    console.log(ev);
    this.drawing = true;
    const canvasPosition = this.canvasElement.getBoundingClientRect();

    this.saveX = ev.touches[0].pageX - canvasPosition.x;
    this.saveY = ev.touches[0].pageY - canvasPosition.y;
  }

  endDrawing() {
    this.drawing = false;
  }

  moved(ev) {
    if (!this.drawing) {
      return;
    };
    const canvasPosition = this.canvasElement.getBoundingClientRect();
    const ctx = this.canvasElement.getContext('2d');

    const currentX = ev.pageX - canvasPosition.x;
    const currentY = ev.pageY - canvasPosition.y;

    ctx.lineJoin = 'round';
    ctx.strokeStyle = this.selectedColor;
    ctx.lineWidth = this.lineWidth;

    ctx.beginPath();
    ctx.moveTo(this.saveX, this.saveY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();

    ctx.stroke();

    this.saveX = currentX;
    this.saveY = currentY;
  }

  movedMobile(ev) {
    if (!this.drawing) {
      return;
    };
    const canvasPosition = this.canvasElement.getBoundingClientRect();
    const ctx = this.canvasElement.getContext('2d');

    const currentX = ev.touches[0].pageX - canvasPosition.x;
    const currentY = ev.touches[0].pageY - canvasPosition.y;

    ctx.lineJoin = 'round';
    ctx.strokeStyle = this.selectedColor;
    ctx.lineWidth = this.lineWidth;

    ctx.beginPath();
    ctx.moveTo(this.saveX, this.saveY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();

    ctx.stroke();

    this.saveX = currentX;
    this.saveY = currentY;
  }

  clearCanvas() {
    const ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  progress(e?){
    console.log(e);
  }

  exportCanvasImage() {
    const dataUrl = this.canvasElement.toDataURL();
    this.clearCanvas();
    if (this.plt.is('cordova')) {
      const options: Base64ToGalleryOptions = {
        prefix: 'canvas_',
        mediaScanner: true
      };

      this.base64ToGallery.base64ToGallery(dataUrl, options).then(
        async res => {
          const toast = await this.toastCtrl.create({
            message: 'Image saved to camera roll.',
            duration: 2000
          });
          toast.present();
        },
        err => console.log('Error saving image to gallery ', err)
      );
    } else {
      const data = dataUrl.split(',')[1];
      const blob = this.b64toBlob(data, 'image/png');

      const a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = 'canvasimage.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    const sliceSize = 512;
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

}
