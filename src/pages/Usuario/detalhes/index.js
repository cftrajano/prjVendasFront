import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';

export default class Usuario extends Component {
    state = {
        usuario: {},
    };

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`${process.env.REACT_APP_API_URL}/vendas/usuarios/${id}`)
            .then(usuario =>
                usuario.json().then(usuario => this.setState({ usuario }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { usuario, index } = this.state;

        if (usuario.ativo) {
            usuario.ativo = "Usuário Ativo";
        } else {
            usuario.ativo = "Usuário Inativo";
        }

        return (
            <div className="usuario-info">
                <h1> {"Nome: "+usuario.nome} </h1>
                <h1> {"CPF: "+usuario.cpf} </h1>
                <h1> {"E-mail: "+usuario.email} </h1>
                <h1> {"Senha: "+usuario.senha} </h1>
                <h1> {usuario.ativo} </h1>
                <br />
                <Link to={`/usuarios`}> Voltar </Link> <br />
                <Link to={`/editarUsuario/${usuario.id}`}> Editar </Link> <br />
                <Link to={`/deletarUsuario/${usuario.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}