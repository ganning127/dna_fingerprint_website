const HASURA_ADMIN_SECRET = "le0JJkEQTajIKHYcLGjnSNfiSzBMhLaaImogHM0sjH520PG1N4K0hyXfMDsvANMq";
const HASURA_ENDPOINT = "https://winning-scorpion-44.hasura.app/v1/graphql";

const strong_color = "rgba(4, 219, 197, 0.4)";
const med_color = "rgba(187, 134, 251, 0.4)";
const neu_color = "rgba(55, 0, 178, 0.4)";
const med_opp_color = "rgba(18, 18, 18, 0.4)";
const strong_opp_color = "rgba(207, 102, 122, 0.4)";

const strong_color_border = "rgba(4, 219, 197, 1.0)";
const med_color_border = "rgba(187, 134, 251, 1.0)";
const neu_color_border = "rgba(55, 0, 178, 1.0)";
const med_opp_color_border = "rgba(18, 18, 18, 1.0)";
const strong_opp_color_border = "rgba(207, 102, 122, 1.0)";

async function createGraphs() {

    const responseData = await getData();
    const support_general_chart = create_support_general_chart(responseData);
    const support_solve_crime_chart = create_support_solve_crime_chart(responseData);
    const bias_chart = create_bias_chart(responseData);
    const infringe_rights_chart = create_infringe_rights_chart(responseData);

    const national_db_chart = create_national_db_chart(responseData);
    const racial_discrim_chart = create_racial_discrim_chart(responseData);

    const biggest_issue_chart = create_biggest_issue_chart(responseData);
    const biggest_benefit_chart = create_biggest_benefit_chart(responseData);

}


function create_biggest_benefit_chart(responseData) {
    // clean data
    let biggest_benefit_data = clean_biggeest_benefit_data(responseData);
    console.log(biggest_benefit_data)
    // convert keys
    let biggest_benefit_keys = convert_biggest_benefit_keys(biggest_benefit_data);

    console.log(biggest_benefit_keys)

    const biggest_benefit_chart = document.getElementById("biggest_benefit_chart");
    const biggest_benefit_chart_data = {
        labels: biggest_benefit_keys,

        datasets: [{
            label: 'How much do you agree with racial discrimination?',
            data: [biggest_benefit_data.solv_crime, biggest_benefit_data.track_rela, biggest_benefit_data.id_remains],
            backgroundColor: [
                strong_color,
                med_color,
                neu_color,
            ],
            borderColor: [
                strong_color_border,
                med_color_border,
                neu_color_border,
            ],
            color: "#ffffff",
            borderWidth: 1
        }]
    };

    const biggest_benefit_chart_config = {
        type: 'pie',
        data: biggest_benefit_chart_data,
        // color: "#ffffff"
    };

    const myChart = new Chart(biggest_benefit_chart, biggest_benefit_chart_config);
    return myChart;


}

function clean_biggeest_benefit_data(responseData) {
    let dataArray = responseData.data.dna_ops_data;
    let data_obj = {};
    let keys = ["solv_crime", "track_rela", "id_remains"];


    for (let i = 0; i < keys.length; i++) {
        data_obj[keys[i]] = 0;
    }

    for (let i = 0; i < dataArray.length; i++) {
        let key = dataArray[i].biggest_benefit;
        data_obj[key] += 1;
    }
    return data_obj;
}

function convert_biggest_benefit_keys(responseData) {
    let mapper = {
        "solv_crime": "Ability to solve crime",
        "track_rela": "Track down blood relatives",
        "id_remains": "Identify archaeological remains",
    };


    let new_keys = [];
    for (let key in responseData) {
        new_keys.push(mapper[key]);
    }

    return new_keys;

}
function create_biggest_issue_chart(responseData) {
    // clean data
    let biggest_issue_data = clean_biggeest_issue_data(responseData);
    let keys = convert_biggest_issue_keys(biggest_issue_data);


    const biggest_issue_chart = document.getElementById("biggest_issue_chart");
    const biggest_issue_chart_data = {
        labels: keys,

        datasets: [{
            label: 'How much do you agree with racial discrimination?',
            data: [biggest_issue_data.hum_bias, biggest_issue_data.racial_discrim, biggest_issue_data.priv_con],
            backgroundColor: [
                strong_color,
                med_color,
                neu_color,
            ],
            borderColor: [
                strong_color_border,
                med_color_border,
                neu_color_border,
            ],
            color: "#ffffff",
            borderWidth: 1
        }]
    };

    const biggest_issue_chart_config = {
        type: 'pie',
        data: biggest_issue_chart_data,
        // color: "#ffffff"
    };

    const myChart = new Chart(biggest_issue_chart, biggest_issue_chart_config);
    return myChart;
}

