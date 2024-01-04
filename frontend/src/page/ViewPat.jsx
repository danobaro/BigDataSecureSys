import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { getPatient, closePatient } from '../features/patSlice'
import { getNotes, createNote } from '../features/noteSlice'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../component/BackButton'
import Spinner from '../component/Spinner'
import NoteItem from '../component/NoteItem'

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}

Modal.setAppElement('#root')

function Viewpat() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')
  const { patient } = useSelector((state) => state.patient)

  const { notes } = useSelector((state) => state.notes)

  // NOTE: no need for two useParams
  // const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { patientId } = useParams()

  useEffect(() => {
    dispatch(getPatient(patientId)).unwrap().catch(toast.error)
    dispatch(getNotes(patientId)).unwrap().catch(toast.error)
  }, [patientId, dispatch])

  // Close ticket
  const onPatientClose = () => {
    // NOTE: we can unwrap our AsyncThunkACtion here so no need for isError and
    // isSuccess state
    dispatch(closePatient(patientId))
      .unwrap()
      .then(() => {
        toast.success('Patient Closed')
        navigate('/viewpats')
      })
      .catch(toast.error)
  }

  // Create note submit
  const onNoteSubmit = (e) => {
    // NOTE: we can unwrap our AsyncThunkACtion here so no need for isError and
    // isSuccess state
    e.preventDefault()
    dispatch(createNote({ noteText, patientId }))
      .unwrap()
      .then(() => {
        setNoteText('')
        closeModal()
      })
      .catch(toast.error)
  }

  // Open/close modal
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  if (!patient) {
    return <Spinner />
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton />
        <h2>
          Patient ID: {patient._id}
          <span className={`status status-${patient.status}`}>
            {patient.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(patient.createdAt).toLocaleString('en-US')}
        </h3>
        <h3>Product: {patient.product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{patient.name}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {patient.status !== 'closed' && (
        <button onClick={openModal} className='btn'>
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'
      >
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Note text'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes ? (
        notes.map((note) => <NoteItem key={note._id} note={note} />)
      ) : (
        <Spinner />
      )}

      {patient.status !== 'closed' && (
        <button onClick={onPatientClose} className='btn btn-block btn-danger'>
          Close Patient
        </button>
      )}
    </div>
  )
}

export default Viewpat
