import React, { useState, useEffect } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const Question = () => {

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {

        const questionIds = [
            'AreaUnderTheCurve_901',
            'BinomialTheorem_901',
            'DifferentialCalculus2_901',
        ];

        const fetchPromises = questionIds.map((questionId) =>
            fetch(
                `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${questionId}`
            ).then((res) => res.json())
        );

        const questions = await Promise.all(fetchPromises);
        console.log("ques", questions[0][0].Question)
        setQuestions(questions);
    }


    const currentQuestion = questions.length > 0
        ? questions[currentQuestionIndex][0]?.Question
        : null;

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) =>
            prevIndex === questions.length - 1 ? 0 : prevIndex + 1
        );
    }

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex((prevIndex) =>
            prevIndex === 0 ? questions.length - 1 : prevIndex - 1
        );
    }

    return (
        <div className='layout'>
            <div className='ques'>
                <MathJaxContext>
                    <MathJax>{currentQuestion}</MathJax>
                </MathJaxContext>
            </div>
            <button className='btn-pre' onClick={handlePreviousQuestion}>Previous</button>
            <button className='btn-next' onClick={handleNextQuestion}>Next</button>
        </div>
    )
}

export default Question;