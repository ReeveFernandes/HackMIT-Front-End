/* eslint-disable */
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
// sections
import { LoginForm } from '../sections/auth/login';
import AddTaskForm from '../sections/auth/login/AddTaskForm';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function AddTaskPage() {
  const mdUp = useResponsive('up', 'md');
  // ws = WebSocket(
  //   'wss://api.us-eas.speech-to-text.watson.cloud.ibm.com/instances/c4ae9269-1b21-4ca2-a0c0-6bd83cf5af1c/v1/recognize'
  // );

  useEffect(() => {
    const AccessToken = '2H5ue27MrzW1e1DS7jIsq4pNGDPBKEmQVHmFefTQLPHX';
    const wsURI =
      'wss://api.us-east.speech-to-text.watson.cloud.ibm.com/instances/c4ae9269-1b21-4ca2-a0c0-6bd83cf5af1c/v1/recognize' +
      '?access_token=' +
      AccessToken +
      '&model=es-ES_BroadbandModel';
    const websocket = new WebSocket(wsURI);

    websocket.onopen = function (evt) {
      onOpen(evt);
    };
    websocket.onclose = function (evt) {
      onClose(evt);
    };
    websocket.onmessage = function (evt) {
      onMessage(evt);
    };
    websocket.onerror = function (evt) {
      onError(evt);
    };
  }, []);

  return (
    <>
      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Add Task
            </Typography>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
