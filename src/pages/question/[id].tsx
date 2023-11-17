import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import questions, { Question, QuestionOption } from '../../config'
import { useRouter } from 'next/router'
import { pushQuizProgress } from '@/redux/slices/quizSlice'
import { useSelector } from '@/redux/store'
import { ArrowIcon } from '@/assets/icons'

import logo from '@/assets/logo.png'
import logoLight from '@/assets/logo-light.png'
import Link from 'next/link'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = questions.map((question) => ({
    params: { id: question.id },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext,
) => {
  const id = context.params?.id as string
  const question = questions.find((q) => q.id === id)

  if (!question) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      question,
    },
  }
}

const useQuestionTitle = (question: Question) => {
  const quizProgress = useSelector((state) => state.quiz.quizProgress) || {}

  if (!question.providesPlaceholders?.length) return question.title

  return question.providesPlaceholders.reduce((title, placeholder) => {
    let targetOption: QuestionOption | null = null
    for (const key of Object.keys(quizProgress)) {
      const option = quizProgress[key]

      if (option?.id === placeholder) {
        targetOption = option
        break
      }
    }

    if (targetOption) {
      const replaceWith =
        targetOption.replaceWith === undefined
          ? targetOption.label
          : targetOption.replaceWith

      title = title.replace(`{${placeholder}}`, replaceWith)
    }

    return title
  }, question.title)
}

const QuestionPage = ({ question }: { question: Question }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [tempAnswer, setTempAnswer] = useState<QuestionOption | null>(null)
  const { quizProgress, quizLaunched, startQuestionId } = useSelector(
    (state) => state.quiz,
  )

  const title = useQuestionTitle(question)

  const handleOptionClick = (option: QuestionOption) => {
    setTempAnswer(null)
    const { nextQuestionId } = option

    dispatch(pushQuizProgress({ id: question.id, option }))

    if (!nextQuestionId) return

    router.push({ pathname: `/question/${nextQuestionId}` })
  }

  const handleOptionWithInfoClick = (option: QuestionOption) => {
    setTempAnswer(option)
  }

  useEffect(() => {
    if (!quizLaunched) {
      router.replace('/quiz')
    }
  }, [quizLaunched, router])

  if (!quizLaunched) {
    return null
  }

  const isFirstStep = startQuestionId === question.id
  const selectedOption = quizProgress ? quizProgress[question.id] : undefined

  const showExplanatoryInfo = question.withExplanatoryInfo && tempAnswer

  return (
    <div
      className={`${
        showExplanatoryInfo ? 'bg-explanatory-info-bg' : '#FFF0F0'
      } px-4 h-screen`}
    >
      <div className="flex w-full items-center p-4 mb-5">
        {isFirstStep ? null : (
          <ArrowIcon
            onClick={router.back}
            className={`cursor-pointer ${
              showExplanatoryInfo ? '[&>*]:fill-white' : ''
            }`}
          />
        )}
        <Link className="mx-auto" href="https://asknebula.com/" target="_blank">
          <Image
            src={showExplanatoryInfo ? logoLight : logo}
            alt="Nebula logo"
          />
        </Link>
      </div>
      <div className="max-w-[362px] mx-auto flex flex-col">
        {showExplanatoryInfo ? (
          <>
            <h1 className="text-[24px] font-bold text-[#FBFBFF] leading-[1.16] mb-5">
              So how does this work?
            </h1>
            <p className="text-[14px] text-[#FBFBFF] leading-[1.8] mb-10">
              We analyze hundreds of data points to create your unique
              astrological blueprint. This is combined with AI to tailor-make
              your astrological insights, based on your answers. We’re going to
              change your relationship with astrology.
            </p>

            <button
              className="p-4 bg-[#FBFBFF] text-[#6A3AA2] text-[18px] hover:bg-button-active hover:text-button-active rounded-2xl"
              onClick={() => handleOptionClick(tempAnswer)}
            >
              Next
            </button>
          </>
        ) : (
          <>
            <h1 className="font-bold text-[24px] leading-[1.16] text-[#333] mb-[30px]">
              {title}
            </h1>
            <ul className="flex flex-col gap-5">
              {question.options.map((option) => {
                return (
                  <li key={option.value}>
                    <button
                      onClick={() => {
                        if (question.withExplanatoryInfo) {
                          handleOptionWithInfoClick(option)
                        } else {
                          handleOptionClick(option)
                        }
                      }}
                      className={`${
                        selectedOption?.value === option.value
                          ? 'bg-button-active text-button-active'
                          : 'bg-[#EAEEF7]'
                      } w-full px-5 py-3 rounded-2xl border-[1px] border-solid border-[#E0E0E0] hover:bg-button-active hover:text-button-active`}
                    >
                      {option.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}

export default QuestionPage
