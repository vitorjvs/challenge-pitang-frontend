/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Table, Button, Container } from 'react-bootstrap';
import moment from 'moment';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { RiDeleteBin5Line as DeleteBin } from 'react-icons/ri';
import Page from '../../components/Page';
import axios from '../../utils/api';
import DatePickerField from '../../components/Forms/DatePicker';

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/appointment');
      setAppointments(response.data.data);
      toast.info(response.data.message);
      setIsLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const filterData = async (value) => {
    try {
      const response = await axios.get(
        `/api/appointment/${moment(value.filterDate).format('DDMMYYYY')}`,
      );
      setAppointments(response.data.data);
      toast.info(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChecked = async (event, _editAppointment) => {
    const { checked: completed } = event.target;

    const newAppointments = appointments.map((appointment) => {
      if (appointment._id === _editAppointment._id) {
        return {
          ...appointment,
          isDone: completed,
        };
      }
      return appointment;
    });

    try {
      const response = await axios.put(
        `api/appointment/${_editAppointment._id}`,
        { ..._editAppointment, isDone: completed },
      );
      setAppointments(newAppointments);
      toast.info(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleRemove = async ({ _id }) => {
    const updatedAppointments = appointments.filter(
      (appointment) => appointment._id !== _id,
    );

    try {
      const response = await axios.delete(`api/appointment/${_id}`);
      setAppointments(updatedAppointments);
      toast.info(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Page title="Lista de agendamentos das vacinações contra o COVID-19">
      <Formik
        initialValues={{ filterDate: null }}
        validationSchema={Yup.object({
          filterDate: Yup.date().required('Insira uma data!').nullable(),
        })}
        onSubmit={filterData}
        validateOnChange={false}
        validateOnBlur={false}
      >
        <Form className="mt-5">
          <DatePickerField
            label="Caso deseje, filtre por data:"
            name="filterDate"
            placeholderText="Filtre a lista de vacinações programadas por data"
          />
          <Container>
            <Button
              onClick={() => fetchData()}
              className="text-center float-right mt-3 mb-custom"
              type="reset"
              variant="secondary"
            >
              Remover Filtro
            </Button>
            <Button
              className="text-center float-right mt-3 mr-3 mb-custom"
              type="submit"
            >
              Filtrar
            </Button>
          </Container>
        </Form>
      </Formik>

      {!isLoading && appointments.length === 0 && (
        <Table responsive="lg">
          <h4 className="text-center">
            Olá! Ainda não existe agendamentos para vacinação contra COVID-19.
          </h4>
        </Table>
      )}
      {!isLoading && appointments.length > 0 && (
        <Table bordered hover responsive="lg">
          <thead className="text-center">
            <tr>
              <th width="10%">Data do atendimento</th>
              <th width="10%">Horário do atendimento</th>
              <th width="35%">Nome do paciente</th>
              <th width="10%">Idade do paciente</th>
              <th width="20%">Status do atendimento</th>
              <th width="20%">Remover agendamento</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.appointmentDate}</td>
                <td>{moment(appointment.appointmentTime).format('HH:mm')}</td>
                <td>{appointment.name}</td>
                <td>{`${Math.floor(appointment.age)} anos`}</td>
                <td>
                  <input
                    checked={appointment.isDone}
                    onChange={(event) => handleChecked(event, appointment)}
                    type="checkbox"
                  />
                  {appointment.isDone ? (
                    <span id="completed-message">Atendimento Concluído!</span>
                  ) : (
                    <span id="pending-message">Atendimento Pendente!</span>
                  )}
                </td>
                <td>
                  <Button
                    onClick={() => handleRemove(appointment)}
                    variant="outline-danger"
                  >
                    <DeleteBin />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Page>
  );
}
