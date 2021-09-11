import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from '../components/board/board.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BoardComponent,
    SettingsComponent
  ],
  exports: [
    BoardComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CommonModule
  ],
})
export class CoreModule { }
