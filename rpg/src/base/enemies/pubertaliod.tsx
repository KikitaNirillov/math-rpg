import { EnemyData } from '@base/enemies'
import pubertaliodDefaultImg from '@sprites/enemies/pubertaliod.gif'
import pubertaliodStaticImg from '@sprites/enemies/pubertaliodStatic.png'

export const data: EnemyData = {
    name: 'Pubertaliod',
    defaultImg: pubertaliodDefaultImg,
    staticImg: pubertaliodStaticImg,
    enemyType: 'miniBoss',
    questions: [
        {
            question: 'What is the slope-intercept form of a linear equation?',
            answers: { correctAnswer: 'y = mx + b', incorrectAnswer: 'Ax + By = C' }
        },
        {
            question: 'What is the value of pi?',
            answers: { correctAnswer: '3.14…', incorrectAnswer: '4.16…' }
        },
        {
            question: "How to cope with complexes and shortcomings of appearance during adolescence?",
            answers: { correctAnswer: 'Learn to accept and love yourself just the way you are.', incorrectAnswer: 'Change yourself and your appearance to meet beauty standards.' }
        }
    ]
}

