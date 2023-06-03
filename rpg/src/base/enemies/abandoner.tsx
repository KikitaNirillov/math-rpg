import { EnemyData } from '@base/enemies'
import abandonerImg from '@sprites/enemies/abandoner.gif'
import abandonerStaticImg from '@sprites/enemies/abandonerStatic.png'

export const data: EnemyData = {
    name: 'Abandoner',
    defaultImg: abandonerImg, 
    staticImg: abandonerStaticImg,
    enemyType: 'miniBoss',
    questions: [
        {
            question: 'What is the quadratic formula?',
            answers: { correctAnswer: 'x = (-b ± √(b² - 4ac)) / 2a ', incorrectAnswer: 'x = -b / 2a' }
        },
        {
            question: 'What is the definition of a derivative in calculus?',
            answers: { correctAnswer: 'The rate of change of a function with respect to its input.', incorrectAnswer: 'The output of a function at a specific input value.' }
        },
        {
            question: 'What to do if you feel that you are ignored and not noticed?',
            answers: { correctAnswer: 'Ask loved ones to call more often and spend more time with me.', incorrectAnswer: 'Leave everything as it is, do not want to annoy others.' }
        }
    ]
}

