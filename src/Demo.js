import ExecParamsSideBar from "./ExecParamsSideBar";
import MainDemo from "./MainDemo";
import { useState} from "react";
const Demo = () => {
    /********************** Props variables ***************************/
    const config = require('./config.json');
    const node_url = config.node_address + config.node_port;
    const defaultDB = Object.keys(config.databases)[0];
    const [currentDB,setCurrentDB] = useState(defaultDB);
    const defaultQuery = Object.keys(config.databases[defaultDB])[0];
    const [query,setQuery] = useState(config.databases[defaultDB][defaultQuery]);
    const [selectedQueryRadio,setSelectedQueryRadio] = useState(defaultQuery)
    const [isSpatial,setIsSpatial] = useState(config.is_spatial);
    const [spatialStrategy,setSpatialStrategy] = useState(config.spatial_strategies[0])
    const [isElag,setIsElag] = useState(config.is_elag);
    const [optimizer,setOptimizer] = useState(config.optimizer_strategies[0]);
    const [rdfToo,setRdfToo] = useState(config.rdf_too);
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
    /** Run Query : it need params from the two component main demo and execPARASM <Communication> */
    const runQuery = () => {
        var url = new URL(node_url+"/run-query");
        var params = {currentDB:currentDB, query:query,optimizer:optimizer,isElag:isElag,isSpatial:isSpatial,spatialStrategy:spatialStrategy,rdfToo:rdfToo};
        console.log(params);
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
            optimizerStrategies:config.optimizer_strategies,spatialStrategies:config.spatial_strategies
    };
    let mainDemoProps = {query:query,runQuery:runQuery,result:result,setResult:setResult,nodeUrl:node_url};
    return (  
        <div className="container-fluid">
            <div className="row">
                <ExecParamsSideBar {...execParamsProps}/>
                <MainDemo {...mainDemoProps} />
            </div>
        </div>
    );
}
 
export default Demo;