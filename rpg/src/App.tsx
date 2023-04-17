import React, { Suspense, useEffect, useState } from 'react'
import './App.scss'
import { connect } from 'react-redux'
import { scenes } from './scenes'
import { AppStateType } from './redux/store'
import { opacityTransition, opacityTransitionForUnblockScreen } from './settings'
import { initializeGame } from '@redux/gameReducer'
import { setOpacity, setOpacityTransitionIsOver, setCurrentSceneDidMount } from 'redux/sceneReducer'
import LoadingScreen from 'components/loadingScreen'

type AppProps = StatePropsType & DispatchPropsType

const App: React.FC<AppProps> = ({ initializeGame, setOpacity, setOpacityTransitionIsOver, setCurrentSceneDidMount, ...props }) => {
  const [loadingExistedForEnoughTime, setLoadingExistedForEnoughTime] = useState<boolean>(true)
  const CurrentScene = props.currentScene ? scenes[props.currentScene] : null

  useEffect(() => {
    initializeGame();
  }, [initializeGame])

  useEffect(() => { // for loading and scene changing
    if (props.downloadQuantity === 0 && props.opacityTransitionToZeroIsOver && props.opacity !== 1 && props.currentSceneDidMount && props.unloadedImagesQuantity === 0 &&  props.currentSceneDidMount) {
      setOpacity(1)
      setTimeout(() => {
        setOpacityTransitionIsOver(true)
      }, opacityTransitionForUnblockScreen)
    }
  }, [props.unloadedImagesQuantity, props.downloadQuantity, props.opacityTransitionToZeroIsOver, props.opacity, props.currentSceneDidMount, setOpacity, setOpacityTransitionIsOver])

  return (
    (CurrentScene === null || (props.downloadQuantity !== 0 && props.opacityTransitionToZeroIsOver) || loadingExistedForEnoughTime === false) ?
      <LoadingScreen setLoadingExistedForEnoughTime={setLoadingExistedForEnoughTime} /> :
      <div className={`appWrapper ${!props.opacityTransitionIsOver || props.opacity === 0 ? `blocked` : ``}`} style={{ opacity: `${props.opacity}`, transition: `opacity ${opacityTransition}ms` }}>
        <Suspense fallback={<div></div>}>
          <CurrentScene />
        </Suspense>
      </div >
  );
}

const mapStateToProps = (state: AppStateType) => ({
  currentScene: state.scene.currentScene,
  currentSceneDidMount: state.scene.currentSceneDidMount,
  opacity: state.scene.opacity,
  opacityTransitionIsOver: state.scene.opacityTransitionIsOver,
  opacityTransitionToZeroIsOver: state.scene.opacityTransitionToZeroIsOver,
  downloadQuantity: state.scene.downloadQuantity,
  unloadedImagesQuantity: state.scene.unloadedImagesQuantity,
})
type StatePropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
  initializeGame: () => void
  setOpacity: (opacity: number) => void
  setOpacityTransitionIsOver: (isOver: boolean) => void
  setCurrentSceneDidMount: (didMount: boolean) => void
}

export default connect(mapStateToProps, { initializeGame, setOpacity, setOpacityTransitionIsOver, setCurrentSceneDidMount })(App);