function convert_biggest_issue_keys(data) {
    let mapper = {
        "hum_bias": "Human bias",
        "racial_discrim": "Racial discrimination",
        "priv_con": "Privacy concerns",
    };


    let new_keys = [];
    for (let key in data) {
        new_keys.push(mapper[key]);
    }

    return new_keys;
}


function clean_biggeest_issue_data(responseData) {
    let dataArray = responseData.data.dna_ops_data;
    let data_obj = {};
    let keys = ["hum_bias", "racial_discrim", "priv_con"];


    for (let i = 0; i < keys.length; i++) {
        data_obj[keys[i]] = 0;
    }

    for (let i = 0; i < dataArray.length; i++) {
        let key = dataArray[i].biggest_issue;
        data_obj[key] += 1;
    }
    return data_obj;
}

function create_racial_discrim_chart(responseData) {
    // clean data
    let racial_discrim_data = clean_overall_data(responseData, "racial_discrim");
    // convert keys
    let keys = convert_keys(racial_discrim_data, "agree");

    const racial_discrim_chart = document.getElementById("racial_discrim_chart");
    const racial_discrim_data_chart_data = {
        labels: keys,

        datasets: [{
            label: 'How much do you agree with racial discrimination?',
            data: [racial_discrim_data.strong, racial_discrim_data.med, racial_discrim_data.neu, racial_discrim_data.med_opp, racial_discrim_data.strong_opp],
            backgroundColor: [
                strong_color,
                med_color,
                neu_color,
                med_opp_color,
                strong_opp_color,
            ],
            borderColor: [
                strong_color_border,
                med_color_border,
                neu_color_border,
                med_opp_color_border,
                strong_opp_color_border,
            ],
            color: "#ffffff",
            borderWidth: 1
        }]
    };

    const racial_discrim_chart_config = {
        type: 'pie',
        data: racial_discrim_data_chart_data,
        // color: "#ffffff"
    };

    const myChart = new Chart(racial_discrim_chart, racial_discrim_chart_config);
    return myChart;
}

function create_national_db_chart(responseData) {
    // clean data
    let national_db_data = clean_overall_data(responseData, "national_db");
    // convert keys
    let keys = convert_keys(national_db_data, "support");

    const national_db_chart = document.getElementById("national_db_chart");
    const national_db_data_chart_data = {
        labels: keys,

        datasets: [{
            label: 'How much do you support DNA Fingerprinting?',
            data: [national_db_data.strong, national_db_data.med, national_db_data.neu, national_db_data.med_opp, national_db_data.strong_opp],
            backgroundColor: [
                strong_color,
                med_color,
                neu_color,
                med_opp_color,
                strong_opp_color,
            ],
            borderColor: [
                strong_color_border,
                med_color_border,
                neu_color_border,
                med_opp_color_border,
                strong_opp_color_border,
            ],
            color: "#ffffff",
            borderWidth: 1
        }]
    };

    const national_db_chart_config = {
        type: 'pie',
        data: national_db_data_chart_data,
        // color: "#ffffff"
    };

    const myChart = new Chart(national_db_chart, national_db_chart_config);
    return myChart;
}

