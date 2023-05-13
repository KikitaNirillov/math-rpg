import { LocationName } from '@base/locations';
import { Difficulty } from '@redux/gameReducer';
import * as math from 'mathjs';

export type EquationAnswer = {
    x: Array<number>
    y?: Array<number>
}

export type EquationData = {
    equation: string
    equationAnswer: EquationAnswer
}

const getRandomNumber = (difficulty: Difficulty) => {
    let number = Math.floor(Math.random() * 99) + 1
    if (difficulty === 'hard') {
        number = number / ((Math.random() <= 0.5) ? 10 : 1)
    }
    return ((Math.random() <= 0.5) ? (-number) : number)
}

const generateLinearEquation = (difficulty: Difficulty): Promise<EquationData> => {
    const answer = getRandomNumber(difficulty);
    const firstNumber = getRandomNumber(difficulty);
    const secondNumber = getRandomNumber(difficulty);
    const product = +math.format(math.multiply(math.bignumber(answer), math.bignumber(firstNumber)), { notation: 'fixed' })
    const rightPart = +math.format(math.add(math.bignumber(product), math.bignumber(secondNumber)), { notation: 'fixed' })
    const equation = firstNumber + 'x' + (secondNumber < 0 ? secondNumber : `+${secondNumber}`) + '=' + rightPart
    return Promise.resolve({
        equation,
        equationAnswer: {
            "x": [
                answer
            ]
        }
    })
}

const generateSystemOfEquations = (difficulty: Difficulty): Promise<EquationData> => {
    const answerX = getRandomNumber(difficulty);
    const answerY = getRandomNumber(difficulty);
    const firstNumber = getRandomNumber(difficulty);
    const secondNumber = getRandomNumber(difficulty);
    const thirdNumber = getRandomNumber(difficulty);
    const fourthNumber = getRandomNumber(difficulty);
    //for first equation:
    const product1 = +math.format(math.multiply(math.bignumber(answerX), math.bignumber(firstNumber)), { notation: 'fixed' })
    const product2 = +math.format(math.multiply(math.bignumber(answerY), math.bignumber(secondNumber)), { notation: 'fixed' })
    const rightPart1 = +math.format(math.add(math.bignumber(product1), math.bignumber(product2)), { notation: 'fixed' })
    const firstEquation = firstNumber + 'x' + (secondNumber < 0 ? secondNumber : `+${secondNumber}`) + 'y=' + rightPart1
    //for second equation:
    const product3 = +math.format(math.multiply(math.bignumber(answerX), math.bignumber(thirdNumber)), { notation: 'fixed' })
    const product4 = +math.format(math.multiply(math.bignumber(answerY), math.bignumber(fourthNumber)), { notation: 'fixed' })
    const rightPart2 = +math.format(math.add(math.bignumber(product3), math.bignumber(product4)), { notation: 'fixed' })
    const secondEquation = thirdNumber + 'x' + (fourthNumber < 0 ? fourthNumber : `+${fourthNumber}`) + 'y=' + rightPart2

    const equation = firstEquation + ', ' + secondEquation
    return Promise.resolve({
        equation,
        equationAnswer: {
            "x": [
                answerX
            ],
            "y": [
                answerY
            ]
        }
    })
}
const generateQuadraticEquation = (difficulty: Difficulty): Promise<EquationData> => {
    const firstAnswer = getRandomNumber(difficulty);
    const secondAnswer = getRandomNumber(difficulty);
    const answersSum = +math.format(math.add(math.bignumber(firstAnswer), math.bignumber(secondAnswer)), { notation: 'fixed' })
    const answersProduct = +math.format(math.multiply(math.bignumber(firstAnswer), math.bignumber(secondAnswer)), { notation: 'fixed' })
    const equation = 'x²' +
        (answersSum > 0 ? `-${answersSum}` : (answersSum === 0 ? '' : `+${-answersSum}`))
        + 'x'
        + (answersProduct > 0 ? `+${answersProduct}` : (answersProduct === 0 ? '' : answersProduct))
        + '=0'
    return Promise.resolve({
        equation,
        equationAnswer: {
            "x": [
                firstAnswer,
                secondAnswer
            ]
        }
    })
}

export const generateEquation = (locationName: LocationName, difficulty: Difficulty): Promise<EquationData> => {
    switch (locationName) {
        case 'location1':
        default:
            return generateLinearEquation(difficulty)
        case 'location2':
            return generateSystemOfEquations(difficulty)
        case 'location3':
            return generateQuadraticEquation(difficulty)
    }

}