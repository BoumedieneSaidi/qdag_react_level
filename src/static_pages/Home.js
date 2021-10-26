const Home = () => {
    return (  
        <div>
            <div className="jumbotron">
                <div className="container">
                    <h1 className="display-3">RDF_QDAG!</h1>
                    <p>This website contains a set of tools allowing to test the RDF QDAG system. This system relies on graph exploration and fragmentation in order to evaluate SPARQL queries. Various libraries and scripts are provided in order to deploy the system in a specific environment. A web interface is also provided in order to show how the system works. Currently, queries that contain BGP, Wildcards, Order by and Group By are supported.</p>
                    <p><a className="btn btn-primary btn-lg" href="https://github.com/amesmoudi/RDF_QDAG" role="button" target="_blank" rel="noopener noreferrer">Go to Github &raquo;</a></p>
                </div>
            </div>
            <div>
                <div className="container jumbotron">
                    <h1 id="deployment-steps-">Deployment steps</h1>
                    <p>This deployment package is provided for Ubuntu 18.04 and Jdk 11. However, we will be happy to provide other packages for other systems.</p>
                    <h2 id="update-system-packages-">Update system packages</h2>
                    <p><code>sudo apt-get update</code></p>
                    <h2>Installing Packages </h2>
                    <h3 id="oracle-jdk-11-">Oracle JDK 11</h3>
                    <p>download manually the jdk-*_linux-x64_bin.tar.gz file from: <a href="https://www.oracle.com/java/technologies/javase-jdk11-downloads.html" target="_blank" rel="noopener noreferrer">Oracle JDK 11</a></p>
                    <p><code>sudo mkdir /var/cache/oracle-jdk11-installer-local/</code></p>
                    <p><code>sudo mv jdk-11.0.8_linux-x64_bin.tar.gz /var/cache/oracle-jdk11-installer-local/</code></p>
                    <p><code>sudo add-apt-repository ppa:linuxuprising/java</code></p>
                    <p><code>sudo apt-get update</code></p>
                    <p><code>sudo apt-get install oracle-java11-installer-local</code></p>
                    <h3 id="build-tools">Build tools</h3>
                    <p><code>sudo apt-get install git</code></p>
                    <p><code>sudo apt-get install gcc</code></p>
                    <p><code>sudo apt-get install g++</code></p>
                    <p><code>sudo apt-get install sqlite3</code></p>
                    <p><code>sudo apt-get install make</code></p>
                    <p><code>sudo apt-get install cmake</code></p>
                    <h3 id="python">python</h3>
                    <p><code>sudo apt install python3</code></p>
                    <h2 id="download-the-rdf-qdag-deployment-package">Download the RDF QDAG deployment package</h2>
                    <p><code>git clone https://github.com/amesmoudi/RDF_QDAG.git</code></p>
                    <p><code>cd RDF_QDAG</code></p>
                    <h2 id="load-data-">Load Data</h2>
                    <p><code>python3 rdf_loader.py rawdata/watdiv100k/watdiv100k bindata/watdiv100k</code></p>
                    <ul>
                    <li>rawdata/watdiv100k/watdiv100k : the path of raw data</li>
                    <li>data/watdiv100k : path of binary data</li>
                    </ul>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/6VB9kPnDrLs" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="1"></iframe>
                    <h2 id="run-queries-">Run queries</h2>
                    <p><code>java -jar -Djava.library.path=solibs/ gquery.jar bindata/watdiv100k/ queries/watdiv/gStore/S1.in</code></p>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/sApmA6Sl1Hc" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="2"></iframe>
                </div>
            </div>
        </div>
    );
}
export default Home;