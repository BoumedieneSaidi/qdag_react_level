import MetaDataList from "./MetaDataList";
import MainDemo from "./MainDemo";
import useFetch from "./useFetch";
import { useState } from "react";
const Demo = () => {
    const defaultQuery  = "SELECT ?v0 ?v2 WHERE \n"+
    "{\n"+
        "?v0 <http://ogp.me/ns#tag> <http://db.uwaterloo.ca/~galuc/wsdbm/Topic132> .\n"+ 
        "?v0 <http://schema.org/caption> ?v2 .\n"+
    "}";
    const {data:metadata,isPending,error} = useFetch("http://193.55.163.167:8080/get-metadata") 
    const [selectedQueryValue, setSelectedQueryValue] = useState(defaultQuery)
    const [selectedQueryKey, setSelectedQueryKey] = useState("")
    const [selectedDB, setSelectedDB] = useState("watdiv100k")
    const [result, setResult] = useState("> Welcome to RDF_QDAG")
    const handleDBChange = (event) =>{
        event.preventDefault()
        const selectedDBName = event.target.getAttribute('data-db');
        setSelectedDB(selectedDBName);
        setSelectedQueryKey(Object.keys(metadata.databases[selectedDBName])[0]);
    }
    const handleQueryChange = (event,selectedDB) =>{
        event.preventDefault()
        const selectedQueryName = event.target.getAttribute('data-query');
        setSelectedQueryKey(selectedQueryName)
        setSelectedQueryValue(metadata.databases[selectedDB][selectedQueryName])
    }
    const runQuery = (selectedDB,selectedQueryKey) => {
        fetch("http://193.55.163.167:8080/run-query?query="+selectedQueryKey+"&db="+selectedDB).then(res => {
            if(!res.ok)
                throw Error('could not fetch the data for that ressource')
            return res.text();
        }).then((data) => {
            //console.log(data)
            setResult(data)
        }).catch(err => {
            console.log(err)
        })
    }
    return (  
        <div className="container-fluid">
            <div className="row">
                {error && <div>{error}</div>}
                {isPending && <div>loading</div>}
                {metadata && <MetaDataList metadata={metadata} handleQueryChange={handleQueryChange} handleDBChange={handleDBChange} 
                selectedQueryKey = {selectedQueryKey} selectedDB={selectedDB}/>}
                {<MainDemo selectedQueryValue={selectedQueryValue} runQuery={runQuery} selectedDB={selectedDB} selectedQueryKey={selectedQueryKey} result={result}/>}
            </div>
        </div>
    );
}
 
export default Demo;