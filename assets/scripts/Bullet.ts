import { _decorator, Animation, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, Prefab, Vec3 } from 'cc';
import { poolManager } from './framework/poolManager';
import { constant } from './framework/constant';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    private _pos = new Vec3();
    // pr

    @property(Prefab)
    boom: Prefab = null;
    onEnable() {

        this.node.setPosition(Vec3.ZERO);

        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onDisable() {

        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }



    update(deltaTime: number) {
        this._pos = this.node.position;
        this._pos.x -= constant.bulletMoveSpeed;
        this.node.setPosition(this._pos);
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        console.log('onBeginContact');
        const boom = poolManager.instance.getNode(this.boom, this.node.parent);
        boom.setPosition(this.node.position);
        poolManager.instance.putNode(this.node);
    }
}

