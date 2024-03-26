import { useState, useEffect, FC, FormEvent } from "react";

// own dispatch hook
import { useAppDispatch } from '../../app.hooks'
import { useFormik } from 'formik';

// styles
import gm from "./GenerateMapStyles.module.scss";

import putData from "../../API/putData";

const GenerateMap: FC = () => {

  const [ file, setFile ] = useState<{table: string}>();
  const dispatch = useAppDispatch();
  
  useEffect(() => {

    if(file)  dispatch(putData(file));

  }),[file];

  // create 'formik' hook and configurate him
  const formik = useFormik({

    initialValues: {
      table: '',
    },

    //! 'values' contains ended values all Form inputs.
    //! They will can get: 'values.<field name>' or change values on {value1, value2...}
    onSubmit: ( values ) => {

      setFile(values);
    
    },
  });

  const handleHange = (evt: FormEvent<HTMLInputElement>) => {
    if (evt.currentTarget.files) {
      formik.setFieldValue("zip", evt.currentTarget.files[0]);
    }
  };

  return (
    <div className={gm.container}>
      <input
        type="file"
        name="table"
        // supported file types here,
        accept="zip"
        onChange={handleHange}
      />

      <button type="submit" onClick={() => formik.handleSubmit()}>
        submit
      </button>
    </div>
  );
};

export default GenerateMap;
