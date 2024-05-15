//Get the endpoint
//const endpoint = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

const endpoint = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json'

//Fetch the JSON data and console log it
d3.json(endpoint).then(function(data) {
    console.log(data);
}

);