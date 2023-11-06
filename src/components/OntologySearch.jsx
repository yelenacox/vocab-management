import { useEffect, useRef, useState } from "react"

export const OntologySearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState({});
    const [page, setPage] = useState(1);

    const searchBar = useRef();
    const rows = 20;

    // const URL = process.env.REACT_APP_API_ENDPOINT

    useEffect(()=>{
        displayResults(rows, page)
    },[searchTerm])

    const displayResults = (rows, page) => {
        return requestSearch(rows, (page - 1) * rows)
    }

    const requestSearch = (rowCount, firstRowDisplayed) => {
        fetch(
            `https://www.ebi.ac.uk/ols4/api/search?q=${searchTerm}&ontology=mondo,hp&rows=${rowCount}&start=${firstRowDisplayed}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                  },
            }
        )
        .then((res) => res.json())
        .then((data) => setSearchResults(data.response))        
    }


return <>
<div>
    <div className="search_bar">
        <input
        id="search_input"
        type="text"
        placeholder="Search"
        ref={searchBar}
        />

        <button
        className="search_button"
        onClick={() => setSearchTerm(searchBar.current.value)}
        >
            Search
        </button>
    </div>
    <div>
       {searchResults?.docs?.map((d)=>{
        return <>
       <div className="search_result">
        <div>{d.label}</div>
        <div>{d.obo_id}</div>
        <div>{d.description}</div>
        <div>Ontology: {d.ontology_prefix}</div>
        </div>
        </>
       })}
    </div>
    </div>
    </>
}