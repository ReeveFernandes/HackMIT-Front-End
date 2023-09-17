import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [type, setType] = useState();
  const [priority, setPriority] = useState();
  const [details, setDetails] = useState();

  const onChangeHandler = (e) => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    }
    if (e.target.name === 'type') {
      setType(e.target.value);
    }
    if (e.target.name === 'priority') {
      setPriority(e.target.value);
    }
    if (e.target.name === 'details') {
      setDetails(e.target.value);
    }
  };

  const handleClick = async () => {
    try {
      const body = { title, type, priority };
      const response = await fetch('https://velox-backend.onrender.com/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const Res = await response.json();

      if (Res.message) {
        navigate('../', { replace: true });
        toast.success('Task Added');
      } else {
        toast.error('Task Not Added');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="title" label="Title" value={title} onChange={onChangeHandler} />

        <TextField value={type} onChange={onChangeHandler} name="type" label="Type" />

        <TextField value={priority} onChange={onChangeHandler} name="priority" label="Priority" />

        <TextField value={details} onChange={onChangeHandler} name="details" label="Details" />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
          Submit
        </LoadingButton>
      </Stack>
    </>
  );
}
