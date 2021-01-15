function getSampleData(subject) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    //filter given the parameter subject's id
    var filterData = metadata.filter(filterItem => filterItem.id == subject);
    // use d3 select `#sample-metadata`
    var dataSelect = d3.select("#sample-metadata");
    //clear metadata
    dataSelect.html("");

    //add filter data to the panel
    Object.entries(filterData[0]).forEach(([k, v]) => {
      dataSelect.append("h5").text(`${k}: ${v}`);
    });
    //BONUS: get Gauge plot function, give the subject data washing frequency as a parameter
    getGaugePlot(filterData[0].wfreq);
  });
}

function getPlot(subject) {
  d3.json("samples.json").then((d) => {
   //filter samples.json data and take IDs, labels, and values
    var filtered = d.samples.filter(filteredItem => filteredItem.id == subject);  
    var subjectIDs = filtered[0].otu_ids;
    var subjectLabels = filtered[0].otu_labels;
    var subjectValues = filtered[0].sample_values;

    //assign layout for the bubble chart
    var bubbleLayout = {
      title: "Bacteria ID by Sample",
      xaxis: { title: "OTU ID" },
    };
    //assign data for the bubble chart
    var bubbleTrace =         {
      x: subjectIDs,
      y: subjectValues,
      mode: "markers",
      text: subjectLabels,
      marker: {
        size: subjectValues,
        color: subjectIDs,
      }
    }
    var bubbleData = [bubbleTrace];
    //use plotly to organize new Plot for bubble chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    //Bar chart
    //assign trace for the bar chart
    var barTrace =          {
      y: subjectIDs.slice(0, 10).map(id => `OTU ${id}`).reverse(),
      x: subjectValues.slice(0, 10).reverse(),
      text: subjectLabels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    }
    //trace into data for bar chart
    var barData = [barTrace];
    //assign layout for the bar chart
    var barLayout = {
      title: "Top 10 Bacteria IDs",
      margin: { t: 30, l: 150 }
    };
    //use plotly to make the bar chart
    Plotly.newPlot("bar", barData, barLayout);

  });
}

//initialize function for plotly app
function init() {
  //refer to drop down data selector
  var dropSelect = d3.select("#selDataset");

  //take data from samples.json and use inline function
  d3.json("samples.json").then((d) => {
    //grab data sample names
    var names = d.names;
    //take from the drop select information and append to names for graph building
    names.forEach((listItem) => {dropSelect.append("option").text(listItem).property("value", listItem);
    });
    //take from the list and call the functions to build graphs and data
    getPlot(names[0]);
    getSampleData(names[0]);
  });
}

function optionChanged(subject) {
  // Fetch new data each time a new sample is selected
  getPlot(subject);
  getSampleData(subject);
}

//call initialize for app
init();