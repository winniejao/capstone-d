import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashService } from '../dash.service';


@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
  theList: string[] = [
    'Alpha',
    'Boiler',
    'Charlie',
    'Delta',
    'Echo',
    'Foxtrot',
    'Golf',
    'Hotel',
    'India',
    'Bravo',
    'AnotherA',
    'Quite a few options',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Zed',
    'Mike'
  ];

  //display: string[] = this.theList;
  display: string[] = [];
  alphabet: string[] = [];
  selected = "";
  path: string = "";

  //Flag to render the main add subcategory div
  addBox = false; 
  //The value of the new category
  @Input() addVal: string;
  confirmBox = false;


  select(item){
    this.selected = item;
    this.display = this.theList.filter(word => word.charAt(0) === this.selected);
    this.closeBoxes();
  }

  clear(){
    this.selected = '';
    this.display = this.theList;
    this.closeBoxes();
  }

  closeBoxes(){
    this.addBox = false;
    this.confirmBox = false;
    this.addVal = '';
  }

  //First step to adding a new subcategory, bring up the addbox.
  addSub(){
    this.addBox = true;    
  }

  //We've recieved an item
  //Bring up the confirm box to confirm this item
  confirm(item){
    console.log(item);
    this.confirmBox = true;
  }

  //The item has been confirmed, add and make a service request
  addConfirm(item){
    this.service.addSubcategory(this.path, item).subscribe(res => {
      //If successful
      this.theList.push(this.addVal);
      this.select(this.addVal.charAt(0));
      this.closeBoxes();
    })

  }
  
  constructor(private route: ActivatedRoute, private service: DashService) { }

  ngOnInit() {
    this.path = this.route.snapshot.url.toString();
    
    //Naive way to get an array of A-Z
    for(var i = 0; i < 26; i++){
      this.alphabet.push(String.fromCharCode(65+i));
    }

    this.service.getSubCat(this.path).subscribe( x => {
      this.theList = x;
      this.clear();
    }); 
  }

}
