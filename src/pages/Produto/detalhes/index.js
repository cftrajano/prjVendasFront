import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';

export default class Produto extends Component {
    state = {
        produto: {},
    };

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`${process.env.REACT_APP_API_URL}/vendas/produtos/${id}`)
            .then(produto =>
                produto.json().then(produto => this.setState({ produto }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { produto, index } = this.state;

        if (produto.ativo) {
            produto.ativo = "Produto Ativo";
        } else {
            produto.ativo = "Produto Inativo";
        }

        return (
            <div className="produto-info">
                <h1> {"Descrição: "+produto.descricao} </h1>
                <h1> {"quantidade: "+produto.quantidade} </h1>
                <h1> {"Medida: "+produto.precoCusto} </h1>
                <h1> {"Medida: "+produto.precoVenda} </h1>
                <h1> {produto.ativo} </h1>
                <br />
                <Link to={`/produtos`}> Voltar </Link> <br />
                <Link to={`/editarProduto/${produto.id}`}> Editar </Link> <br />
                <Link to={`/deletarProduto/${produto.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}