import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent 
{
  title = 'TaskManagement';
http:any;
  taskService: any;
constructor (http : HttpClient)
{
    this.http=http;
}
baseurl='http://localhost:8080/';

username:String="";
password:String='';
 login()
  {
      let obj=[this.username, this.password];
      let url=this.baseurl+'login';
      this.http.post(url,obj).subscribe((data:any)=>
        {
              if(data==null || data==0)
              {
                window.alert('something is wrong')
              }
              else
              {
                  this.userid=data;
              }
        });
  }
userid:number=0;
  logout()
  {
    this.userid=0;
    this.tasks=[];
  }
details:String="";
  addTask()
  {
           let url=this.baseurl+'add'+this.userid;
           this.http.post(url,this.details).subscribe((data:any)=>
           {
                this.tasks.push(data);
           });
           this.details="";
           
  }
  tasks:any;
  readAllTask()
  {
    
       let url=this.baseurl+'readAllTask'+this.userid;
       this.http.get(url).subscribe((data:any)=>
       {
            this.tasks=data;
       });
  }
  
  delete(id:any): void
   {
    let url=this.baseurl+'delete'+id;
    this.http.post(url).subscribe((result:any)=>
     {
      this.readAllTask();
      if (result) 
      {
        alert('Task deleted successfully');
      }
       else 
      {
        alert('Failed to delete task');
      }
    });
  }
}
