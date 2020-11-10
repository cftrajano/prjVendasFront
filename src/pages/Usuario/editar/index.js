import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';

class EditarUsuario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: {
                nome: "",
                cpf: "",
                email: "",
            },
            erro: null,
            redirect: false
        };
    }

    exibeErro() {
        const { erro } = this.state;

        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`http://localhost:3003/vendas/usuarios/${id}`)
            .then(data => {
                data.json().then(data => {
                    if (data.error) {
                        this.setState({ erro: data.error });
                    } else {
                        this.setState({ usuario: data });
                    }
                });
            })
            .catch(erro => this.setState({ erro: erro }));
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/usuarios" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Editar Usuário</legend>
                        <div className="usuario-update">
                            <label htmlFor="nome">Nome </label>
                            <br />
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.usuario.nome}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="usuario-insert">
                            <label htmlFor="cpf">CPF </label>
                            <br />
                            <input
                                type="text"
                                id="cpf"
                                name="cpf"
                                placeholder="Entre com seu CPF"
                                required
                                value={this.state.usuario.cpf}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="usuario-insert">
                            <label htmlFor="email">E-mail </label>
                            <br />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Entre com seu e-mail"
                                required
                                value={this.state.usuario.email}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Atualizar
                        </button>
                    </fieldset>
                </form>
            );
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            usuario: { ...prevState.usuario, [name]: value }
        }));
    };

    handleSubmit = event => {
        const { id } = this.state.usuario;

        fetch(`http://localhost:3003/vendas/usuarios/${id}`, {
            method: "put",
            body: JSON.stringify(this.state.usuario),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));

        event.preventDefault();
    };
}

export default EditarUsuario;
