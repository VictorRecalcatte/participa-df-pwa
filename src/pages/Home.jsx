import { Link } from 'react-router-dom'

export default function Home(){
    return (
        <div className="container ">
            <div className="mx-auto text-center">
            <h2 className="mb-3">Registrar Manifestação</h2>
            
            <p>Utilize este canal para registrar reclamações, denúncias,
            sugestões, elogios ou solicitações.
            </p> 

            <div className="d-grid gap-2 mt-4">
                <Link to="/manifestacao/tipo" className="btn btn-primary btn-lg">
                    Iniciar Manifestação
                </Link>
            </div>
            </div>
        </div>
         
    )
}