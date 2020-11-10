import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';

export default class Cliente extends Component {
    state = {
        cliente: {},
    };

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`${process.env.REACT_APP_API_URL}/vendas/clientes/${id}`)
            .then(cliente =>
                cliente.json().then(cliente => this.setState({ cliente }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { cliente, index } = this.state;

        if (cliente.ativo) {
            cliente.ativo = "Cliente Ativo";
        } else {
            cliente.ativo = "Cliente Inativo";
        }

        return (
            <div className="cliente-info">
                <h1> {"Nome: "+cliente.nome} </h1>
                <h1> {"CPF: "+cliente.cpf} </h1>
                <h1> {"Telefone: "+cliente.telefone} </h1>
                <h1> {"Celular: "+cliente.celular} </h1>
                <h1> {"End: "+cliente.logradouro} </h1>
                <h1> {"Bairro: "+cliente.bairro} </h1>
                <h1> {"Cidade: "+cliente.cidade} </h1>
                <h1> {"Estado: "+cliente.estado} </h1>
                <h1> {"CEP: "+cliente.cep} </h1>
                <h1> {cliente.ativo} </h1>
                <br />
                <Link to={`/clientes`}> Voltar </Link> <br />
                <Link to={`/editarCliente/${cliente.id}`}> Editar </Link> <br />
                <Link to={`/deletarCliente/${cliente.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}