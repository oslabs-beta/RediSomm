import e from 'express';
import React, {useState} from 'react';
import axios from 'axios';

export type SubmitDataType = {
  key: string, value: string, ttl: string
}

const TableAdd = () => {
  const [submitted, setSubmitted] = useState<Boolean>(false)
  const [submitData, setSubmitData] = useState<SubmitDataType>({
    key: '', 
    value: '', 
    ttl: ''
  })

  const handleKeyChange = (e: any) => {
    e.preventDefault();
    setSubmitData((submitData) : SubmitDataType=>({
      ...submitData, key: e.target.value
    }))
  }
  const handleValueChange = (e: any) => {
    e.preventDefault();
    setSubmitData((submitData) : SubmitDataType=>({
      ...submitData, value: e.target.value
    }))
  }
  const handleTTLChange = (e: any) => {
    e.preventDefault();
    setSubmitData((submitData) : SubmitDataType=>({
      ...submitData, ttl: e.target.value
    }))
  }
  const handleSubmit = async (e: any) => {
    const {key, value, ttl} = submitData;
    e.preventDefault();
    const response : Response = await axios.post('/api/createKVP', {key, value, ttl})
    const confirm = await response.json()
    if (confirm) setSubmitted(true);
    setTimeout(()=>{setSubmitted(false)}, 5000)
  };
  return (
    <>
      <div className="add-new-row" onSubmit={handleSubmit}>
        <form>
          <input 
            placeholder="key"
            name="key" 
            type="text"
            value={submitData.key} 
            className="key-entry entry"
            onChange={handleKeyChange}
            />
          <input 
            placeholder="value"
            name="value" 
            type="text"
            value={submitData.value} 
            className="value-entry entry"
            onChange={handleValueChange}
            />
          <input 
            placeholder="ttl"
            name="ttl" 
            type="text"
            value={submitData.ttl} 
            className="ttl-entry entry"
            onChange={handleTTLChange}
            />
          <button
            type='submit'
          >click me</button>
        </form>
      </div>
      {submitted && <div>good job!</div>}
    </>
  );
};

export default TableAdd;
