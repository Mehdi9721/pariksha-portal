import React, { useEffect, useState } from 'react';
import '../../Style/AdminPagesStyle/StyleStudentView.css';
import axios from 'axios';
import refreshicon from '../../ImagesAndLogo/refresh.png';

function ViewQuestions() {
  const [questionsData, setQuestionsData] = useState([]);
  const [searchExamId, setSearchExamId] = useState('');
  const [foundQuestions, setFoundQuestions] = useState({});
  const [searchedQuestions,setsearchedQuestions]=useState([]);
  
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
        await axios.delete('http://localhost:8080/api/deleteAllQuestions',config);
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
      const apiUrl = searchExamId
        ? `http://localhost:8080/api/getAllQuestionsByExamId/${searchExamId},`
        : 'http://localhost:8080/api/getAllQuestions';

      const response = await axios.get(apiUrl,config);
      setQuestionsData(response.data);
    
    } catch (e) {
      console.log(e);
    }
  };
  
  const handleSearch = async () => {

    const examIdToSearch = searchExamId.trim() === '' ? '' : searchExamId;
    setSearchExamId(examIdToSearch);
    const sq=await axios.get(`http://localhost:8080/api/getAllQuestionsByExamId/${searchExamId}`,config);
   
    setsearchedQuestions(sq.data);
    console.log(searchedQuestions);
  };

  const resetSearch = () => {
    setSearchExamId('');
    handleQuestionsData();
  };

  const handleDeleteQuestion = async (id) => {
    const confirmDelete = window.confirm(`Do you want to delete the question with Exam ID: ${id}?`);

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/deleteQuestionByExamId/${id}`,config);
      } catch (error) {
        console.error('Error deleting question:', error);
      }
    }
  };
  return (
    <>
      <div className='viewBody'>
        <div className='ResultViewTitle'> <h4><b> View Questions </b></h4></div>
        <div className='searchBox'>
        <button type="button" className="btn btn-outline-secondary" onClick={handleQuestionsData}>
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
          <table border={"5px solid black"} className="table table-striped custom-table" style={{ margin: "10px" }} >
            <thead>
              <tr>
                <th>Exam ID</th>
                <th>Question</th>
                <th>Option A</th>
                <th>Option B</th>
                <th>Option C</th>
                <th>Option D</th>
                <th>Answer</th>
                <th>Delete Question</th>
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
          </table>)}
        <br />
        <div>Total Number Of Questions: {questionsData.length}
          <div><button type="button" className="btn btn-danger" style={{ margin: "10px" }} onClick={handleDeleteAll}>Delete All</button></div>
        </div>
        <table className="table table-striped custom-table">
          <thead>
            <tr>
              <th>Exam ID</th>
              <th>Question</th>
              <th>Option A</th>
              <th>Option B</th>
              <th>Option C</th>
              <th>Option D</th>
              <th>Answer</th>
              <th>Delete Question</th>
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
