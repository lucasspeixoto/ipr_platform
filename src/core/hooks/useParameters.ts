import { useState, useEffect } from 'react';

import { database } from '@services/Firebase';
import { IParametersContext } from '@core/types/IParametersContext';

export const useParameters = () => {
  const [parameters, setParameters] = useState<IParametersContext>();

  useEffect(() => {
    const parametersRef = database.ref('parameters');

    parametersRef.on('value', (parameters) => {
      const parametersValue = parameters.val();

      setParameters(parametersValue);
    });

    return () => {
      parametersRef.off('value');
    };
  }, []);

  return { parameters };
};
