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

  pm: boolean = false;

  routerEvent: any; //if I need to unsubscribe

  parseTrail(input: string): void {

    if( input.includes(';')){
      if(input.includes('/pm;')) {
        this.pm = true;
      }
      this.crumbtrail = input.trim()
        .replace('/searchresult', '')
        .replace('search_term=', '')
        .replace('/editform', '')
        .replace('subcat=', '')
        .replace('/tabular', '')
        .replace('/pm', '')
        .replace('cat=', '')
        .replace('category=', '')
        .replace('id=', '')
        .replace(/%20|_/g, " ")
        .split(';')
        .filter(x => x != '')
        .filter(x => x != 'mainpage');
        if(this.pm){
          this.crumtrailActive = 'Preventative Maintenance';
        } else {
          this.crumtrailActive = this.crumbtrail.pop();
        }
    } else {
      this.crumbtrail = input.trim()
      .split('/')
      .filter( x => x != '')
      .filter(x => x != 'mainpage');
      this.crumtrailActive = this.crumbtrail.pop();
    }
    this.pm = false;
  }

  redirect(input: string): void {
    console.log('bcrumb input then crumbtrail', input, this.crumbtrail);
    const indexOf = this.crumbtrail.findIndex(v => v === input);
    switch(indexOf) {
      case 0: 
        this.router.navigate([this.crumbtrail[0]]);
        break;
        //this.router.navigate(['editform', { category: theForm.category, subcat: theForm.subcat, id: theForm.form_id }]);
      case 1:
        this.router.navigate(['tabular', { cat: this.crumbtrail[0], subcat: this.crumbtrail[1] }]);
        break;
    }
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
