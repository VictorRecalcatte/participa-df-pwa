import { createContext, useContext, useState } from 'react'

const ManifestacaoContext = createContext()

export function ManifestacaoProvider({ children }) {
  const [manifestacao, setManifestacao] = useState({
    tipo: "",
    descricao: "",
    anonima: false,
    nome: "",
    email: "",
    telefone: "",
    imagem: null,
    audio: null,
    video: null
  })

  // ===== setters =====
  function setTipo(tipo) {
    setManifestacao(prev => ({
      ...prev,
      tipo
    }))
  }

  function setDescricao(descricao) {
    setManifestacao(prev => ({
      ...prev,
      descricao
    }))
  }

  function setAnonima(anonima) {
    setManifestacao(prev => ({
      ...prev,
      anonima
    }))
  }

  function setNome(nome) {
    setManifestacao(prev => ({
      ...prev,
      nome
    }))
  }

  function setEmail(email) {
    setManifestacao(prev => ({
      ...prev,
      email
    }))
  }

  function setTelefone(telefone) {
    setManifestacao(prev => ({
      ...prev,
      telefone
    }))
  }

  function setImagem(imagem) {
    setManifestacao(prev => ({
      ...prev,
      imagem
    }))
  }

  function setAudio(audio) {
    setManifestacao(prev => ({
      ...prev,
      audio
    }))
  }

  function setVideo(video) {
    setManifestacao(prev => ({
      ...prev,
      video
    }))
  }

  function limparManifestacao() {
    setManifestacao({
      tipo: "",
      descricao: "",
      anonima: false,
      nome: "",
      email: "",
      telefone: "",
      imagem: null,
      audio: null,
      video: null
    })
  }

  return (
    <ManifestacaoContext.Provider
      value={{
        manifestacao,
        setTipo,
        setDescricao,
        setAnonima,
        setNome,
        setEmail,
        setTelefone,
        setImagem,
        setAudio,
        setVideo,
        limparManifestacao
      }}
    >
      {children}
    </ManifestacaoContext.Provider>
  )
}

export function useManifestacao() {
  return useContext(ManifestacaoContext)
}
