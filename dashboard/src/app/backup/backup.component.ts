import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { DashService } from '../dash.service';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent implements OnInit {

  constructor(
    private _electronService: ElectronService,
    private service: DashService) { }

  //remote.dialog.showOpenDialog({ properties: ['openFile', 'openDirectory']})

  backup(): void {
    const path = this._electronService.remote.dialog.showOpenDialog( { properties: ['openDirectory']});
    console.log(path);
    if(path && path.length) {
      this.service.backup(path[0]).subscribe(res => console.log(res));
    }

  }

  restore(): void {
    const path = this._electronService.remote.dialog.showOpenDialog( { properties: ['openDirectory']});
    this.service.restore(path[0]).subscribe(res => console.log(res));

  }

  test(path: string): void {
    console.log(this._electronService);
    const p = this._electronService.remote.dialog.showOpenDialog( { properties: ['openDirectory']});
    console.log(p);
  }

  ngOnInit() {
  }

}
