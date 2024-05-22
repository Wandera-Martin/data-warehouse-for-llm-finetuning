// src/ApiData.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';
import Filter from './Filter';
import ItemDetails from './ItemDetails';

const ApiData = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.example.com/data');
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const searchAndFilterData = () => {
      let filtered = data;

      if (searchQuery) {
        filtered = filtered.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (filter) {
        filtered = filtered.filter(item => item.category === filter);
      }

      setFilteredData(filtered);
    };

    searchAndFilterData();
  }, [data, searchQuery, filter]);

  return (
    <div>
      <Search setSearchQuery={setSearchQuery} />
      <Filter setFilter={setFilter} />
      <ul>
        {filteredData.map(item => (
          <li key={item.id} onClick={() => setSelectedItem(item)}>
            {item.name}
          </li>
        ))}
      </ul>
      {selectedItem && <ItemDetails item={selectedItem} />}
    </div>
  );
};

export default ApiData;
