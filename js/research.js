function init() {
    console.log("research.js loaded");
    createSentimentChart();
    createSubjectivityChart();
}

function createSentimentChart() {
    let chart = document.getElementById("sentiment_chart");
    let keys = ["genetic fingerprinting", "dna profiling", "dna identification", "dna typing", "dna fingerprint", "genetic profiling", "dna profile", "dna fingerprinting", "genetic profile", "genetic fingerprint"]
    const data = {
        labels: keys,
        datasets: [{
            label: 'Infringe Rights Data',
            data: [-0.07, 0.02, 0.04, 0.05, 0.06, 0.08, 0.09, 0.10, 0.10, 0.13],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
            ],
            borderWidth: 1,
            color: "rgba(255, 255, 255)"
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    color: "rgba(255, 255, 255)",
                    text: 'Sentiment Results vs. Keyword',
                    font: {
                        size: 25
                    }

                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        color: "rgba(255, 255, 255)",
                        text: "Keyword",
                        font: {
                            size: 20
                        }
                    }

                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        color: "rgba(255, 255, 255)",
                        text: "Sentiment Value",
                        font: {
                            size: 20
                        }
                    }

                }

            }
        }
    }

    const myChart = new Chart(chart, config);

}


function createSubjectivityChart() {
    let chart = document.getElementById("subjectivity_chart");
    let keys = ["dna fingerprinting", "genetic fingerprinting", "dna profiling", "dna fingerprint", "genetic fingerprint", "dna identification", "genetic profile", "dna profile", "dna typing", "genetic profiling"]
    const data = {
        labels: keys,
        datasets: [{
            label: 'Infringe Rights Data',
            data: [0.35, 0.37, 0.38, 0.39, 0.40, 0.40, 0.40, 0.41, 0.43, 0.45],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
            ],
            borderWidth: 1,
            color: "rgba(255, 255, 255)"
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    color: "rgba(255, 255, 255)",
                    text: 'Subjectivity Results vs. Keyword',
                    font: {
                        size: 25
                    }

                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        color: "rgba(255, 255, 255)",
                        text: "Keyword",
                        font: {
                            size: 20
                        }
                    }

                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        color: "rgba(255, 255, 255)",
                        text: "Subjectivity Value",
                        font: {
                            size: 20
                        }
                    }

                }

            }
        }
    }

    const myChart = new Chart(chart, config);

}

init();