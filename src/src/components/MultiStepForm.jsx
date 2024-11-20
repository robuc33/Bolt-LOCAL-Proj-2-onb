import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
  Paper,
  Container,
  StepIcon
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NameStep from './steps/NameStep.jsx';
import PhotoStep from './steps/PhotoStep.jsx';
import JobStep from './steps/JobStep.jsx';
import PhoneStep from './steps/PhoneStep.jsx';
import EmailStep from './steps/EmailStep.jsx';
import CardTypeStep from './steps/CardTypeStep.jsx';

// ... (rest of the imports and constants)

const MultiStepForm = () => {
  // ... (rest of the component code remains the same)
};

export default MultiStepForm;
