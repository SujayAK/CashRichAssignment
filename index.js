const displayGraph = (symbols, prices) => {
  const graphContainer = document.getElementById("graphContainer");
  graphContainer.innerHTML = ""; //Leave as blank as div element must have some content inside, otherwise it won't show up

  const canvas = document.createElement("canvas");
  canvas.width = graphContainer.offsetWidth; //to occupy same width as container size, ..so it will modify according to responsiveness
  canvas.height = graphContainer.offsetHeight;
  graphContainer.appendChild(canvas);

  //From Chart.js
  new Chart(canvas.getContext("2d"), {
    type: "bar",
    data: {
      labels: symbols,
      datasets: [
        {
          label: "Bitcoin Price",
          data: prices,
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          ticks: {
            color: "white", 
         
            font: {
              size: 12, 
            },
            beginAtZero: true,
          },
        },
        x: {
          ticks: {
            color: "white", 
            font: {
              size: 12, 
            },
            beginAtZero: true,
          },
        },
      },

      plugins: {
        // 'legend' now within object 'plugins {}'
        legend: {
          labels: {
            color: "whitesmoke",
            font: {
              size: 15,
            },
          },
        },
      },
    },
  });
};

const fetchAndDisplayGraph = () => {
  const symbols = document
    .getElementById("symbolInput")
    .value.trim()
    .toUpperCase();

  if (symbols.length === 0) {
    alert("Enter Bitcoin Symbol");
    return;
  }

  fetch(`http://localhost:3000/api/prices?symbols=${symbols}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error fetching data from the server");
      }
      return response.json();
    })
    .then((data) => {
      const prices = symbols.split(",").map((symbol) => {
        return data.data[symbol].quote.USD.price;
      });

      const symbolsArray = symbols.split(",");

      displayGraph(symbolsArray, prices);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

document.getElementById("symbolInput").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    fetchAndDisplayGraph();
  }
});

document
  .getElementById("submitBtn")
  .addEventListener("click", fetchAndDisplayGraph);
