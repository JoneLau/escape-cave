import { _decorator, Animation, Component, Node } from 'cc';
import { poolManager } from './framework/poolManager';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    onEnable() {
        const anim = this.getComponent(Animation);
        anim.on(Animation.EventType.FINISHED, this.finished, this);
    }

    protected onDisable(): void {
        const anim = this.getComponent(Animation);
        anim.off(Animation.EventType.FINISHED, this.finished, this);
    }

    finished(){
        this.node.removeFromParent();
        poolManager.instance.putNode(this.node);

    }

    update(deltaTime: number) {

    }
}

