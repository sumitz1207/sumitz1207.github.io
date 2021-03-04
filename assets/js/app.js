function updateChart() {

    let margin = {
    top: 20,
    bottom: 80,
    right: 40,
    left:100
    };
    
    let w = 960 - margin.right - margin.left;
    let h = 500 - margin.bottom - margin.top;
    
    //make wrapper and append the svg group using the calculated height and width
    let wrapper = d3.select("#scatter")
        .append("svg")
        .attr("width", 960)
        .attr("height", 500);
    //set graphData to wrapper 
    let graphData = wrapper.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    //import data using csv d3 function
    d3.csv("assets/data/data.csv")
        .then(function(riskData){
    
    //data grabbed from the csv file and set
        riskData.forEach(function(data) {
            data.healthcare = +data.healthcare;
            data.poverty = +data.poverty;
  
        });
    //Create scales for X and Y
        let xl = d3.scaleLinear()
            .domain([8.5, d3.max(riskData, d => d.poverty)])
            .range([0, w]);
    
        let yl = d3.scaleLinear()
            .domain([3.5, d3.max(riskData, d => d.healthcare)])
            .range([h, 0]);
    
    
    //the x and y axis formatting
        let xAxis = d3.axisBottom(xl);
        let yAxis = d3.axisLeft(yl);
    
    //graph data appends the x and y axes
        graphData.append("g")
        .attr("transform", `translate(0, ${h})`)
        .call(xAxis);
    
        graphData.append("g")
        .call(yAxis);
        
    //create each of the state bubbles for the graph
        let chartBubbles = graphData.selectAll("circle")
            .data(riskData)
            .enter()
            .append("circle")
            .attr("cx", d => xl(d.poverty))
            .attr("cy", d => yl(d.healthcare))
            .attr("r", 10)
            .attr("opacity", ".5")
            .attr("fill", "salmon")
            .attr("stroke-width", "2")
            .attr("stroke", "darkred");
    
            graphData.select("g")
            .selectAll("circle")
            .data(riskData)
            .enter()
            .append("text")
            .text(d => d.abbr)
            .attr("x", d => xl(d.poverty))
            .attr("y", d => yl(d.healthcare))
            .attr("dy",-395)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("fill", "black");
         
            console.log(riskData);
  
    // append text label for y axis "lacks healthcare %"
        graphData.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - 50)
          .attr("x", 0 -250)
          .attr("dy", "1em")
          .attr("class", "axisText")
          .text("Lacks Healthcare (%)");
      let updatedWidth = w/3.5;
      let updatedHeight = h + 28 + margin.top;
    // append text label for x axis concerning poverty %
        graphData.append("text")
          .attr("transform", `translate(${updatedWidth}, ${updatedHeight})`)
          .attr("class", "axisText")
          .text("In Poverty (%)");
  
    });
    }
    // call update graph function
    updateChart();