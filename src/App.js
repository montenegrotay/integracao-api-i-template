import React, { useEffect, useState } from "react";
import axios from "axios"
import { Usuario } from "./components/Usuario";

function App() {
  const [usuarios, setUsuarios] = useState([])
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")

  const pegarUsuarios = () => {
    axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users", {
      headers: {
        Authorization: "taynara-montenegro-ammal"
      }
    })
      .then((resposta) => {
        setUsuarios(resposta.data)
      })
      .catch((erro) => {
        console.log(erro)
      })
  }

  useEffect(() => {
    pegarUsuarios()
  }, [])

  const criarUsuario = () => {
    const body = {
      name: nome,
      email: email
    }

    const headers = {
      headers: {
        Authorization: "taynara-montenegro-ammal"
      }
    }

    axios.post("https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users", body, headers)
      .then((resposta) => {
        alert("Usuário criado com sucesso")
        pegarUsuarios()
        setNome("")
        setEmail("")
      })
      .catch((erro) => {
        console.log(erro)
      })
  }

  return (
    <>
      <p>Para esta aula usaremos a <a href="https://documenter.getpostman.com/view/7549981/SzfCT5G2#intro" target="_blank" rel="noreferrer">API Labenusers</a></p>

      <input
        placeholder="nome"
        value={nome}
        onChange={(event) => setNome(event.target.value)}
      />
      <input
        placeholder="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button onClick={criarUsuario}>Criar Usuario</button>

      {usuarios.map((usuario) => {
        return <Usuario
          key={usuario.id}
          id={usuario.id}
          pegarUsuarios={pegarUsuarios}
        />
      })}
    </>
  )
}

export default App;

