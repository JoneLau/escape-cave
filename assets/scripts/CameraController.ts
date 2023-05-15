import { _decorator, Component, Node, tween, UITransform, utils, Vec3 } from 'cc';
import { clientEvent } from './framework/clientEvent';
import { constant, GAMESTATE } from './framework/constant';
import { audioManager } from './framework/audioManager';
const { ccclass, property } = _decorator;

const pos = new Vec3();

@ccclass('CameraController')
export class CameraController extends Component {
    private _startPos = new Vec3();
    private _endPos = new Vec3();
    private _targetPos = new Vec3();
    start() {
        this._startPos.set(0, 0, 1000);
    }

    update(deltaTime: number) {
        if(constant.gameState !== GAMESTATE.GAMING){
            return;
        }
        // 判断当前游戏为开始状态开始移动相机
        pos.set(this.node.position);
        if(Math.abs(pos.y - this._endPos.y) <= 10){
            constant.gameState = GAMESTATE.END;
            audioManager.instance.changeBG('success');
            // tween(pos).by(2.0, new Vec3(0, this._targetPos.y - pos.y, 0),    // 这里以node的位置信息坐标缓动的目标
            //     {                                                               // ITweenOption 的接口实现：
            //         onUpdate: (target: Vec3, ratio: number) => {                       // onUpdate 接受当前缓动的进度
            //             this.node.setPosition(target);                                // 将缓动系统计算出的结果赋予 node 的位置
            //         }
            //     }).start();
            this.scheduleOnce(()=>{
                this.node.setPosition(0, 5177, 1000);
            }, 0.3);
            return;
        }

        pos.y += constant.moveStep;
        this.node.setPosition(pos);
    }

    init(endPos: Vec3, targetPos: Vec3){
        this._endPos = endPos;
        this._targetPos = targetPos;
    }

    reset(){
        this.node.setPosition(this._startPos);
    }
}

