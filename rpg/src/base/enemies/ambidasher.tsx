import { EnemyData } from '@base/enemies'
import loc2MiniBoss3DefaultImg from '@sprites/locations/location2/enemies/enemyLoc2MiniBoss3DefaultImg.jpg'
import loc2MiniBoss3StaticImg from '@sprites/locations/location2/enemies/enemyLoc2MiniBoss3StaticImg.jpg'

export const data: EnemyData = {
    name: 'Ambidasher',
    defaultImg: loc2MiniBoss3DefaultImg,
    staticImg: loc2MiniBoss3StaticImg,
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

