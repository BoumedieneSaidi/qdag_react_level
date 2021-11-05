import { Chart } from "react-google-charts";
const Stat = ({userQueries}) => {
    let lastUserQuery,data;
    if(userQueries["queriesWithResults"].length != 0)
     lastUserQuery = userQueries["queriesWithResults"][userQueries["queriesWithResults"].length - 1];
    if(lastUserQuery !== undefined)
        data = [['Exec Time', 'QDAG - '+lastUserQuery["optimizer"]+(lastUserQuery['isElag'] ==='true' ? '- with pruning':'')
    +(lastUserQuery['isSpatial'] ==='true' ? '- '+lastUserQuery['spatialStrategy']:''),'RDF-3X']];
    else
        data = [['Exec Time', 'QDAG','RDF-3X']];
    let i = 1;
    userQueries["queriesWithResults"].forEach(userQuery => {
         data.push(["Query "+i++, userQuery["execTimeQDAG"],userQuery["execTimeRDF"]]);
    });
    return (  
        <div>
             <Chart
                    width={'100%'}
                    height={'700px'}
                    chartType="ColumnChart"
                    loader={<div>Loading QDAG Queries Performance</div>}
                    data={data}
                    options={{
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
                     }}
                    // For tests
                    rootProps={{ 'data-testid': '1' }}
            />
       </div>
    );
}
 
export default Stat;