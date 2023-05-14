import { _decorator, Component, Node, Vec3, Animation, AnimationState } from 'cc';
const { ccclass, property } = _decorator;

enum State {
    IDLE = 0,
    RUN = 1,
    JUMP = 2,
}

@ccclass('Player')
export class Player extends Component {

    _moveDelta: number = 0;

    _jumping: boolean = false;
    _state: State = State.IDLE;
    setState(state: State) {
        if (this._jumping) {
            return;
        }
        if (this._state === state) {
            return;
        }
        switch (state) {
            case State.RUN: {
                const animComp = this.node.getComponent(Animation) as Animation;
                animComp.play('run');
                break;
            }
            case State.IDLE: {
                const animComp = this.node.getComponent(Animation) as Animation;
                animComp.play('idle');
                break;
            }
            case State.JUMP: {
                this._jumping = true;
                const animComp = this.node.getComponent(Animation) as Animation;
                animComp.play('jumpFromGround');
                debugger;
                // 触碰地板后停止，要加函数钩子，可能要物理系统之类的配合
                setTimeout(() => {
                    debugger
                    this._jumping = false;
                    this.setState(State.IDLE);                    
                }, 1000);
                // animComp.once('finished', () => {
                //     this._jumping = false;
                //     this.setState(State.IDLE);
                // });
                break;
            }
        }
        this._state = state;
        
    }

    start() {

    }

    update(deltaTime: number) {
        this.node.position = new Vec3(
            this.node.position.x + this._moveDelta,
            this.node.position.y,
            this.node.position.z,
        );
    }

    moveLeft(delta: number) {
        this._moveDelta = -delta / 100;
        this.node.scale = new Vec3(-1, 1, 1);
        this.setState(State.RUN);
    }

    moveRight(delta: number) {
        this._moveDelta = delta / 100;
        this.node.scale = new Vec3(1, 1, 1);
        this.setState(State.RUN);
    }

    moveUp(delta: number) {
        if (delta < 40 || this._jumping) {
            return;
        }
        this.setState(State.JUMP);
    }

    moveDown(delta: number) {

    }

    stop() {
        this._moveDelta = 0;
        this.setState(State.IDLE);
    }
}

