import "./App.css"
import { sistema, servers, avvisi } from "./dati"
import { contaPerStato, cpuMedia, piuLento, trovaServer } from "./calcoli"
import Intestazione from "./Intestazione"
import Riepilogo from "./Riepilogo"
import GrigliaServer from "./GrigliaServer"
import ServerInEvidenza from "./ServerInEvidenza"
import Avvisi from "./Avvisi"

function App() {
  const online = servers.filter((s) => s.online).length
  const totale = servers.length
  const cercato = "db-01"

  return (
    <main className="pannello">
      <Intestazione
        nome={sistema.nome}
        aggiornato={sistema.aggiornato}
        online={online}
        totale={totale}
      />
      <Riepilogo
        ok={contaPerStato(servers, "ok")}
        attenzione={contaPerStato(servers, "attenzione")}
        critici={contaPerStato(servers, "critico")}
        offline={contaPerStato(servers, "offline")}
        mediaCpu={cpuMedia(servers)}
        lento={piuLento(servers)}
      />
      <GrigliaServer servers={servers} />
      <ServerInEvidenza
        cercato={cercato}
        server={trovaServer(servers, cercato)}
      />
      <Avvisi elenco={avvisi} />
    </main>
  )
}

export default App

/*
Se dati-blackout.js avesse sette server, nella griglia si vedrebbero comunque
solo sei schede (servers[0] … servers[5]), perché sono scritte a mano.
Con cinque server, servers[5] sarebbe undefined e la pagina andrebbe in errore.

Nella sfida basta cambiare l'import dei dati: i componenti ricevono props e
mostrano quello che arriva. È il flusso unidirezionale dei dati: i dati vivono
in App e scendono, i componenti non li modificano.
*/
