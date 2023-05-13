import { _decorator, Component, EventKeyboard, Input, input, KeyCode, macro, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

let pos = new Vec3();

@ccclass('test')
export class test extends Component {
    @property(Node)
    camera: Node = null!;
    start() {
        input.on(Input.EventType.KEY_PRESSING, this.keyPress, this);
    }

    update(deltaTime: number) {

    }

    keyPress(event: EventKeyboard){
        pos.set(this.node.position);
        if(event.keyCode === KeyCode.KEY_W){

            pos.y += 10;

        }else if(event.keyCode === KeyCode.KEY_S){
            pos.y -= 10;
        }
        this.camera.setPosition(pos);
    }
}

