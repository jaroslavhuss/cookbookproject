import React, {useContext} from 'react'
import { GlobalContext } from '../context/GlobalContext'
const DetailReceptu = () => {
    const {vyhledaneRecepty,zvolenyRecept} = useContext(GlobalContext);
    return (
        <div>
            <h1>{vyhledaneRecepty.data?vyhledaneRecepty.data[zvolenyRecept].nazevReceptu:<></>}</h1>
            <div>{vyhledaneRecepty.data?<img width="200" src={vyhledaneRecepty.data[zvolenyRecept].nahledovyObrazek} alt={vyhledaneRecepty.data[zvolenyRecept].nahledovyObrazek}/>:"Ahoj"}</div>
            <p dangerouslySetInnerHTML={{__html:vyhledaneRecepty.data?vyhledaneRecepty.data[zvolenyRecept].popis:<></>}}></p>
        </div>
    )
}

export default DetailReceptu
