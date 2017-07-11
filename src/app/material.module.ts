import { NgModule } from '@angular/core';

// Material
import { MdMenuModule, MdCardModule, MdIconModule, MdButtonModule, MdSelectModule , MdListModule, MdProgressSpinnerModule} from '@angular/material';

const MATERIAL_UI_MODULES = [
  MdMenuModule,
  MdCardModule,
  MdIconModule,
  MdButtonModule,
  MdSelectModule,
  MdListModule,
  MdProgressSpinnerModule
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
