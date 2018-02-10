import { NgModule } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';

@NgModule({
	imports: [
		MatGridListModule,
		MatListModule,
		MatTableModule
	],
	exports: [
		MatGridListModule,
		MatListModule,
		MatTableModule
	]
})
export class SharedModule{}