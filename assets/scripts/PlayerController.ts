import { EventTouch, Touch, Vec2, Vec3, Sprite, UITransform } from 'cc';
import { _decorator, Component, Input, input, Node } from 'cc';
const { ccclass, property } = _decorator;

let pos = new Vec3();
const _tempPos = new Vec3();
const _tempDelta = new Vec2()

const TOUCH_RADIUS = 400;
const Horizontal = new Vec2(1, 0);
const MOVE_DELTA = 0.2;
const ROLE_MOVE_FRAME = 2;
@ccclass('PlayerController')
export class PlayerController extends Component {

    @property({
        type: Sprite,
    })
    point: Sprite;

    private _isTouch = false;
    private _touchPos = new Vec2();
    private _startPos = new Vec2();
    private _movePos = new Vec2();
    private _originPos = new Vec3();
    @property(Node)
    public player: Node = null!
    start() {
        this._originPos.set(this.node.position);
        input.on(Input.EventType.TOUCH_START, this.touchStart, this);
        input.on(Input.EventType.TOUCH_MOVE, this.touchMove, this);
        input.on(Input.EventType.TOUCH_END, this.touchEnd, this);
    }

    onDestroy() {
        input.off(Input.EventType.TOUCH_START, this.touchStart, this);
        input.off(Input.EventType.TOUCH_MOVE, this.touchMove, this);
        input.off(Input.EventType.TOUCH_END, this.touchEnd, this);
    }

    update(deltaTime: number) {
        if(!this._isTouch){
            return;
        }

        _tempPos.set(0, 0, ROLE_MOVE_FRAME);
        this.player.translate(_tempPos);
    }

    updatePointPosition(uiPos: Vec2) {
        const compTransform = this.node.getComponent('cc.UITransform') as UITransform;
        const pos = compTransform.convertToNodeSpaceAR(new Vec3(uiPos.x, uiPos.y));
        this.point.node.setPosition(pos);

        const comp = this.player.getComponent('Player') as any;
        if (pos.y < 0) {
            comp.moveDown && comp.moveDown(Math.abs(pos.y));
        } else if (pos.y > 0) {
            comp.moveUp && comp.moveUp(pos.y);
        }
        if (pos.x < 0) {
            comp.moveLeft && comp.moveLeft(Math.abs(pos.x));
        } else if (pos.x > 0) {
            comp.moveRight && comp.moveRight(pos.x);
        }
    }

    touchStart(event: EventTouch){
        const uiPos = event.getUILocation();
        this.updatePointPosition(uiPos);

        // event.getUILocation(this._startPos);
        // const distance = this._startPos.length();
        // if (distance < TOUCH_RADIUS) {
        //     this._touchPos.set(this._startPos);
        //     this._movePos.set(this._startPos);
        //     _tempPos.set(this.node.position);
        //     this.node.setWorldPosition(this._startPos.x, this._startPos.y, _tempPos.z);
        //     this._isTouch = true;
        // }
    }

    touchMove(event: EventTouch){
        const uiPos = event.getUILocation();
        this.updatePointPosition(uiPos);
        // if(!this._isTouch){
        //     return;
        // }

        // event.touch.getUILocation(this._movePos);
        // Vec2.subtract(_tempDelta, this._movePos, this._touchPos);

        // // 重新规划移动方向值
        // _tempDelta.multiply2f(MOVE_DELTA, MOVE_DELTA);
        // Vec2.add(this._movePos, this._startPos, _tempDelta);
        // const distance = this._movePos.length();

        // // 是否超出限制半径
        // if(distance > TOUCH_RADIUS){
        //     const radian = this._movePos.angle(Horizontal);
        //     const x = Math.cos(radian) * TOUCH_RADIUS;
        //     const y = Math.sin(radian) * TOUCH_RADIUS;
        //     this._movePos.set(x, y);
        // }

        // this.node.setWorldPosition(this._movePos.x, this._movePos.y, 0);
        // this._touchPos.set(this._movePos);
    }

    touchEnd(event: EventTouch){
        // this._isTouch = false;
        // this.node.setPosition(this._originPos);
        this.point.node.setPosition(new Vec3(0, 0));
        const comp = this.player.getComponent('Player') as any;
        comp.stop && comp.stop();
    }


}


