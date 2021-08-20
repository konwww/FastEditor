interface InputEvent {
    todo(): void

    redo(): void

    undo(): void
}

export class QEditor {
    private readonly _node: HTMLElement
    private readonly _id: string
    private readonly _options: { [key: string]: string } = {
        "width": "700px"
        , "height": "500px"
        , "border": "solid #ccc 2px"
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
        this._node.innerHTML = "<div><br></div>"
        //监听输入事件
        this._node.addEventListener("input", (event: Event) => this._eventDispatcher(event))
        //监听键盘事件
        this._node.addEventListener("keydown", (event: Event) => this._eventKeyDownEventDispatcher(event))
    }

    private _eventDispatcher(event: Event) {
        //    输入事件分发
        console.log(event)
    }

    private _eventKeyDownEventDispatcher(event: Event) {
        //    键盘热键事件分发
        console.log(event)
    }

}