import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function App() {
  // To get data from localStorage
  function getData() {
    let allBankList = localStorage.getItem('All banks');
    if (allBankList) {
      return JSON.parse(localStorage.getItem('All banks'));
    } else {
      return [];
    }
  }
  const [apiData, setApiData] = useState(getData());
  const [count, setcount] = useState(1);
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((data) => localStorage.setItem('All banks', JSON.stringify(data)));
  }, []);

  useEffect(() => {
    let x = 10 * (count - 1);
    let y = count * 10;
    console.log(x, y);
    let a = apiData?.slice(x, y);
    console.log(apiData);
    console.log(a);
    setAllData(a);
  }, [count]);

  const handleChange = (event, value) => {
    console.log(value);
    setcount(value);
  };
  console.log(apiData);
  return (
    <div className='App'>
      {allData?.map((data, id) => {
        return (
          <div className='card' key={id}>
            <p>{data.id}</p>
            <p>{data.title}</p>
          </div>
        );
      })}
      <Stack spacing={2}>
        <Pagination
          count={apiData?.length / 10}
          color='primary'
          onChange={handleChange}
          defaultValue={1}
        />
      </Stack>
    </div>
  );
}

export default App;
