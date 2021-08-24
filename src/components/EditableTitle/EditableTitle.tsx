import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

type EditableTitleTypes = {
    title: string
    taskId?: string
    toDoListId: string
    changeToDoListTitleCallback?: (title: string, toDoListId: string) => void
    changeTaskTitleCallback?: (taskId: string, title: string, toDoListId: string) => void
}

export const EditableTitle: React.FC<EditableTitleTypes> = (
    {
        title, toDoListId, taskId,
        changeToDoListTitleCallback, changeTaskTitleCallback,
    }) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [localTitle, setLocalTitle] = useState<string>(title)

    const activateEditMode = () => setEditMode(true)
    const activateViewMode = () => {
        changeToDoListTitleCallback && changeToDoListTitleCallback(localTitle, toDoListId)
        changeTaskTitleCallback && taskId && changeTaskTitleCallback(taskId, localTitle, toDoListId)
        setEditMode(false)
    }
    const changeLocalTitle = (event: ChangeEvent<HTMLInputElement>) =>
        setLocalTitle(event.currentTarget.value)

    const onKeyPressActivateViewMode = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') activateViewMode()
    }

    return editMode
        ? <input
            value={ localTitle }
            autoFocus={ true }
            onChange={ changeLocalTitle }
            onKeyPress={ onKeyPressActivateViewMode }
            onBlur={ activateViewMode }
        />
        : <span
            onDoubleClick={ activateEditMode }
        >{ localTitle }</span>
}