import { useRef, useState } from "react";
import Upload from "../../assets/admin/upload.svg";

import { Link } from "react-router-dom";
import Modal from "../Modal";
//Se crearon hooks personalizados para los fomularios de las ordenes y los productos
export const Input = ({
    title,
    type,
    name,
    required,
    placeholder,
    classInput,
    classDiv,
    classSpan,
    min,
    max,
    step,
    value,
    setValue,
  }) => {
    return (
      <div className={"flex flex-col gap-2 " + classDiv}>
        <label className={"flex font-medium " + classSpan}>{title}:</label>
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={setValue}
          className={
            "focus:border-blue-500 rounded-md border-2 p-2 outline-none" +
            classInput
          }
        />
      </div>
    );
};

export const InputFile = ({
  name,
  title,
  required,
  setValue,
  removeImage,
  url
}) => {
  
    const [fileValue, setFileValue] = useState(null);
    const inputReference = useRef();
    const buttonRef = useRef();
  
    const DragStart = () =>
      (buttonRef.current.textContent = "Soltar para guardar");
    const DragLeave = () => (buttonRef.current.textContent = "Subir elemento");
    const DropFile = () => (buttonRef.current.textContent = "Subir elemento");
  
    return (
      <div className="group mx-4 mb-4 flex h-full flex-col gap-2">
        <span className="block font-medium">{title}:</span>
        <div className="aspect-square relative flex h-full ">
          <input
            type="file"
            hidden={fileValue !== null}
            className="aspect-square absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
            id="imageSubmit"
            name={name}
            ref={inputReference}
            onChange={(e) => {
              setFileValue(e.target.files[0]);
              setValue(e.target.files[0]);
            }}
            required={required}
          />
          {fileValue !== null || url !== '' ? (
            <>
              <button
                onClick={() => {
                  setFileValue(null);
                  setValue(null);
                  removeImage();
                }}
                type="button"
                className="aspect-square absolute top-1  right-1 z-10 rounded-sm bg-red-300 py-1 px-2 text-lg text-white drop-shadow-lg hover:bg-red-500"
              >
                X
              </button>
              {url !== '' ? (
                <img
                  src={url}
                  alt="preview"
                  className="aspect-square w-full object-contain"
                />
              ) : fileValue.type.includes("image") ? (
                <img
                  src={url !== '' ? url :URL.createObjectURL(fileValue)}
                  alt="preview"
                  className="aspect-square w-full object-contain"
                />
              ) : (
                <iframe
                  title="PREVIEW"
                  src={URL.createObjectURL(fileValue)}
                  className="aspect-square w-full"
                />
              )}
            </>
          ) : (
            <div
              className="aspect-square flex w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-500 group-hover:border-black"
              draggable
              onDragStart={DragStart}
              onDrop={DropFile}
              onDragLeave={DragLeave}
            >
              <img src={Upload} className="w-2/4" alt="upload icon" />
              <p
                className="rounded-sm p-2 px-4 text-black"
                type="button"
                ref={buttonRef}
                onClick={() => {
                  inputReference.current.click();
                }}
              >
                Click o Arrasta
              </p>
            </div>
          )}
        </div>
      </div>
    );
};
  //Hook para el select de los proovedores
export const InputSelectAdvisers = ({
  title,
  type,
  name,
  required,
  placeholder,
  classInput,
  classDiv,
  classSpan,
  value,
  setValue,
  advisers
}) => {
  return (
    <div className={"flex flex-col gap-2 " + classDiv}>
      <div className="flex items-center justify-between">
        <span className={"flex font-medium  " + classSpan}>{title}:</span>

      </div>

      <select
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={setValue}
        defaultValue={''}
        className={
          "focus:border-palette-primary rounded-md border-2 p-2 outline-none" +
          classInput
        }
      >
        {  advisers.length !== 0 &&
          advisers.map(adviser => {
            return <option value={adviser._id} key={adviser._id}>{adviser.tradename}</option>
          })
        }
      </select>
    </div>
  );
};  
//Hook para el select del status de las ordenes
export const InputSelectStatus = ({
  title,
  type,
  name,
  required,
  placeholder,
  classInput,
  classDiv,
  classSpan,
  value,
  setValue,
  orderStatus,
  firstValue
}) => {
  return (
    <div className={"flex flex-col gap-2 " + classDiv}>
      <div className="flex items-center justify-between">
        <span className={"flex font-medium  " + classSpan}>{title}:</span>

      </div>

      <select
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={setValue}
        className={
          "focus:border-palette-primary rounded-md border-2 p-2 outline-none" +
          classInput
        }
      >
        {  orderStatus.length !== 0 &&
          orderStatus.map((status, index) => {
            return <option value={status} key={index}>{status}</option>
          })
        }
      </select>
    </div>
  );
};