class QEOptions {
    width: string = "200px"
    height: string = "500px"
    id: string = "qeditor"
    border: string = "2px solid #c2c2c2"
}

class QEditor {
    private readonly _node: HTMLElement
    private readonly _id: string
    private readonly _options: QEOptions

    constructor(id: string = 'qeditor', options: QEOptions = null) {
        console.log("初始化编辑器")
        this._node = document.getElementById(id);
        if (this._node == null) {
            throw new DOMException(id + "不存在，无法初始化编辑器")
        }
        this._id = id
        this._options = options
        this._initializeView()
    }

    private _initializeView() {
        this._node.setAttribute("contenteditable", "true")
        for (let i in this._options) {
            if (this._options.hasOwnProperty(i)) {
                if (this._node.style.hasOwnProperty(i)) {
                    this._node.style.setProperty(i, this._options[i])
                }
            } else {
                throw new Error("css 中没有【" + i + "】属性")
            }
        }
    }
}