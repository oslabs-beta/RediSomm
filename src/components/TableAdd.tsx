import e from 'express';
import React, {useState} from 'react';
import axios from axios;

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
  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios.post('/api/createKVP')
    setSubmitted(true);
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
            className="entry"
            onChange={handleKeyChange}
            />
          <input 
            placeholder="value"
            name="value" 
            type="text"
            value={submitData.value} 
            className="entry"
            onChange={handleValueChange}
            />
          <input 
            placeholder="ttl"
            name="ttl" 
            type="text"
            value={submitData.ttl} 
            className="entry"
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
