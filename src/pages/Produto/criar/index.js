import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';

class CriarProduto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prduto: {
                descricao: "",
                quantidade: "",
                precoCusto: "",
                precoVenda: "",
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
            return <Redirect to="/produtos" />;
        } else {
            return (
                <div className="insert-area">
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Criar Produto</legend>
                            <div className="produto-insert">
                                <label htmlFor="descricao">Descrição </label>
                                <br />
                                <input
                                    type="text"
                                    id="descricao"
                                    name="descricao"
                                    placeholder="Decrição"
                                    minLength="3"
                                    maxLength="100"
                                    required
                                    value={this.state.produto.descricao}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="produto-insert">
                                <label htmlFor="quantidade">Quantidade </label>
                                <br />
                                <input
                                    type="numeric"
                                    id="quantidade"
                                    name="quantidade"
                                    placeholder="Entre com a quantidade do produto"
                                    required
                                    value={this.state.produto.quantidade}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="produto-insert">
                                <label htmlFor="precoCusto">Preço de custo </label>
                                <br />
                                <input
                                    type="numeric"
                                    id="precoCusto"
                                    name="precoCusto"
                                    placeholder="Entre com o valor de custo"
                                    required
                                    value={this.state.produto.precoCusto}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="produto-insert">
                                <label htmlFor="precoVenda">Preço de venda </label>
                                <br />
                                <input
                                    type="numeric"
                                    id="precoVenda"
                                    name="precoVenda"
                                    placeholder="Entre com o valor de venda do produto"
                                    required
                                    value={this.state.produto.precoVenda}
                                    onChange={this.handleInputChange}
                                />
                            </div>

                            <div className="produto-insert">
                                <label>
                                    <input
                                        type="radio"
                                        name="ativo"
                                        value="true"
                                        checked={this.state.produto.ativo === "true"}
                                        onChange={this.handleInputChange}
                                    />
                                    Ativo
                            </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="false"
                                        name="ativo"
                                        checked={this.state.produto.ativo === "false"}
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
            )
        }
    }
    handleInputChange = event => {
        const target = event.target;
        const descricao = target.descricao;
        const value = target.value;

        this.setState(prevState => ({
            produto: { ...prevState.produto, [descricao]: value }
        }));
        console.log(value);
    };

    handleSubmit = event => {
        fetch("http://localhost:3003/vendas/produtos", {
            method: "post",
            body: JSON.stringify(this.state.produto),
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

export default CriarProduto;