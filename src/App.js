import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { UPDATE_TIMESPAN } from './reducer';
import './App.css';

// this is the simulation of API, which we couldn't change
const fetchData = (timespan, page) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: `data for timespan ${timespan} page ${page}`,
        nextPage: page + 1,
      });
    }, 1000);
  });
}

// this is our fetch function
const paginatedFetch = async (timespan, page) => {
  return await fetchData(timespan, page);
};

const updateClient = console.log;

const App = ({ timespan, updateTimespan }) => {
  const [t, setT] = useState(0);

  useEffect(() => {
    let stopped = false;

    async function fetchData(timespan) {
      let { data, nextPage } = await paginatedFetch(timespan, 0);
      while (!stopped) {
        updateClient(data);
        nextPage && ({ data, nextPage } = await paginatedFetch(timespan, nextPage));
      }
    }

    fetchData(timespan);

    return () => {
      // after a new timespan comes in,
      // this will stop previous while loop
      stopped = true;
    }
  }, [timespan]);

  const handleOnChange = e => {
    setT(e.target.value);
  };

  const handleClick = () => {
    updateTimespan(t);
  };

  return (
    <div className="App">
      current timespan: <h1>{ timespan }</h1>

      <input
        type='text'
        placeholder='enter a new timespan...'
        onChange={ handleOnChange }
      />
      <button
        onClick={ handleClick }
      >
        OK
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  timespan: state.timespan,
});

const mapDispatchToProps = dispatch => ({
  updateTimespan(timespan) {
    dispatch({
      type: UPDATE_TIMESPAN,
      data: { timespan },
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
