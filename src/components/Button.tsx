import React from 'react'

type ButtonPropTypes = {
    itemId: string
    deleteTaskCallback: (id: string) => void
}

export const Button: React.FC<ButtonPropTypes> = React.memo(({ itemId, deleteTaskCallback }) => {
    const removeHandler = () => deleteTaskCallback(itemId)
    return <button onClick={ removeHandler }>x</button>
})