import { _decorator, Collider, Collider2D, Component, Contact2DType, IPhysics2DContact, math, Node, Vec3 } from 'cc';
import { COLLIDERTYPE, constant } from './framework/constant';
import { eventListener } from './framework/eventListener';
import { clientEvent } from './framework/clientEvent';
const { ccclass, property } = _decorator;

const randomSigh = [-1, 1];

@ccclass('Fly')
export class Fly extends Component {
    private _originPos = new Vec3();
    private _delta = new Vec3();
    private _flyRange = 0;
    private _originSign = -1;
    init(flyRange: number, originPos: Vec3) {
        this._originPos.set(originPos);
        this._flyRange = flyRange;
        const rangeNum = math.randomRangeInt(0, 1);
        this._originSign = randomSigh[rangeNum];
        const flyNode = this.node.getChildByName('fly');
        this.node.setPosition(0, 0, 0);
        flyNode.setWorldRotationFromEuler(0, 0, 0);
    }

    start(){
        const collider = this.getComponent(Collider2D);
        // collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        // collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
    }

    update(deltaTime: number) {
        const pos = this.node.position;

        this._delta.set(pos.x, pos.y);
        this._delta.x += this._originSign;
        if (Math.abs(this._delta.x - this._originPos.x) > this._flyRange) {
            this._originSign = -Math.sign(this._originSign);
            this._delta.x += 2 * this._originSign * constant.MonsterMoveSpeed;
        }

        this.node.setPosition(this._delta.x, this._delta.y);
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        console.log('onBeginContact');
        if(otherCollider.group === COLLIDERTYPE.PLAYER){
            // 派发掉血事件
        }
    }
    // onEndContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    //     // 只在两个碰撞体结束接触时被调用一次
    //     console.log('onEndContact');
    // }
}

