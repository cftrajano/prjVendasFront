import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';

class CriarCliente extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cliente: {
                nome: "",
                cpf: "",
                telefone: "",
                celular: "",
                endereco: "",
                cidade: "",
                estado: "",
                ativo: "true"
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

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/clientes" />;
        } else {
            return (
                <div className="insert-area">
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Criar Cliente</legend>
                            <div className="cliente-insert">
                                <label htmlFor="nome">Nome </label><br />
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    placeholder="Nome"
                                    required
                                    value={this.state.cliente.nome}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="cliente-insert">
                                <label htmlFor="cpf">CPF </label>
                                <br />
                                <input
                                    type="text"
                                    id="cpf"
                                    name="cpf"
                                    placeholder="Entre com seu CPF"
                                    required
                                    value={this.state.cliente.cpf}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="cliente-insert">
                                <label htmlFor="telefone">Telefone </label>
                                <br />
                                <input
                                    type="text"
                                    id="telefone"
                                    name="telefone"
                                    placeholder="Entre com o número do seu telefone"
                                    required
                                    value={this.state.cliente.telefone}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="cliente-insert">
                                <label htmlFor="endereco">Endereço </label>
                                <br />
                                <input
                                    type="text"
                                    id="endereco"
                                    name="endereco"
                                    placeholder="Entre com o seu endereço"
                                    required
                                    value={this.state.cliente.endereco}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="cliente-insert">
                                <label htmlFor="cidade">Cidade </label>
                                <br />
                                <input
                                    type="text"
                                    id="ciadade"
                                    name="cidade"
                                    placeholder="Entre com o nome da sua cidade"
                                    required
                                    value={this.state.cliente.cidade}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="cliente-insert">
                                <label htmlFor="estado">Estado </label>
                                <br />
                                <input
                                    type="text"
                                    id="estado"
                                    name="estado"
                                    placeholder="Entre com o nome do seu estado"
                                    required
                                    value={this.state.cliente.estado}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="cliente-insert">
                                <label>
                                    <input
                                        type="radio"
                                        name="ativo"
                                        value="true"
                                        checked={this.state.cliente.ativo === "true"}
                                        onChange={this.handleInputChange}
                                    />
                                    Ativo
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="false"
                                        name="ativo"
                                        checked={this.state.cliente.ativo === "false"}
                                        onChange={this.handleInputChange}
                                    />
                                    Inativo
                                </label>
                            </div>
                            
                            <button type="submit" className="btn btn-primary">
                                Cadastrar
                            </button>
                        </fieldset>
                    </form>
                </div>
            );
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            cliente: { ...prevState.cliente, [name]: value }
        }));
        console.log(value);
    };

    handleSubmit = event => {
        fetch(`${process.env.REACT_APP_API_URL}/vendas/clientes`, {
            method: "post",
            body: JSON.stringify(this.state.cliente),
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

export default CriarCliente;