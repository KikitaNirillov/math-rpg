import { EnemyData } from '@base/enemies'
import loc1MiniBoss1DefaultImg from '@sprites/locations/location1/enemies/understand.gif'
import loc1MiniBoss1StaticImg from '@sprites/locations/location1/enemies/understandStatic.png'

export const data: EnemyData = {
    name: 'miniBoss1Loc1',
    defaultImg: loc1MiniBoss1DefaultImg,
    staticImg: loc1MiniBoss1StaticImg,
    enemyType: 'miniBoss',
    questions: [
        {
            question: 'What is the standard form of a linear equation?',
            answers: { correctAnswer: 'Ax + By = C', incorrectAnswer: 'y = mx + b' }
        },
        {
            question: 'What is the order of operations in math?',
            answers: { correctAnswer: 'Parentheses, Exponents, Multiplication and Division, Addition and Subtraction.', incorrectAnswer: 'Addition, Subtraction, Multiplication, Division, Exponents, Parentheses.' }
        },
        {
            question: 'How do you react if an adult says something you disagree with?',
            answers: { correctAnswer: 'I listen to their opinion and express my own to come to a mutual understanding.', incorrectAnswer: 'I simply agree with them because they are an adult and therefore know better.' }
        }
    ]
}

