//Get the endpoint
const endpoint = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json'

function main(){
    let selector = d3.select("#selDataset")
    // Fetch the JSON data and console log it
    d3.json(endpoint).then(function(data) {
        console.log(data);
        let sampleItems = data.names;
        for (let i = 0; i < sampleItems.length; i++){
            selector.append("option").text(sampleItems[i]).property("value", sampleItems[i])
        }
        let firstItem = sampleItems[0]
        createTable(firstItem)
        createChartsAndMetadata(firstItem,data);
    });
}

function optionChanged(newItem){
    // createTable(newItem);
    d3.json(endpoint).then(data => {
        createTable(newItem);
        createChartsAndMetadata(newItem,data);
    }).catch(error => console.error('Error fetching data:', error));
}

function createTable(sample){
    d3.json(endpoint).then(function(data){
        let meta = data.metadata
        let metarray = meta.filter(obj=>obj.id==sample)[0]
        console.log(metarray.wfreq)
        let table = d3.select("#sample-metadata")
        table.html("")
        for (key in metarray){
            table.append("h6").text(`${key}: ${metarray[key]}`)
        }
    })
}

function createChartsAndMetadata(sampleId,data) {
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
        title: 'Top 10 Bacteria Cultures Found',
        margin: { t: 50, l: 150 },
        xaxis: { title: 'Number of Bacteria'}
    };

    //render bar chart
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
        margin: { t: 50, l: 150 },
        hovermode: 'closest',
        xaxis: { title: 'OTU ID' },
        yaxis: { title: 'Number of Bacteria' }
    };

    //render bubble chart
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    // Update demographic info
    var metadataContainer = d3.select("#sample-metadata");
    metadataContainer.html('');
    Object.entries(metadata).forEach(
        ([key, value]) => {
        metadataContainer.append('h6').text(`${key.toUpperCase()}: ${value}`);
    });
}

main();