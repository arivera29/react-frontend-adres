import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CrudForm from './CrudForm';
import Navbar from './NavBar';
import EditModal from './EditModal';



const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');

  //Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  


  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/adquisiciones', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setItems(res.data);
    } catch (err) {
      console.error('Error al obtener datos:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [editingItem, setEditingItem] = useState(null);

    // Eliminar ítem
    const handleDelete = async (id) => {
    try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/adquisiciones/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
        });
        fetchData(); // Recargar lista
    } catch (err) {
        console.error('Error al eliminar:', err);
    }
    };

    // Editar ítem (abrir el modal)
    const handleEdit = (item) => {
    setEditingItem(item);
    };

    const filteredItems = items.filter(item =>
      Object.values(item)
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
return (
  <>
  <Navbar onLogout={() => window.location.reload()} />
  <div className="col-12 justify-content-center text-center mt-4">
    <img src="https://www.adres.gov.co/PublishingImages/Header%20Logos/logo-adres.png" alt="Logo de ADRES"></img>
  </div>
  
  <div className="container mt-4">
    <CrudForm onItemAdded={fetchData} />  {/* Coloca esto antes del <table> */}
    <h2>Listado de Adquisiciones</h2>
    <input
      type="text"
      className="form-control mb-3"
      placeholder="Buscar por presupuesto, unidad administrativa o proveedor..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
   
    <table className="table table-striped mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Unidad Adm.</th>
          <th>Tipo Bien</th>
          <th>Presupuesto</th>
          <th>Cantidad</th>
          <th>Valor Total</th>
          <th>Proveedor</th>
          <th>Fecha de Adquisicion</th>
          <th>Documentación</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((item, idx) => (
          <tr key={idx}>
            <td>{item.id}</td>
            <td>{item.unidad_administrativa}</td>
            <td>{item.tipo_bien}</td>
            <td align='right'>{item.presupuesto.toLocaleString()}</td> {/* Formato de miles */}
            <td align='right'>{item.cantidad.toLocaleString()}</td> {/* Formato de miles */}
            <td align='right'>{item.valor_total.toLocaleString()}</td> {/* Formato de miles */}
            <td>{item.proveedor}</td>
            <td>{new Date(item.fecha_adquisicion).toLocaleDateString()}</td> {/* Formato corto */}
            <td>{item.documentacion}</td>
            <td>
              <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(item)}>
                <i className="bi bi-pencil-square"></i> Editar
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>
                <i className="bi bi-trash"></i> Eliminar
              </button>
          </td>
          </tr>
        ))}
      </tbody>
    </table>
    <nav>
      <ul className="pagination justify-content-right">
        {[...Array(totalPages)].map((_, idx) => (
          <li key={idx} className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(idx + 1)}>
              {idx + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>

  </div>
  {editingItem && (
      <EditModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onUpdated={fetchData}
      />
  )}

  </>
  
);
};

export default Dashboard;
