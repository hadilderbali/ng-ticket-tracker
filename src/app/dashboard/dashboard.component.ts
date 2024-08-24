import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { TicketService } from '../services/ticket.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  selectedStartDate: string;
  selectedEndDate: string;

  // Chart instances
  userCapacityAndWorkloadChart: Chart<'bar'> | undefined;
  statusDistributionChart: Chart<'doughnut'> | undefined;
  averageDurationChart: Chart<'bar'> | undefined;  // Add this line

  // Chart data and options
  userCapacityAndWorkloadData: ChartData<'bar'>;
  chartOptions: ChartOptions<'bar'>;
  statusDistributionData: ChartData<'doughnut'>;
  statusChartOptions: ChartOptions<'doughnut'>;
  averageDurationData: ChartData<'bar'>;  // Add this line
  averageDurationChartOptions: ChartOptions<'bar'>;  // Add this line

  constructor(private ticketService: TicketService) {
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 7);

    this.selectedStartDate = pastDate.toISOString().split('T')[0];
    this.selectedEndDate = currentDate.toISOString().split('T')[0];

    // Data and options for capacity and workload chart
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
      },
    };

    this.userCapacityAndWorkloadData = {
      labels: [],
      datasets: [
        { label: 'Total Capacity', data: [], backgroundColor: 'rgba(75, 192, 192, 0.2)', borderColor: 'rgba(75, 192, 192, 1)' },
        { label: 'Workload', data: [], backgroundColor: 'rgba(153, 102, 255, 0.2)', borderColor: 'rgba(153, 102, 255, 1)' },
        { label: 'Remaining Capacity', data: [], backgroundColor: 'rgba(255, 159, 64, 0.2)', borderColor: 'rgba(255, 159, 64, 1)' }
      ]
    };

    // Data and options for status distribution chart
    this.statusChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
        }
      },
    };

    this.statusDistributionData = {
      labels: ['In Progress', 'Closed', 'Resolved', 'Reopened'],
      datasets: [
        {
          data: [0, 0, 0, 0], // Placeholder data
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'],
        }
      ]
    };

    // Data and options for average duration chart
    this.averageDurationChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return `Average Duration: ${tooltipItem.raw} days`;
            }
          }
        }
      }
    };

    this.averageDurationData = {
      labels: ['Average Duration'],
      datasets: [
        {
          label: 'Average Ticket Duration',
          data: [0], // Placeholder data
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    };
  }

  ngOnInit(): void {
    // Initialization logic
  }

  ngAfterViewInit(): void {
    this.initializeCharts();
    this.loadData();
  }

  initializeCharts(): void {
    // Initialize user capacity and workload chart
    const ctxUserCapacityAndWorkload = document.getElementById('userCapacityAndWorkloadChart') as HTMLCanvasElement;
    if (this.userCapacityAndWorkloadChart) {
      this.userCapacityAndWorkloadChart.destroy(); // Destroy the existing chart if it exists
    }
    if (ctxUserCapacityAndWorkload) {
      this.userCapacityAndWorkloadChart = new Chart(ctxUserCapacityAndWorkload, {
        type: 'bar',
        data: this.userCapacityAndWorkloadData,
        options: this.chartOptions
      });
    }

    // Initialize status distribution chart
    const ctxStatusDistribution = document.getElementById('statusDistributionChart') as HTMLCanvasElement;
    if (this.statusDistributionChart) {
      this.statusDistributionChart.destroy(); // Destroy the existing chart if it exists
    }
    if (ctxStatusDistribution) {
      this.statusDistributionChart = new Chart(ctxStatusDistribution, {
        type: 'doughnut',
        data: this.statusDistributionData,
        options: this.statusChartOptions
      });
    }

    // Initialize average duration chart
    const ctxAverageDuration = document.getElementById('averageDurationChart') as HTMLCanvasElement;
    if (this.averageDurationChart) {
      this.averageDurationChart.destroy(); // Destroy the existing chart if it exists
    }
    if (ctxAverageDuration) {
      this.averageDurationChart = new Chart(ctxAverageDuration, {
        type: 'bar',
        data: this.averageDurationData,
        options: this.averageDurationChartOptions
      });
    }
  }

  loadData(): void {
    // Load data for the capacity and workload chart
    this.ticketService.getUserCapacityAndWorkload(this.selectedStartDate, this.selectedEndDate).subscribe(data => {
      console.log('User Capacity and Workload Data:', data); // Log the data for debugging
      this.updateCapacityAndWorkloadChartData(data);
    });

    // Load data for the status distribution chart
    this.fetchStatusDistributionData();

    // Load data for the average duration chart
    this.ticketService.getAverageTicketDuration(this.selectedStartDate, this.selectedEndDate).subscribe(data => {
      console.log('Average Ticket Duration Data:', data); // Log the data for debugging
      this.updateAverageDurationChartData(data);
    });
  }

  fetchStatusDistributionData(): void {
    const inProgress$ = this.ticketService.getInProgressTicketsByWeek(this.selectedStartDate, this.selectedEndDate);
    const resolved$ = this.ticketService.getResolvedTicketsByWeek(this.selectedStartDate, this.selectedEndDate);
    const closed$ = this.ticketService.getClosedTicketsByWeek(this.selectedStartDate, this.selectedEndDate);
    const reopened$ = this.ticketService.getReOpenedTicketsByWeek(this.selectedStartDate, this.selectedEndDate);
  
    forkJoin([inProgress$, resolved$, closed$, reopened$]).subscribe(([inProgress, resolved, closed, reopened]) => {
      console.log('In Progress Data:', JSON.stringify(inProgress, null, 2)); // Pretty print the data
      console.log('Resolved Data:', JSON.stringify(resolved, null, 2)); // Pretty print the data
      console.log('Closed Data:', JSON.stringify(closed, null, 2)); // Pretty print the data
      console.log('Reopened Data:', JSON.stringify(reopened, null, 2)); // Pretty print the data
  
      const statusData = [
        this.getTicketCount(inProgress),
        this.getTicketCount(resolved),
        this.getTicketCount(closed),
        this.getTicketCount(reopened)
      ];
      this.updateStatusDistributionChartData(statusData);
    });
  }

  getTicketCount(data: any): number {
    if (data instanceof Map) {
      return data.size;
    } else if (Array.isArray(data)) {
      return data.length;
    } else {
      // Handle other possible formats
      return Object.keys(data).length;
    }
  }

  updateCapacityAndWorkloadChartData(userData: any[]): void {
    this.userCapacityAndWorkloadData.labels = userData.map(item => item.username);
    this.userCapacityAndWorkloadData.datasets[0].data = userData.map(item => item.totalCapacity);
    this.userCapacityAndWorkloadData.datasets[1].data = userData.map(item => item.workload);
    this.userCapacityAndWorkloadData.datasets[2].data = userData.map(item => item.remainingCapacity);

    if (this.userCapacityAndWorkloadChart) this.userCapacityAndWorkloadChart.update();
  }

  updateStatusDistributionChartData(statusData: number[]): void {
    this.statusDistributionData.datasets[0].data = statusData;
    if (this.statusDistributionChart) this.statusDistributionChart.update();
  }

  updateAverageDurationChartData(data: any): void {
    this.averageDurationData.datasets[0].data = [data.averageDuration];
    if (this.averageDurationChart) this.averageDurationChart.update();
  }

  onDateChange(): void {
    this.loadData();
  }
}
