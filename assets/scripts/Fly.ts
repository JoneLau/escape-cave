import { _decorator, Component, math, Vec3 } from 'cc';
import { constant, ROAD_DIRECTION } from './framework/constant';
const { ccclass, property } = _decorator;

const randomSigh = [-1, 1];

@ccclass('Fly')
export class Fly extends Component {
    // private _originPos = new Vec3();
    private _delta = new Vec3();
    private _flyRange = 0;
    private _originSign = -1;
    private _direction = ROAD_DIRECTION.HORIZONTAL;
    init(flyRange: number, direction: ROAD_DIRECTION) {
        // this._originPos.set(originPos);
        this._flyRange = flyRange;
        this._direction = direction;
        const rangeNum = math.randomRangeInt(0, 1);
        this._originSign = randomSigh[rangeNum];
        // const flyNode = this.node.getChildByName('fly');
        this.node.setPosition(0, 0, 0);
        // flyNode.setWorldRotationFromEuler(0, 0, 0);
    }

    start(){

    }

    update(deltaTime: number) {
        const pos = this.node.position;;

        this._delta.set(pos.x, pos.y);

        if (this._direction === ROAD_DIRECTION.VERTICAL) {
            this._delta.y += this._originSign;
            if (Math.abs(this._delta.y) > this._flyRange) {
                this._originSign = -Math.sign(this._originSign);
                this._delta.y += 2 * this._originSign * constant.MonsterMoveSpeed;
            }
        } else {
            this._delta.x += this._originSign;
            if (Math.abs(this._delta.x) > this._flyRange) {
                this._originSign = -Math.sign(this._originSign);
                this._delta.x += 2 * this._originSign * constant.MonsterMoveSpeed;
            }
        }


        this.node.setPosition(this._delta.x, this._delta.y);
    }

    // onEndContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    //     // 只在两个碰撞体结束接触时被调用一次
    //     console.log('onEndContact');
    // }
}

