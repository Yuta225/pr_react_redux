import { createSlice, PayloadAction } from '@reduxjs/toolkit'//State, Reducer, Action　を一気に作成可能
import { Task } from '../Types'

type State = {
    count: number
    tasks: Task[]
}

const initialState: State = {
    count: 2,
    tasks: [
        {
            id: 2,
            title: '次のTodo',
            done: false
        },{
            id: 1,
            title: '最初のTodo',
            done: true
        }
    ]
}

const tasksModule = createSlice({
    name: 'tasks',//createSliceの識別するための名前
    initialState,//ステートの初期状態
    reducers: {//ステート変更のためのコード記述
        addTask (state: State, action: PayloadAction<string>) {//実際の値はaction.payload
            state.count++

            const newTask: Task = {
                id: state.count,
                title: action.payload,
                done: false
            }
    
            state.tasks = [newTask, ...state.tasks]
        },
        doneTask (state: State, action: PayloadAction<Task>) {
            const task = state.tasks.find(t => t.id === action.payload.id)
            if (task) {
                task.done = !task.done
            }
        },
        deleteTask (state: State, action: PayloadAction<Task>) {
            state.tasks = state.tasks.filter(t =>
                t.id !== action.payload.id
            )
        }
    }
})

export const {
    addTask, doneTask, deleteTask
} = tasksModule.actions

export default tasksModule