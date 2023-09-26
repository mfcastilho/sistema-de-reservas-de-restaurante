import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import "./style.css";
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useAuth } from "../../components/auth-provider";
import jwtDecode from 'jwt-decode';


const baseURL = 'http://localhost:3000/api/v1';

const AdminPanelPage = () => {
    
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [reservations, setReservations] = useState([]);

    const { login, logout } = useAuth(); 

    const verifyIfIsLogged = ()=>{
        if(token){
            const decodedToken = jwtDecode(token);
            if(decodedToken.exp * 1000 > Date.now()){
                login();
            }
        }else{
            logout();
        }   
    } 

    useEffect(()=>{
        verifyIfIsLogged();
    },[]);

    const getReservationsInfos = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
        const response = await axios.get(`${baseURL}/admin/all-reservations`, config);
        setReservations(response.data);
        } catch (error) {
        if(error.response.status === 500) navigate("/error");
        }
    };

    const handleDeleteClick = (reservationId) => {
        Swal.fire({
        title: 'Você tem certeza?',
        text: 'Isso não pode ser desfeito!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, exclua!',
        cancelButtonText: 'Cancelar',
        }).then((result) => {
        if (result.isConfirmed) {

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            
            axios.delete(`${baseURL}/admin/reservation/${reservationId}`, config).then(() => {
              
              getReservationsInfos(); 
            });

            
            setReservations((prevReservations) =>
            prevReservations.filter((reservation) => reservation.id !== reservationId)
            );

            Swal.fire('Deletado!', 'Seu item foi deletado.', 'success');
        } else if (result.isDismissed === Swal.DismissReason.cancel) {
            Swal.fire('Cancelado', 'Seu item está seguro :)', 'error');
        }
        }).catch(error=> error.response.status === 500 ? navigate("/error"): Swal.fire('Erro', 'Reserva não encontrada:)', 'error'));
    };

    useEffect(() => {
        getReservationsInfos();
    }, []);

    return (
        <div className="admin-panel">
            <div className="admin-panel__container">
                <div className="title-box reservations-title">
                    <h1>Reservas</h1>
                </div>
                <table className="table">
                <thead className="custom-thead">
                    <tr>
                    <th scope="col" className="col-2">
                        Mesa
                    </th>
                    <th scope="col" className="col-2">
                        Capacidade
                    </th>
                    <th scope="col" className="col-2">
                        Data/Hora
                    </th>
                    <th scope="col" className="col-1">
                        Cliente
                    </th>
                    <th scope="col" className="col-1">
                        Deletar
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation) => (
                    <tr key={reservation.id}>
                        <th scope="row">{`nº ${reservation.table.table_number}`}</th>
                        <td>{`Até ${reservation.table.capacity} pessoas`}</td>
                        <td>{new Date(reservation.date_hour_reservation).toLocaleString()}</td>
                        <td>{reservation.user.name}</td>
                        <td>
                        <button
                            type="button"
                            className="delete-btn"
                            onClick={() => handleDeleteClick(reservation.id)}
                        >
                            <FaRegTrashAlt className='delete--btn--icon' />
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanelPage;
