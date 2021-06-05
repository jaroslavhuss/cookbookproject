import React, {useState, useContext, useEffect} from 'react'
import {  BiReceipt, BiPencil,BiTime, BiAddToQueue, BiSave, BiImage, BiListPlus} from "react-icons/bi";
import { Editor } from "@tinymce/tinymce-react";
import VyberSurovin from "../components/vyberSuroviny";
import { GlobalContext } from '../context/GlobalContext';

const UpdateRecipe = () => {
    /**
     * Globální staty a globální funkce (setry, getry)
     */
    const {
        zapniPanelSVyberemSurovin,
        zapnutiVypnutiPaneluSVyberemSuroviny,
        vybraneSuroviny,
        setVybraneSuroviny,
        vyhledaneRecepty,
        zvolenyRecept
    } = useContext(GlobalContext);
    /**
     * Staty které souvisí s uložením celého formuláře
     */
 
    const [nazevReceptu, setNazevReceptu] = useState(vyhledaneRecepty.data[zvolenyRecept].nazevReceptu); //Nadpis receptu, název receptu
    const [editorState, seteditorState] = useState(vyhledaneRecepty.data[zvolenyRecept].popis); //Popis receptu, vrací HTML
    const [dobaPripravy, setDobaPripravy] = useState(vyhledaneRecepty.data[zvolenyRecept].dobaPripravy); //Doba přípravy state
    const [nahledovyObrazek, setNahledovyObrazek] = useState(vyhledaneRecepty.data[zvolenyRecept].nahledovyObrazek); //URL náhledového obrázku
    const [suroviny, setSuroviny] = useState(vyhledaneRecepty.data[zvolenyRecept].suroviny); //Seznam všech surovin, použitých v receptu
    const [soucetGramaze, setSoucetGramaze] = useState(vyhledaneRecepty.data[zvolenyRecept].soucetGramaze);
    const [msgZeServeru, setMsgZeServeru] = useState("");
    /**
     * @description Získá seznam jednotlivých surovin z databáze
     */
     const getVsechnySuroviny = async () => {
        zapnutiVypnutiPaneluSVyberemSuroviny(true);
     fetch("http://localhost:5000/recieve-materials").then((data) => {
         return data.json();
     }).then(({data}) => {

         setSuroviny(data);
     })
    }

  /**
   *
   * @param array Pole objektů
   * @description Přepočítá sumu všech aktivně přidaných surovin
   */
  const prepocitejGramaz = (array) => {
    let sum = 0;
     array.forEach((item) => sum += +item.mnozstvi);
    setSoucetGramaze(sum);
}

/**
 *
 * @param e event object
 * @description Umístí do globálního contextu nové množství určité suroviny
 */
  const menicMnozstvi = (e) => {
      //Aby nešlo jít na menší jak 1
      if(e.target.value && e.target.value > 0){
      const index = e.target.getAttribute("index");
      vybraneSuroviny[index].mnozstvi = parseInt(e.target.value);
      setVybraneSuroviny(vybraneSuroviny);
      prepocitejGramaz(vybraneSuroviny);
    }else{
        //Pokud je hodnota množství suroviny menší nebo rovno nule
        const index = e.target.getAttribute("index");
      vybraneSuroviny[index].mnozstvi = parseInt(0);
      setVybraneSuroviny(vybraneSuroviny);
      prepocitejGramaz(vybraneSuroviny);
    }
  }

  /**
   * @param e event objekt
   * @description smaze z globálního contextu (statu) zvolenou surovinu a přepočítá
   * @todo přepočítá to se zpožděním jednoho itemu, nevím proč, kurva!
   */
  const smazZvolenouSurovinu = (e) => {
      const index = e.target.getAttribute("index");
      const ocisteneVybraneSuroviny = vybraneSuroviny.filter((item) =>item.name !== vybraneSuroviny[index].name);
      setVybraneSuroviny(ocisteneVybraneSuroviny);
      prepocitejGramaz(vybraneSuroviny);
  }

  const aktualizovatRecept = () => {
      const schemaObjektu = {
          _id:vyhledaneRecepty.data[zvolenyRecept]._id,
          nazevReceptu:nazevReceptu,
          popis:editorState,
          dobaPripravy:dobaPripravy,
          nahledovyObrazek:nahledovyObrazek,
          suroviny:vybraneSuroviny,
          soucetGramaze:(() => {
              let sum = 0;
              vybraneSuroviny.forEach((item) => {
                  sum += +item.mnozstvi
              });
              return sum;
          })(),
          fullText:(() => {
              let finalstring = `${nazevReceptu} ${editorState} ${dobaPripravy} `;
              vybraneSuroviny.forEach((item) => {
                  finalstring += item.name + " ";
              })
              return finalstring;
          })()
      }
      if(schemaObjektu.nazevReceptu.length <= 0 ){
          setMsgZeServeru({msg:"Název receptu není vyplněn - je to povinný údaj"})
      }else if(schemaObjektu.popis.length<=0){
          setMsgZeServeru({msg:"Popis receptu nebyl vyplňěn - je to povinný údaj"})
      }else if(schemaObjektu.dobaPripravy.length <=0){
          setMsgZeServeru({msg:"Doba přípravy není vyplněna - je to povinný údaj"})
      }else if(schemaObjektu.nahledovyObrazek.length <=0){
          setMsgZeServeru({msg:"Náhledový obrázek nebyl přidán, využijte prosím externí URL adresy - je to povinný údaj"})
      }else if(schemaObjektu.suroviny.length <=0){
          setMsgZeServeru({msg:"Žádné suroviny nebyly přidány - prosím, přidejte všechny suroviny, která do receptu patří."})
      }else{
      fetch("http://localhost:5000/update-recipe",{
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(schemaObjektu)
      }).then((msg) => {
          return msg.json();
      }).then((msg) => {
          setMsgZeServeru(msg.msg)
          if(msg.msg === "Recept byl úspěšně aktualizován"){
            setNazevReceptu("");
            setSuroviny([]);
            setNahledovyObrazek("");
            setDobaPripravy("");
            seteditorState("");
            setSoucetGramaze(0);
            setVybraneSuroviny([]);
            setMsgZeServeru("Recept byl úspěšně aktualizován");
          }
      }).catch((err) => {
          if(err){
              setMsgZeServeru("Nelze se připojit k server, opakujte akci později...")
          }
      })
    }
  }
useEffect(() => {
    setVybraneSuroviny(vyhledaneRecepty.data[zvolenyRecept].suroviny) 
},[])

  //Test animace
  const pridejTridu = (e) => {
      const parent = e.target.parentElement;
      parent.setAttribute("class","polozka to-be-deleted")
  }
  const odstranTridu = (e) => {
    const parent = e.target.parentElement;
    parent.setAttribute("class","polozka")
  }
    return (
       <div className="layout">
          {zapniPanelSVyberemSurovin?<VyberSurovin vybranesuroviny={vybraneSuroviny} suroviny={suroviny}/>:<></>}
           <div className="column" style={{
                  height:"90vh",
                   overflow: "scroll"
           }}>
             <div className="recipe-canvas">
                 <h1>Aktualizace receptu {vyhledaneRecepty.data[zvolenyRecept]._id}</h1>
                    <div className="add-recipe">
                        <div className="card">
                            <label htmlFor="nazev-receptu"><h3><BiReceipt/> Název receptu</h3></label>
                            <input placeholder="Použijte výstižné jméno pro receipt" type="text" onInput={(e) => setNazevReceptu(e.target.value)} value={nazevReceptu}/>
                        </div>
                        <div className="card">
                            <label htmlFor="popis"><h3><BiPencil/> Popis</h3></label>
                            <Editor
                             apiKey="qcg2yi8kqw531kmg6ydhz6wuxylra4kcs6uw4r3ityltqcu5"
                        value={editorState}
                        init={{
                        height: 200,
                        menubar: false
                        }}
                        onEditorChange={seteditorState}
                    />
                        </div>
                        <div className="card">
                            <label htmlFor="popis"><h3><BiTime/> Doba přípravy</h3></label>
                            <input style={{width:"50%"}} placeholder="12 minut například" type="text" onInput={(e) => setDobaPripravy(e.target.value)} value={dobaPripravy}/>
                        </div>
                        <div className="card" style={{
                                backgroundImage:`url(${nahledovyObrazek})`,
                                backgroundSize:"contain",
                                backgroundRepeat:"no-repeat",
                                backgroundPosition:"right top",

                            }}>
                            <label htmlFor="popis"><h3><BiImage/> Náhledový obrázek</h3></label>
                            <input onInput={(e) => {
                                setNahledovyObrazek(e.target.value);
                            }} placeholder="Umístěte externí odkaz" type="text" name="popis" value={nahledovyObrazek} style={{width:"50%"}}/>
                        </div>
                        <div className="card">
                            <h3><BiListPlus/> Seznam použitých surovin ({soucetGramaze}g) - pro jednu osobu</h3>
                            <p>Všechny hodnoty zapistuje v gramech na jednu osobu!</p>
                            <br/>
                            <div className="vypisSuroviny">
                          {vybraneSuroviny.map(({name},index) => {
                              return(
                                  <div className="polozka" key={index}><strong>{name}(g):</strong><input key={index} onInput={menicMnozstvi}  index={index}type="number" name={name} value={vybraneSuroviny[index].mnozstvi}/><div className="deleteThisItem" index={index} onClick={smazZvolenouSurovinu} onMouseOver={pridejTridu} onMouseOut={odstranTridu}>smazat</div></div>
                              )
                          })}
                          </div>
                           <div onClick={() => {
                               getVsechnySuroviny()
                           }} className="btn btn-add-item"><BiAddToQueue /> Přidat surovinu</div>
                           <br />
                     </div>

                    </div>

                    <div className="btn btn-save-item" onClick={aktualizovatRecept}><BiSave /> Aktualizovat recept</div>
                    <p className="serverMsg">{msgZeServeru}</p>

               </div>
           </div>
       </div>
    )
}

export default UpdateRecipe