function create_infringe_rights_chart(responseData) {
    // clean data
    let infringe_rights_data = clean_overall_data(responseData, "infringe_rights");
    // convert keys
    let keys = convert_keys(infringe_rights_data, "agree");


    const data = {
        labels: keys,
        datasets: [{
            label: 'Infringe Rights Data',
            data: [infringe_rights_data.strong, infringe_rights_data.med, infringe_rights_data.neu, infringe_rights_data.med_opp, infringe_rights_data.strong_opp],
            backgroundColor: [
                strong_color,
                med_color,
                neu_color,
                med_opp_color,
                strong_opp_color,
            ],
            borderColor: [
                strong_color_border,
                med_color_border,
                neu_color_border,
                med_opp_color_border,
                strong_opp_color_border,
            ],

            borderWidth: 1
        }]
    };

    const infringe_rights_chart = document.getElementById("infringe_rights_chart");

    const infringe_rights_chart_config = {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Number of people vs. Category',

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
                        text: "Category",
                    }

                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: "Number of people",

                    }

                }

            }
        }
    };

    const myChart = new Chart(infringe_rights_chart, infringe_rights_chart_config);
    return myChart;

}




function create_bias_chart(responseData) {
    // clean data
    let bias_data = clean_bias_data(responseData);
    // convert keys
    let keys = convert_bias_data_keys(bias_data);


    const data = {
        labels: keys,
        datasets: [{
            label: 'Bias Data',
            data: [bias_data.strong, bias_data.med, bias_data.neu, bias_data.med_opp, bias_data.strong_opp],
            backgroundColor: [
                strong_color,
                med_color,
                neu_color,
                med_opp_color,
                strong_opp_color,],
            borderColor: [
                strong_color_border,
                med_color_border,
                neu_color_border,
                med_opp_color_border,
                strong_opp_color_border,
            ],
            borderWidth: 1
        }]
    };

    const bias_chart = document.getElementById("bias_chart");

    const bias_chart_config = {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Number of people vs. Category',

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
                        text: "Category",
                    }

                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: "Number of people",

                    }

                }

            }
        }
    };


    const myChart = new Chart(bias_chart, bias_chart_config);
    return myChart;
}

function convert_bias_data_keys(bias_data) {
    let mapper = {
        "strong": "Strongly agree",
        "med": "Agree",
        "neu": "Neutral",
        "med_opp": "Disagree",
        "strong_opp": "Strongly disagree"
    }
    let new_keys = [];
    for (let key in bias_data) {
        new_keys.push(mapper[key]);
    }

    return new_keys;
}

function clean_bias_data(responseData) {
    let dataArray = responseData.data.dna_ops_data;
    let data_obj = {};
    let keys = ["strong", "med", "neu", "med_opp", "strong_opp"];


    for (let i = 0; i < keys.length; i++) {
        data_obj[keys[i]] = 0;
    }

    for (let i = 0; i < dataArray.length; i++) {
        let key = dataArray[i].bias;
        data_obj[key] += 1;
    }

    return data_obj;
}

function create_support_solve_crime_chart(responseData) {
    // clean data
    let support_solve_crime_data = clean_support_solve_crime_data(responseData);

    let keys = convert_support_solve_crime_data_keys(support_solve_crime_data);

    // create chart
    const support_solve_crime_chart = document.getElementById('support_solve_crime_chart');

    const support_general_chart_data = {
        labels: keys,

        datasets: [{
            label: 'How much do you support DNA fingerprinting being used in being used to solve crimes?',
            data: [support_solve_crime_data.strong, support_solve_crime_data.med, support_solve_crime_data.neu, support_solve_crime_data.med_opp, support_solve_crime_data.strong_opp],
            backgroundColor: [
                strong_color,
                med_color,
                neu_color,
                med_opp_color,
                strong_opp_color,
            ],
            borderColor: [
                strong_color_border,
                med_color_border,
                neu_color_border,
                med_opp_color_border,
                strong_opp_color_border,
            ],
            color: "#ffffff",
            borderWidth: 1
        }]
    };

    const support_solve_crime_chart_config = {
        type: 'doughnut',
        data: support_general_chart_data,
        // color: "#ffffff"
    };

    const myChart = new Chart(support_solve_crime_chart, support_solve_crime_chart_config);
    return myChart;
}

function convert_support_solve_crime_data_keys(data_obj) {
    let mapper = {
        "strong": "Strongly support",
        "med": "Support",
        "neu": "Neutral",
        "med_opp": "Oppose",
        "strong_opp": "Strongly oppose"
    }
    let new_keys = [];
    for (let key in data_obj) {
        new_keys.push(mapper[key]);
    }

    return new_keys;
}

