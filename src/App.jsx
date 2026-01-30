import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'
import Home from './pages/Home'
import TipoManifestacao from './pages/TiposManifestacao'
import Manifestacao from './pages/Manifestacao'
import SucessoManifestacao from './pages/SucessoManifestacao'
import { ManifestacaoProvider } from './context/ManifestacaoContext.jsx'

function App() {
  return (
    <BrowserRouter>
      <ManifestacaoProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/manifestacao" element={<Manifestacao />} />
            <Route path="/manifestacao/tipo" element={<TipoManifestacao />} />
            <Route path="/manifestacao/sucesso" element={<SucessoManifestacao />} />
          </Route>
        </Routes>
      </ManifestacaoProvider>
    </BrowserRouter>
  )
}

export default App
