import React, {useState, useContext} from 'react'
import img from "../assets/logo.png";
import {GlobalContext} from "../context/GlobalContext";
import {useHistory} from "react-router-dom";
const Search = () => {
    const route = useHistory();
    const {setVyhledaneRecepty} = useContext(GlobalContext);
    const [searchField, setSearchField] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const submit = () => {
        if(searchField.length>2){
            setErrMessage("");
        fetch("http://localhost:5000/get-recept", {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({fullText:searchField.toLowerCase()})})
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            setVyhledaneRecepty(data);
            setSearchField("");
            route.push("/search-engine-result-page");
        })
        .catch((err) => {
            if(err){
                setVyhledaneRecepty({
                    msg:"",
                    data:[]
                })
            }
        })
    }else{
        setErrMessage("K vyhledání receptu je potřeba zadat alespoň 3 znaky")
    }
    }
    return (
        <form className="search-area" onSubmit={(e) => {
            e.preventDefault()
            submit();
        }}>
            <img width="300" src={img} alt="Official logo" />
            <input type="text" onInput={(e) => {
              
                 setSearchField(e.target.value)
          
            }} value={searchField}/>
           <div className="btn-section">
               <input type="submit" className="vyhledat" value="Vyhledat Recept"/>
               <p>{errMessage}</p>
           </div>
           
        </form>
    )
}

export default Search
