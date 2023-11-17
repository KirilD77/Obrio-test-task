import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { launchQuiz } from '@/redux/slices/quizSlice'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <div className="mx-auto max-w-[600px] flex flex-col gap-6">
      <h1 className="text-[40px] font-bold">Welcome to my awesome quiz</h1>
      <button
        className="p-4 rounded-2xl bg-slate-200 hover:bg-button-active hover:text-button-active"
        onClick={() => {
          /* could be a part of the quiz config */
          const firstQuizQuestionId = '1'
          dispatch(launchQuiz(firstQuizQuestionId))
          router.push(`/question/${firstQuizQuestionId}`)
        }}
      >
        Start!
      </button>
    </div>
  )
}
