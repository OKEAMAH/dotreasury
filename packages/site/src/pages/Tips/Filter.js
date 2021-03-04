import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Form } from 'semantic-ui-react'

import Select from "../../components/Select";

const FormWrapper = styled(Form)`
  display: flex;
  justify-content: flex-end;
`;
/* const ButtonsWrapper = styled.div`
  margin-left: 20px;
`; */
const StatusSelect = styled(Select)`
  width: 200px;
`;

const statusOptions = [
  { key: 'all', value: '-1', text: 'All status' },
  { key: 'closed', value: 'closed', text: 'Closed' },
  { key: 'tipping', value: 'tipping', text: 'Tipping' },
  { key: 'retracted', value: 'retracted', text: 'Retracted' },
]
const Filter = ({ query }) => {
  const [status, setStatus] = useState('');

  // only query on filters change
  const mounting = useRef(true);
  useEffect(() => {
    if (mounting.current) {
      mounting.current = false;
      return;
    }
    const data = {
      status
    }
    for(let key in data) {
      if(data[key]==='' || data[key]==-1) {
        delete data[key];
      }
    }
    query(data)
  }, [status]);

  return (
    <FormWrapper>
      <StatusSelect
        name="status"
        fluid
        options={statusOptions}
        defaultValue="-1"
        onChange={(e, {name,value})=>setStatus(value)}
      />
      {/* <ButtonsWrapper>
        <Button type="submit" primary>query</Button>
        <Button secondary>clear</Button>
      </ButtonsWrapper> */}
    </FormWrapper>
  );
};

export default Filter;
