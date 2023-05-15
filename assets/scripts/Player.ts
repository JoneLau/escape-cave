import { _decorator, Component, Node, Vec3, Animation, AnimationState, Collider2D, Contact2DType, IPhysics2DContact, input, Input, EventKeyboard, KeyCode } from 'cc';
import { COLLIDERTYPE, GAMESTATE, constant } from './framework/constant';
import { clientEvent } from './framework/clientEvent';
const { ccclass, property } = _decorator;

enum State {
    IDLE = 0,
    RUN = 1,
    JUMP = 2,
}

const pos = new Vec3();

@ccclass('Player')
export class Player extends Component {

    // _moveDelta: number = 0;

    // _jumping: boolean = false;
    // _state: State = State.IDLE;
    // setState(state: State) {
    //     if (this._jumping) {
    //         return;
    //     }
    //     if (this._state === state) {
    //         return;
    //     }
    //     switch (state) {
    //         case State.RUN: {
    //             const animComp = this.node.getComponent(Animation) as Animation;
    //             animComp.play('run');
    //             break;
    //         }
    //         case State.IDLE: {
    //             const animComp = this.node.getComponent(Animation) as Animation;
    //             animComp.play('idle');
    //             break;
    //         }
    //         case State.JUMP: {
    //             this._jumping = true;
    //             const animComp = this.node.getComponent(Animation) as Animation;
    //             animComp.play('jumpFromGround');
    //             debugger;
    //             // 触碰地板后停止，要加函数钩子，可能要物理系统之类的配合
    //             setTimeout(() => {
    //                 debugger
    //                 this._jumping = false;
    //                 this.setState(State.IDLE);
    //             }, 1000);
    //             // animComp.once('finished', () => {
    //             //     this._jumping = false;
    //             //     this.setState(State.IDLE);
    //             // });
    //             break;
    //         }
    //     }
    //     this._state = state;

    // }

    private _anim: Animation = null;
    start() {
        // clientEvent.on('game-start', this.gameStart, this);
        // clientEvent.on('game-start', this.gameOver, this);
        input.on(Input.EventType.KEY_DOWN, this.keyP, this);
        input.on(Input.EventType.KEY_UP, this.keyUP, this);
        clientEvent.on(GAMESTATE.START, this.gameStart, this);
        clientEvent.on(GAMESTATE.GAMING, this.startGaming, this);
        this._anim = this.getComponent(Animation);
    }

    // update(deltaTime: number) {
    //     // this.node.position = new Vec3(
    //     //     this.node.position.x + this._moveDelta,
    //     //     this.node.position.y,
    //     //     this.node.position.z,
    //     // );
    // }

    // moveLeft(delta: number) {
    //     this._moveDelta = -delta / 100;
    //     this.node.scale = new Vec3(-1, 1, 1);
    //     this.setState(State.RUN);
    // }

    // moveRight(delta: number) {
    //     this._moveDelta = delta / 100;
    //     this.node.scale = new Vec3(1, 1, 1);
    //     this.setState(State.RUN);
    // }

    // moveUp(delta: number) {
    //     if (delta < 40 || this._jumping) {
    //         return;
    //     }
    //     this.setState(State.JUMP);
    // }

    // moveDown(delta: number) {

    // }

    // stop() {
    //     this._moveDelta = 0;
    //     this.setState(State.IDLE);
    // }


    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        console.log('onBeginContact');
        if(otherCollider.group === 1 << COLLIDERTYPE.BULLET){
            console.log(' reduce  blood');
            clientEvent.dispatchEvent('blood');
            this._anim.play('hurt');
            this._anim.on(Animation.EventType.FINISHED,()=>{
                this._anim.play('run');
                this._anim.off(Animation.EventType.FINISHED);
            });
        }
    }

    protected onEnable(): void {
        //
        this.gameStart();


    }

    private _pos = new Vec3();
    private _left = false;
    private _right = false;
    protected update(dt: number): void {
        if(constant.gameState !== GAMESTATE.GAMING){
            return;
        }

        this._pos.y += constant.moveStep;

        if(this._left){
            this._pos.x -= constant.moveStep;
            console.log('move left');
        }

        if(this._right){
            this._pos.x += constant.moveStep;
            console.log('move right');
        }

        constant.player.setPosition(this._pos);
    }

    keyP(event: EventKeyboard){
        // pos.set(this.node.position);
        // if (event.keyCode === KeyCode.KEY_W) {
        //     pos.y+=10;
        // } else if (event.keyCode === KeyCode.KEY_S ) {
        //     pos.y-=10;
        // } else
        if (event.keyCode === KeyCode.KEY_A) {
            // pos.x-=10;
            this._left = true;
        } else if (event.keyCode === KeyCode.KEY_D) {
            // pos.x+=10;
            this._right = true;
        }
        // this.node.setPosition(pos);
    }

    keyUP(event: EventKeyboard){
        if (event.keyCode === KeyCode.KEY_A) {
            // pos.x-=10;
            this._left = false;
        } else if (event.keyCode === KeyCode.KEY_D) {
            // pos.x+=10;
            this._right = false;
        }
    }

    gameStart(){
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    gameOver(){
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    startGaming(){
        this._anim.play('run');
    }
}

