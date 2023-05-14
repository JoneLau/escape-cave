import { _decorator, Animation, Component, Node } from 'cc';
import { poolManager } from './framework/poolManager';
const { ccclass, property } = _decorator;

@ccclass('boom')
export class boom extends Component {
    private _anim: Animation = null;

    protected onEnable(): void {
        this._anim = this.getComponent(Animation);
        this._anim.on(Animation.EventType.FINISHED, this.finished, this);
        this._anim.play('bullet');
    }

    onDisable() {
        this._anim.off(Animation.EventType.FINISHED, this.finished, this);
    }

    finished(){
        this.node.removeFromParent();
        poolManager.instance.putNode(this.node);

    }

    update(deltaTime: number) {

    }
}

