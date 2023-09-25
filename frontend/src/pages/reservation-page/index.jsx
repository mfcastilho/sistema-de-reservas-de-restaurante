import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

    const [currentDate, setCurrentDate] = useState(startOfDay(new Date()));
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);    

    const [tableOptions, setTableOptions] = useState([]);
    const [selectedTable, setSelectedTable] = useState(tableOptions.length > 0 ? tableOptions[0].id : "");

    const [selectedTime, setSelectedTime] = useState("");

    const checkTokenExpiration = ()=>{
        if (!token) {
            navigate("/login");
        } else {

            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < Date.now()) navigate("/login");
        }
    }

    const fetchData = async () => {
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
        fetchData();
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
        setCurrentDate(parseISO(e.target.value));
        setSelectedDate(true);
    };

    const handleTableChange = (e) => {
        setSelectedTable(e.target.value);
    };

    const isFormValid = () => {
        return selectedDate && selectedTable && selectedTime;
    };

    const sendDataToBackend = async () => {
        if (!isFormValid()) {
            toast.error("Preencha todos os campos antes de enviar o formulário.");
            return;
        }
        const selectedTableNumber = selectedTable.split(" ")[1];
        const formattedDate = format(currentDate, "yyyy-MM-dd");

        const reservationData = {
            table_number: selectedTableNumber,
            date: formattedDate,
            hour: selectedTime,
        };

        try {
            await axios.post(`${baseURL}/reservation`, reservationData);
            toast.success("Reserva enviada com sucesso!");
            setSelectedDate(null);
            setSelectedTable("");
            setSelectedTime("");
        } catch (error) {
            // toast.error("Erro ao enviar reserva. Por favor, tente novamente.");
            toast.error(error.response.data.error);
            console.log(error.response.data.error);
        }
    };

    return (
        <div className="reservation-page">
            <ToastContainer />
            <div className="form-group">
                <label className="selects-label">Data de Reserva</label>
                <select
                    className="date-select"
                    value={format(currentDate, "yyyy-MM-dd")}
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
            <button onClick={sendDataToBackend} disabled={!isFormValid()}>Enviar Reserva</button>
        </div>
    );
};

export default ReservationPage;
