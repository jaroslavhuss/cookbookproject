import React, {useState, useContext, useEffect} from 'react'
import { BsFillXCircleFill,BsSearch } from "react-icons/bs";
import { GlobalContext } from '../context/GlobalContext';
import PridejSurovinu from "./pridejSurovinu";
const VyberSuroviny = ({suroviny,vybranesuroviny}) => {
const [otevritPridaniSuroviny, setOtevritPridaniSuroviny] = useState(false);    
const [seznamSurovin, setSeznamSurovin] = useState([])
const {zapnutiVypnutiPaneluSVyberemSuroviny,vyberSurovinu} = useContext(GlobalContext);
const [inputState, setInputState] = useState("");
useEffect(() => {
    const filtered = suroviny.filter( function( el ) {

        const vybraneSuroviny = vybranesuroviny.map((surovina) => {
            return surovina.name;
        })
        return vybraneSuroviny.indexOf( el.materialName ) < 0;
      } );
    setSeznamSurovin(filtered);
    return () => {
        return false;
    }
}, [suroviny, vybranesuroviny]);

const hledejSuroviny = (e) => {
    const value = e.target.value;
    setInputState(value)
    const regExp = new RegExp(value,"gi");
    const search = suroviny.filter((item) => {
        return item.materialName.match(regExp);
    })
   setSeznamSurovin(search);
}

const vymazZvoleneSurovinyZNabidky = (item) => {
    const cistaData = seznamSurovin.filter((polozka) => {
        return item.name !== polozka.materialName
    })
    setSeznamSurovin(cistaData);
}

const zavriDialogPridaniSuroviny = () => {
    setOtevritPridaniSuroviny(false)
}

return (
        <div className="vyberSurovin">
            <div className="plocha">
                <div className="zavrit" onClick={
                    () => {
                      zapnutiVypnutiPaneluSVyberemSuroviny(false)  
                    }
                }><BsFillXCircleFill /></div>
                <div className="vyhledavaciPole"><input value={inputState} onInput={hledejSuroviny} type="text" placeholder={`Vyhledat suroviny (${seznamSurovin.length})`} /></div>
                <div className="suroviny">{seznamSurovin.map((surovina,index) => {
                    return(
                        <div onClick={() => {
                            const object = {
                                name:seznamSurovin[index].materialName,
                                mnozstvi:0
                            }
                            vyberSurovinu(object);
                            vymazZvoleneSurovinyZNabidky(object)
                        
                        }} className="surovina" key={index}>{surovina.materialName}</div>
                    )
                })}
                </div>
                <div className="btn" onClick={()=>setOtevritPridaniSuroviny(!otevritPridaniSuroviny)}><BsSearch/> Požadovaná surovina v seznamu chybí?</div>
                {otevritPridaniSuroviny?<PridejSurovinu zavri={zavriDialogPridaniSuroviny}/>:<></>}
            </div>
        </div>
    )
}

export default VyberSuroviny
