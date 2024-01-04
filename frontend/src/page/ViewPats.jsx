import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPatients } from '../features/patSlice'
import Spinner from '../component/Spinner'
import BackButton from '../component/BackButton'
import PatientItem from '../component/PatientItem'

function ViewPats() {
  const { patients } = useSelector((state) => state.patient)

  const dispatch = useDispatch()

  // NOTE: only need one useEffect here

  useEffect(() => {
    dispatch(getPatients())
  }, [dispatch])

  // NOTE: no need for loading state, we can check for absence of tickets
  // If we don't have tickets we are loading, if we do have tickets we just
  // need to update the tickets with latest tickets in the background
  if (!patients) {
    return <Spinner />
  }

  return (
    <>
      <BackButton />
      <h1>Patients</h1>
      <div>
        <div >
          <div>Name</div>
          <div>dob</div>
          <div>age</div>
          <div>email</div>
          <div>address</div>
          <div>sex</div>
          <div>phone</div>
          <div>marital</div>
          <div>hmo</div>
          <div>notes</div>
          <div>prescriptions</div>
          <div>image</div>
          <div>NName</div>
          <div>NAddress</div>
          <div>Nphone</div>
          <div>NRelationship</div>
        </div>
        {patients.map((patient) => (
          <PatientItem key={patient._id} patient={patient} />
        ))}
      </div>
    </>
  )
}

export default ViewPats
