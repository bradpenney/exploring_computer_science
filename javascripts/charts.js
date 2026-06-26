// Track chart instances by canvas ID so we can destroy them before re-rendering
// on back-navigation (prevents Chart.js "Canvas is already in use" errors).
const chartInstances = {};

document$.subscribe(function () {
  renderBigOChart();
});

function renderBigOChart() {
  const canvas = document.getElementById('big-o-chart');
  if (!canvas) return;

  if (chartInstances['big-o-chart']) {
    chartInstances['big-o-chart'].destroy();
  }

  const cap = 300;
  const n = Array.from({ length: 20 }, (_, i) => i + 1);

  // Colors mirror the Fast/Acceptable/Slow mermaid diagram on the same page.
  const datasets = [
    {
      label: 'O(1)',
      data: n.map(() => 1),
      borderColor: '#2f855a',
      borderWidth: 2.5,
      pointRadius: 0,
      tension: 0.3,
    },
    {
      label: 'O(log n)',
      data: n.map(x => Math.min(Math.log2(x), cap)),
      borderColor: '#38a169',
      borderWidth: 2.5,
      pointRadius: 0,
      tension: 0.3,
    },
    {
      label: 'O(n)',
      data: n.map(x => Math.min(x, cap)),
      borderColor: '#d69e2e',
      borderWidth: 2.5,
      pointRadius: 0,
      tension: 0.3,
    },
    {
      label: 'O(n log n)',
      data: n.map(x => Math.min(x * Math.log2(x), cap)),
      borderColor: '#dd6b20',
      borderWidth: 2.5,
      pointRadius: 0,
      tension: 0.3,
    },
    {
      label: 'O(n²)',
      data: n.map(x => Math.min(x * x, cap)),
      borderColor: '#c53030',
      borderWidth: 2.5,
      pointRadius: 0,
      tension: 0.3,
    },
    {
      label: 'O(2ⁿ)',
      data: n.map(x => Math.min(Math.pow(2, x), cap)),
      borderColor: '#822727',
      borderWidth: 2.5,
      pointRadius: 0,
      tension: 0.3,
    },
  ];

  chartInstances['big-o-chart'] = new Chart(canvas, {
    type: 'line',
    data: {
      labels: n,
      datasets: datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#cbd5e0',
            font: { size: 13 },
            padding: 16,
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const val = context.parsed.y;
              const capped = val >= cap;
              return ' ' + context.dataset.label + ': ' + (capped ? '≥ ' + cap + ' (capped)' : val.toFixed(1));
            },
          },
          backgroundColor: '#2d3748',
          borderColor: '#4a5568',
          borderWidth: 1,
          titleColor: '#cbd5e0',
          bodyColor: '#a0aec0',
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Input size (n)',
            color: '#a0aec0',
            font: { size: 12 },
          },
          ticks: { color: '#a0aec0' },
          grid: { color: '#2d3748' },
          border: { color: '#4a5568' },
        },
        y: {
          title: {
            display: true,
            text: 'Operations',
            color: '#a0aec0',
            font: { size: 12 },
          },
          min: 0,
          max: cap,
          ticks: {
            color: '#a0aec0',
            callback: function (value) {
              return value >= cap ? '≥' + cap : value;
            },
          },
          grid: { color: '#2d3748' },
          border: { color: '#4a5568' },
        },
      },
    },
  });
}
