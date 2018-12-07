// chart options
export const OPTIONS: any = {
  legend: {
    display: false,
  },
  responsive: true,
  title: { display: true, text: '' },
  tooltips: { mode: 'index', intersect: false },
  hover: { mode: 'nearest', intersect: true },
  scales: {
    xAxes: [{
      display: true, scaleLabel: { display: true, labelString: 'Mês' },
      offsetGridLines: true,
    }],
    yAxes: [{
      display: true, scaleLabel: { display: true, labelString: 'Valor' },
      ticks: {
        beginAtZero: true,
        steps: 10,
        stepValue: 5,
        suggestedMax: 50,
      },
    }],
  },
};

// chart dataset
export const DATASETS: any[] = [{
  backgroundColor: [
    'rgba(255, 0, 57, 0.7)',
    'rgba(255, 145, 0, 0.7)',
    'rgba(255, 195, 0, 0.7)',
    'rgba(0, 255, 255, 0.7)',
    'rgba(0, 124, 255, 0.7)',
    'rgba(82, 0, 255, 0.7)',
    'rgba(212, 212, 212, 0.7)',
  ],
  borderColor: [
    'rgba(255, 0, 57, 1)',
    'rgba(255, 145, 0, 1)',
    'rgba(255, 195, 0, 1)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 124, 255, 1)',
    'rgba(82, 0, 255, 1)',
    'rgba(212, 212, 212, 1)',
  ],
  data: [],
  fill: false,
}];
