// ===== Analytics Page JS =====
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = await MockAPI.getAnalyticsData();

        // Chart.js global defaults
        Chart.defaults.font.family = "'Inter', sans-serif";
        Chart.defaults.font.size = 12;
        Chart.defaults.color = '#64748B';

        // ------ Bar Chart: Monthly Detection ------
        new Chart(document.getElementById('monthlyChart'), {
            type: 'bar',
            data: {
                labels: data.monthlyDetection.labels,
                datasets: [
                    {
                        label: 'Positive',
                        data: data.monthlyDetection.positive,
                        backgroundColor: 'rgba(239, 68, 68, 0.8)',
                        borderColor: '#EF4444',
                        borderWidth: 1,
                        borderRadius: 6,
                        barPercentage: 0.7,
                        categoryPercentage: 0.7
                    },
                    {
                        label: 'Negative',
                        data: data.monthlyDetection.negative,
                        backgroundColor: 'rgba(16, 185, 129, 0.8)',
                        borderColor: '#10B981',
                        borderWidth: 1,
                        borderRadius: 6,
                        barPercentage: 0.7,
                        categoryPercentage: 0.7
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 20,
                            font: { weight: '500' }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#0F172A',
                        titleFont: { weight: '600' },
                        bodyFont: { size: 13 },
                        padding: 12,
                        cornerRadius: 8,
                        displayColors: true.valueOf
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(226, 232, 240, 0.6)', drawBorder: false },
                        ticks: { font: { size: 11 } }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { font: { size: 11, weight: '500' } }
                    }
                }
            }
        });

        // ------ Pie Chart: Distribution ------
        new Chart(document.getElementById('distributionChart'), {
            type: 'doughnut',
            data: {
                labels: ['Cancer Positive', 'Cancer Negative'],
                datasets: [{
                    data: [data.overallDistribution.positive, data.overallDistribution.negative],
                    backgroundColor: [
                        'rgba(239, 68, 68, 0.85)',
                        'rgba(16, 185, 129, 0.85)'
                    ],
                    borderColor: ['#EF4444', '#10B981'],
                    borderWidth: 2,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 20,
                            font: { weight: '500' },
                            generateLabels: function (chart) {
                                const data = chart.data;
                                const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                                return data.labels.map((label, i) => {
                                    const value = data.datasets[0].data[i];
                                    const pct = ((value / total) * 100).toFixed(1);
                                    return {
                                        text: `${label}: ${value.toLocaleString()} (${pct}%)`,
                                        fillStyle: data.datasets[0].backgroundColor[i],
                                        strokeStyle: data.datasets[0].borderColor[i],
                                        lineWidth: 2,
                                        pointStyle: 'circle',
                                        index: i
                                    };
                                });
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#0F172A',
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: function (context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const pct = ((context.raw / total) * 100).toFixed(1);
                                return `${context.label}: ${context.raw.toLocaleString()} (${pct}%)`;
                            }
                        }
                    }
                }
            }
        });

        // ------ Line Chart: Performance Trends ------
        new Chart(document.getElementById('performanceChart'), {
            type: 'line',
            data: {
                labels: data.modelPerformance.labels,
                datasets: [
                    {
                        label: 'Accuracy',
                        data: data.modelPerformance.accuracy,
                        borderColor: '#2563EB',
                        backgroundColor: 'rgba(37, 99, 235, 0.08)',
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#2563EB',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    },
                    {
                        label: 'Sensitivity',
                        data: data.modelPerformance.sensitivity,
                        borderColor: '#0D9488',
                        backgroundColor: 'rgba(13, 148, 136, 0.05)',
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#0D9488',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    },
                    {
                        label: 'Specificity',
                        data: data.modelPerformance.specificity,
                        borderColor: '#F59E0B',
                        backgroundColor: 'rgba(245, 158, 11, 0.05)',
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#F59E0B',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#0F172A',
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}%`
                        }
                    }
                },
                scales: {
                    y: {
                        min: 88,
                        max: 100,
                        grid: { color: 'rgba(226, 232, 240, 0.6)', drawBorder: false },
                        ticks: {
                            callback: (v) => v + '%',
                            font: { size: 11 }
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { font: { size: 11, weight: '500' } }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });

    } catch (err) {
        console.error('Analytics load error:', err);
    }
});
