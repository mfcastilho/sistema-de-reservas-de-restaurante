import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import "./style.css";

const baseURL = 'http://localhost:3000/api/v1';

const AdminPanelPage = () => {
  const token = localStorage.getItem('token');
  const [reservations, setReservations] = useState([]);

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
      console.log(error);
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
        // Aqui você pode adicionar a lógica real de exclusão, por exemplo, fazer uma solicitação para o servidor
        // axios.delete(`${baseURL}/admin/delete-reservation/${reservationId}`).then(() => {
        //   // A exclusão foi bem-sucedida
        //   getReservationsInfos(); // Recarregue os dados após a exclusão
        // });

        // Atualiza o estado local removendo a reserva excluída
        setReservations((prevReservations) =>
          prevReservations.filter((reservation) => reservation.id !== reservationId)
        );

        Swal.fire('Deletado!', 'Seu item foi deletado.', 'success');
      } else if (result.isDismissed === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'Seu item está seguro :)', 'error');
      }
    });
  };

  useEffect(() => {
    getReservationsInfos();
  }, []);

  return (
    <div className="admin-panel">
      <div className="admin-panel__container">
        <table className="table">
          <thead className="custom-thead">
            <tr>
              <th scope="col" className="col-3">
                ID
              </th>
              <th scope="col" className="col-2">
                Mesa
              </th>
              <th scope="col" className="col-2">
                Data
              </th>
              <th scope="col" className="col-2">
                Cliente
              </th>
              <th scope="col" className="col-2">
                Deletar
              </th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <th scope="row">{reservation.id}</th>
                <td>{reservation.table.table_number}</td>
                <td>{new Date(reservation.date_hour_reservation).toLocaleString()}</td>
                <td>{reservation.user.name}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteClick(reservation.id)}
                  >
                    Excluir
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
