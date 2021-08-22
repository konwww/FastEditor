import {FOStack} from "./FOStack";
import {FParagraph, FVNode} from "./Segment";

interface FEventData {
    target: HTMLElement | Node
    before: FVNode
    after: FVNode
}

export interface FEvent {
    eventData: FEventData

    todo(event: Event): boolean

    redo(): boolean

    undo(): boolean
}

abstract class FInputEvent implements FEvent {
    public abstract redo(): boolean

    public abstract todo(event: Event): boolean

    public abstract undo(): boolean

    eventData: FEventData = new class implements FEventData {
        after: FVNode;
        before: FVNode;
        target: HTMLElement | Node;
    };
}

export class InsertParagraph extends FInputEvent {

    redo(): boolean {
        return false;
    }

    todo(event: Event): boolean {
        let e = <InputEvent>event
        let s = window.getSelection()
        const newFParagraph = FParagraph.createInstance(<HTMLElement>s.anchorNode)
        newFParagraph.render()
        FParagraph.paragraphs[newFParagraph.id] = newFParagraph
        this.eventData.target = newFParagraph.currNode
        this.eventData.after = newFParagraph
        this.eventData.before = null
        //写入操作栈
        let stack = FOStack.getInstance()
        stack.push(this)
        return true;
    }

    undo(): boolean {
        //移除新添加的段落
        console.log(this.eventData.target.parentNode)
        document.getElementById("qe").removeChild(this.eventData.target)
        return false;
    }

}

export class HistoryUndo extends FInputEvent {
    redo(): boolean {
        return false;
    }

    todo(event: Event): boolean {
        const stack = FOStack.getInstance()
        const e = stack.pop()
        if (e) {
            e.undo()
        }
        console.log("撤回事件", e)
        return false;
    }

    undo(): boolean {
        return false;
    }

}