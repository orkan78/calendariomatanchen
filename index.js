import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function Home() {
  const [reservas, setReservas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [personas, setPersonas] = useState("");
  const [comentario, setComentario] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const agregarReserva = () => {
    if (!fechaInicio || !fechaFin || !nombre) return;
    const nueva = {
      id: Date.now(),
      nombre,
      personas,
      comentario,
      fechaInicio: new Date(fechaInicio),
      fechaFin: new Date(fechaFin),
    };
    setReservas([...reservas, nueva]);
    setNombre("");
    setPersonas("");
    setComentario("");
    setFechaInicio("");
    setFechaFin("");
  };

  const eliminarReserva = (id) => {
    setReservas(reservas.filter((r) => r.id !== id));
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <h1>Calendario de Reservas</h1>
      <div style={{ marginBottom: 20 }}>
        <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input placeholder="Personas" value={personas} onChange={(e) => setPersonas(e.target.value)} />
        <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
        <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
        <textarea placeholder="Comentario" value={comentario} onChange={(e) => setComentario(e.target.value)} />
        <button onClick={agregarReserva}>Agregar</button>
      </div>
      <div>
        {reservas.map((r) => (
          <div key={r.id} style={{ marginBottom: 10, borderBottom: "1px solid #ccc" }}>
            <strong>{r.nombre}</strong> <br />
            {format(r.fechaInicio, "PPP", { locale: es })} - {format(r.fechaFin, "PPP", { locale: es })}<br />
            Personas: {r.personas} <br />
            Comentario: {r.comentario} <br />
            <button onClick={() => eliminarReserva(r.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}