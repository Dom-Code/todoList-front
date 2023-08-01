import { useContext } from 'react';
import { ValidationContext } from '../../App';

const useValidation = () => {
  return useContext(ValidationContext);
};

export default useValidation;
