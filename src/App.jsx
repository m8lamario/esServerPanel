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

Tre domande sul flusso dei dati

1. Il pulsante «Riavvia»

Non si fa perché le props sono di sola lettura: `SchedaServer` riceve `server` da sopra e non deve modificarlo.
Il dato `online` vive nell'array `servers` importato in `App`.
A fine settimana 7 manca ancora `useState` (settimana 8): senza stato non c’è un modo corretto per cambiare i dati e far ridisegnare l’interfaccia.

2. Lo stato calcolato due volte

`statoServer` è una funzione pura: con gli stessi dati restituisce sempre lo stesso risultato.
Griglia e riepilogo leggono gli stessi `servers`, quindi contano e colorano allo stesso modo.
Non possono divergere.

3. Chi riceve cosa?

`BadgeStato` riceve solo la stringa `stato`.
Così resta piccolo e riusabile: non conosce il server, sa solo come colorare e scrivere un’etichetta.
Se un giorno serve lo stesso badge altrove, basta passargli lo stato.

*/