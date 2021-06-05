import React,{useState} from 'react'

const AdminMaterials = () => {
    const [suroviny, setSuroviny] = useState([]);
    const getVsechnySuroviny = async () => {
     fetch("http://localhost:5000/recieve-materials").then((data) => {
         return data.json();
     }).then(({data}) => {
         setSuroviny(data);
     })
    }
    const aktualizovatSurovinu = (index) => {
       const newName = prompt(`Zadejte nové jméno pro ${suroviny[index].materialName}`)
       const data = suroviny.map((surovina) => {
           return surovina.materialName;
       })
       if (data.includes(newName)){
           alert("Takovou surovinu už evidujeme v DB")
       }else{
           const object = {
            _id:suroviny[index]._id,
            materialName:newName
        }
        console.log(object)
        fetch("http://localhost:5000/update-material",{
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
          }).then((msg) => {
              return msg.json();
          }).then((msg) => {
              console.log(msg)
            alert("Surovina byla úspěšně aktualizována")
            getVsechnySuroviny();
          });
           
       }
    }
const deleteMaterial = (index) => {
  console.log(index);
  const potvrd = window.confirm(`Opravdu si přejete smazat ${suroviny[index].materialName}?`)
  if(potvrd){
      const object = {
          _id:suroviny[index]._id,
      }
      console.log(object)
      fetch("http://localhost:5000/delete-material",{
          method: 'post',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(object)
        }).then((msg) => {
            return msg.json();
        }).then((msg) => {
            console.log(msg)
          alert("Surovina byla úspěšně smazána")
          getVsechnySuroviny();
        });
  }else{
      alert(`${suroviny[index].materialName} nebyl smazán, protože jste operaci zastavili.`)
  }
   
}
    return (
        <div className="detail-receptu">
            <div className="detail-suroviny">
            <h1>Správa surovin</h1>
            <div className="btn" onClick={getVsechnySuroviny}>Načíst všechny suroviny {suroviny&&suroviny.length}</div>
            {suroviny&&suroviny.map((surovina, index) => {
                return(
                    <div key={index} className="surovina">
                        {index+1}. {surovina.materialName} <span>({surovina._id})</span>
                        <div className="control-panel">
                            <div className="aktualizovat" onClick={() => {
                                aktualizovatSurovinu(index);
                            }}>aktualizovat</div>
                            <div className="smazat" onClick={() => {
                                deleteMaterial(index);
                            }}>smazat</div>

                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default AdminMaterials
