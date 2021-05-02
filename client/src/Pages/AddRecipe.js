import React, {useState, useContext} from 'react'
import {  BiReceipt, BiPencil,BiTime, BiAddToQueue, BiSave, BiImage, BiListPlus, BiWinkTongue} from "react-icons/bi";
import { Editor } from "@tinymce/tinymce-react";
import VyberSurovin from "../components/vyberSuroviny";
import { GlobalContext } from '../context/GlobalContext';

const AddRecipe = () => {
    /**
     * Globální staty a globální funkce (setry, getry)
     */
    const {
        zapniPanelSVyberemSurovin,
        zapnutiVypnutiPaneluSVyberemSuroviny,
        vybraneSuroviny,
        setVybraneSuroviny
    } = useContext(GlobalContext);
    /**
     * Staty které souvisí s uložením celého formuláře
     */
    const [nazevReceptu, setNazevReceptu] = useState(""); //Nadpis receptu, název receptu
    const [editorState, seteditorState] = useState(""); //Popis receptu, vrací HTML
    const [dobaPripravy, setDobaPripravy] = useState(""); //Doba přípravy state
    const [nahledovyObrazek, setNahledovyObrazek] = useState(""); //URL náhledového obrázku
    const [suroviny, setSuroviny] = useState([]); //Seznam všech surovin, použitých v receptu
    const [soucetGramaze, setSoucetGramaze] = useState(0);
    

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

  const ulozitReceptDoDatabaze = () => {
      const schemaObjektu = {
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
      fetch("http://localhost:5000/save-recipe",{
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(schemaObjektu)
      }).then((msg) => {
          return msg.json();
      }).then((msg) => {
          setMsgZeServeru(msg);
          if(msg.msg === "Recept byl úspěšně uložen"){
             window.location.reload();
          }
      }).catch((err) => {
          if(err){
              setMsgZeServeru("Nelze se připojit k server, opakujte akci později...")
          }
      })
    }
  }

  const dummyVyplneniReceptu = () => {
      setNazevReceptu("Jihočeský Guláš");
      seteditorState(`<p><strong style="box-sizing: border-box; color: #333333; font-family: 'Roboto Condensed', sans-serif; font-size: 14px; background-color: #ffffff;">Postup:</strong></p>
      <p style="box-sizing: border-box; margin: 0px 0px 10px; color: #333333; font-family: 'Roboto Condensed', sans-serif; font-size: 14px; background-color: #ffffff;">1. Na s&aacute;dle orestujeme dozlatova na drobn&eacute; kostičky nakr&aacute;jenou oči&scaron;těnou cibuli<br style="box-sizing: border-box;" />2. Přid&aacute;me mletou červenou papriku, ihned vlož&iacute;me kostky osolen&eacute;ho a pepřem okořeněn&eacute;ho masa, podus&iacute;me ve vlastn&iacute; &scaron;ť&aacute;vě<br style="box-sizing: border-box;" />3. Opečen&eacute; maso podlijeme horkou vodou, okořen&iacute;me km&iacute;nem a rozdrcen&yacute;m česnekem a dus&iacute;me doměkka<br style="box-sizing: border-box;" />4. Do hotov&eacute;ho gul&aacute;&scaron;e vm&iacute;ch&aacute;me je&scaron;tě rajsk&yacute; protlak a přid&aacute;me podu&scaron;enou anglickou slaninu nakr&aacute;jenou na pl&aacute;tky<br style="box-sizing: border-box;" />5. Okořen&iacute;me drcen&yacute;m cel&yacute;m pepřem a cca 5 minut v&scaron;e povař&iacute;me.</p>
      <p><strong style="box-sizing: border-box; color: #333333; font-family: 'Roboto Condensed', sans-serif; font-size: 14px; background-color: #ffffff;">Doporučen&iacute;:</strong></p>
      <p style="box-sizing: border-box; margin: 0px 0px 10px; color: #333333; font-family: 'Roboto Condensed', sans-serif; font-size: 14px; background-color: #ffffff;">Takto připraven&yacute; gul&aacute;&scaron; serv&iacute;rujeme s du&scaron;enou r&yacute;ž&iacute;.</p>`)
     setDobaPripravy("140 minut");
     setNahledovyObrazek("https://www.jcted.cz/public/temp/photos/articles/54358/813842_300_285.jpg?lm=1611925219");
     setVybraneSuroviny([
{mnozstvi: 600, name: "hovězí maso"},
 {mnozstvi: 200, name: "cibule"},
 {mnozstvi: 100, name: "sádlo"},
 {mnozstvi: 10, name: "rajčatový protlak"},
 {mnozstvi: 10, name: "česnek"},
 {mnozstvi: 100, name: "mouka"},
 {mnozstvi: 5, name: "sladká paprika"},
 {mnozstvi: 300, name: "čerstvé houby"},
 {mnozstvi: 0, name: "sůl"},
 {mnozstvi: 0, name: "pepř"},
 {mnozstvi: 0, name: "sušená majoránka"},
 {mnozstvi: 0, name: "kmín"}
     ])
    }
  
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
                 <h1>Přidání receptu</h1>
                    <div className="add-recipe">
                        <div className="card">
                            <label htmlFor="nazev-receptu"><h3><BiReceipt/> Název receptu</h3></label>
                            <input placeholder="Použijte výstižné jméno pro recept" type="text" onInput={(e) => setNazevReceptu(e.target.value)} value={nazevReceptu}/>
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
                           <div className="btn btn-prefil-item" onClick={dummyVyplneniReceptu}><BiWinkTongue /> Předvyplnit recept</div>
                        </div>
                        
                    </div>
              
                    <div className="btn btn-save-item" onClick={ulozitReceptDoDatabaze}><BiSave /> Uložit recept</div>
                    <p className="serverMsg">{msgZeServeru.msg}</p>
                 
               </div>
           </div>
       </div>
    )
}

export default AddRecipe
