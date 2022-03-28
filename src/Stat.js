import { Chart } from "react-google-charts";
const Stat = ({ data }) => {
  var dataTest = [data["queryParamsGroups"]];
  for (const [key, value] of Object.entries(data["queriesSeries"])) {
    let arr = [key];
    data["queryParamsGroups"].forEach((serieConf, i) => {
      if (data["isVirtuosoExecuted"] && i === data["queryParamsGroups"].length - 1) {
        if (data["virtuosoSeries"][key] !== undefined)
          arr.push(data["virtuosoSeries"][key]);
        else arr.push(0);
      }/*else if(data["isVirtuosoExecuted"] && data["isRDFExecuted"] && i === data["queryParamsGroups"].length - 2){
        if (data["virtuosoSeries"][key] !== undefined)
          arr.push(data["virtuosoSeries"][key]);
        else arr.push(0);
      } else if(data["isVirtuosoExecuted"] && !data["isRDFExecuted"] && i === data["queryParamsGroups"].length - 1){
        if (data["virtuosoSeries"][key] !== undefined)
          arr.push(data["virtuosoSeries"][key]);
        else arr.push(0);
      } */
      else if (i > 0)
        arr.push(
          value[serieConf] !== undefined ? value[serieConf]["execTimeQDAG"] : 0
        );
    });
    dataTest.push(arr);
  }
  var optionsTest = {
    title: "QDAG Performance",
    chartArea: { width: "50%" },
    animation: {
      duration: 1000,
      easing: "out",
      startup: true,
    },
    hAxis: {
      title: "Queries",
    },
    vAxis: {
      title: "Exec Time in ms",
      scaleType: "log",
      ticks: [
        0, 500, 1000, 3000, 4000, 6000, 8000, 12000, 15000, 20000, 30000, 60000,
        80000,
      ],
    },
    //isStacked:true
  };
  return (
    <div>
      <Chart
        width={"100%"}
        height={"700px"}
        chartType="ColumnChart"
        loader={<div>Loading QDAG Queries Performance</div>}
        data={dataTest}
        options={optionsTest}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
};

export default Stat;
