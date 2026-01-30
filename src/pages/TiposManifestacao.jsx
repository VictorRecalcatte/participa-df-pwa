import { useNavigate } from "react-router-dom";
import {useManifestacao} from "../context/ManifestacaoContext"

export default function TipoManifestacao(){
    
    const navigate = useNavigate();
    const { setTipo } = useManifestacao();

    function handleSelectTipo(tipo) {
        console.log("Tipo selecionado:", tipo);
        setTipo(tipo)
        navigate("/manifestacao");
    }
    
     return (
    <div className="p-3">

      <div className="text-center mb-4">
        <h2 className="fw-bold mb-2">
          Qual o tipo da sua manifestação?
        </h2>

        <p className="text-muted">
          Selecione a opção que melhor descreve sua situação.
        </p>
      </div>

      <div className="d-grid gap-3">

        <button
          className="btn btn-primary text-start p-3"
          onClick={() => handleSelectTipo("RECLAMACAO")}
        >
          <div className="fw-bold fs-5">📣 Reclamação</div>
          <small className="text-white">
            Relate problemas ou insatisfações com serviços públicos.
          </small>
        </button>

        <button
          className="btn btn-primary text-start p-3"
          onClick={() => handleSelectTipo("SUGESTAO")}
        >
          <div className="fw-bold fs-5">💡 Sugestão</div>
          <small className="text-white">
            Envie ideias para melhorar os serviços públicos.
          </small>
        </button>

        <button
          className="btn btn-primary text-start p-3"
          onClick={() => handleSelectTipo("ELOGIO")}
        >
          <div className="fw-bold fs-5">👍 Elogio</div>
          <small className="text-white">
            Registre elogios a serviços ou atendimentos recebidos.
          </small>
        </button>

        <button
          className="btn btn-primary text-start p-3"
          onClick={() => handleSelectTipo("SOLICITACAO")}
        >
          <div className="fw-bold fs-5">❓ Solicitação</div>
          <small className="text-white">
            Solicite informações ou providências.
          </small>
        </button>

        <button
          className="btn btn-danger text-start p-3"
          onClick={() => handleSelectTipo("DENUNCIA")}
        >
          <div className="fw-bold fs-5">⚠️ Denúncia</div>
          <small className="text-white">
            Comunique irregularidades ou condutas inadequadas.
          </small>
        </button>

      </div>
    </div>
  );
}