import BootstrapSwitchButton from 'bootstrap-switch-button-react';
//import { useState } from 'react';
const ExecParamsSideBar = (execParamsProps) => {
    const {isSpatial, setIsSpatial, isElag, setIsElag,currentDB,changeDB,databases,selectedQueryRadio,spatialStrategies, 
          changeQuery,spatialStrategy,setSpatialStrategy,optimizer,setOptimizer,rdfToo,setRdfToo,optimizerStrategies} = {...execParamsProps}
    /***************** Construct Databases List *************/
    const dbList = [];
    for (const key of Object.keys(databases)) 
        dbList.push(
            <li className="nav-item nav-link" key={key}>
                <label><input type="radio" value={key} name="databases" checked={currentDB === key} onChange={() => changeDB(key)}/> {key}</label>
            </li>
        );
    /**********************************************************/
    /***************** Construct Queries **********************/
    const queriesList = [];
    for (const key of Object.keys(databases[currentDB])) {
        queriesList.push(
            <li className="nav-item nav-link" key={key}>
                <label><input type="radio" value={key} name="queries" checked={selectedQueryRadio === key} onChange={() => changeQuery(key)}/> {key}</label>
            </li>
        )
    }
    /*************************************************************/
    /***************** Construct optimizer Strategies **********************/
    const optimizerStrategyList = optimizerStrategies.map((optimizerStrategy) => {
        return (<li className="nav-item nav-link" key={optimizerStrategy}>
                    <label className=""><input type="radio" value={optimizerStrategy} name="optimizer" checked={optimizer === optimizerStrategy}
                    onChange={()=> setOptimizer(optimizerStrategy)}/> {optimizerStrategy}</label>
                </li>)
    });
    /************************************************************************/
    /***************** Construct Spatial Strategies **********************/
    const spatialStrategyList = spatialStrategies.map((spatialS) => {
        return (<li className="nav-item nav-link" key={spatialS}>
                    <label className=""><input type="radio" value={spatialS} name="spatial" checked={spatialStrategy === spatialS}
                    onChange={()=> setSpatialStrategy(spatialS)}/> {spatialS}</label>
                </li>)
    });
    /************************************************************************/
    return (  
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
              <span className="font-weight-bold" >Databases</span>
            </h5>
            <ul className="nav flex-column mb-2 db_list">{dbList}</ul>

            <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
              <span className="font-weight-bold">Queries</span>
            </h5>
            <ul className="nav flex-column mb-2 query_list">{queriesList}</ul>

            <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
                <span className="font-weight-bold" >Is Spatial</span>
            </h5>
            <div className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
                <BootstrapSwitchButton checked = {isSpatial} onstyle="secondary" size="sm" onChange={ (checked) => setIsSpatial(checked) } />
            </div>
            <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
              <span className="font-weight-bold">Optimizers</span>
            </h5>
            <ul className="nav flex-column mb-2 query_list">
                    {optimizerStrategyList}
            </ul>
            <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
                <span className="font-weight-bold" >With pruning ?</span>
            </h5>
            <div className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
                <BootstrapSwitchButton checked={isElag} onstyle="secondary" size="sm" onChange={ (checked) => setIsElag(checked) } />
            </div>
            {isSpatial ? 
                <div>
                    <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
                    <span className="font-weight-bold">Spatial Strategies</span>
                    </h5>
                    <ul className="nav flex-column mb-2 query_list">
                        {spatialStrategyList}
                    </ul>
                </div>
            : null}

            <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
              <span className="font-weight-bold">Compare with</span>
            </h5>
            <ul className="nav flex-column mb-2 query_list">
                <li className="nav-item nav-link">
                        <label><input type="checkbox" defaultChecked={rdfToo} onChange = {() => setRdfToo(!rdfToo)}/> RDF 3X</label>
                </li>
            </ul>
          </div>
        </nav>
    );
}
 
export default ExecParamsSideBar;