'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { TextField, Typography, Button, Grid, Box } from '@mui/material';

import { createNote, updateNote } from 'store/slices/notesSlice';

export default function CreateNote({ closeModal, data }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { title: notesTitle, body: notesBody, id: NoteId } = data;

  const formik = useFormik({
    initialValues: {
      title: notesTitle || '',
      body: notesBody || '',
    },
    onSubmit: async (data) => {
      setLoading(true);
      dispatch(NoteId ? updateNote({ ...data, id: NoteId }) : createNote(data));
      setLoading(false);
      closeModal();
      toast(`Note ${NoteId ? 'updated' : 'created'} successfully`, {
        type: 'success',
      });
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      body: Yup.string().required('Body is required'),
    }),
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box component='form' noValidate>
          <Box
            sx={{
              background: '#fff',
              padding: '0px 50px',
              borderRadius: '10px',
              maxWidth: '510px',
              ml: 'auto',
              mr: 'auto',
              mb: '20px',
            }}
            className='bg-black'
          >
            <Grid container alignItems='center' spacing={2}>
              <Grid item xs={12}>
                <Typography
                  component='label'
                  sx={{
                    fontWeight: '500',
                    fontSize: '14px',
                    mb: '10px',
                    display: 'block',
                  }}
                >
                  Title
                </Typography>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
                >
                  <Grid item xs={20} md={20} lg={12} xl={12}>
                    <TextField
                      fullWidth
                      label='Title'
                      name='title'
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.title}
                      autoComplete=''
                      InputProps={{
                        style: { borderRadius: 8 },
                      }}
                    />
                    {formik.touched.title && formik.errors.title && (
                      <Box sx={{ color: 'red' }}>{formik.errors.title}</Box>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  component='label'
                  sx={{
                    fontWeight: '500',
                    fontSize: '14px',
                    mb: '10px',
                    display: 'block',
                  }}
                >
                  Body
                </Typography>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
                >
                  <Grid item xs={20} md={20} lg={12} xl={12}>
                    <TextField
                      fullWidth
                      label='Body'
                      multiline
                      name='body'
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.body}
                      autoComplete=''
                      InputProps={{
                        style: { borderRadius: 8 },
                      }}
                    />
                    {formik.touched.body && formik.errors.body && (
                      <Box sx={{ color: 'red' }}>{formik.errors.body}</Box>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant='contained'
                  onClick={formik.handleSubmit}
                  disabled={loading}
                  sx={{
                    mt: 2,
                    textTransform: 'capitalize',
                    borderRadius: '8px',
                    fontWeight: '510',
                    ml: 'auto',
                    mr: 'auto',
                    fontSize: '16px',
                    padding: '12px 10px',
                    color: '#fff !important',
                  }}
                >
                  {loading ? (
                    <ThreeDots
                      height='28'
                      width='40'
                      radius='9'
                      color='#FFFFFF'
                      ariaLabel='three-dots-loading'
                      visible
                    />
                  ) : NoteId ? (
                    'Update'
                  ) : (
                    'Create'
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </form>
    </div>
  );
}
