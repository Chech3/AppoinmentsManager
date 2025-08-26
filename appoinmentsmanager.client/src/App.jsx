import './App.css';
import { useFetch } from './hooks/useFetch';
import { API_BASE_URL } from './const/app';
import EditModal from "./components/EditModal";
import { useState } from 'react';
function App() {
    const { data: appointments, loading, refetch } = useFetch(`${API_BASE_URL}api/appointment`);
    const [selected, setSelected] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const colorImportance = (level) => {
        switch (level) {
            case 2:
                return 'red';
            case 1:
                return 'orange';
            case 0:
                return 'green';
            default:
                return 'gray';
        }
    }


    const handleEdit = async (updatedData) => {
        try {
            const response = await fetch(`${API_BASE_URL}api/appointment/${updatedData.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {

                // Opción segura: hacer refetch desde la API
                refetch();

                setIsModalOpen(false);
                setSelected(null);
            } else {
                throw new Error("Error al editar");
            }
        } catch (err) {
            console.error(err);
            alert("Error al editar la cita");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta cita?')) {
            try {
                const response = await fetch(`${API_BASE_URL}api/appointment/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    // 👇 refrescar los datos
                    refetch();
                } else {
                    throw new Error('Error al eliminar');
                }
            } catch (error) {
                console.log(error);
                alert('Error al eliminar la cita');
            }
        }
    };


    return (
        <div className="table-container">
            <table className="appointments-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Address</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Importancia</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments?.length === 0 && !loading && <tr>
                        <td colSpan={6}>
                            <div className='center'>
                                No hay citas disponibles
                            </div>

                        </td>
                    </tr>}
                    {loading ? (
                        <tr>
                            <td colSpan={6}>
                                <div className='center' style={{ height: '100px' }}>
                                    <div className="loading-spinner"></div>
                                    <p>Cargando citas...</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        appointments?.map((item) => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>{item.address}</td>
                                <td>{item.date}</td>
                                <td>{item.description}</td>
                                <td className={`importance-${colorImportance(item.levelOfImportance)}`}>{item.levelOfImportance}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button onClick={() => {
                                            setSelected(item);
                                            setIsModalOpen(true);
                                        }}
                                            className="btn btn-edit">Editar</button>
                                        <button onClick={() => handleDelete(item.id)} className="btn btn-delete">Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <EditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                appointment={selected}
                onSave={handleEdit}
            />
        </div>
    );


}

export default App;