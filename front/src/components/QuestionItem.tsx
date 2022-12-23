import CustomCheckbox from "./ui/CustomCheckbox";
import { IQuestion } from "../pages/TestItem";
import { useState } from "react";
import { useSwiper } from "swiper/react";

type QuestionItemProps = {
  question: IQuestion;
  addAnswer: (id: number, result: number[]) => void
};

export default function QuestionItem({ question, addAnswer }: QuestionItemProps) {
  const [selectOptions, setSelectOptions] = useState<number[]>([]);
  const swiper = useSwiper();


  const updateState = (id: number, value: boolean) => {
    if (value) {
      setSelectOptions([...selectOptions, id]);
      
    } else {
      setSelectOptions(selectOptions.filter((option) => option !== id));
    }
  };

  const onBtnClick = () => {
    if(selectOptions.length > 0){
      addAnswer(question.id, selectOptions)
      swiper.slideNext()
    }
    
  }

  return (
    <div className="question-item">
      <h4 className="question-item__title ">
        Из какого это фильма {question.title}
      </h4>
      {question.answer_options.map((option, indx) => (
        <CustomCheckbox
          key={indx}
          id={option.id}
          name={question.title}
          label={option.title}
          updateState={updateState}
        ></CustomCheckbox>
      ))}
      <button onClick={onBtnClick} disabled={!(selectOptions.length > 0)} className="btn btn-primary">Следующий вопрос</button>
    </div>
  );
}
