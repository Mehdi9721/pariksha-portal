import React, { useEffect, useState } from 'react';
import '../../Style/AdminPagesStyle/StyleViewQuestions.css';
import axios from 'axios';
import refreshicon from '../../ImagesAndLogo/refresh.png';
import gif from "../../ImagesAndLogo/loading-loading-forever.gif";

function ViewQuestions({adminEmail}) {
  const [questionsData, setQuestionsData] = useState([]);
  const [searchExamId, setSearchExamId] = useState('');
  const [foundQuestions, setFoundQuestions] = useState({});
  const [searchedQuestions,setsearchedQuestions]=useState([]);
  const [load,setLoad]=useState(true);

  useEffect(() => {
    handleQuestionsData();
  }, [questionsData,searchedQuestions]);

  const token=localStorage.getItem('jwtToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
};
  const handleDeleteAll = async () => {
    const confirmDelete = window.confirm('Do you want to delete all questions?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/deleteAllQuestions/${adminEmail}`,config);
        handleQuestionsData();
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("delete all discarded");
    }
  };

  const handleQuestionsData = async () => {
    try {
      const apiUrl =`http://localhost:8080/api/getAllQuestions/${adminEmail}`;

      const response = await axios.get(apiUrl,config);
      setQuestionsData(response.data);
      setLoad(false);
    } catch (e) {
      console.log(e);
    }
  };
  
  const handleSearch = async () => {
    setLoad(true);
    const examIdToSearch = searchExamId.trim() === '' ? '' : searchExamId;
    setSearchExamId(examIdToSearch);
    const sq=await axios.get(`http://localhost:8080/api/getAllQuestionsByExamId/${searchExamId}`,config);
    setsearchedQuestions(sq.data);
    setLoad(false);
  };

  const resetSearch = () => {
    setSearchExamId('');
    handleQuestionsData();
  };

  const handleDeleteQuestion = async (id) => {
    const confirmDelete = window.confirm(`Do you want to delete the question with Exam ID: ${id}?`);

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/deleteQuestionById/${id}`,config);
      } catch (error) {
        console.error('Error deleting question:', error);
      }
    }
  };
  const handleSearchedDelete=async()=>{
    const confirmDelete = window.confirm(`Do you want to delete the questions?`);
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/deleteQuestionByExamId/${searchExamId}`,config);
        setsearchedQuestions([]);
      } catch (error) {
        console.error('Error deleting question:', error);
      }
    }
  }
  return (
    <>
      <div className='view-question'>
        <div className='ResultViewTitle'> <h4><b> View Questions </b></h4></div>
        <div className='searchBox'>
        <button type="button" className="btn btn-primary" onClick={handleQuestionsData}>
          Refresh {<img src={refreshicon} className='imgref' alt="refresh" />}
        </button>
          <input
            type="text"
            placeholder="Search by Exam ID"
            value={searchExamId}
            onChange={(e) => setSearchExamId(e.target.value)}
          />
          <button onClick={handleSearch} type="button" className="btn btn-primary" style={{ margin: "10px" }}>Search</button>
          <button onClick={resetSearch} type="button" className="btn btn-primary" style={{ margin: "10px" }}>Reset</button>
        </div>
        <br></br>
        {searchedQuestions.length > 0 && (
          <div>

               {load && (<div className='loading'>
               <div className='innerOfLoading'>
               Please wait, we are loading questions...... {<img src={gif} className='gif' alt="refresh" />}
         </div></div> )}

             <div><button type="button" className="btn btn-danger" style={{ margin: "10px" }} onClick={handleSearchedDelete}>Delete All Searched Questions</button></div>
             <span>These are the questions with examId {searchExamId}, on pressing delete all will delete only this id questions and rest of the questions are listed below of this table.</span>
          <table  className="table table-striped custom-table table-viewQuestion1" style={{ margin: "10px" }} >
            <thead>
              <tr>
                <th>Exam ID</th>
                <th>Question</th>
                <th>Option A</th>
                <th>Option B</th>
                <th>Option C</th>
                <th>Option D</th>
                <th>Answer</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
            {searchedQuestions.map((question) => (
              <tr key={question.id}>
                <td>{question.examId}</td>
                <td>{question.question}</td>
                <td>{question.optionA}</td>
                <td>{question.optionB}</td>
                <td>{question.optionC}</td>
                <td>{question.optionD}</td>
                <td>{question.answer}</td>
                <td><button type="button" className="btn btn-danger" onClick={() => handleDeleteQuestion(question.id)}>Delete</button></td>
              </tr>
            ))}
            </tbody>
          </table>
          </div>)}
        <br />

        {load && (<div className='loading'>
               <div className='innerOfLoading'>
               Please wait, we are loading questions...... {<img src={gif} className='gif' alt="refresh" />}
         </div></div> )}

        <div>Total Number Of Questions: {questionsData.length}
          <div><button type="button" className="btn btn-danger" style={{ margin: "10px" }} onClick={handleDeleteAll}>Delete All</button></div>
        </div>
        <table className="table table-striped custom-table table-viewQuestion">
          <thead>
            <tr>
              <th>Exam ID</th>
              <th>Question</th>
              <th>Option A</th>
              <th>Option B</th>
              <th>Option C</th>
              <th>Option D</th>
              <th>Answer</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {questionsData?.map((question) => (
              <tr key={question.id}>
                <td>{question.examId}</td>
                <td>{question.question}</td>
                <td>{question.optionA}</td>
                <td>{question.optionB}</td>
                <td>{question.optionC}</td>
                <td>{question.optionD}</td>
                <td>{question.answer}</td>
                <td><button type="button" className="btn btn-danger" onClick={() => handleDeleteQuestion(question.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ViewQuestions;
