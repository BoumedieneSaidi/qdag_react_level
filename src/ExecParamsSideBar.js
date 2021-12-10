import BootstrapSwitchButton from "bootstrap-switch-button-react";
import Form from "react-bootstrap/Form";
import { DropDownTreeComponent } from "@syncfusion/ej2-react-dropdowns";
//import { useState } from 'react';

const ExecParamsSideBar = (execParamsProps) => {
  const {
    isSpatial,
    setIsSpatial,
    isElag,
    setIsElag,
    currentDB,
    changeDB,
    databases,
    selectedQueryRadio,
    spatialStrategies,
    changeQuery,
    spatialStrategy,
    setSpatialStrategy,
    optimizer,
    setOptimizer,
    rdfToo,
    setRdfToo,
    optimizerStrategies,
  } = { ...execParamsProps };
  /***************** Construct Databases List *************/
  const dbList = [];
  for (const key of Object.keys(databases))
    dbList.push(
      <li className="nav-item nav-link" key={key}>
        <label>
          <input
            type="radio"
            value={key}
            name="databases"
            checked={currentDB === key}
            onChange={() => changeDB(key)}
          />{" "}
          {key}
        </label>
      </li>
    );
  /**********************************************************/
  /***************** Construct Queries **********************/
  const queriesList = [];
  for (const key of Object.keys(databases[currentDB])) {
    queriesList.push(
      <li className="nav-item nav-link" key={key}>
        <label>
          <input
            type="radio"
            value={key}
            name="queries"
            checked={selectedQueryRadio === key}
            onChange={() => changeQuery(key)}
          />{" "}
          {key}
        </label>
      </li>
    );
  }
  /*************************************************************/
  /***************** Construct optimizer Strategies **********************/
  const optimizerStrategyList = optimizerStrategies.map((optimizerStrategy) => {
    return (
      <li className="nav-item nav-link" key={optimizerStrategy}>
        <label className="">
          <input
            type="radio"
            value={optimizerStrategy}
            name="optimizer"
            checked={optimizer === optimizerStrategy}
            onChange={() => setOptimizer(optimizerStrategy)}
          />{" "}
          {optimizerStrategy}
        </label>
      </li>
    );
  });
  /************************************************************************/
  /***************** Construct Spatial Strategies **********************/
  const spatialStrategyList = spatialStrategies.map((spatialS) => {
    return (
      <li className="nav-item nav-link" key={spatialS}>
        <label className="">
          <input
            type="radio"
            value={spatialS}
            name="spatial"
            checked={spatialStrategy === spatialS}
            onChange={() => setSpatialStrategy(spatialS)}
          />{" "}
          {spatialS}
        </label>
      </li>
    );
  });
  let queriesData = [];
  console.log("Selected query:" + (selectedQueryRadio === "Complex 2"));
  for (const subgroup of Object.keys(databases[currentDB])) {
    let nodeChildArr = [];
    for (const qr of Object.keys(databases[currentDB][subgroup])) {
      nodeChildArr.push({
        nodeId: qr,
        nodeText: qr,
        //selected: selectedQueryRadio === qr ? true : false,
      });
    }
    queriesData.push({
      nodeId: subgroup,
      nodeText: subgroup,
      nodeChild: nodeChildArr,
    });
  }
  let fields = {
    dataSource: queriesData,
    value: "nodeId",
    text: "nodeText",
    child: "nodeChild",
  };
  /************************************************************************/
  return (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
          <span className="font-weight-bold">Databases</span>
        </h5>
        <ul className="nav flex-column mb-2 db_list">{dbList}</ul>

        <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
          <span className="font-weight-bold">Queries</span>
        </h5>
        <ul className="nav flex-column mb-2 query_list">{/*queriesList*/}</ul>
        {/*<Form.Select
          aria-label="Default select example"
          onChange={(e) => {
            changeQuery(e.target.value);
          }}
        >
          <option>Choose a query</option>
          <optgroup label="Complex">
            <option value="C1.in">Complex 1</option>
            <option value="C2.in">Complex 2</option>
            <option value="C3.in">Complex 3</option>
          </optgroup>
          <optgroup label="Snow Flake">
            <option value="F2.in">Snow Flake shaped1</option>
            <option value="F3.in">Snow Flake shaped2</option>
            <option value="F4.in">Snow Flake shaped3</option>
          </optgroup>
          <optgroup label="Stars">
            <option value="S1.in">Star 1</option>
            <option value="S2.in">Star 2</option>
            <option value="S6.in">Star 3</option>
          </optgroup>
          <optgroup label="Linear">
            <option value="L1.in">Linear 1</option>
            <option value="L2.in">Linear 2</option>
            <option value="L4.in">Linear 3</option>
          </optgroup>
          <optgroup label="Grouping">
            <option value="G1.in">Grouping 1</option>
            <option value="G2.in">Grouping 2</option>
            <option value="G3.in">Grouping 3</option>
            <option value="G4.in">Grouping 4</option>
          </optgroup>
          <optgroup label="Sorting">
            <option value="O1.in">Sorting 1</option>
            <option value="O2.in">Sorting 2</option>
            <option value="O3.in">Sorting 3</option>
            <option value="O4.in">Sorting 4</option>
          </optgroup>
        </Form.Select>*/}
        <DropDownTreeComponent
          id="dropdowntree"
          fields={fields}
          select={(e) => {
            console.log(e.itemData);
            changeQuery(e.itemData.text, e.itemData.parentID);
          }}
        />
        <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
          <span className="font-weight-bold">Is Spatial</span>
        </h5>
        <div className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
          <BootstrapSwitchButton
            checked={isSpatial}
            onstyle="secondary"
            size="sm"
            onChange={(checked) => setIsSpatial(checked)}
          />
        </div>
        <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
          <span className="font-weight-bold">Optimizers</span>
        </h5>
        <ul className="nav flex-column mb-2 query_list">
          {optimizerStrategyList}
        </ul>
        <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
          <span className="font-weight-bold">With pruning ?</span>
        </h5>
        <div className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
          <BootstrapSwitchButton
            checked={isElag}
            onstyle="secondary"
            size="sm"
            onChange={(checked) => setIsElag(checked)}
          />
        </div>
        {isSpatial ? (
          <div>
            <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
              <span className="font-weight-bold">Spatial Strategies</span>
            </h5>
            <ul className="nav flex-column mb-2 query_list">
              {spatialStrategyList}
            </ul>
          </div>
        ) : null}

        <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
          <span className="font-weight-bold">Compare with</span>
        </h5>
        <ul className="nav flex-column mb-2 query_list">
          <li className="nav-item nav-link">
            <label>
              <input
                type="checkbox"
                defaultChecked={rdfToo}
                onChange={() => setRdfToo(!rdfToo)}
              />{" "}
              RDF 3X
            </label>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default ExecParamsSideBar;
