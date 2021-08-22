import {FEvent, HistoryUndo, InsertParagraph} from "./FEvent";

const insertParagraph = new InsertParagraph()
const historyUndo = new HistoryUndo()

export class QEditor {
    private readonly _node: HTMLElement
    private readonly _id: string
    private readonly _options: { [key: string]: string } = {
        "width": "700px"
        , "height": "500px"
        , "border": "solid #ccc 2px"
    }
    private readonly eventList: { [eventName: string]: FEvent } = {
        "insertParagraph": insertParagraph
        , "historyUndo": historyUndo
    }

    constructor(id: string = 'qeditor', options: { [key: string]: string } = {}) {
        console.log("初始化编辑器")
        this._node = document.getElementById(id);
        if (this._node == null) {
            throw new DOMException(id + "未找到，无法初始化编辑器")
        }
        this._id = id
        if (options != {}) {
            this._options = options
        }
        this._initialize()
    }

    private _initialize() {
        //使div变成可编辑区域
        this._node.contentEditable = String(true)
        for (let i in this._options) {
            if (this._node.style.hasOwnProperty(i)) {
                this._node.style.setProperty(i, this._options[i])
            } else {
                throw new Error("css 中没有【" + i + "】属性")
            }
        }
        //初始化填充内容
        this._node.innerHTML = "<div><br></div>"

        //监听键盘事件
        this._node.addEventListener("keydown", (event: KeyboardEvent) => this._eventKeyDownEventDispatcher(event))
        this._node.addEventListener("beforeinput", (event: InputEvent) => {
            console.log(event)
            // @ts-ignore
            console.log(event.getTargetRanges())
            event.returnValue = false
        })
        //监听输入事件
        this._node.addEventListener("input", (event: InputEvent) => {
            this._eventDispatcher(event)
            return false
        })
    }

    private _eventDispatcher(event: InputEvent) {
        //    输入事件分发
        let e = this.eventList[event.inputType]
        if (e) {
            e.todo(event)
        }
        console.log(event)
    }

    private _eventKeyDownEventDispatcher(event: KeyboardEvent) {
        //    键盘热键事件分发
        console.log(event)
        if (event.key == "z" && event.ctrlKey) {

            historyUndo.todo(event)
            console.log("撤销事件冒泡阻止")
            event.returnValue = false
        }
    }

}