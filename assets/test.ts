import { _decorator, Component, EventKeyboard, Input, input, KeyCode, macro, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

let pos = new Vec3();

@ccclass('test')
export class test extends Component {
    // @property(Node)
    // camera: Node = null!;

    _keyUp = false;
    _keyDown = false;
    start() {
        input.on(Input.EventType.KEY_DOWN, this.keyPressDown, this);
        input.on(Input.EventType.KEY_UP, this.keyPressUp, this);
    }

    update(deltaTime: number) {
        pos.set(this.node.position);
        if(this._keyUp){
            pos.y += 10;
        }

        if(this._keyDown){
            pos.y -= 10;
        }
        this.node.setPosition(pos);
    }

    keyPressDown(event: EventKeyboard){

        if(event.keyCode === KeyCode.KEY_W){
            this._keyUp = true;

        }else if(event.keyCode === KeyCode.KEY_S){
            this._keyDown = true;
        }

    }

    keyPressUp(event: EventKeyboard){
        if(event.keyCode === KeyCode.KEY_W){
            this._keyUp = false;

        }else if(event.keyCode === KeyCode.KEY_S){
            this._keyDown = false;
        }
        // this.node.setPosition(pos);
    }
}

