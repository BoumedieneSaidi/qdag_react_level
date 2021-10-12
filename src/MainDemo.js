const MainDemo = ({selectedQueryValue,selectedQueryKey,runQuery,selectedDB,result}) => {
    return (  
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 className="h2">Query</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group mr-2">
                    <button className="btn btn-sm btn-outline-secondary">Clear</button>
                    <button className="btn btn-sm btn-outline-secondary" id="run_btn" onClick = {()=>runQuery(selectedDB,selectedQueryKey)}>Run</button>
                </div>
                </div>
            </div>
            <div className="container-fluid">
                <form>
                    <div className="form-group">
                        <label htmlFor="QueryTextarea">Example textarea</label>
                        <textarea className="form-control" id="QueryTextarea" rows="7" value = {selectedQueryValue} onChange={()=>{}}/>
                    </div>
                </form>
            </div>

            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 className="h2">Results</h1>
            </div>



            <div className="container-fluid">
            <div className="result-div">
                <pre id="result-section" className="result-section">
                       {result}
                </pre>
            </div>
            </div>
        
        </main>
    );
}
 
export default MainDemo;