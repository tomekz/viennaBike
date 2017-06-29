import { NgModule } from '@angular/core';

// Material
import { MdMenuModule, MdCardModule, MdIconModule, MdButtonModule, MdSelectModule , MdListModule} from '@angular/material';

const MATERIAL_UI_MODULES = [
  MdMenuModule, 
  MdCardModule, 
  MdIconModule, 
  MdButtonModule, 
  MdSelectModule,
  MdListModule
]

@NgModule({
  imports:[
    ...MATERIAL_UI_MODULES,
  ],
  exports:[
    ...MATERIAL_UI_MODULES,
  ]
})
export class MaterialModule {
}