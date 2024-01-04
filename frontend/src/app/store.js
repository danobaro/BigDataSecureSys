import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice'
import patReducer from '../features/patSlice'
import noteReducer from '../features/noteSlice';
import userReducer from '../features/userSlice';
import billReducer from "../features/billSlice"
import vitalsReducer from "../features/vitalsSlice"
import labsReducer from "../features/labsSlice"
import labsReducer2 from "../features/labsSlice2"
import kinsReducer from "../features/nKinSlice"
import ticketReducer from '../features/ticketSlice';


export const store = configureStore({
  reducer: {
  auth: authReducer,
  patient: patReducer,
  notes: noteReducer,
  user: userReducer,
  bill: billReducer,
  vital: vitalsReducer,
  lab: labsReducer,
  lab2: labsReducer2,
  kin: kinsReducer,
  tickets: ticketReducer,
  },
});
