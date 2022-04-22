import React from 'react';
import Page from '../../components/Page';
import VaccineForm from '../../components/Forms/Form';

export default function Home() {
  return (
    <Page title="Olá, seja bem-vindo! Preencha as informações abaixo para confirmar o seu agendamento da vacinação contra a COVID-19.">
      <VaccineForm />
    </Page>
  );
}
