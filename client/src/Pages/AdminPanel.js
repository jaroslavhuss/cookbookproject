import React from 'react'
import {Link} from "react-router-dom"
const AdminPanel = () => {
    return (
        <div className="custom-row">
            <Link to="/add-recipe" className="btn">Vytvořit recept</Link>
            <Link to="/update-recipe" className="btn">Aktualizovat recept</Link>
            <div className="btn">Chci spravovat suroviny</div>
        </div>
    )
}

export default AdminPanel
