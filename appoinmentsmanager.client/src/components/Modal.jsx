import { useState, useEffect } from "react";
import "./Modal.css";
export default function EditModal({ isOpen, onClose, appointment, onSave, onCreate, isCreating }) {
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    date: "",
    description: "",
    levelOfImportance: 0,
  });


  const handleClear = () => {
    setFormData({
      title: "",
      address: "",
      date: "",
      description: "",
      levelOfImportance: 0,
    });
  }

  // Cuando el modal se abra, rellenamos con los datos actuales
  useEffect(() => {
    if (appointment && !isCreating) {
      setFormData(appointment);
    } else if (isCreating) {
      handleClear();
    }
  }, [appointment, isCreating]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (appointment && !isCreating) {
      onSave(formData); // enviamos los datos al padre
      handleClear();
    } else if (isCreating) {
      onCreate(formData);
      handleClear();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">{isCreating ? "Crear" : "Editar"} Cita</h2>
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
