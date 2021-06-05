import React from 'react'
import {Link} from "react-router-dom"
const AdminPanel = () => {
    return (
        <div className="custom-row">
            <Link to="/add-recipe" className="btn">Vytvořit recept</Link>
            <Link to="/admin-materials" className="btn">Chci spravovat suroviny</Link>
        </div>
    )
}

export default AdminPanel