function clean_support_solve_crime_data(responseData) {
    let dataArray = responseData.data.dna_ops_data;
    let data_obj = {};
    let keys = ["strong", "med", "neu", "med_opp", "strong_opp"];


    for (let i = 0; i < keys.length; i++) {
        data_obj[keys[i]] = 0;
    }

    for (let i = 0; i < dataArray.length; i++) {
        let key = dataArray[i].support_solve_crime;
        data_obj[key] += 1;
    }
    return data_obj;
}


function clean_overall_data(responseData, data_key) {
    let dataArray = responseData.data.dna_ops_data;
    let data_obj = {};
    let keys = ["strong", "med", "neu", "med_opp", "strong_opp"];


    for (let i = 0; i < keys.length; i++) {
        data_obj[keys[i]] = 0;
    }

    for (let i = 0; i < dataArray.length; i++) {
        let key = dataArray[i][data_key];
        data_obj[key] += 1;
    }
    return data_obj;
}

function convert_keys(data, type) {
    let mapper;
    if (type == "agree") {
        mapper = {
            "strong": "Strongly agree",
            "med": "Agree",
            "neu": "Neutral",
            "med_opp": "Disagree",
            "strong_opp": "Strongly disagree"
        };
    }
    else {
        mapper = {
            "strong": "Strongly support",
            "med": "Support",
            "neu": "Neutral",
            "med_opp": "Oppose",
            "strong_opp": "Strongly oppose"
        }
    }

    let new_keys = [];
    for (let key in data) {
        new_keys.push(mapper[key]);
    }

    return new_keys;

}
function create_support_general_chart(responseData) {
    // clean data
    let support_general_data = clean_support_general_data(responseData);

    let keys = convert_support_general_data_keys(support_general_data);

    // create chart
    const support_general_chart = document.getElementById('support_general_chart');

    const support_general_chart_data = {
        labels: keys,

        datasets: [{
            label: 'How much do you support DNA Fingerprinting?',
            data: [support_general_data.strong, support_general_data.med, support_general_data.neu, support_general_data.med_opp, support_general_data.strong_opp],
            backgroundColor: [
                strong_color,
                med_color,
                neu_color,
                med_opp_color,
                strong_opp_color,
            ],
            borderColor: [
                strong_color_border,
                med_color_border,
                neu_color_border,
                med_opp_color_border,
                strong_opp_color_border,
            ],
            color: "#ffffff",
            borderWidth: 1
        }]
    };

    const support_general_chart_config = {
        type: 'doughnut',
        data: support_general_chart_data,
        // color: "#ffffff"
    };

    const myChart = new Chart(support_general_chart, support_general_chart_config);
    return myChart;
}

function convert_support_general_data_keys(data_obj) {
    let mapper = {
        "strong": "Strongly support",
        "med": "Support",
        "neu": "Neutral",
        "med_opp": "Oppose",
        "strong_opp": "Strongly oppose"
    }
    let new_keys = [];
    for (let key in data_obj) {
        new_keys.push(mapper[key]);
    }

    return new_keys;
}
function clean_support_general_data(responseData) {
    let dataArray = responseData.data.dna_ops_data;
    let data_obj = {};
    let keys = ["strong", "med", "neu", "med_opp", "strong_opp"];


    for (let i = 0; i < keys.length; i++) {
        data_obj[keys[i]] = 0;
    }

    for (let i = 0; i < dataArray.length; i++) {
        let key = dataArray[i].support_general;
        data_obj[key] += 1;
    }
    return data_obj;
}


async function getData() {
    const graphql = `query MyQuery {
        dna_ops_data {
          bias
          biggest_benefit
          biggest_issue
          infringe_rights
          national_db
          other_comments
          racial_discrim
          support_general
          support_solve_crime
        }
      }
      `

    const data = await fetch(HASURA_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
        },
        body: JSON.stringify({ query: graphql })
    });
    const responseData = await data.json();

    return responseData;
}

createGraphs();