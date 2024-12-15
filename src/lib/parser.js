const RESPOSTA_CORRECTE = 'resposta correcte:';
const RESPUESTA_CORRECTA = 'respuesta correcta:';
const CORRECT_ANSWER = 'correct answer:';

const trimAsteriskSolution = (solution) => {
  const result = solution.split(/^[ |\t]*[0-9a-zA-Z*]+\)/);
  if (result.length === 2 && result.at(1).length > 0) {
    return result.at(1).trim();
  }
  return solution;
};

const addSolution = (questions, solution) => {
  if (questions.length === 0) {
    return false;
  }
  const lastQuestion = questions.at(questions.length - 1);
  lastQuestion.solutions.push(trimAsteriskSolution(solution));

  return true;
};

const setAnswer = (questions, number) => {
  if (questions.length === 0) {
    return false;
  }
  const lastQuestion = questions.at(questions.length - 1);
  if (number > lastQuestion.solutions.length) {
    return false;
  }
  lastQuestion.answer = number;
  return true;
};

const isQuestionNumberInSequence = (questions, number) => {
  return number === questions.length + 1;
};

const isAnswer = (answer) => {
  return (
    answer.toLowerCase().slice(0, RESPOSTA_CORRECTE.length) === RESPOSTA_CORRECTE ||
    answer.toLowerCase().slice(0, RESPUESTA_CORRECTA.length) === RESPUESTA_CORRECTA ||
    answer.toLowerCase().slice(0, CORRECT_ANSWER.length) === CORRECT_ANSWER
  );
};

const isAsteriskAnswer = (answer) => {
  return answer.split(')').at(0).trim() === '*';
};

const getAnswer = (answer) => {
  if (answer.toLowerCase().slice(0, RESPOSTA_CORRECTE.length) === RESPOSTA_CORRECTE) {
    return answer.split(RESPOSTA_CORRECTE);
  }
  if (answer.toLowerCase().slice(0, RESPUESTA_CORRECTA.length) === RESPUESTA_CORRECTA) {
    return answer.split(RESPUESTA_CORRECTA);
  }
  if (answer.toLowerCase().slice(0, CORRECT_ANSWER.length) === CORRECT_ANSWER) {
    return answer.split(CORRECT_ANSWER);
  }
  return answer;
};

const lastQuestionIsFinished = (questions) => {
  if (questions.length === 0) {
    return true;
  }
  const lastQuestion = questions.at(questions.length - 1);
  return lastQuestion.answer !== 0;
};

const throwError = (error, line) => {
  throw new Error(`Error '${error}' at line ${line + 1}`);
};

const parse = (source) => {
  const questions = [];

  const sourceInLines = source.split(/\r\n|\r|\n/);

  for (let lineCount = 0; lineCount < sourceInLines.length; lineCount += 1) {
    const line = sourceInLines[lineCount];

    const trimmedLine = line.trim();

    if (trimmedLine.length > 0) {
      const isQuestion = trimmedLine.split(/[.|-]+[ |\t]+/);

      if (isQuestion.length > 1) {
        const questionNumber = parseInt(isQuestion.at(0), 10);

        if (isQuestionNumberInSequence(questions, questionNumber)) {
          if (lastQuestionIsFinished(questions) === false) {
            throwError('Last question is not finished', lineCount);
          }
          questions.push({
            title: isQuestion.at(1),
            solutions: [],
            answer: 0,
          });
        } else {
          throwError('Question is not in sequence', lineCount);
        }
      } else if (isAsteriskAnswer(trimmedLine)) {
        if (addSolution(questions, trimmedLine) === false) {
          throwError('No questions found', lineCount);
        }
        setAnswer(questions, questions.length);
      } else if (isAnswer(trimmedLine)) {
        const answer = getAnswer(trimmedLine);
        const answerNumber = parseInt(answer.at(1), 10);
        if (answerNumber > 0) {
          setAnswer(questions, answerNumber);
        } else {
          throwError("Invalid 'Respuesta correcta:'", lineCount);
        }
      } else if (addSolution(questions, trimmedLine) === false) {
        throwError('No questions found', lineCount);
      }
    }
  }

  if (lastQuestionIsFinished(questions) === false) {
    throwError(sourceInLines.length);
  }

  return questions;
};

export default parse;
