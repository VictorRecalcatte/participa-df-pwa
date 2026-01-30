import { useManifestacao } from "../context/ManifestacaoContext";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function ManifestacaoForm() {
  const {
    manifestacao,
    setDescricao,
    setAnonima,
    setNome,
    setEmail,
    setTelefone,
    setImagem,
    setAudio,
    setVideo,
    limparManifestacao,
  } = useManifestacao();

  const navigate = useNavigate();
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  // Estados para feedback dos anexos
  const [feedbackImagem, setFeedbackImagem] = useState("");
  const [feedbackAudio, setFeedbackAudio] = useState("");
  const [feedbackVideo, setFeedbackVideo] = useState("");

  const TIPOS_LABEL = {
    DENUNCIA: "Denúncia",
    RECLAMACAO: "Reclamação",
    SUGESTAO: "Sugestão",
    ELOGIO: "Elogio",
    SOLICITACAO: "Solicitação",
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const temConteudo =
      manifestacao.descricao?.trim() !== "" ||
      manifestacao.imagem ||
      manifestacao.audio ||
      manifestacao.video;

    if (!temConteudo) {
      setErro(
        "Envie pelo menos uma forma de relato: texto, imagem, áudio ou vídeo."
      );
      return;
    }

    setErro("");
    setEnviando(true);

    try {
      const protocolo = Math.floor(Math.random() * 1000000);

      const dados = {
        tipo: manifestacao.tipo,
        descricao: manifestacao.descricao,
        anonima: manifestacao.anonima,
        nome: manifestacao.anonima ? null : manifestacao.nome,
        email: manifestacao.anonima ? null : manifestacao.email,
        telefone: manifestacao.anonima ? null : manifestacao.telefone,
        anexos: {
          imagem: manifestacao.imagem ? manifestacao.imagem.name : null,
          audio: manifestacao.audio ? manifestacao.audio.name : null,
          video: manifestacao.video ? manifestacao.video.name : null,
        },
        protocolo,
        criadoEm: serverTimestamp(),
      };

      await addDoc(collection(db, "manifestacoes"), dados);

      limparManifestacao();
      setFeedbackImagem("");
      setFeedbackAudio("");
      setFeedbackVideo("");

      navigate("/manifestacao/sucesso", {
        state: { tipo: manifestacao.tipo, protocolo },
      });
    } catch (err) {
      console.error("Erro ao enviar manifestação:", err);
      setErro("Erro ao enviar manifestação. Tente novamente.");
    }

    setEnviando(false);
  }

  // Função para simular anexando → anexado
  function handleArquivo(setArquivo, setFeedback) {
    return (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setFeedback("Anexando...");
      setArquivo(file);

      // Simula o tempo de upload (mesmo sem enviar ao Firebase Storage)
      setTimeout(() => {
        setFeedback("Anexado ✅");
      }, 800); // 0,8s de "anexando"
    };
  }

  return (
    <div className="container-fluid p-3">
      <div className="alert alert-secondary text-center">
        <strong>Tipo de manifestação:</strong> {TIPOS_LABEL[manifestacao.tipo]}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Checkbox Anônima */}
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="anonima"
            checked={manifestacao.anonima}
            onChange={(e) => setAnonima(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="anonima">
            Enviar de forma anônima
          </label>
        </div>

        {/* Campos do usuário */}
        {!manifestacao.anonima && (
          <>
            <div className="mb-2">
              <label className="form-label">Nome</label>
              <input
                type="text"
                className="form-control"
                value={manifestacao.nome || ""}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">E-mail</label>
              <input
                type="email"
                className="form-control"
                value={manifestacao.email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Telefone</label>
              <input
                type="tel"
                className="form-control"
                value={manifestacao.telefone || ""}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>
          </>
        )}

        {/* Descrição */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Descrição da manifestação
          </label>
          <textarea
            className="form-control"
            rows="4"
            placeholder="Descreva sua manifestação ou use mídia abaixo"
            value={manifestacao.descricao || ""}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        {/* Mídias */}
        <div className="mb-3">
          <p className="fw-semibold mb-2">Anexar arquivos (opcional)</p>
          <div className="d-grid gap-2">
            <label className="btn btn-outline-primary">
              📷 Enviar imagem
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleArquivo(setImagem, setFeedbackImagem)}
              />
            </label>

            <label className="btn btn-outline-primary">
              🎤 Enviar áudio
              <input
                type="file"
                accept="audio/*"
                hidden
                onChange={handleArquivo(setAudio, setFeedbackAudio)}
              />
            </label>

            <label className="btn btn-outline-primary">
              🎥 Enviar vídeo
              <input
                type="file"
                accept="video/*"
                hidden
                onChange={handleArquivo(setVideo, setFeedbackVideo)}
              />
            </label>
          </div>

          {/* Feedback visual */}
          <div className="mt-2 small text-success">
            {feedbackImagem && <div>📷 {feedbackImagem}</div>}
            {feedbackAudio && <div>🎤 {feedbackAudio}</div>}
            {feedbackVideo && <div>🎥 {feedbackVideo}</div>}
          </div>
        </div>

        {erro && <div className="alert alert-danger py-2">{erro}</div>}

        <div className="d-grid mt-4">
          <button type="submit" className="btn btn-primary btn-lg" disabled={enviando}>
            {enviando ? "Enviando..." : "Enviar manifestação"}
          </button>
        </div>
      </form>
    </div>
  );
}
