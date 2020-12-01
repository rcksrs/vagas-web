import React from "react"
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Template from 'pages/Template'
import CursoPage from 'pages/CursoPage'
import EmpresaPage from 'pages/EmpresaPage'
import FuncionarioPage from 'pages/FuncionarioPage'

export default function App() {
  return (
    <BrowserRouter>
      <Template>
        <Switch>
          <Route path="/" exact component={CursoPage} />
          <Route path="/curso" exact component={CursoPage} />
          <Route path="/empresa" exact component={EmpresaPage} />
          <Route path="/funcionario" exact component={FuncionarioPage} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </Template>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
