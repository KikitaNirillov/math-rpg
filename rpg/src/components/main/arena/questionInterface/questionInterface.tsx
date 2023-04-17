import s from './questionInterface.module.scss'
import { EnemyQuestion } from '@redux/enemyReducer';
import { requiredTalkTime } from 'settings';
import TypeWriter from 'components/typeWriter/typeWriter';
import { useEffect, useMemo, useState } from 'react';
import { FightInterfaceName } from '@redux/fightReducer';

type QuestionInterfaceProps = {
    setDisplayingFightInterface: (intefaceName: FightInterfaceName) => void
    enemyQuestions: Array<EnemyQuestion> | null
    enemyBeatenEnough: boolean
    answerQuestion: (enteredAnswer: string) => void
}

const QuestionInterface: React.FC<QuestionInterfaceProps> = ({ setDisplayingFightInterface, answerQuestion, ...props }) => {
    const randomInt = useMemo(() => Math.floor(Math.random() * 2), [props.enemyQuestions])
    const [questionWasDisplayed, setQuestionWasDisplayed] = useState<boolean>(false)
    const [currentQuestion, setCurrentQuestion] = useState<EnemyQuestion | null>(null)

    useEffect(() => {
        setCurrentQuestion(props.enemyQuestions ? props.enemyQuestions[0] : null)
    }, [props.enemyQuestions])

    useEffect(() => setQuestionWasDisplayed(false), [props.enemyQuestions])

    if (props.enemyQuestions === null || !props.enemyBeatenEnough) {
        return (
            <div className={`${s.questionInterface} arenaInterfaceContainer`}>
                <div className={s.questionInterface__question}>
                    <TypeWriter
                        text={props.enemyQuestions ? ("I don't know why, but I can't do it now.") : ("It doesn't make sense...")}
                        whatToDoAtTheEnd={() => setTimeout(() => {
                            setDisplayingFightInterface('defaultInterface')
                        }, requiredTalkTime)}
                    />
                </div>
            </div>
        )
    }
    if (props.enemyQuestions.length === 0) {
        return (
            <div className={`${s.questionInterface} arenaInterfaceContainer`}>
                <div className={s.questionInterface__question}>
                    <TypeWriter
                        text={"Thank you..."}
                    />
                </div>
            </div>
        )
    }
    if (!currentQuestion) {
        return (
            <div className={`${s.questionInterface} arenaInterfaceContainer`} />
        )
    }
    return (
        <div className={`${s.questionInterface} arenaInterfaceContainer`}>
            <div className={s.questionInterface__question}>
                <TypeWriter
                    text={currentQuestion.question}
                    whatToDoAtTheEnd={() => setQuestionWasDisplayed(true)}
                />
            </div>
            {questionWasDisplayed && (randomInt === 1 ?
                <div className={s.questionInterface__answers}>
                    <button className={s.questionInterface__answers_button}
                        onClick={() => answerQuestion(currentQuestion.answers.correctAnswer)}
                    >
                        <p>{currentQuestion.answers.correctAnswer}</p>
                    </button>
                    <button className={s.questionInterface__answers_button}
                        onClick={() => answerQuestion(currentQuestion.answers.incorrectAnswer)}
                    >
                        <p>{currentQuestion.answers.incorrectAnswer}</p>
                    </button>
                </div>
                :
                <div className={s.questionInterface__answers}>
                    <button className={s.questionInterface__answers_button}
                        onClick={() => answerQuestion(currentQuestion.answers.incorrectAnswer)}
                    >
                        <p>{currentQuestion.answers.incorrectAnswer}</p>
                    </button>
                    <button className={s.questionInterface__answers_button}
                        onClick={() => answerQuestion(currentQuestion.answers.correctAnswer)}
                    >
                        <p>{currentQuestion.answers.correctAnswer}</p>
                    </button>
                </div>
            )}
        </div>
    )
}


export default QuestionInterface