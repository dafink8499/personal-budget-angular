import { AfterViewInit, Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Chart, controllers } from 'chart.js';
import * as d3 from 'd3';
import { color, scaleIdentity, scaleOrdinal } from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {

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

  constructor(public service: DataService) { }

  ngAfterViewInit(): void {

      this.service.getBudget();
      this.createChart();
      this.created3Chart();


  }

  createChart() {
    //var ctx = document.getElementById("myChart").getContext("2d");
    const ctx = document.getElementById("myChart") as HTMLCanvasElement;
    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.service.dataSource
    });
  }

  created3Chart() {

    const svg = d3.select("body").append("svg").append("g");


    const width = 960, height = 450, radius = Math.min(width, height) / 2;

    svg.attr('width', width).attr('height', height)

    const color = scaleOrdinal()
      .domain(this.service.d3labels)
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);


    svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


    const slice = svg.select(".slices").selectAll("path.slice").data(pie().sort(null).value((res: any) => res.value));

    slice.enter().append('path').attr('d', d3.arc().innerRadius(radius * 0.8).outerRadius(radius * 0.4));
    //slice.attr('fill', (d, i) => (color(i))).attr('stroke', #000000).style('stroke-width', "1px");

    const labelArea = d3.arc().innerRadius(radius * 0.9).outerRadius(radius * 0.9);

    slice.enter().append('text').text(this.service.d3labels[0]).attr("transform", d => "translate(" + labelArea.centroid(d) + ")").style("text-anchor", "middle").style("font-size", 12);


  }

}
