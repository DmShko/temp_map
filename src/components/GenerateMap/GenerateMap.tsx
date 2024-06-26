import { useState, useEffect, FC, FormEvent } from "react";

// own dispatch hook
import { useAppDispatch, useAppSelector } from "../../app.hooks";
import { useFormik } from "formik";

// styles
import gm from "./GenerateMapStyles.module.scss";

import postData from "../../API/postData";

const GenerateMap: FC = () => {
  const [file, setFile] = useState<{ table: string; file?: File }>();

  const selectorFileName = useAppSelector((state) => state.fileName);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (file) dispatch(postData(file));
  }),[file];

  // create 'formik' hook and configurate him
  const formik = useFormik({
    initialValues: {
      table: "",
    },

    //! 'values' contains ended values all Form inputs.
    //! They will can get: 'values.<field name>' or change values on {value1, value2...}
    onSubmit: (values) => {
      setFile(values);
    },
  });

  // load file
  const handleHange = (evt: FormEvent<HTMLInputElement>) => {
    if (evt.currentTarget.files) {
      formik.setFieldValue("file", evt.currentTarget.files[0]);
    }
  };

  return (
    <>
      <div className={gm.dashboardContainer}>
        <input type="file" name="table" accept=".zip" onChange={handleHange} />
        
        <button
          type="submit"
          onClick={() => formik.handleSubmit()}
          disabled={
            Object.keys(formik.values).find((element) => element === "file") ===
            undefined
              ? true
              : false
          }
        >
          submit
        </button>
      </div>

      <div className={gm.mapContainer}>
        <img
          src={
            selectorFileName !== ""
              ? `http://temp-map-server.onrender.com/${selectorFileName}`
              : "https://temp-map-server.onrender.com/map.jpg"
          }
          alt="image of world ocean temparature"
        ></img>
      </div>
    </>
  );
};

export default GenerateMap;
