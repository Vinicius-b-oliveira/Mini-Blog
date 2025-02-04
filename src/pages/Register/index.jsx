import styles from "./Register.module.css";

import { useState, useEffect } from "react";

const Register = () => {
    return (
        <div className={styles.register}>
            <h1>Castre-se para postar</h1>
            <p>Crie seu usuário e compartilhe suas histórias</p>
            <form>
                <label>
                    <span>Nome: </span>
                    <input
                        type="text"
                        name="displayName"
                        required
                        placeholder="Nome do usuário"
                    />
                </label>
                <label>
                    <span>Email: </span>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="E-mail do usuário"
                    />
                </label>
                <label>
                    <span>Senha: </span>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Insira sua senha"
                    />
                </label>
                <label>
                    <span>Confirmação de senha: </span>
                    <input
                        type="password"
                        name="confirmPassword"
                        required
                        placeholder="Confirme sua senha"
                    />
                </label>

                <button className="btn">Entrar</button>
            </form>
        </div>
    );
};

export default Register;
