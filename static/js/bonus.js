function getGaugePlot(freq) {
    var gaugeTrace = {
        type: "indicator",
        mode: "gauge+number",
        //use the parameter frequency that in passed into the function as the value of the current display
        value: freq,
        //set title and subtext
        title: { text: "Belly Button Washing Frequency <br> Scrubs per Week", font: { size: 18 } },
        gauge: {
          axis: { range: [null, 9], tickwidth: 2, tickcolor: "darkblue" },
          bar: { color: "black" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          //color from dark red to light red each of the 0 to 9 steps of the gauge
          steps: [
            { range: [0, 1], color: "rgb(255, 235, 238)" },
            { range: [1, 2], color: "rgb(255, 205, 210)" },
            { range: [2, 3], color: "rgb(239, 154, 154)" },
            { range: [3, 4], color: "rgb(229, 115, 115)" },
            { range: [4, 5], color: "rgb(239, 83, 80)" },
            { range: [5, 6], color: "rgb(244, 67, 54)" },
            { range: [6, 7], color: "rgb(229, 57, 53)" },
            { range: [7, 8], color: "rgb(211, 47, 47)" },
            { range: [8, 9], color: "rgb(198, 40, 40)" },
          ],
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.55,
          }
          }
    }
    //convert trace into data to put into plotly newPlot
    var gaugeData = [gaugeTrace];
    //set layout for the gauge graph
    var gaugeLayout = {
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        font: { color: "black", family: "Arial" }
        };

    //use Plotly new plot to create the gauge chart
    //add gauge to the gauge id element div container in index.html
    Plotly.newPlot(document.getElementById("gauge"), gaugeData, gaugeLayout);
}