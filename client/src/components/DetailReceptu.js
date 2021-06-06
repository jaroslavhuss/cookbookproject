import React, {useContext, useState} from 'react'
import { GlobalContext } from '../context/GlobalContext'
import { BiTime, BiBookHeart, BiCookie } from "react-icons/bi";
import {useHistory} from "react-router-dom"

const DetailReceptu = () => {
    const history = useHistory();
    const {vyhledaneRecepty,zvolenyRecept} = useContext(GlobalContext);
    const [porce, setPorce] = useState(1);
    const [message, setMessage] = useState("");
    const smazatRecept = () => {
 const consent =  window.confirm("Opravdu si přejete smazat tento recept?")
 if(consent){
    fetch("http://localhost:5000/delete-recipe",{
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({_id:vyhledaneRecepty.data[zvolenyRecept]._id})
      }).then((data) => {
          return data.json();
      }).then((finalMessage) => {
          console.log(finalMessage);
          if(finalMessage.msg==="Recept byl smazán"){
            setMessage(finalMessage.msg);
          }else{
              setMessage("Tento recept nemohl být smazán")
          }
          
      })
 }
        
    }
    const aktualizaceReceptu = () => {
        history.push("/update-recipe")
    }
    return (
       
        <div className="detail-receptu">
             {vyhledaneRecepty.data?<>
            <h1>{vyhledaneRecepty.data?vyhledaneRecepty.data[zvolenyRecept].nazevReceptu:<></>}</h1>
            <div className="flex-row">
                <div className="img"><div>{vyhledaneRecepty.data?<img style={{minWidth:200}} width="200" src={vyhledaneRecepty.data[zvolenyRecept].nahledovyObrazek} alt={vyhledaneRecepty.data[zvolenyRecept].nahledovyObrazek}/>:<></>}</div>
            </div>
                <div className="rest"><h4><BiTime /> Doba přípravy</h4>
            <p>{vyhledaneRecepty.data?vyhledaneRecepty.data[zvolenyRecept].dobaPripravy:<></>}</p>
            <h4><BiBookHeart/> Postup</h4>
            <p dangerouslySetInnerHTML={{__html:vyhledaneRecepty.data?vyhledaneRecepty.data[zvolenyRecept].popis:<></>}}></p>
            <h4><BiCookie/> Výpis surovin</h4>
            <span>Suroviny jsou pro: <select onChange={(e) => setPorce(parseInt(e.target.value))}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
            </select> {porce===1?"osobu":porce>1&&porce<5?"osoby":"osob"}</span>
            <div className="suroviny">
                {vyhledaneRecepty.data?vyhledaneRecepty.data[zvolenyRecept].suroviny.map((surovina, index) => {
                    return(<div key={index}>
                        {
                            surovina.mnozstvi===0?surovina.name+ " (dle chuti)":
                        surovina.name + " ("+((surovina.mnozstvi)*porce +"g)")}
                    </div>)
                }):<></>}
            </div>
        
            </div>
            
            </div>
            </>:<>Bohužel se nám nepodařilo žádná data načíst</>}
            <div className="custom-row">
                <div onClick={smazatRecept} className="btn">Smazat tento recept</div>
                <div onClick={aktualizaceReceptu} className="btn">Aktualizovat tento recept</div>
                
            </div>
            <div className="custom-row">
            <div className="neco">{message}</div>
            </div>
        </div>
    )
}

export default DetailReceptu
