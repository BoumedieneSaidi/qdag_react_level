import { Chart } from "react-google-charts";
const Stat = ({data}) => {
    var dataTest = [
        data["queryParamsGroups"]
    ];
    for (const [key, value] of Object.entries(data["queriesSeries"])) {
      let arr = [key];
      data["queryParamsGroups"].forEach((serieConf,i) => {
        if(data["isRDFExecuted"] && i === data["queryParamsGroups"].length - 1){
          if(data['rDF3XSeries'][key] !== undefined)
            arr.push(data['rDF3XSeries'][key]);
          else arr.push(0);
        }else if(i > 0)
          arr.push(value[serieConf] !== undefined ? value[serieConf]["execTimeQDAG"]:0)
      });
      dataTest.push(arr);
    }
    var optionsTest = {
      title: 'QDAG Performance',
      chartArea: { width: '50%' },  
      animation: {
          duration: 1000,
          easing: 'out',
          startup: true,
      },  
      hAxis: {
          title: 'Queries',
          minValue: 0,
      },
      vAxis: {
          title: 'Exec Time',
      },
      //isStacked:true
   };
    return (  
        <div>
             <Chart
                    width={'100%'}
                    height={'700px'}
                    chartType="ColumnChart"
                    loader={<div>Loading QDAG Queries Performance</div>}
                    data={dataTest}
                    options={optionsTest}
                    rootProps={{ 'data-testid': '1' }}
            />
       </div>
    );
}
 
export default Stat;