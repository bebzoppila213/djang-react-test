import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import QuestionItem from "../components/QuestionItem";
import { useState } from "react";
import { useUser } from "../state/user";

type TestItemRouterParams = {
  id: string;
};

export type QuestionOptiions = {
  id: number;
  title: string;
};

export interface IQuestion {
  id: number;
  title: string;
  answer_options: QuestionOptiions[];
  answer_options_true: QuestionOptiions[];
}

type AnswersOnQuestionsType = {
  id: number;
  answer: number[];
};

export default function TestItem() {
  const params = useParams() as TestItemRouterParams;
  const {user} = useUser()
  const [questions] = useFetch<IQuestion[]>(
    [],
    "http://127.0.0.1:8000/api/v1/questions",
    "get",
    user.token,
    {},
    { test: params.id }
  );
  const [answersOnQuestions, setAnswersOnQuestions] = useState<
    AnswersOnQuestionsType[]
  >([]);

  const addAnswer = (id: number, results: number[]) => {
    setAnswersOnQuestions([...answersOnQuestions, { id: id, answer: results }]);
  };

  const getQuestionsStats = () => {
    let questionStats = { questionsTrue: 0, questionsFalse: 0 };
    const questionsTrue = questions.map((quest) => ({
      id: quest.id,
      answer: quest.answer_options_true.map((optTrue) => optTrue.id),
    }));

    questionsTrue.forEach((questTrue) => {
      const questionsResItem = answersOnQuestions.find(
        (resItem) => resItem.id === questTrue.id
      );
      if (!questionsResItem) return;
      if (
        questionsResItem.answer.every((element) =>
          questTrue.answer.includes(element)
        )
      ) {
        questionStats.questionsTrue += 1;
      } else {
        questionStats.questionsFalse += 1;
      }
    });

    return questionStats;
  };

  const questionStats = getQuestionsStats();

  return (
    <div className="questions mt-5">
      <div className="container">
        <div className="questions__inner">
          <Swiper slidesPerView={1} allowTouchMove={false}>
            {questions.map((questions) => (
              <SwiperSlide key={questions.id}>
                <QuestionItem
                  addAnswer={addAnswer}
                  question={questions}
                ></QuestionItem>
              </SwiperSlide>
            ))}
            <SwiperSlide>
              <div className="result">
                <h3>
                  Колличество верных ответов {questionStats.questionsTrue}
                </h3>
                <h3>
                  Колличество не верных ответов {questionStats.questionsFalse}
                </h3>
                <h3>
                  Процент верных ответов{" "}
                  {(questionStats.questionsTrue /
                    (questionStats.questionsFalse +
                      questionStats.questionsTrue)) *
                    100}
                </h3>
                <Link className="btn btn-primary" to={`/categories`}>Картегории тестов</Link>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
