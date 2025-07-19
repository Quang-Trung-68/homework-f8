export enum TypeChoice {
  MULTIPLE_CHOICE = "multiple-choice",
  USER_CHOICE = "user-choice",
}

export interface QuestionI  {
    id: number;
    code: string;
    description: string;
    question: string;
    type: TypeChoice;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAnswer: string;
    explanation: string;
    answer?:string;
    isReview?:boolean;
}

export interface ExamI {
  id: number;
  title: string;
  description: string;
  details: DetailI[];
}

export interface DetailI {
  id: number;
  section: number;
  module: number;
  question: QuestionI;
}


