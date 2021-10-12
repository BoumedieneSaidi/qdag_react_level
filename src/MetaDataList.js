const MetaDataList = ({metadata,selectedDB,selectedQueryKey,handleQueryChange,handleDBChange}) => {
    const databases = [];
    const queries = [];
    if(selectedDB === "")
         selectedDB = Object.keys(metadata.databases)[0];

    for (const key of Object.keys(metadata.databases)) {
        const activeAttr = key === selectedDB ? "active":"";
        if(Object.keys(metadata.databases[key]).length > 0)
                databases.push(
                    <li className="nav-item db_holder" key={key}>
                            <a className={"nav-link "+activeAttr} href="/" data-db={key} onClick = {(event) => handleDBChange(event)}>
                            <span data-feather="database"></span>
                                {key}
                            </a>
                    </li>
                )
    }
    if(selectedQueryKey === "")
        selectedQueryKey = Object.keys(metadata.databases[selectedDB])[0];
    for (const key of Object.keys(metadata.databases[selectedDB])) {
        const activeAttr = key === selectedQueryKey ? "active":"";
        queries.push(
            <li className="nav-item" key={key}>
                    <a className={"nav-link db_query "+activeAttr} data-query={key} href="/" onClick={(event) => handleQueryChange(event,selectedDB)}>
                         {key}
                    </a>
            </li>
        )
    }
    
    return (  
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
              <span className="font-weight-bold" >Data bases</span>
            </h5>
            <ul className="nav flex-column mb-2 db_list">
                {databases}
            </ul>
            <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
              <span className="font-weight-bold">Query examples</span>
            </h5>
            <ul className="nav flex-column mb-2 query_list">
                {queries}
            </ul>
          </div>
        </nav>
    );
}
 
export default MetaDataList;