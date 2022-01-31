import Stat from "./Stat";
import useFetch from "./utils/useFetch";
import { useState /*useEffect*/ } from "react";
import Map from "./Map";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";
import VisNetwork from "./VisNetwork";
import ResultGraph from "./ResultGraph";
const axios = require("axios").default;
require("dotenv").config();
const MainDemo = ({ query, runQuery, result, setResult, nodeUrl }) => {
  /************************* Data Table  ******************************/
  const [currQuery, setCurrQuery] = useState({});
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [resultData, setResultData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [finalResult, setFinalResult] = useState([]);
  const [queryView,setQueryView] = useState("Text");//Text or Graph
  //const [loading, setLoading] = useState(false);
  const fetchMappings = async (page) => {
    //setLoading(true);

    const response = await axios.get(
      process.env.REACT_APP_API_URL +
        `/fetchData?page=${page}&per_page=${perPage}&delay=1&resultFile=${currQuery["resultFile"]}`,
      { credentials: "include" }
    );
    setResultData(response.data.data);
    //setLoading(false);
  };

  const handlePageChange = (page) => {
    fetchMappings(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    //setLoading(true);

    const response = await axios.get(
      process.env.REACT_APP_API_URL +
        `/fetchData?page=${page}&per_page=${newPerPage}&delay=1&resultFile=${currQuery["resultFile"]}`,
      { credentials: "include" }
    );

    setResultData(response.data.data);
    setPerPage(newPerPage);
    //setLoading(false);
  };
  /*

  const fetchUsers = async (page) => {
    setLoading(true);

    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`
    );

    setResultData(response.data.data);
    setTotalRows(response.data.total);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    fetchUsers(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);

    const response = await axios.get(
      `http://localhost:3005/fetchData?page=${page}&per_page=${newPerPage}&delay=1`
    );

    setResultData(response.data.data);
    setPerPage(newPerPage);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users
  }, []);*/
  /********************************************************************** */

  const [isSpa, setIsSpa] = useState(false);
  const [showRow, setShowRow] = useState(false);
  const [resultType, setResultType] = useState(1);
  const [showResult, setShowResult] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  /** fetch data queries return {"queriesWithResults":[]} */
  const { data, setData } = useFetch(process.env.REACT_APP_API_URL + "/demo");
  /** Run Query: update the existing queries after getting the result*/
  const hundleRunQuery = () => {
    Promise.all([runQuery()]).then(([newData]) => {
      if (
        newData === undefined ||
        newData === null ||
        Object.keys(newData) === 0 ||
        newData["currentQuery"] === undefined ||
        newData["currentQuery"] === null ||
        Object.keys(newData["currentQuery"]).length === 0
      ) {
        setIsLoading(false);
        alert("There is an error somewhere please repeat the execution");
        return;
      }
      if (Object.keys(newData["currentQuery"]).length === 0) {
        alert("OOOOh lala sorry we don't have this db or this query");
        setIsLoading(false);
        return;
      }
      setData(newData);
      setResult(newData["currentQuery"]["result"]);
      setCurrQuery(newData["currentQuery"]);
      setResultData(newData["currentQuery"]["result"]);
      setTotalRows(newData["currentQuery"]["nbrRes"]);
      setResultType(1);
      setIsSpa(newData["currentQuery"]["isSpatial"] === "true");
      if (showRow === false) setShowRow(true);
      setIsLoading(false);
      let columns = [{
        name: "Row No",
        selector: (row) => row.no,
        grow: 0.1,
      }];
      let queryProjectVars = query.split("\n")[0].split(" ").filter((arg) => arg.startsWith("?"));
      let finalResult = newData["currentQuery"]["result"].map((reslt) => {
        let toReturn = {};
        toReturn["no"] = reslt.no;
        let resultArgs = reslt.mapping.split("|");
        let i = 0;
        queryProjectVars.forEach(arg => {
            toReturn[arg] = resultArgs[i++];
        });
        return toReturn;
      });
      queryProjectVars.forEach(element => {
        columns.push({
          name: element,
          selector: (row) => row[element],
          grow: 1,
          wrap:true
        })
      });
      console.log(columns,finalResult);
      setColumns(columns)
      setFinalResult(finalResult);
      /*if(Object.keys(newQueryWithResult).length !== 0){
                let newArr = [...data["queriesWithResults"]];
                newArr[data["queriesWithResults"].length] = newQueryWithResult;
                setData({"queriesWithResults":newArr});
                setResult(newQueryWithResult["result"]);
                setResultType(1);
                setIsSpa(newQueryWithResult['isSpatial'] === 'true');
                if(showRow === false)
                    setShowRow(true)
            }*/
    });
  };
  /**********************************************************************/
  
  
  let resultSection = "";
  if (showResult && resultType === 1){
    resultSection = (
      <div className="container-fluid">
        <DataTable
          title="Mappings"
          columns={columns}
          paginationPerPage={perPage}
          data={finalResult}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          responsive
          expandOnRowClicked
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      </div>
    );
  }
  else if (showResult && resultType === 2)
    resultSection = (
      <div className="container-fluid" id="mappa">
        <Map />
      </div>
    );
  else if(showResult && resultType === 3){
    resultSection = (
      <ResultGraph result={resultData} query={query}/>
    );
  }
    //Construct query graph
  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h2">Query</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group mr-2">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => {
                fetch(process.env.REACT_APP_API_URL + "/clear-session", {
                  credentials: "include",
                });
                setData(undefined);
                window.location.reload(); 
                /*setIsLoading(true);
                hundleRunQuery();*/
              }}
            >
              Clear Session
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              id="graph_view"
              onClick={() => {
                setQueryView("Graph")
              }}
            >
              Graph View
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              id="text_view"
              onClick={() => {
                setQueryView("Text")
              }}
            >
              Text View
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              id="run_btn"
              onClick={() => {
                setIsLoading(true);
                hundleRunQuery();
              }}
            >
              Run
            </button>
          </div>
        </div>
      </div>
      <div className="container-fluid">
      {queryView === "Text" ? (
        <form>
          <div className="form-group">
            <textarea
              className="form-control"
              id="QueryTextarea"
              rows="10"
              value={query}
              onChange={() => {}}
            />
          </div>
        </form>):
        (query && <VisNetwork key={query} query={query}/>)}
      </div>

      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h2">Results</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group mr-2">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => {
                setShowResult(!showResult);
              }}
            >
              {showResult ? "Hide" : "Show"}
            </button>
            {showResult && showRow && (
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  setResultType(1);
                }}
              >
                Row
              </button>
            )}
            {showResult && isSpa && (
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  setResultType(2);
                }}
              >
                Spatial
              </button>
            )}
            {showResult && showRow  && (
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  setResultType(3);
                }}
              >
                Graph
              </button>
            )}
          </div>
        </div>
      </div>
      {/*resultSection*/}
      {/*<DataTable
        title="Users"
        columns={[
          {
            name: "First Name",
            selector: (row) => row.first_name,
          },
          {
            name: "Last Name",
            selector: (row) => row.last_name,
          },
          {
            name: "Email",
            selector: (row) => row.email,
          },
        ]}
        data={resultData}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />*/}
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Spinner
            animation="border"
            role="status"
            size="md"
            style={{ width: "10rem", height: "10rem" }}
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        resultSection
      )}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h2">Stats</h1>
      </div>
      <div className="container-fluid">
        <div>{data && <Stat data={data} />}</div>
      </div>
    </main>
  );
};

export default MainDemo;
