import axios from "axios"
import { useEffect, useState } from "react"

export const Usuario = (props) => {
    const [usuario, setUsuario] = useState({})
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [editar, setEditar] = useState(false)

    useEffect(() => {
        pegarUsuarioPeloId()
    }, [])

    const pegarUsuarioPeloId = () => {
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${props.id}`, {
            headers: {
                Authorization: "taynara-montenegro-ammal"
            }
        })
            .then((resposta) => {
                setUsuario(resposta.data)
            })
            .catch((erro) => {
                console.log(erro)
            })
    }

    const editarUsuario = () => {
        const body = {
            name: nome,
            email: email
        }
        const headers = {
            headers: {
                Authorization: "taynara-montenegro-ammal"
            }
        }

        axios.put(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`, body, headers)
            .then((resposta) => {
                pegarUsuarioPeloId()
                setEditar(!editar)
            })
            .catch((erro) => {
                console.log(erro)
            })
    }

    const deletarUsuario = () => {
        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`, {
            headers: {
                Authorization: "taynara-montenegro-ammal"
            }
        })
            .then((resposta) => {
                alert("Usuario removido com sucesso")
                props.pegarUsuarios()
            })
            .catch((erro) => {
                console.log(erro)
            })
    }

    return (
        <>
            {
                editar ?
                    <div>
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
                        <button onClick={editarUsuario}>Alterar usuario</button>
                    </div> : <div>
                        <p>{usuario.name}</p>
                        <p>{usuario.email}</p>
                    </div>
            }

            <button onClick={() => setEditar(!editar)}>Editar</button>
            <button onClick={deletarUsuario}>Deletar usuário</button>
        </>
    )
}