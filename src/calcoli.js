export const SOGLIE = {
  attenzione: 70,
  critico: 90
}

export function statoServer(server) {
  return !server.online
    ? "offline"
    : server.cpu >= SOGLIE.critico
      ? "critico"
      : server.cpu >= SOGLIE.attenzione
        ? "attenzione"
        : "ok"
}

export function contaPerStato(servers, stato) {
  return servers.filter((s) => statoServer(s) === stato).length
}

export function cpuMedia(servers) {
  const online = servers.filter((s) => s.online)
  if (online.length === 0) {
    return null
  }
  const somma = online.reduce((acc, s) => acc + s.cpu, 0)
  return somma / online.length
}

export function piuLento(servers) {
  const online = servers.filter((s) => s.online)
  return online.reduce((acc, s) => {
    if (acc === null || s.latenza > acc.latenza) {
      return s
    }
    return acc
  }, null)
}

export function trovaServer(servers, nome) {
  return servers.find((s) => s.nome === nome)
}
