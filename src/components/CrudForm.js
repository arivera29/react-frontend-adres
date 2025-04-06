import React, { useState } from 'react';
import axios from 'axios';

const CrudForm = ({ onItemAdded }) => {
    const [form, setForm] = useState({
        presupuesto: '',
        unidad_administrativa: '',
        tipo_bien: '',
        cantidad: '',
        valor_total: '',
        proveedor: '',
        fecha_adquisicion: new Date().toISOString().slice(0, 10), // Fecha actual en formato YYYY-MM-DD
        documentacion: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que los campos numéricos sean valores válidos
        const numericFields = ['presupuesto', 'cantidad', 'valor_total'];
        for (const field of numericFields) {
            if (isNaN(form[field]) || form[field] === '') {
                alert(`El campo ${field.replace(/_/g, ' ')} debe ser un valor numérico válido.`);
                return;
            }
        }

        // Convertir los campos numéricos a números antes de enviar
        const formData = {
            ...form,
            presupuesto: Number(form.presupuesto),
            cantidad: Number(form.cantidad),
            valor_total: Number(form.valor_total)
        };

        try {
            const token = localStorage.getItem('token');
            const result = await axios.post('http://localhost:5000/api/adquisiciones', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Item agregado:', result.data);
            setForm({
                presupuesto: '',
                unidad_administrativa: '',
                tipo_bien: '',
                cantidad: '',
                valor_total: 0,
                proveedor: '',
                fecha_adquisicion: new Date().toISOString().slice(0, 10), // Fecha actual en formato YYYY-MM-DD
                documentacion: ''
            });
            onItemAdded(); // Recarga los datos del Dashboard
        } catch (err) {
            console.error('Error al agregar el ítem:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h4>Agregar nueva Adquisición</h4>
            <div className="row">
                <div className="col-md-6 mb-2">
                    <input
                        type="text"
                        name="unidad_administrativa"
                        placeholder="Unidad Administrativa"
                        className="form-control"
                        value={form.unidad_administrativa}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-6 mb-2">
                    <input
                        type="text"
                        name="tipo_bien"
                        placeholder="Tipo Bien"
                        className="form-control"
                        value={form.tipo_bien}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-6 mb-2">
                    <input
                        type="text"
                        name="presupuesto"
                        placeholder="Presupuesto"
                        className="form-control"
                        value={form.presupuesto}
                        onChange={handleChange}
                        required
                        pattern="[0-9]*"
                        title="Por favor ingrese un número"
                    />
                </div>
                <div className="col-md-6 mb-2">
                    <input
                        type="text"
                        name="cantidad"
                        placeholder="Cantidad"
                        className="form-control"
                        value={form.cantidad}
                        onChange={handleChange}
                        required
                        pattern="[0-9]*"
                        title="Por favor ingrese un número"
                    />
                </div>
                <div className="col-md-6 mb-2">
                    <input
                        type="text"
                        name="valor_total"
                        placeholder="Valor Total"
                        className="form-control"
                        value={form.valor_total}
                        onChange={handleChange}
                        required
                        pattern="[0-9]*"
                        title="Por favor ingrese un número"
                    />
                </div>
                <div className="col-md-6 mb-2">
                    <input
                        type="text"
                        name="proveedor"
                        placeholder="Proveedor"
                        className="form-control"
                        value={form.proveedor}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-6 mb-2">
                    <input
                        type="date"
                        name="fecha_adquisicion"
                        className="form-control"
                        value={form.fecha_adquisicion}
                        required
                    />
                </div>
                <div className="col-md-6 mb-2">
                    <input
                        type="text"
                        name="documentacion"
                        placeholder="Documentación"
                        className="form-control"
                        value={form.documentacion}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <button className="btn btn-success">
                <i className="bi bi-floppy"></i> Guardar
            </button>
        </form>
    );
};

export default CrudForm;
