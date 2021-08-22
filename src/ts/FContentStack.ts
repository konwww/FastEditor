//单例模式的操作栈
import {FParagraph, FVNode} from "./Segment";

export class FContentStack {
    private fParagraphs: Array<FParagraph> = []
    private index: number = 0

    private static instance: FContentStack = undefined

    private constructor() {
    }

    public static getInstance() {
        if (FContentStack.instance == undefined) {
            FContentStack.instance = new FContentStack()
        }
        return FContentStack.instance
    }

    public pop(): false | FParagraph {

        if (this.index - 1 < 0) {
            return false
        }
        console.log("内容历史出栈", this.fParagraphs)
        let e = this.fParagraphs[this.index]
        delete this.fParagraphs[this.index]
        this.index--
        return e
    }

    public push(paragraph: FParagraph): void {
        this.fParagraphs[this.index++] = paragraph
        console.log("内容历史入栈", this.fParagraphs)
    }
}