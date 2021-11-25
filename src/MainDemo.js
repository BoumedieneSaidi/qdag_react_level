import Stat from "./Stat";
import useFetch from "./utils/useFetch";
import { useState /*useEffect*/ } from "react";
import Map from "./Map";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
//import DataTable from "react-data-table-component";
//const axios = require("axios").default;
const MainDemo = ({ query, runQuery, result, setResult, nodeUrl }) => {
  /************************* Data Table  ******************************/
  /*const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

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
  const { data, setData } = useFetch("/demo");
  /** Run Query: update the existing queries after getting the result*/
  const hundleRunQuery = () => {
    Promise.all([runQuery()]).then(([newData]) => {
      console.log(newData);
      if (Object.keys(newData["currentQuery"]).length === 0) {
        alert("OOOOh lala sorry we don't have this db or this query");
        setIsLoading(false);
        return;
      }
      setData(newData);
      setResult(newData["currentQuery"]["result"]);
      setResultType(1);
      setIsSpa(newData["currentQuery"]["isSpatial"] === "true");
      if (showRow === false) setShowRow(true);
      setIsLoading(false);
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
  if (showResult && resultType === 1)
    resultSection = (
      <div className="container-fluid">
        <div className="result-div">
          <pre id="result-section" className="result-section">
            {result}
          </pre>
        </div>
      </div>
    );
  else if (showResult && resultType === 2)
    resultSection = (
      <div className="container-fluid" id="mappa">
        <Map />
      </div>
    );

  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h2">Query</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group mr-2">
            <button className="btn btn-sm btn-outline-secondary">Clear</button>
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
        </form>
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
              Hide
            </button>
            {showRow && (
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  setResultType(1);
                }}
              >
                Row
              </button>
            )}
            {isSpa && (
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  setResultType(2);
                }}
              >
                Spatial
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
      <div className="d-flex justify-content-center">
        {isLoading ? (
          <Spinner
            animation="border"
            role="status"
            size="md"
            style={{ width: "10rem", height: "10rem" }}
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          resultSection
        )}
      </div>
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
