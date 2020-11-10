import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainUsuario from './pages/Usuario/main';
import DetalhesUsuario from './pages/Usuario/detalhes';
import CriarUsuario from './pages/Usuario/criar';
import EditarUsuario from './pages/Usuario/editar';
import DeletarUsuario from './pages/Usuario/deletar';

import MainCliente from './pages/Cliente/main';
import DetalhesCliente from './pages/Cliente/detalhes';
import CriarCliente from './pages/Cliente/criar';
import EditarCliente from './pages/Cliente/editar';
import DeletarCliente from './pages/Cliente/deletar';

import MainProduto from './pages/Produto/main';
import DetalhesProduto from './pages/Produto/detalhes';
import CriarProduto from './pages/Produto/criar';
import EditarProduto from './pages/Produto/editar';
import DeletarProduto from './pages/Produto/deletar';

const Routes = () => (

    <BrowserRouter>
        <Switch>
            <Route exact path="/usuarios" component={MainUsuario} />
            <Route path="/usuarios/:id" component={DetalhesUsuario} />
            <Route path="/criarUsuario" component={CriarUsuario} />
            <Route path="/editarUsuario/:id" component={EditarUsuario} />
            <Route path="/deletarUsuario/:id" component={DeletarUsuario} />

            <Route exact path="/clientes" component={MainCliente} />
            <Route path="/clientes/:id" component={DetalhesCliente} />
            <Route path="criarCliente" component={CriarCliente}/>
            <Route path="/editarCliente/:id" component={EditarCliente} />
            <Route path="/deletarCliente/:id" component={DeletarCliente} />

            <Route exact path="/produtos" component={MainProduto} />
            <Route path="/produtos/:id" component={DetalhesProduto} />
            <Route path="criarProduto" component={CriarProduto}/>
            <Route path="/editarProduto/:id" component={EditarProduto} />
            <Route path="/deletarProduto/:id" component={DeletarProduto} />
        </Switch>
    </BrowserRouter>
)

export default Routes;