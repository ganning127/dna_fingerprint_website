

const HASURA_ADMIN_SECRET = "le0JJkEQTajIKHYcLGjnSNfiSzBMhLaaImogHM0sjH520PG1N4K0hyXfMDsvANMq";

const HASURA_ENDPOINT = "https://winning-scorpion-44.hasura.app/v1/graphql";

async function init() {
    console.log("quiz.js loaded");
}

init();




async function formSubmit(event) {
    event.preventDefault();

    document.getElementById("submit").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...'
    document.getElementById("submit").disabled = true;

    let support_general_value = document.getElementById("support_general").value;

    let support_solve_crime_value = document.getElementById("support_solve_crime").value;

    let bias_value = document.getElementById("bias").value;
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

    document.getElementById("survey").classList.add("hidden");
    document.getElementById("video").classList.add("hidden");
    document.getElementById("thanks").classList.remove("hidden");

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


}

function cleanJSON(obj) {
    var cleaned = JSON.stringify(obj, null, 2);

    return cleaned.replace(/^[\t ]*"[^:\n\r]+(?<!\\)":/gm, function (match) {
        return match.replace(/"/g, "");
    });
}

