import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_MEMORY } from '../utils/queries';
import { DELETE_MEMORY } from '../utils/mutations';
import EditMemoryForm from '../components/EditMemoryForm';

function SingleMemory() {

  const { id: memoryId } = useParams();
  console.log(memoryId);

  const { loading, data } = useQuery(QUERY_MEMORY, {
    variables: { id: memoryId }
  });

  const memory = data?.memory || {};
  console.log(memory);

  const [deleteMemory] = useMutation(DELETE_MEMORY);

  const handleDeleteClick = async (event) => {

    event.preventDefault();
    try {
      await deleteMemory({ variables: { _id: memoryId } });
    }
    catch (e) {
      console.error(e);
    }
    document.referrer ? window.location = document.referrer : window.history.back()
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="page-view">
      <h3>My memory of {memory.memoryMonth}/{memory.memoryDate}/{memory.memoryYear}:</h3>
      <p className="form-input">{memory.memoryText}</p>
      <button onClick={handleDeleteClick} className="submit-btn">Delete</button>
      <br /><br />
      <EditMemoryForm memory={memory} />
    </div>
  )
};

export default SingleMemory;