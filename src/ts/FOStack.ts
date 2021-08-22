import {FEvent} from "./FEvent";

//单例模式的操作栈
export class FOStack {
    private events: Array<FEvent> = []
    private index: number = 0

    private static instance: FOStack = undefined

    private constructor() {
    }

    public static getInstance() {
        if (FOStack.instance == undefined) {
            FOStack.instance = new FOStack()
        }
        return FOStack.instance
    }

    public pop(): false | FEvent {

        if (this.index - 1 < 0) {
            return false
        }
        console.log("事件出栈", this.events)
        let e = this.events[this.index]
        delete this.events[this.index]
        this.index--
        return e
    }

    public push(event: FEvent): void {
        this.events[this.index++] = event
        console.log("事件入栈", this.events)
    }
}