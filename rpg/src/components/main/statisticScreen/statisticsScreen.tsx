import { StatisticsScreenProps } from './statisticsScreenContainer'
import s from './statisticsScreen.module.scss'
import { useEffect, useMemo } from "react"

const StatisticsScreen: React.FC<StatisticsScreenProps> = ({ initializeGame, setCurrentSceneDidMount, ...props }) => {
    useEffect(() => {
        if (!props.currentSceneDidMount) {
            setTimeout(() => {
                setCurrentSceneDidMount(true)
            }, 0)
        }
    }, [props.currentSceneDidMount])
    const okBtn = () => initializeGame()
    const stats = useMemo(() => ({
        gameDifficulty:props.gameDifficulty,
        killedMonsters: props.stats.killedMonsters,
        defeatedMonsters: props.stats.defeatedMonsters,
        equationsQuantity: props.stats.equationsQuantity,
        correctlySolvedEquations: props.stats.correctlySolvedEquations,
        ending: props.stats.ending,
    }), [])
    return (
        <div className={s.statisticsScreen}>
            <div className={s.statisticsScreen__container}>
                <h2 className={s.statisticsScreen__container_title}>Statisctics</h2>
                <div className={s.statisticsScreen__container_stats}>
                    <p className={s.statisticsScreen__container_stats_row}>
                        Ending: {stats.ending}
                    </p>
                    <p className={s.statisticsScreen__container_stats_row}>
                        Difficulty: {stats.gameDifficulty}
                    </p>
                    <p className={s.statisticsScreen__container_stats_row}>
                        Monsters killed: {stats.killedMonsters.length}
                    </p>
                    <p className={s.statisticsScreen__container_stats_row}>
                        Monsters defeated by talking: {stats.defeatedMonsters.length}
                    </p>
                    <p className={s.statisticsScreen__container_stats_row}>
                        Total equations: {stats.equationsQuantity}
                    </p>
                    <p className={s.statisticsScreen__container_stats_row}>
                        Correctly solved equations: {stats.correctlySolvedEquations}
                    </p>
                </div>
                <button onClick={okBtn} className={s.statisticsScreen__container_btn}>
                    OK
                </button>
            </div>
        </div>
    )
}

export default StatisticsScreen