class FVNode {
    id: string
    style: { [key: string]: string }
    child: Array<FVNode>
    tagName: string

    constructor(id: string, tagName: string, style: { [key: string]: string } = {}) {
        this.id = id;
        this.style = style;
    }

    render(): HTMLElement {
        let node = document.createElement(this.tagName)

        return node
    }

}

class TextFVNode extends FVNode {
    content: string

    constructor() {
        super("text");
    }
}

class FSelection {

}

class FSegment {

}