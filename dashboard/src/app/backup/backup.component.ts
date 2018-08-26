import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent implements OnInit {
  filepath: string;

  constructor() { }

  test(path: string): void {
    this.filepath = path;
    console.log(this.filepath);
  }

  ngOnInit() {
  }

}
