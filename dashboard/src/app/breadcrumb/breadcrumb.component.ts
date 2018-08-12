import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment, Router, NavigationEnd  } from '@angular/router';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }
  crumbtrail: string[] = [];
  crumtrailActive: string;

  routerEvent: any; //if I need to unsubscribe

  parseTrail(input: string): void {
    this.crumbtrail = input.trim()
      .split('/')
      .filter( x => x != '')
      .filter(x => x != 'mainpage');
    this.crumtrailActive = this.crumbtrail.pop();
  }

  
  reconstruct(input): string {
    const indexOf = this.crumbtrail.findIndex(v => v === input);
    if (indexOf === -1) { return ''; }
    return this.crumbtrail.slice(0, indexOf+1).join('/');    
}

  ngOnInit() {

    this.routerEvent = this.router.events
    .pipe(
      filter( (event:NavigationEnd) => event instanceof NavigationEnd))
      .subscribe( event => {
        this.parseTrail(event.urlAfterRedirects);
      });
  }
  


}
