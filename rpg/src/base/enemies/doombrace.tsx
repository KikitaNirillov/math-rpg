import { EnemyData } from '@base/enemies'
import doombraceImg from '@sprites/enemies/doombrace.gif'
import doombraceStaticImg from '@sprites/enemies/doombraceStatic.png'

export const data: EnemyData = {
    name: 'Doombrace',
    defaultImg: doombraceImg,
    staticImg: doombraceStaticImg,
    enemyType: 'miniBoss',
    questions: [
        {
            question: "What is the relationship between the coefficients and roots of a quadratic equation according to Vieta's formula?",
            answers: { correctAnswer: 'The sum of the roots is equal to -b/a and the product of the roots is equal to c/a.', incorrectAnswer: 'The sum of the roots is equal to c/a and the product of the roots is equal to -b/a.' }
        },
        {
            question: 'What is the definition of a limit in calculus?',
            answers: { correctAnswer: 'The value that a function approaches as its input approaches a particular value.', incorrectAnswer: 'The value of a function at a particular input value.' }
        },
        {
            question: 'How to accept the fact that death is an integral part of life?',
            answers: { correctAnswer: 'Seek understanding of death as a natural process.', incorrectAnswer: 'Avoid talking about death.' }
        }
    ]
}

