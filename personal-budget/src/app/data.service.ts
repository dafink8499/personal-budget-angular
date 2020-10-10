import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public d3data = [];
  public d3labels = [];
  public dataSource = {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#a05d56',
                '#d0743c',
                '#ff8c00'
            ],
        }
    ],
    labels: []
  };

  getBudget() {
    this.http.get('http://localhost:3000/budget').subscribe((res: any) => {
      for(var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
        this.d3data.push(res.myBudget[i].budget);
        this.d3labels.push(res.myBudget[i].title);
      }
    });
  }

  constructor(private http: HttpClient) { }
}
