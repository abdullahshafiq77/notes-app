'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  Card,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

import CreateNote from './createNote';

import { selectNotes, deleteNote } from '@/store/slices/notesSlice';
import TransitionsDialog from '@/components/Modal/TransitionsDialog';
import CustomizationDialog from '@/components/Modal/CustomizationDialog';

function NotesList(props) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        <LastPageIcon />
      </IconButton>
    </Box>
  );
}

NotesList.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function NotesLists() {
  const router = useRouter();
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes);
  const [page, setPage] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [selectedNote, setSelectedNote] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - notes.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteNote = () => {
    dispatch(deleteNote(selectedNoteId));
    setIsDeleteModalOpen(false);
    toast('Note deleted successfully', {
      type: 'success',
    });
  };

  const viewnoteDetails = (noteDetails) => {
    router.push({
      pathname: `/notes/${noteDetails.id}`,
      query: noteDetails,
    });
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: 'none',
          borderRadius: '10px',
          p: '25px 25px 10px',
          mb: '15px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '10px',
          }}
        >
          <Typography
            as='h3'
            sx={{
              fontSize: 30,
              fontWeight: 600,
            }}
          >
            Notes
          </Typography>
          <Button
            variant='contained'
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create Note
          </Button>
        </Box>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: 'none',
          }}
        >
          {notes.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100px',
                fontWeight: 500,
              }}
            >
              No data to display
            </Box>
          ) : (
            <Table
              sx={{ minWidth: 900 }}
              aria-label='custom pagination table'
              className='dark-table'
            >
              <TableHead sx={{ background: '#F7FAFF' }}>
                <TableRow>
                  <TableCell
                    sx={{
                      borderBottom: '1px solid #F7FAFF',
                      fontSize: '25px',
                      fontWeight: 600,
                      padding: '16px 10px',
                      width: '150px',
                    }}
                  >
                    Title
                  </TableCell>

                  <TableCell
                    sx={{
                      borderBottom: '1px solid #F7FAFF',
                      padding: '16px 10px',
                      display: 'flex',
                      justifyContent: 'center',
                      width: '100%',
                      fontSize: '25px',
                      fontWeight: 600,
                    }}
                  >
                    Body
                  </TableCell>

                  <TableCell
                    align='right'
                    sx={{
                      borderBottom: '1px solid #F7FAFF',
                      fontSize: '14px',
                      padding: '0px 30px 0px',
                      width: '45px',
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {(rowsPerPage > 0
                  ? notes.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : notes
                ).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell
                      sx={{
                        fontWeight: '500',
                        fontSize: '20px',
                        borderBottom: '1px solid #F7FAFF',
                        padding: '8px 10px',
                        width: '150px',
                      }}
                    >
                      {row.title}
                    </TableCell>

                    <TableCell
                      align='center'
                      sx={{
                        fontWeight: 500,
                        borderBottom: '1px solid #F7FAFF',
                        fontSize: '15px',
                        padding: '8px 10px',
                      }}
                    >
                      {row.body}
                    </TableCell>

                    <TableCell
                      align='right'
                      sx={{
                        borderBottom: '1px solid #F7FAFF',
                        padding: '8px 10px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <Box>
                        <Tooltip title='Delete' placement='top'>
                          <IconButton
                            aria-label='Remove'
                            size='small'
                            color='danger'
                            className='danger'
                            onClick={() => {
                              setSelectedNoteId(row.id);
                              setIsDeleteModalOpen(true);
                            }}
                          >
                            <DeleteIcon fontSize='inherit' />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title='View' placement='top'>
                          <IconButton
                            aria-label='View'
                            size='small'
                            color='info'
                            className='info'
                            onClick={() => viewnoteDetails(row)}
                          >
                            <RemoveRedEyeIcon fontSize='inherit' />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title='Update' placement='top'>
                          <IconButton
                            aria-label='Rename'
                            size='small'
                            color='primary'
                            className='primary'
                            onClick={() => {
                              setSelectedNote(row);
                              setIsCreateModalOpen(true);
                              setIsUpdateModalOpen(true);
                            }}
                          >
                            <DriveFileRenameOutlineIcon fontSize='inherit' />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell
                      colSpan={7}
                      style={{ borderBottom: '1px solid #F7FAFF' }}
                    />
                  </TableRow>
                )}
              </TableBody>

              {notes.length > 10 && (
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: 'All', value: -1 },
                      ]}
                      colSpan={8}
                      count={notes.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          'aria-label': 'Rows per page',
                        },
                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={NotesList}
                      style={{ borderBottom: 'none' }}
                    />
                  </TableRow>
                </TableFooter>
              )}
            </Table>
          )}
        </TableContainer>
      </Card>
      <TransitionsDialog
        open={isDeleteModalOpen}
        heading='Delete Note'
        description='Are you sure you want to delete this note?'
        cancel={() => setIsDeleteModalOpen(false)}
        proceed={handleDeleteNote}
      />
      <CustomizationDialog
        open={isCreateModalOpen}
        title={isUpdateModalOpen ? 'Update Note' : 'Create Note'}
        handleClose={() => {
          setIsCreateModalOpen(false);
          setIsUpdateModalOpen(false);
        }}
      >
        <CreateNote
          closeModal={() => {
            setIsCreateModalOpen(false);
            setIsUpdateModalOpen(false);
            setSelectedNote({});
          }}
          data={selectedNote}
        />
      </CustomizationDialog>
    </>
  );
}
