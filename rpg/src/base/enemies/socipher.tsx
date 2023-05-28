import { EnemyData } from '@base/enemies'
import loc1MiniBoss2DefaultImg from '@sprites/locations/location1/enemies/enemyLoc1MiniBoss2DefaultImg.jpg'
import loc1MiniBoss2StaticImg from '@sprites/locations/location1/enemies/enemyLoc1MiniBoss2StaticImg.jpg'

export const data: EnemyData = {
    name: 'Socipher',
    defaultImg: loc1MiniBoss2DefaultImg,
    staticImg: loc1MiniBoss2StaticImg,
    enemyType: 'miniBoss',
    questions: [
        {
            question: 'What is a linear equation?',
            answers: { correctAnswer: 'An equation that describes a straight line.', incorrectAnswer: 'An equation that describes a curved line.' }
        },
        {
            question: 'What is a prime number?',
            answers: { correctAnswer: 'A number that is divisible only by 1 and itself.', incorrectAnswer: 'A number that is divisible by 2.' }
        },
        {
            question: "What should you do if someone doesn't let you play the game you want to play?",
            answers: { correctAnswer: 'Ask them to play with me, or suggest another game, or come to an agreement.', incorrectAnswer: 'Start shouting at them and try to take the game away from them.' }
        }
    ]
}

