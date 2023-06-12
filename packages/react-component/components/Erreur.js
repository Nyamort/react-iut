import TokenEnded from './TokenEnded';
import {Route, Routes} from "react-router-dom";
const Erreur = () =>{   
    const Default = () => {
        return (
            <div>
                <h1> 404 </h1>
                <p>Vous vous êtes perdu il semblerait !!</p>
            </div>
        )
    }
   return (
        <div>
            <Routes>
                <Route path={"/"} element={<Default />}></Route>
                <Route path={"/ntf/"} element={<TokenEnded />}></Route>
                <Route path={"*"} element={<Default />}></Route>
            </Routes>
        </div>
    )
}

export default Erreur