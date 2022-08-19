/* eslint-disable import/no-anonymous-default-export */
import React from "react";

import {Route, Switch} from 'react-router-dom';

import Home from "./views/home";
import CadastroProduto from "./views/produtos/cadastroProduto";
import ConsultaProdutos from "./views/produtos/consulta";

function Rotas() {
    return(
        // <BrowserRouter>  </BrowserRouter>
            <Switch>
                <Route exact path="/cadastro-produtos/:sku?" component={CadastroProduto}></Route>
                <Route exact path="/consulta-produtos" component={ConsultaProdutos}></Route>
                <Route exact  path="/" component={Home}></Route>
            </Switch>
      
    )
}
export default Rotas;