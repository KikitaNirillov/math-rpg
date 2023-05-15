import React, { Suspense, useEffect, useState } from 'react'
import './App.scss'
import { connect } from 'react-redux'
import { SceneName, scenes } from './scenes'
import { AppStateType } from './redux/store'
import settings from 'settings'
import { setOpacity, setOpacityTransitionIsOver, setCurrentSceneDidMount, setSceneWithTransition } from 'redux/sceneReducer'
import LoadingScreen from 'components/main/loadingScreen'

type AppProps = StatePropsType & DispatchPropsType

const App: React.FC<AppProps> = ({ setOpacity, setSceneWithTransition, setOpacityTransitionIsOver, setCurrentSceneDidMount, ...props }) => {
  const [loadingExistedForEnoughTime, setLoadingExistedForEnoughTime] = useState<boolean>(true)
  const CurrentScene = props.currentScene ? scenes[props.currentScene] : () => { return <div /> }
  const [currentSceneName, setCurrentSceneName] = useState<SceneName | null>(props.currentScene)

  useEffect(() => {
    setSceneWithTransition('EpilepsyWarningScreen')
  }, [setSceneWithTransition])

  useEffect(() => {
    setCurrentSceneDidMount(false)
    setCurrentSceneName(props.currentScene)
  }, [props.currentScene])

  useEffect(() => { // for loading and scene changing
    if (props.downloadQuantity === 0 && props.opacityTransitionToZeroIsOver && props.opacity !== 1 && props.currentSceneDidMount) {
      // if (currentSceneName === null) {
      //   setCurrentSceneName(props.currentScene)
      // }
      // if (currentSceneName !== props.currentScene && currentSceneName !== null) {
      //   setCurrentSceneDidMount(false)
      //   setCurrentSceneName(props.currentScene)
      // }
      // else {
      if (currentSceneName === props.currentScene) {
        setOpacity(1)
        setTimeout(() => {
          setOpacityTransitionIsOver(true)
        }, settings.opacityTransitionForUnblockScreen)
      }
    }
  }, [currentSceneName, props.downloadQuantity, props.opacityTransitionToZeroIsOver, props.opacity, props.currentSceneDidMount, setOpacity, setOpacityTransitionIsOver])

  return (
    <div className='app'>
      {
        ((props.downloadQuantity !== 0 && props.opacityTransitionToZeroIsOver) || loadingExistedForEnoughTime === false) ?
          <LoadingScreen setLoadingExistedForEnoughTime={setLoadingExistedForEnoughTime} /> :
          <div className={`appWrapper ${!props.opacityTransitionIsOver || props.opacity === 0 ? `blocked` : ``}`} style={{ opacity: `${props.opacity}`, transition: `opacity ${settings.opacityTransition}ms` }}>
            <Suspense fallback={<div />}>
              <CurrentScene />
            </Suspense>
          </div >
      }
    </div>
  );
}

const mapStateToProps = (state: AppStateType) => ({
  currentScene: state.scene.currentScene,
  currentSceneDidMount: state.scene.currentSceneDidMount,
  opacity: state.scene.opacity,
  opacityTransitionIsOver: state.scene.opacityTransitionIsOver,
  opacityTransitionToZeroIsOver: state.scene.opacityTransitionToZeroIsOver,
  downloadQuantity: state.scene.downloadQuantity,
  unloadedImagesQuantity: state.scene.unloadedImagesQuantity
})
type StatePropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
  setOpacity: (opacity: number) => void
  setOpacityTransitionIsOver: (isOver: boolean) => void
  setCurrentSceneDidMount: (didMount: boolean) => void
  setSceneWithTransition: (scene: SceneName) => void
}

export default connect(mapStateToProps, { setSceneWithTransition, setOpacity, setOpacityTransitionIsOver, setCurrentSceneDidMount })(App);
