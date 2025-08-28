import  { useState } from 'react';
import styles from './AppM.module.css';
import { useFetch } from '../hooks/useFetch';
import { API_BASE_URL } from '../const/app';
import Modal from "./Modal";

function AppM() {
    const { data: appointments, loading, refetch } = useFetch(`${API_BASE_URL}api/appointment`);
    const [selected, setSelected] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    
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
                refetch();
                setIsModalOpen(false);
                setSelected(null);
            } else {
                throw new Error("Error al editar");
            }
        } catch (err) {
            console.error(err);
            alert("Error al editar la cita");
        } finally {
            setIsCreating(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta cita?')) {
            try {
                const response = await fetch(`${API_BASE_URL}api/appointment/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
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

    const handleCreate = async (newData) => {
        try {
            const response = await fetch(`${API_BASE_URL}api/appointment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newData),
            });
            setIsModalOpen(false);
            if (response.ok) refetch();
        } catch (err) { 
            console.log(err); 
        } finally {
            setIsCreating(false);
        }
    }

    return (
        <div className={styles['table-container']}>
            <button 
                onClick={() => { setIsModalOpen(true); setIsCreating(true); }} 
                className={`${styles.btn} ${styles['btn-create']}`}
            >
                Crear
            </button>
            
            <table className={styles['appointments-table']}>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Dirección</th>
                        <th>Fecha</th>
                        <th>Descripción</th>
                        <th>Importancia</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments?.length === 0 && !loading && (
                        <tr>
                            <td colSpan={6}>
                                <div className={styles.center}>
                                    No hay citas disponibles
                                </div>
                            </td>
                        </tr>
                    )}
                    
                    {loading ? (
                        <tr>
                            <td colSpan={6}>
                                <div className={styles.center} style={{ height: '100px' }}>
                                    <div className={styles['loading-spinner']}></div>
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
                                <td className={styles[`importance-${colorImportance(item.levelOfImportance)}`]}>
                                    {item.levelOfImportance}
                                </td>
                                <td>
                                    <div className={styles['action-buttons']}>
                                        <button 
                                            onClick={() => {
                                                setSelected(item);
                                                setIsModalOpen(true);
                                                setIsCreating(false);
                                            }}
                                            className={`${styles.btn} ${styles['btn-edit']}`}
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(item.id)}
                                            className={`${styles.btn} ${styles['btn-delete']}`}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                appointment={selected}
                onSave={handleEdit}
                onCreate={handleCreate}
                isCreating={isCreating}
            />
        </div>
    );
}

export default AppM;