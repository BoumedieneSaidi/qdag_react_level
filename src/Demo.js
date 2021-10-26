import ExecParamsSideBar from "./ExecParamsSideBar";
import MainDemo from "./MainDemo";
import { useState} from "react";
import useFetch from "./utils/useFetch";
const Demo = () => {
    /********************** Props variables ***************************/
    const config = require('./config.json');
    const node_url = config.node_address + config.node_port;
    const defaultDB = Object.keys(config.databases)[0];
    const [currentDB,setCurrentDB] = useState(defaultDB);
    const defaultQuery = Object.keys(config.databases[defaultDB])[0];
    const [query,setQuery] = useState(config.databases[defaultDB][defaultQuery]);
    const [selectedQueryRadio,setSelectedQueryRadio] = useState(defaultQuery)
    const [isSpatial,setIsSpatial] = useState(false);
    const [spatialStrategy,setSpatialStrategy] = useState(config.default_spatial_strategy)
    const [isElag,setIsElag] = useState(false);
    const [optimizer,setOptimizer] = useState(config.optimizer_strategies[0]);
    const [rdfToo,setRdfToo] = useState(false);
    const [result, setResult] = useState(config.defautl_res_message)
    /**********************************************************************/

    /******************** Hundle changing query and database ****************/
    const changeQuery = (newQuery) => {
        setSelectedQueryRadio(newQuery);
        setQuery(config.databases[currentDB][newQuery]);
    }
    const changeDB = (newDB) => {
        setCurrentDB(newDB)
        let newQKey = Object.keys(config.databases[newDB])[0];
        setSelectedQueryRadio(newQKey);
        setQuery(config.databases[newDB][newQKey]);
    }
    /************************************************************************/

    /***    Node js Api methods [get user session queries, and run query] ********/
    const {data:queriesWithResults} = useFetch(node_url+"/demo");

    const runQuery = () => {
        var url = new URL(node_url+"/run-query");
        var params = {currentDB:currentDB, query:query,optimizer:optimizer,isElag:isElag,spatialStrategy:spatialStrategy,rdfToo:rdfToo};
        url.search = new URLSearchParams(params).toString();
        return fetch(url).then(res => {
            if(!res.ok)
                throw Error('could not fetch the data for that ressource')
            return res.json();
        }).then((data) => {
            return data["userQuery"];
        }).catch(err => { console.log(err)});
    }
    let execParamsProps = {
            isSpatial:isSpatial, setIsSpatial:setIsSpatial, isElag:isElag, setIsElag:setIsElag, currentDB:currentDB,changeDB:changeDB, 
            databases:config.databases, selectedQueryRadio :selectedQueryRadio, changeQuery:changeQuery,spatialStrategy:spatialStrategy, 
            setSpatialStrategy:setSpatialStrategy, optimizer:optimizer, setOptimizer:setOptimizer, rdfToo:rdfToo, setRdfToo:setRdfToo, 
            optimizerStrategies:config.optimizer_strategies
    };
    let mainDemoProps = {query:query,runQuery:runQuery,result:result,setResult:setResult,queriesWithResults:queriesWithResults};
    return (  
        <div className="container-fluid">
            <div className="row">
                <ExecParamsSideBar {...execParamsProps}/>
                {queriesWithResults && <MainDemo {...mainDemoProps}/>
                }
            </div>
        </div>
    );
}
 
export default Demo;