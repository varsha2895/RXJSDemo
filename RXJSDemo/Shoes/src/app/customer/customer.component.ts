import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import {HttpParams} from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';


class Customer {
    id : number;
  name: string;
  email: string;
  tel: string;
}

@Component({
  selector: 'customers',
  templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit {

    customersObservable : Observable<Customer[]>;
    customerObs : Customer[];
    newCust : Customer;
    id : string;
    message : string;
    input : string;

    getid:Number;


    constructor(private httpClient:HttpClient,private route : ActivatedRoute) {}

    ngOnInit() {
      this.message="";
      //this.id=this.route.snapshot.paramMap.get('id').toString();
      
         this.getAll();
        
    }

    getAll(){
      this.customersObservable=this.httpClient
         .request<Customer[]>("GET","http://localhost:3000/customers");
    }

    getByID(){
      this.input=((document.getElementById("idval") as HTMLInputElement).value);
      const params=new HttpParams().set("name",this.input);
      this.customersObservable=this.httpClient
        .request<Customer[]>("GET","http://localhost:3000/customers/",{params});
        /*.subscribe(
          data => {
              console.log("Request is successful ", data);
              this.customerObs=data;
          },
          error => {
              console.log("Error", error);
              this.message="Invalid ID";
          }
      ) ;*/
    }


    addCustomer(){
      this.newCust=new Customer();
     
      this.newCust.name=((document.getElementById("ipname") as HTMLInputElement).value);
      this.newCust.email=((document.getElementById("ipemail") as HTMLInputElement).value);
      this.newCust.tel=((document.getElementById("iptel") as HTMLInputElement).value);
      this.httpClient
        .post("http://localhost:3000/customers",{
          "name":this.newCust.name,
          "email":this.newCust.email,
          "tel":this.newCust.tel
        })
        .subscribe(
          data => {
              console.log("Request is successful ", data);
              this.getAll();
              this.clear();
          },
          error => {
              console.log("Error", error);
          }
      ) ;
     }


    delCustomer(){
      this.newCust =new Customer();
      this.newCust.id=parseInt((document.getElementById("ipid") as HTMLInputElement).value);
      this.httpClient.delete("http://localhost:3000/customers/"+this.newCust.id)
      .subscribe(
        data => {
            console.log("Request is successful ", data);
            this.getAll();
            this.clear();
        },
        error => {
            console.log("Error", error);
        }
    ) ;
    }   

    updateCustomer(){
      this.newCust =new Customer();
      this.newCust.id=parseInt((document.getElementById("ipid") as HTMLInputElement).value);
      this.newCust.name=((document.getElementById("ipname") as HTMLInputElement).value);
      this.newCust.email=((document.getElementById("ipemail") as HTMLInputElement).value);
      this.newCust.tel=((document.getElementById("iptel") as HTMLInputElement).value);
      this.httpClient.patch("http://localhost:3000/customers/"+this.newCust.id,{
        "name":this.newCust.name,
        "email":this.newCust.email,
        "tel":this.newCust.tel
      }).subscribe(
        data => {
            console.log("Request is successful ", data);
            this.getAll();
            this.clear();
        },
        error => {
            console.log("Error", error);
        }
    ) ;
    } 
    
    clear(){
      (document.getElementById("ipid") as HTMLInputElement).value="";
      (document.getElementById("ipname") as HTMLInputElement).value="";
      (document.getElementById("ipemail") as HTMLInputElement).value="";
      (document.getElementById("iptel") as HTMLInputElement).value="";
    }

}