// Function to initialize the dashboard
//function init() {
    // Use D3 to read the JSON file
    //d3.json("samples.json").then((data) => {
        // Populate the dropdown menu with sample IDs
        //var selectTag = d3.select("#selDataset");
        //let selector = d3.select("#selDataset");
        //data.names.forEach((name) => {
        //    selector.append('option').text(name).property('value', name);
        //});

        console.log(data.names)
        // Use the first sample from the list to build the initial plots and metadata display
        const firstSample = data.names[0];
        updateChartsAndMetadata(firstSample, data);
    //});
//}
// Function to update charts and metadata for the current sample
function updateChartsAndMetadata(sampleId, data) {
    // Filter the sample and metadata for the selected ID
    var sampleData = data.samples.filter(sample => sample.id === sampleId)[0];
    var metadata = data.metadata.filter(sample => sample.id === sampleId)[0];
    // Bar chart data and layout
    var barData = [{
        x: sampleData.sample_values.slice(0, 10).reverse(),
        y: sampleData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
        type: 'bar',
        orientation: 'h',
        text: sampleData.otu_labels.slice(0, 10).reverse()
    }];
    var barLayout = {
        title: 'Top 10 OTUs',
        margin: { t: 30, l: 150 }
    };
    Plotly.newPlot('bar', barData, barLayout);
    // Bubble chart data and layout
    var bubbleData = [{
        x: sampleData.otu_ids,
        y: sampleData.sample_values,
        text: sampleData.otu_labels,
        mode: 'markers',
        marker: {
            size: sampleData.sample_values,
            color: sampleData.otu_ids,
            colorscale: 'Earth'
        }
    }];
    var bubbleLayout = {
        title: 'Bacteria Cultures Per Sample',
        margin: { t: 0 },
        hovermode: 'closest',
        xaxis: { title: 'OTU ID' },
        yaxis: { title: 'Sample Values' }
    };
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    // Update demographic info
    var metadataContainer = d3.select("#sample-metadata");
    metadataContainer.html('');
    Object.entries(metadata).forEach(([key, value]) => {
        metadataContainer.append('h6').text(`${key.toUpperCase()}: ${value}`);
    });
}
// Function to handle a change in the dropdown selection
function optionChanged(newSampleId) {
    // Fetch new data each time a new sample is selected
    d3.json("samples.json").then((data) => {
        updateChartsAndMetadata(newSampleId, data);
    });
}
// Initialize the dashboard
//init();
  // Get the samples endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
function main(){
  let selector = d3.select("#selDataset")
  // Fetch the JSON data and console log it
  d3.json(url).then(function(data) {
  console.log(data);
  let sampleitems = data.names;
  for (let i = 0; i < sampleitems.length; i++){
    selector.append("option").text(sampleitems[i]).property("value", sampleitems[i])
  }
  let firstitem = sampleitems[0]
  createtable(firstitem)
  createcharts(firstitem)
  });
}
function optionChanged(newitem){
  createtable(newitem)
  createcharts(newitem)
}
main();
function createtable(sample){
  d3.json(url).then(function(data){
  let meta = data.metadata
  let metarray = meta.filter(obj=>obj.id ==sample)[0]
  console.log(metarray.wfreq)
  let table = d3.select("#sample-metadata")
  table.html("")
  for (key in metarray){table.append("h6").text(`${key}: ${metarray[key]}`)}
  })
}
function createcharts(sample){ d3.json(url).then(function(data){
})}