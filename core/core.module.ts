import { NgModule, CommonModule, Optional, SkipSelf } from '@angular/core';
import { TooltipModule } from 'ng2-bootstrap';
// .. import ..VendorModule

@NgModule({
  imports: [
      VendorModule,
      CommonModule,
      TooltipModule.forRoot()
      //... + all the /core/whatever modules 
  ],
  declarations: [],
  exports: [
      VendorModule,
      CommonModule
  ]
})
export class CoreModule {
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('Core Module is already loaded. Import in the root module only.');
        }
    }
}