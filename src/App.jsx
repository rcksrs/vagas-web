import React from "react"
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Template from 'pages/Template'
import SeletivoPage from 'pages/SeletivoPage'
import GerenciamentoPage from 'pages/GerenciamentoPage'
import ConfiguracaoPage from 'pages/ConfiguracaoPage'

export default function App() {
  return (
    <BrowserRouter>
      <Template>
        <Switch>
          <Route path="/" exact component={SeletivoPage} />
          <Route path="/gerenciamento" exact component={GerenciamentoPage} />
          <Route path="/configuracao" exact component={ConfiguracaoPage} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </Template>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
