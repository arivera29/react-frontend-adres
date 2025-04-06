import React, { useState } from 'react';
import axios from 'axios';

const convertToNumeric = (form) => {
  return {
    ...form,
    presupuesto: parseFloat(form.presupuesto) || 0,
    cantidad: parseInt(form.cantidad, 10) || 0,
    valor_total: parseFloat(form.valor_total) || 0,
  };
};
const EditModal = ({ item, onClose, onUpdated }) => {
  const [form, setForm] = useState({ ...item });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/adquisiciones/${item.id}`, convertToNumeric(form), {
        headers: { Authorization: `Bearer ${token}` }
      });
      onUpdated();
      onClose();
    } catch (err) {
      console.error('Error al actualizar:', err);
    }
  };

  const formatDateToLocal = (date) => {
    // Convertir la fecha a formato local (YYYY-MM-DD)
    const localDate = new Date(date);
    return localDate.toISOString().split('T')[0];
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">Editar ítem</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
          <div className="mb-3">
              <label htmlFor="id" className="form-label">ID</label>
              <input
                type="text"
                id="form.id"
                name="form.id"
                value={form.id || ''}
                onChange={handleChange}
                className="form-control"
                placeholder="ID"
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="unidad_administrativa" className="form-label">Unidad Administrativa</label>
              <input
                type="text"
                id="unidad_administrativa"
                name="unidad_administrativa"
                value={form.unidad_administrativa || ''}
                onChange={handleChange}
                className="form-control"
                placeholder="Unidad Administrativa"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">Descripción</label>
              <input
                type="text"
                id="tipo_bien"
                name="tipo_bien"
                value={form.tipo_bien || ''}
                onChange={handleChange}
                className="form-control"
                placeholder="Tipo Bien"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fecha_adquisicion" className="form-label">Fecha de Adquisición</label>
              <input
                type="date"
                id="fecha_adquisicion"
                name="fecha_adquisicion"
                value={formatDateToLocal(form.fecha_adquisicion) || ''}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="presupuesto" className="form-label">Presupuesto ($)</label>
              <input
                type="number"
                id="presupuesto"
                name="presupuesto"
                value={form.presupuesto || ''}
                onChange={handleChange}
                className="form-control"
                placeholder="Presupuesto ($)"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cantidad" className="form-label">Cantidad</label>
              <input
                type="number"
                id="cantidad"
                name="cantidad"
                value={form.cantidad || ''}
                onChange={handleChange}
                className="form-control"
                placeholder="Cantidad"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="valor_total" className="form-label">Valor Total($)</label>
              <input
                type="number"
                id="valor_total"
                name="valor_total"
                value={form.valor_total || ''}
                onChange={handleChange}
                className="form-control"
                placeholder="Valor Total ($)"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="documentacion" className="form-label">Documentación</label>
              <input
                type="text"
                id="docuemntacion"
                name="documentacion"
                value={form.documentacion || ''}
                onChange={handleChange}
                className="form-control"
                placeholder="Documentación"
                required
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose} type="button">Cancelar</button>
            <button className="btn btn-primary" type="submit">Guardar cambios</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
