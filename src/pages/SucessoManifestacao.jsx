import { useLocation, useNavigate } from "react-router-dom";

export default function SucessoManifestacao() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tipo, protocolo } = location.state || {};

  if (!tipo || !protocolo) {
    // Se acessar direto a página sem envio, volta para o início
    navigate("/");
    return null;
  }

  const TIPOS_LABEL = {
    DENUNCIA: "Denúncia",
    RECLAMACAO: "Reclamação",
    SUGESTAO: "Sugestão",
    ELOGIO: "Elogio",
    SOLICITACAO: "Solicitação",
  };

  return (
    <div className="container text-center py-5">
      <h2 className="fw-bold mb-3">✅ Manifestação enviada com sucesso!</h2>

      <div className="alert alert-secondary">
        <p><strong>Tipo:</strong> {TIPOS_LABEL[tipo]}</p>
        <p><strong>Protocolo:</strong> {protocolo}</p>
      </div>

      <p>Obrigado por registrar sua manifestação. Você receberá retorno quando aplicável.</p>

      <div className="d-grid gap-2 mt-4">
        <button className="btn btn-primary btn-lg" onClick={() => navigate("/")}>
          Voltar à tela inicial
        </button>
        <button className="btn btn-outline-primary btn-lg" onClick={() => navigate("/manifestacao/tipo")}>
          Registrar outra manifestação
        </button>
      </div>
    </div>
  );
}
