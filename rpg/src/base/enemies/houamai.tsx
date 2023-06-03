import { EnemyData } from '@base/enemies'
import houamaiImg from '@sprites/enemies/houamai.gif'
import houamaiStaticImg from '@sprites/enemies/houamaiStatic.png'

export const data: EnemyData = {
    name: 'Houamai',
    defaultImg: houamaiImg,
    staticImg: houamaiStaticImg,
    enemyType: 'miniBoss',
    questions: [
        {
            question: 'How many solutions does a system of two linear equations in two variables have?',
            answers: { correctAnswer: 'Either one solution, no solution, or infinitely many solutions.', incorrectAnswer: 'One solution.' }
        },
        {
            question: 'What is the Pythagorean theorem used for? ',
            answers: { correctAnswer: 'Calculating the length of the hypotenuse of a right triangle.', incorrectAnswer: 'Finding the area of a circle.' }
        },
        {
            question: 'What is your attitude towards the idea of taking risks and experimenting in search of yourself?',
            answers: { correctAnswer: 'I try to step out of my comfort zone and seek new opportunities for personal growth.', incorrectAnswer: 'I avoid risks and new experiences, afraid of losing control over myself and my life.' }
        }
    ]
}

