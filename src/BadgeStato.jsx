function BadgeStato({ stato }) {
  const testo =
    stato === "ok"
      ? "OK"
      : stato === "attenzione"
        ? "Attenzione"
        : stato === "critico"
          ? "Critico"
          : "Offline"

  return (
    <span className={`badge badge-${stato}`}>
      {testo}
    </span>
  )
}

export default BadgeStato
