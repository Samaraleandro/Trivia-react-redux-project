import React from 'react';
import { screen } from '@testing-library/react';
import App from '../../App';
import Login from '../../pages/Login';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';

describe('Testes para página de Login', () => {

  test('Página inicial começa com a rota /', () => {
    const initialEntries = ['/'];
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries});
    const { pathname } = history.location
    expect(pathname).toBe('/');
  });

  test('Teste para validação da existência de 2 botões e 2 inputs', () => {
    renderWithRouterAndRedux(<Login />);
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByTestId('btn-play');
    const settingsBtn = screen.getByTestId('btn-settings');

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument()
    expect(playBtn).toBeInTheDocument()
    expect(settingsBtn).toBeInTheDocument()
  })

  test('Teste para validação do botão play está desabilitado quando a página / estiver renderizada', () => {
    renderWithRouterAndRedux(<App />);
    const playBtn = screen.getByTestId('btn-play');
    expect(playBtn).toBeDisabled();
  })

  test('Teste se ao clicar o botão Play a página é redicionada para o componente Game', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByTestId('btn-play');

    userEvent.type(nameInput, 'Teste');
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.click(playBtn);

    await waitFor(() => {
      expect(screen.getByText('Game')).toBeVisible()
      expect(history.location.pathname).toBe('/game'); 
    });
  })

  test('Teste se ao clicar no botão de configurações a página é redirecionada para /settings', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const settingsBtn = screen.getByTestId('btn-settings');
    userEvent.click(settingsBtn);

    expect(history.location.pathname).toBe('/settings'); 

  })
})
