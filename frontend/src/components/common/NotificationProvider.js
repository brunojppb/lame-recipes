import React, { useState, createContext, useCallback, useContext } from 'react'
import { animated, useTransition } from 'react-spring'

const NotificationContext = createContext(null)

const DURATION = 4000
let id = 0

export const NotificationProvider = ({ children }) => {
  const config = { tension: 125, friction: 20, precision: 0.1 }
  const [messageQueue, setMessageQueue] = useState([])
  const transitions = useTransition(messageQueue, (item) => item.id, {
    from: { opacity: 0, progress: '100%', transform: 'translateX(100%)' },
    enter: (item) => async (next) => {
      await next({ opacity: 1, transform: 'translateX(0)' })
    },
    leave: (item) => async (next, cancel) => {
      await next({ progress: '0%' })
      await next({ opacity: 0 })
      await next({ transform: 'translateX(100%)' })
    },
    onRest: (item) =>
      setMessageQueue((queue) => queue.filter((i) => i.id !== item.id)),
    config: (item, animationState) => {
      switch (animationState) {
        case 'leave':
          // Duration only for opacity animation
          return [{ duration: DURATION }, config, config]
        default:
          // default configuration on enter
          return config
      }
    },
  })

  const showError = useCallback((msg) => {
    setMessageQueue((queue) => [...queue, { id: id++, text: msg, isError: true }])
  }, [])

  const showSuccess = useCallback((msg) => {
    setMessageQueue((queue) => [...queue, { id: id++, text: msg, isError: false }])
  }, [])

  return (
    <NotificationContext.Provider value={{ showSuccess, showError }}>
      {children}
      <div className="notification-sheet">
        {transitions.map(({ key, item, props: { progress, ...style } }) => {
          return (
            <NotificationItem
              key={key}
              progress={progress}
              springStyle={style}
              message={item.text}
              isError={item.isError}
            />
          )
        })}
      </div>
    </NotificationContext.Provider>
  )
}

const NotificationItem = ({ progress, springStyle, message, isError }) => {
  const isErrorClass = isError ? 'is-error' : ''
  return (
    <animated.div
      style={springStyle}
      className={`notification-sheet-item ${isErrorClass}`}
    >
      <div className="message">{message}</div>
      <animated.div style={{ right: progress }} className="progress" />
    </animated.div>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === null) {
    throw new Error(
      'useNotification must be used within NotificationProvider.' +
      '\n' +
      'Make sure to put <NotificationProvider> on top of you component tree'
    )
  }
  return context
}