# Tre domande sul flusso dei dati

## 1. Il pulsante «Riavvia»

Non si fa perché le props sono di sola lettura: `SchedaServer` riceve `server` da sopra e non deve modificarlo. Il dato `online` vive nell'array `servers` importato in `App`. A fine settimana 7 manca ancora `useState` (settimana 8): senza stato non c’è un modo corretto per cambiare i dati e far ridisegnare l’interfaccia.

## 2. Lo stato calcolato due volte

`statoServer` è una funzione pura: con gli stessi dati restituisce sempre lo stesso risultato. Griglia e riepilogo leggono gli stessi `servers`, quindi contano e colorano allo stesso modo. Non possono divergere.

## 3. Chi riceve cosa

`BadgeStato` riceve solo la stringa `stato`. Così resta piccolo e riusabile: non conosce il server, sa solo come colorare e scrivere un’etichetta. Se un giorno serve lo stesso badge altrove, basta passargli lo stato.
