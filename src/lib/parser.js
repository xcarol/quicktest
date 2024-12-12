const CORRECT_ANSWER = 'Correct answer: ';

const addSolution = (questions, solution) => {
  if (questions.length === 0) {
    return false;
  }
  const lastQuestion = questions.at(questions.length - 1);
  lastQuestion.solutions.push(solution);
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
  return answer.slice(0, CORRECT_ANSWER.length) === CORRECT_ANSWER;
};

const lastQuestionIsFinished = (questions) => {
  if (questions.length === 0) {
    return true;
  }
  const lastQuestion = questions.at(questions.length - 1);
  return lastQuestion.answer !== 0;
};

const throwError = (line) => {
  throw new Error(`Error at line ${line + 1}`);
};

const aposeParse = (source) => {
  const questions = [];

  const sourceInLines = source.split(/\r\n|\r|\n/);

  for (let lineCount = 0; lineCount < sourceInLines.length; lineCount += 1) {
    const line = sourceInLines[lineCount];

    const trimmedLine = line.trim();

    if (trimmedLine.length > 0) {
      const isQuestion = trimmedLine.split('. ');

      if (isQuestion.length > 1) {
        const questionNumber = parseInt(isQuestion.at(0), 10);

        if (isQuestionNumberInSequence(questions, questionNumber)) {
          if (lastQuestionIsFinished(questions) === false) {
            throwError(lineCount);
          }
          questions.push({
            title: isQuestion.at(1),
            solutions: [],
            answer: 0,
          });
        } else {
          throwError(lineCount);
        }
      } else if (isAnswer(trimmedLine)) {
        const answer = trimmedLine.split(CORRECT_ANSWER);
        const answerNumber = parseInt(answer.at(1), 10);
        if (answerNumber > 0) {
          setAnswer(questions, answerNumber);
        } else {
          throwError(lineCount);
        }
      } else if (addSolution(questions, trimmedLine) === false) {
        throwError(lineCount);
      }
    }
  }

  if (lastQuestionIsFinished(questions) === false) {
    throwError(sourceInLines.length);
  }

  return questions;
};

export default aposeParse;
