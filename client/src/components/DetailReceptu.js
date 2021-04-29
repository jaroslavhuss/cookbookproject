import React, {useContext, useState} from 'react'
import { GlobalContext } from '../context/GlobalContext'
import { BiTime, BiBookHeart, BiCookie } from "react-icons/bi";

const DetailReceptu = () => {
    const {vyhledaneRecepty,zvolenyRecept} = useContext(GlobalContext);
    const [porce, setPorce] = useState(1);
    return (
       
        <div className="detail-receptu">
             {vyhledaneRecepty.data?<>
            <h1>{vyhledaneRecepty.data?vyhledaneRecepty.data[zvolenyRecept].nazevReceptu:<></>}</h1>
            <div className="flex-row">
                <div className="img"><div>{vyhledaneRecepty.data?<img width="200" src={vyhledaneRecepty.data[zvolenyRecept].nahledovyObrazek} alt={vyhledaneRecepty.data[zvolenyRecept].nahledovyObrazek}/>:<></>}</div>
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
        </div>
    )
}

export default DetailReceptu
