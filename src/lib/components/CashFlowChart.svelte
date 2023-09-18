<script lang="ts">
  import type { ChartConfiguration } from "chart.js";
  import Chart from "chart.js/auto";
  let ctx: HTMLCanvasElement;

  const config: ChartConfiguration = {
    type: "bar",
    data: {
      labels: ["Januari", "Februari", "Maret"],
      datasets: [
        {
          label: "Income",
          data: [50, 60, 30],
          backgroundColor: ["rgba(255, 99, 132, 0.5)"],
          borderColor: ["rgb(255, 99, 132)"],
          borderWidth: 1,
        },
        {
          label: "Expense",
          data: [-20, 20, 50],
          backgroundColor: ["rgba(255, 205, 86, 0.5)"],
          borderColor: ["rgb(255, 205, 86)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: "gray",
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "gray",
          },
        },
        x: {
          ticks: {
            color: "gray",
          },
        },
      },
    },
  };

  let myChart: any;
  $: if (ctx) myChart = new Chart(ctx, config);
</script>

<h1 class="text-center">Cash Flow Chart</h1>
<canvas bind:this={ctx} />
