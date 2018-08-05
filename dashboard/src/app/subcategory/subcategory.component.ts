import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  display: string[] = this.theList;
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
    console.log("HTTP service request! Item: " + item);
    //If successful
    this.theList.push(this.addVal);
    this.select(this.addVal.charAt(0));
    this.closeBoxes();
  }
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //Naive way to get an array of A-Z
    for(var i = 0; i < 26; i++){
      this.alphabet.push(String.fromCharCode(65+i));
    }

    this.path = this.route.snapshot.url.toString();
 
  }

}
