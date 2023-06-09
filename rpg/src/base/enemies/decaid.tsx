import { EnemyData } from '@base/enemies'
import decaidImg from '@sprites/enemies/decaid.gif'
import decaidStaticImg from '@sprites/enemies/decaidStatic.png'

export const data: EnemyData = {
    name: 'Decaid',
    defaultImg: decaidImg,
    staticImg: decaidStaticImg,
    enemyType: 'miniBoss',
    questions: [
        {
            question: 'What is the general form of a quadratic equation?',
            answers: { correctAnswer: 'ax² + bx + c = 0', incorrectAnswer: 'x² + bx + c = a' }
        },
        {
            question: 'What is the formula for the area of a circle?',
            answers: { correctAnswer: 'πr²', incorrectAnswer: '2πr' }
        },
        {
            question: 'How to cope with age-related health problems?',
            answers: { correctAnswer: 'See a doctor, take care of your health more, maintain an active lifestyle.', incorrectAnswer: 'Leave everything as it is and hope for the best.' }
        }
    ]
}

