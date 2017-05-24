import { NgModule } from '@angular/core';

// Material
import { MdMenuModule, MdCardModule, MdIconModule, MdButtonModule, MdSelectModule } from '@angular/material';

const MATERIAL_UI_MODULES = [
  MdMenuModule, 
  MdCardModule, 
  MdIconModule, 
  MdButtonModule, 
  MdSelectModule
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