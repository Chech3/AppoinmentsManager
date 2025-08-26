import { useState, useEffect } from "react";
import "./EditModal.css";
export default function EditModal({ isOpen, onClose, appointment, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    date: "",
    description: "",
    levelOfImportance: 0,
  });

  // Cuando el modal se abra, rellenamos con los datos actuales
  useEffect(() => {
    if (appointment) {
      setFormData(appointment);
    }
  }, [appointment]);

  if (!isOpen) return null; // 👈 si no está abierto, no renderiza nada

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // enviamos los datos al padre
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Editar Cita</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Título</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Dirección</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Fecha</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Importancia</label>
            <select
              name="levelOfImportance"
              value={formData.levelOfImportance}
              onChange={handleChange}
            >
              <option value={0}>Baja</option>
              <option value={1}>Media</option>
              <option value={2}>Alta</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-save">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
