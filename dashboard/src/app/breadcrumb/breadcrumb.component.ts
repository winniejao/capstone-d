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
    this.crumbtrail = input.trim().split('/').filter( x => x != '').filter(x => x != 'mainpage');
    this.crumtrailActive = this.crumbtrail.pop();
    // https://stackoverflow.com/questions/38168408/how-to-implement-multi-level-routing-in-angular
  }

  reconstruct(input: string): string {
    var slashes = this.crumbtrail.map( x => x + '/');
    var reconstructing = [];
    slashes.forEach( x => {
      if(x != input){
        reconstructing.push(x);
      } else {
        reconstructing.push(x);
        return;
      }
    });
    var reconstructed = reconstructing.join(); 
    console.log(reconstructed, input);
    return reconstructed;
  }

  ngOnInit() {

    this.routerEvent = this.router.events
    .pipe(
      filter( (event:NavigationEnd) => event instanceof NavigationEnd))
      .subscribe( event => {
        this.parseTrail(event.urlAfterRedirects);
      });

    /* Alternative way of setting it up without rxjs pipes
    this.routerEvent = this.router.events.subscribe( (event:NavigationEnd) => {
      if(event instanceof NavigationEnd){
        console.log(event.urlAfterRedirects);        
      }
    })
    */
  }
  


}
