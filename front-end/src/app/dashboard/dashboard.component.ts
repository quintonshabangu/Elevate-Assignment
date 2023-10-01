import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { DataService } from '../shared/services/data.service';
import { UserContextService } from '../shared/services/user-context.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private summaries = null;
  public barChartData: ChartConfiguration<'bar'>['data'] = null;

  constructor(private dataService: DataService, public userContext: UserContextService) {}
  
  ngOnInit(): void {
    this.dataService.GetActivitySummary()
      .subscribe(response => {
        if (response.length > 7) {
          this.summaries = response.slice(0, 7)
        } else {
          this.summaries = response;
        }

        this.barChartData = {
          labels: this.summaries.map(x => x.date),
          datasets: [
            { data: this.summaries.map(x => x.steps), label: 'Steps'},
            { data: this.summaries.map(x => x.calories), label: 'Calories'},
            { data: this.summaries.map(x => x.distance), label: 'Distance (m)'}
          ]
        }
      });
  }

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };
}
