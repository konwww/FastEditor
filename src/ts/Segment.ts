export class FVNode {
    public readonly id: string
    public readonly style: { [key: string]: string } = {}
    public readonly children: Array<FVNode> = []
    public readonly tagName: string
    public currNode: HTMLElement

    constructor(id: string, tagName: string, style: { [key: string]: string } = {}) {
        this.id = id;
        this.style = style;
    }

    render(): Node | HTMLElement {
        this.currNode = document.createElement(this.tagName)
        for (let i of this.children) {
            let e = i.render()
            this.currNode.appendChild(e)
        }
        return this.currNode
    }

    public compareTo(vNode: FVNode): true | FVNode {
        return true
    }


}

class TextFVNode extends FVNode {
    content: string

    constructor() {
        super("text", "text");
    }

    render(): Node {
        return document.createTextNode(this.content);
    }
}

export class FRoot {
    children: Array<FParagraph>
    private paragraphs: { [id: string]: FParagraph } = {}

    public add(id: string, paragraph: FParagraph, force: boolean = false): boolean {
        //force=true时强制覆盖已有记录
        if (force || !this.paragraphs[id]) {
            this.paragraphs[id] = paragraph
            return true
        }
        return false
    }

    // false表示二层叶子节点发生改变,true表示没有节点发生改变,FVNode表示某一个三层叶子节点发生改变
    //二层叶子节点发生改变时,全局重构,三层叶子改变时,重构段落或三层叶子
    public compareTo(rootNode: FRoot): boolean | FVNode {
        for (let i of this.children) {
            if (rootNode.paragraphs[i.id]) {
                return i.compareTo(rootNode.paragraphs[i.id])
            }
        }
        return true
    }
}

export class FParagraph extends FVNode {
    static paragraphs: { [id: string]: FParagraph } = {}
    static index: number = 0

    private constructor(id: string, curr: HTMLElement) {
        super(id, "div");
        this.currNode = curr
    }

    public static createInstance(node: HTMLElement): FParagraph {
        return new FParagraph((FParagraph.index++).toString(), node)
    }

    public render(): Node | HTMLElement {
        this.currNode.setAttribute("id", this.id)
        for (let i of this.children) {
            this.currNode.appendChild(i.render())
        }
        return this.currNode
    }

    public compareTo(paragraph: FParagraph): true | FVNode {
        for (let i of this.children) {

        }
        return true
    }
}