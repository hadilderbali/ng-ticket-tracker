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
  userWorkloadChart: Chart<'bar'> | undefined;
  statusDistributionChart: Chart<'doughnut'> | undefined;

  // Chart data and options
  userWorkloadData: ChartData<'bar'>;
  userWorkloadChartOptions: ChartOptions<'bar'>;
  statusDistributionData: ChartData<'doughnut'>;
  statusChartOptions: ChartOptions<'doughnut'>;

  constructor(private ticketService: TicketService) {
    const now = new Date();
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 7);

    this.selectedStartDate = this.formatDate(pastDate);
    this.selectedEndDate = this.formatDate(now);
    this.userWorkloadChartOptions = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          min: 0, // Minimum Y-axis value
          max: 100, // Adjust this value based on the expected workload range in hours
          ticks: {
            stepSize: 5, // The interval between ticks, adjust as needed
            callback: function(value) {
              return value + 'h'; // Append 'h' for hours
            }
          }
        }
      },
      plugins: {
        legend: {
          display: true,
        },
      },
    };
    
    this.userWorkloadData = {
      labels: [], // Usernames
      datasets: [
        {
          label: 'Workload (Hours)',
          data: [], // Workload data
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Capacity (Hours)',
          data: [], // Capacity data
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        }
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
      labels: ['Open','In Progress', 'Closed', 'Resolved', 'Reopened'],
      datasets: [
        {
          data: [0, 0, 0, 0], // Placeholder data
          backgroundColor: ['#888B8D','#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'],
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

    // Initialize user workload chart
    const ctxUserWorkload = document.getElementById('userWorkloadChart') as HTMLCanvasElement;
    if (this.userWorkloadChart) {
      this.userWorkloadChart.destroy(); // Destroy the existing chart if it exists
    }
    if (ctxUserWorkload) {
      this.userWorkloadChart = new Chart(ctxUserWorkload, {
        type: 'bar',
        data: this.userWorkloadData,
        options: this.userWorkloadChartOptions
      });
    }
  }
  loadData(): void {
    this.ticketService.getUserWorkload().subscribe(data => {
      console.log('Raw User Workload Data:', data); // Log the raw data
  
      if (typeof data === 'object' && data !== null) {
        const transformedData = this.transformUserWorkloadData(data);
        console.log('Transformed User Workload Data:', transformedData); // Log the transformed data
        this.updateUserWorkloadChartData(transformedData);
      } else {
        console.error('Expected object but got:', data);
      }
    });
  
    this.fetchStatusDistributionData();
  }
  
  transformUserWorkloadData(data: Record<string, any>): { username: string, workload: number, capacity: number }[] {
    return Object.entries(data).map(([username, details]) => ({
      username,
      workload: details.totalHoursWorked, // Verify that this is in hours and not in a smaller unit like minutes or seconds
      capacity: details.capacity // Ensure capacity is in hours
    }));
  }
  
  
  
  
  
  fetchStatusDistributionData(): void {
    const open$ = this.ticketService.getOpenTicketsByWeek(this.selectedStartDate, this.selectedEndDate);
    const inProgress$ = this.ticketService.getInProgressTicketsByWeek(this.selectedStartDate, this.selectedEndDate);
    const resolved$ = this.ticketService.getResolvedTicketsByWeek(this.selectedStartDate, this.selectedEndDate);
    const closed$ = this.ticketService.getClosedTicketsByWeek(this.selectedStartDate, this.selectedEndDate);
    const reopened$ = this.ticketService.getReOpenedTicketsByWeek(this.selectedStartDate, this.selectedEndDate);
  
    forkJoin([open$,inProgress$, resolved$, closed$, reopened$]).subscribe(([open,inProgress, resolved, closed, reopened]) => {
      console.log('Open Data:', JSON.stringify(open, null, 2)); // Pretty print the data
      console.log('In Progress Data:', JSON.stringify(inProgress, null, 2)); // Pretty print the data
      console.log('Resolved Data:', JSON.stringify(resolved, null, 2)); // Pretty print the data
      console.log('Closed Data:', JSON.stringify(closed, null, 2)); // Pretty print the data
      console.log('Reopened Data:', JSON.stringify(reopened, null, 2)); // Pretty print the data
  
      const statusData = [
        this.getTicketCount(open),

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
  updateUserWorkloadChartData(data: { username: string, workload: number, capacity: number }[]): void {
    if (Array.isArray(data)) {
      this.userWorkloadData.labels = data.map(item => item.username);
      this.userWorkloadData.datasets[0].data = data.map(item => item.workload);
      this.userWorkloadData.datasets[1].data = data.map(item => item.capacity);
  
      console.log('Updated User Workload Data:', this.userWorkloadData); // Log updated data
  
      if (this.userWorkloadChart) {
        this.userWorkloadChart.update();
      }
    } else {
      console.error('Expected array but got:', data);
    }
  }
  

  
  updateStatusDistributionChartData(statusData: number[]): void {
    this.statusDistributionData.datasets[0].data = statusData;
    if (this.statusDistributionChart) this.statusDistributionChart.update();
  }

  onDateChange(): void {
    this.fetchStatusDistributionData();
  }

  formatDate(date: Date): string {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error('Invalid Date');
    }

    // Convert Date to 'YYYY-MM-DDTHH:MM'
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
}
