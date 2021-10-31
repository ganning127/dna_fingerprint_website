

const HASURA_ADMIN_SECRET = "le0JJkEQTajIKHYcLGjnSNfiSzBMhLaaImogHM0sjH520PG1N4K0hyXfMDsvANMq";

const HASURA_ENDPOINT = "https://winning-scorpion-44.hasura.app/v1/graphql";

async function init() {
    console.log("quiz.js loaded");

    await createGraphs();

}

init();

async function formSubmit(event) {
    event.preventDefault();

    let support_general_value = document.getElementById("support_general").value;
    console.log(support_general_value);

    let support_solve_crime_value = document.getElementById("support_solve_crime").value;

    let bias_value = document.getElementById("bias").value;
    console.log(bias_value);
    let infringe_rights_value = document.getElementById("infringe_rights").value;

    let national_db_value = document.getElementById("national_db").value;

    let racial_discrim_value = document.getElementById("racial_discrim").value;

    let biggest_issue_value = document.getElementById("biggest_issue").value;

    let biggest_benefit_value = document.getElementById("biggest_benefit").value;

    let other_comments_value = document.getElementById("other_comments").value;

    let data_obj = {
        "support_general": support_general_value,
        "support_solve_crime": support_solve_crime_value,
        "bias": bias_value,
        "infringe_rights": infringe_rights_value,
        "national_db": national_db_value,
        "racial_discrim": racial_discrim_value,
        "biggest_issue": biggest_issue_value,
        "biggest_benefit": biggest_benefit_value,
        "other_comments": other_comments_value,
    };



    await makeRequest(data_obj);

}

async function makeRequest(data_obj) {
    const graphql = `mutation MyMutation {
        insert_dna_ops_data(objects: {bias: "${data_obj.bias}", biggest_benefit: "${data_obj.biggest_benefit}", biggest_issue: "${data_obj.biggest_issue}", infringe_rights: "${data_obj.infringe_rights}", national_db: "${data_obj.national_db}", racial_discrim: "${data_obj.racial_discrim}", support_general: "${data_obj.support_general}", support_solve_crime: "${data_obj.support_solve_crime}"}) {
            affected_rows
          returning {
            id
          }
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

    console.log(responseData);

}

function cleanJSON(obj) {
    var cleaned = JSON.stringify(obj, null, 2);

    return cleaned.replace(/^[\t ]*"[^:\n\r]+(?<!\\)":/gm, function (match) {
        return match.replace(/"/g, "");
    });
}

async function createGraphs() {

    const responseData = await getData();
    const support_general_chart = create_support_general_chart(responseData);
    const support_solve_crime_chart = create_support_solve_crime_chart(responseData);
    const bias_chart = create_bias_chart(responseData);
    const infringe_rights_chart = create_infringe_rights_chart(responseData);

}

function create_infringe_rights_chart(responseData) {
    // clean data
    let infringe_rights_data = clean_overall_data(responseData, "infringe_rights");
    console.log(infringe_rights_data)
    // convert keys
    let keys = convert_keys(infringe_rights_data, "agree");

    console.log(keys)

    const data = {
        labels: keys,
        datasets: [{
            label: 'Infringe Rights Data',
            data: [infringe_rights_data.strong, infringe_rights_data.med, infringe_rights_data.neu, infringe_rights_data.med_opp, infringe_rights_data.strong_opp],
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
            borderWidth: 1
        }]
    };

    const infringe_rights_chart = document.getElementById("infringe_rights_chart");

    const infringe_rights_chart_config = {
        type: 'bar',
        data: data,
    };

    const myChart = new Chart(infringe_rights_chart, infringe_rights_chart_config);
    return myChart;

}




function create_bias_chart(responseData) {
    // clean data
    let bias_data = clean_bias_data(responseData);
    console.log(bias_data)
    // convert keys
    let keys = convert_bias_data_keys(bias_data);

    console.log(keys)

    const data = {
        labels: keys,
        datasets: [{
            label: 'Bias Data',
            data: [bias_data.strong, bias_data.med, bias_data.neu, bias_data.med_opp, bias_data.strong_opp],
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
            borderWidth: 1
        }]
    };

    const bias_chart = document.getElementById("bias_chart");

    const bias_chart_config = {
        type: 'bar',
        data: data,
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
    console.log(dataArray)
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
                'rgba(255, 99, 132, 0.9)',
                'rgba(54, 162, 235, 0.9)',
                'rgba(255, 206, 86, 0.9)',
                'rgba(75, 192, 192, 0.9)',
                'rgba(153, 102, 255, 0.9)',
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
                'rgba(255, 99, 132, 0.9)',
                'rgba(54, 162, 235, 0.9)',
                'rgba(255, 206, 86, 0.9)',
                'rgba(75, 192, 192, 0.9)',
                'rgba(153, 102, 255, 0.9)',
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