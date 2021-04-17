import React, {useState, useContext} from 'react'
import img from "../assets/logo.png";
import {GlobalContext} from "../context/GlobalContext";
import {Link, useHistory} from "react-router-dom"

const SerpSearch = () => {
    const {setVyhledaneRecepty, vyhledaneRecepty, setZvolenyRecept} = useContext(GlobalContext);
    const [searchField, setSearchField] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const route = useHistory();
    const submit = () => {
        if(searchField.length > 2){
            setErrMessage("")
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
            console.log(data);
            setSearchField("");
        })
        .catch((err) => {
            if(err){
                setVyhledaneRecepty({
                    msg:"",
                    data:[]
                })
            }
        })
    }else{setErrMessage("K vyhledání receptu je potřeba zadat alespoň 3 znaky")}
    }
    return (
        <>
        <div className="serp-main">
        <form className="serp-area" onSubmit={(e) => {
            e.preventDefault()
            submit();
        }}>
            <Link to="/"><img width="150" src={img} alt="Official logo" /></Link>
            <input type="text" onInput={(e) => {
           
                setSearchField(e.target.value)
            
            }} value={searchField}/>
           <div className="btn-section">
               <input type="submit" className="vyhledat" value="Vyhledat"/>
           </div>
           
        </form>
        <p>{errMessage}</p>
        </div>
        <div className="vypisReceptu">
            {vyhledaneRecepty.data && vyhledaneRecepty.data.length < 1?<p>Bohužel, žádné recepty s tímto dotazem nebyly nalezeny</p>:<></>}
        {vyhledaneRecepty.data?vyhledaneRecepty.data.map((recept, index) => {
            return(
                <div key={index} index={index} onClick={() => {
                    setZvolenyRecept(index);
                    route.push("/detail-receptu");
                }}>
                    <div className="row">
                        <img width="150" src={recept.nahledovyObrazek} alt={recept.nazevReceptu}/>
                        <div className="obsah">
                        <strong>{recept.nazevReceptu}</strong> <br/>
                        <p dangerouslySetInnerHTML={{__html: recept.popis.substring(0,550)+"..."}}></p>
                        </div>
                    </div>
                 </div>
            )
        }):<></>}
    </div></>
    )
}

export default SerpSearch
