import React, { useEffect, useState } from 'react';
import '../../Style/AdminPagesStyle/StyleStudentView.css';
import axios from 'axios';
import refreshicon from '../../ImagesAndLogo/refresh.png';

function ViewQuestions() {
  const [questionsData, setQuestionsData] = useState([]);
  const [searchExamId, setSearchExamId] = useState('');
  const [foundQuestions, setFoundQuestions] = useState({});

  useEffect(() => {
    handleQuestionsData();
  }, []);

  const handleDeleteAll = async () => {
    const confirmDelete = window.confirm('Do you want to delete all questions?');
    if (confirmDelete) {
      try {
        await axios.delete('http://localhost:8080/api/deleteAllQuestions');
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
        ? `http://localhost:8080/api/getAllQuestionsByExamId/${searchExamId}`
        : 'http://localhost:8080/api/getAllQuestions';
  
      const response = await axios.get(apiUrl);
      setQuestionsData(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  
  const handleSearch = async () => {

    const examIdToSearch = searchExamId.trim() === '' ? '' : searchExamId;
  
    setSearchExamId(examIdToSearch);
    await handleQuestionsData();
  };

  const resetSearch = () => {
    setSearchExamId('');
    handleQuestionsData();
  };

  const handleDeleteQuestion = async (examId) => {
    const confirmDelete = window.confirm(`Do you want to delete the question with Exam ID: ${examId}?`);

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/deleteQuestionByExamId/${examId}`);
        setQuestionsData((prevData) => prevData.filter((question) => question.examId !== examId));
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
        {foundQuestions.length > 0 && (
          <table border={"5px solid black"} className="table table-striped">
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
              <tr>
                <td>{foundQuestions[0].examId}</td>
                <td>{foundQuestions[0].question}</td>
                <td>{foundQuestions[0].optionA}</td>
                <td>{foundQuestions[0].optionB}</td>
                <td>{foundQuestions[0].optionC}</td>
                <td>{foundQuestions[0].optionD}</td>
                <td>{foundQuestions[0].answer}</td>
                <td><button type="button" className="btn btn-danger" onClick={() => handleDeleteQuestion(foundQuestions[0].examId)}>Delete</button></td>
              </tr>
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
              <tr key={question.examId}>
                <td>{question.examId}</td>
                <td>{question.question}</td>
                <td>{question.optionA}</td>
                <td>{question.optionB}</td>
                <td>{question.optionC}</td>
                <td>{question.optionD}</td>
                <td>{question.answer}</td>
                <td><button type="button" className="btn btn-danger" onClick={() => handleDeleteQuestion(question.examId)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ViewQuestions;
