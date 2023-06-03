import { EnemyData } from '@base/enemies'
import ambidasherImg from '@sprites/enemies/ambidasher.gif'
import ambidasherStaticImg from '@sprites/enemies/ambidasherStatic.png'

export const data: EnemyData = {
    name: 'Ambidasher',
    defaultImg: ambidasherImg,
    staticImg: ambidasherStaticImg,
    enemyType: 'miniBoss',
    questions: [
        {
            question: 'What is an inconsistent system of linear equations?',
            answers: { correctAnswer: 'A system that has no solution.', incorrectAnswer: 'A system that has at least one solution.' }
        },
        {
            question: 'What is a mathematical function?',
            answers: { correctAnswer: 'A relation between inputs and outputs with each input corresponding to only one output.', incorrectAnswer: 'A relation between inputs and outputs where an input can have multiple outputs.' }
        },
        {
            question: 'How to overcome the crisis of professional development and growth in middle age?',
            answers: { correctAnswer: 'Seek new opportunities for professional growth and development.', incorrectAnswer: 'Stay in your current job and just accept the situation without trying to change.' }
        }
    ]
}

