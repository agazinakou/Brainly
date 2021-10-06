import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { createWorker } from 'tesseract.js';

export type ProgressFn = (progress: number) => void;

@Injectable({
  providedIn: 'root'
})
export class OcrService {

  constructor() {}

  async doOCR(file) {
    const worker = createWorker({
      logger: m => console.log('logger', m),
    });
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(file);
    await worker.terminate();
    console.log(text);
    return text.toLowerCase();
  }
}
