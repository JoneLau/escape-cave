import { _decorator, Component, Node, UITransform, utils, Vec3 } from 'cc';
import { clientEvent } from './framework/clientEvent';
import { constant, GAMESTATE } from './framework/constant';
const { ccclass, property } = _decorator;

const pos = new Vec3();

@ccclass('CameraController')
export class CameraController extends Component {
    private _startPos = new Vec3();
    private _endPos = new Vec3();
    start() {
        this._startPos.set(0, 0, 1000);
    }

    update(deltaTime: number) {
        // if(constant.gameState !== GAMESTATE.GAMING){
        //     return;
        // }
        // 判断当前游戏为开始状态开始移动相机
        pos.set(this.node.position);
        if(Math.abs(pos.y - this._endPos.y) <= 10){
            return;
        }

        pos.y += constant.moveStep;
        this.node.setPosition(pos);
    }

    init(endPos: Vec3){
        this._endPos = endPos;
    }

    reset(){
        this.node.setPosition(this._startPos);
    }
}

