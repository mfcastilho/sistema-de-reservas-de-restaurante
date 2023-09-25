import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/auth-provider";

import {
  addDays,
  startOfDay,
  isSunday,
  format,
  parseISO,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import "./style.css"; 
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";

const baseURL = "http://localhost:3000/api/v1";

const ReservationPage = () => {
    

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [availableDates, setAvailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);    

    const [tableOptions, setTableOptions] = useState([]);
    const [selectedTable, setSelectedTable] = useState(tableOptions.length > 0 ? tableOptions[0].id : "");
    const [selectedTableNumber, setSelectedTableNumber] = useState();

    const [selectedTime, setSelectedTime] = useState("");

    const { login } = useAuth();

    const checkTokenExpiration = () => {
        if (!token) {
            navigate("/login");
        } else {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < Date.now()) navigate("/login");
        }
    }

    const getTables = async () => {
        try {
            const response = await axios(`${baseURL}/tables`);
            const tables = response.data;
            setTableOptions(tables);
        } catch (error) {
            console.error("Erro ao buscar dados das mesas:", error);
        }
    };

    useEffect(() => {
        checkTokenExpiration();
        getTables();
        login();
    }, []);

    useEffect(() => {
        const calculateAvailableDates = () => {
            const next30Days = [];
            let currentDate = startOfDay(new Date());

            while (next30Days.length < 30) {
                if (!isSunday(currentDate)) {
                    next30Days.push(currentDate);
                }
                currentDate = addDays(currentDate, 1);
            }

            setAvailableDates(next30Days);
        };

        calculateAvailableDates();
    }, []);

    const generateTimeOptions = () => {
        const startTime = new Date();
        startTime.setHours(18, 0, 0, 0); 
        const endTime = new Date();
        endTime.setHours(23, 59, 0, 0); 
      
        const timeOptions = [];
      
        while (startTime <= endTime) {
            timeOptions.push(format(startTime, "HH:mm"));
            startTime.setMinutes(startTime.getMinutes() + 30); 
        }
      
        return timeOptions;
    };

    const handleDateChange = (e) => {
        const selectedDateValue = e.target.value;
        const parsedDate = parseISO(selectedDateValue);
        if (!isNaN(parsedDate.getTime())) {
            setSelectedDate(parsedDate);
        }
    };

    const handleTableChange = (e) => {
        setSelectedTable(e.target.value);
        const selectedTableId = e.target.value;
        const tableNumber = tableOptions.find(table => table.id === selectedTableId)?.table_number || "";
        setSelectedTableNumber(tableNumber);
    };

    const isFormValid = () => {
        return selectedDate && selectedTable && selectedTime;
    };

    const sendDataToBackend = async () => {
        if (!isFormValid()) {
            toast.error("Preencha todos os campos antes de enviar o formulário.");
            return;
        }
       
        const formattedDate = format(selectedDate, "yyyy-MM-dd");

        const reservationData = {
            table_number: selectedTableNumber,
            date: formattedDate,
            hour: selectedTime,
        };

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try {
            await axios.post(`${baseURL}/reservation`, reservationData, config);
            toast.success("Reserva enviada com sucesso!");
            setSelectedDate(null);
            setSelectedTable("");
            setSelectedTime("");
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    return (
        <div className="reservation-page">
            <ToastContainer />
            <div className="reservation-page__container">
                
                <div className="title-box">
                    <h1>Fazer Reserva</h1>
                </div>

                <div className="form-group">
                    <label className="selects-label">Data de Reserva</label>
                    <select
                        className="date-select"
                        value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
                        onChange={handleDateChange}
                    >
                        <option value="">Selecione</option>
                        {availableDates.map((date) => (
                        <option key={date} value={format(date, "yyyy-MM-dd")}>
                            {format(date, "dd/MM/yyyy, EEEE", { locale: ptBR })}
                        </option>
                        ))}
                    </select>
                </div>
            
                <div className="form-group">
                    <label htmlFor="table" className="selects-label">Escolha uma mesa</label>
                    <select
                        id="table"
                        value={selectedTable}
                        onChange={handleTableChange}
                        disabled={!selectedDate} 
                        className="table-select"
                    >
                        <option value="">Selecione</option>
                        {tableOptions.map((table) => (
                        <option key={table.id} value={table.id}>
                            Mesa {table.table_number} ({table.capacity} pessoas)
                        </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="time" className="selects-label">Escolha o horário</label>
                    <select
                        id="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        disabled={!selectedDate || !selectedTable}
                        className="hour-select"
                    >
                        <option value="">Selecione</option>
                        {generateTimeOptions().map((time, index) => (
                        <option key={index} value={time}>
                            {time}
                        </option>
                        ))}
                    </select>
                </div>

                <div className="btn-box">
                    <button
                        className={`reservation-btn ${isFormValid() ? "btn-primary btn send-btn" : ""}`}
                        onClick={sendDataToBackend}
                        disabled={!isFormValid()}
                    >
                        Enviar Reserva
                    </button>
                </div>
                
            </div>
        </div>
    );
};

export default ReservationPage;
