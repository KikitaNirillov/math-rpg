import { EnemyData } from '@base/enemies'
import issuegenImg from '@sprites/enemies/issuegen.gif'
import issuegenStaticImg from '@sprites/enemies/issuegenStatic.png'

export const data: EnemyData = {
    name: 'Issuegen',
    defaultImg: issuegenImg, 
    staticImg: issuegenStaticImg,
    enemyType: 'miniBoss',
    questions: [
        {
            question: 'What is the solution of a system of linear equations in two variables if the equations are parallel lines?',
            answers: { correctAnswer: 'No solution.', incorrectAnswer: 'Infinitely many solutions.' }
        },
        {
            question: 'What is the value of sin(90°)?',
            answers: { correctAnswer: '1', incorrectAnswer: '0' }
        },
        {
            question: "How do you react to a child's disobedience?",
            answers: { correctAnswer: 'I try to understand why the child is not listening and find a solution through dialogue.', incorrectAnswer: 'I yell at the child and punish him/her to make them follow my instructions.' }
        }
    ]
}

