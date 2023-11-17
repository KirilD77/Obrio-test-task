import { QuestionOption } from "@/pages/question/config";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type QuizProgress = {
  [questionId: string]: QuestionOption | undefined
}

type PushProgressPayload = {
  id: string
  option: QuestionOption
}

type State = {
  startQuestionId: string
  quizProgress: QuizProgress | null
  quizLaunched: boolean
}

const initialState: State = {
  startQuestionId: "",
  quizProgress: null,
  quizLaunched: false
}

const quizSlice = createSlice({
  initialState,
  name: 'quiz',
  reducers: {
    launchQuiz: (state, payload: PayloadAction<string>) => {
      state.quizLaunched = true
      state.startQuestionId = payload.payload
    },
    pushQuizProgress: (state, action: PayloadAction<PushProgressPayload>) => {
      if (state.quizProgress) {
        state.quizProgress[action.payload.id] = action.payload.option
      } else {
        state.quizProgress = { [action.payload.id]: action.payload.option }
      }
    }

  }
})

export const { pushQuizProgress, launchQuiz } = quizSlice.actions

export default quizSlice
