function init() {

    createPrivacyChart();
    createWillingChart();
}

function createPrivacyChart() {
    const privacy_chart = document.getElementById("privacy_chart");
    const privacy_chart_data = {
        labels: ["concerned about privacy", "concerned about researchers having their information", "worry study data being used against them in criminal investigations"],
        datasets: [{
            label: 'How much do you agree with racial discrimination?',
            data: [4193, 2609, 1724],
            backgroundColor: [
                'rgba(255, 99, 132, 0.3)',
                'rgba(54, 162, 235, 0.3)',
                'rgba(255, 206, 86, 0.3)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
            ],
            borderWidth: 1
        }]
    };

    const privacy_chart_config = {
        type: 'bar',
        data: privacy_chart_data,
        options: {
            plugins: {
                title: {
                    display: true,
                    color: "rgba(255, 255, 255)",
                    text: 'Privacy Concerns Distribution',
                    font: {
                        size: 25
                    }

                },
                legend: {
                    display: false,
                }
            },
        }
        // color: "#ffffff"
    };

    const myChart = new Chart(privacy_chart, privacy_chart_config);
    return myChart;

}


function createWillingChart() {
    const privacy_chart = document.getElementById("willing_chart");
    const privacy_chart_data = {
        labels: ["would participate in a biobank if asked", "would allow academic researchers to use study data"],
        datasets: [{
            label: 'How much do you agree with racial discrimination?',
            data: [2795, 4826],
            backgroundColor: [
                'rgba(255, 99, 132, 0.3)',
                'rgba(54, 162, 235, 0.3)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
            ],
            borderWidth: 1
        }]
    };

    const privacy_chart_config = {
        type: 'bar',
        data: privacy_chart_data,
        options: {
            plugins: {
                title: {
                    display: true,
                    color: "rgba(255, 255, 255)",
                    text: "People's willingness to participate in DNA Collection",
                    font: {
                        size: 25
                    }

                },
                legend: {
                    display: false

                }
            },
        }
    };

    const myChart = new Chart(privacy_chart, privacy_chart_config);
    return myChart;

}

init();