import { EventTouch, Touch, Vec2, Vec3, v2, Collider2D, Contact2DType, IPhysics2DContact, NodeEventType } from 'cc';
import { _decorator, Component, Input, input, Node, UITransform, view, Camera, find } from 'cc';
import { GAMESTATE, constant } from './framework/constant';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

    @property(Node)
    left: Node = null;
    @property(Node)
    right: Node = null;

    private _pos = new Vec3();
    private _left = false;
    private _right = false;

    protected start(): void {
        // this.left.on(NodeEventType.TOUCH_START, this._touchLeft, this);
        // this.left.on(NodeEventType.TOUCH_END, this._leaveLeft, this);
        // this.right.on(NodeEventType.TOUCH_START, this._touchRight, this);
        // this.right.on(NodeEventType.TOUCH_END, this._leaveRight, this);
        // input.on(Input.EventType.KEY_DOWN, this.keydown, this)

        const player = constant.player;
        this._pos.set(player.position);
    }

    private _touchLeft(){
        this._left = true;
    }

    private _leaveLeft(){
        this._left = false;
    }

    private _touchRight(){
        this._right = true;
    }

    private _leaveRight(){
        this._right = false;
    }

    protected update(dt: number): void {
        // if(constant.gameState !== GAMESTATE.GAMING){
        //     return;
        // }

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

    // private _sceneWidth = 1280;
    // private _playerWidth = 68;
    // private _isTouch = false;
    // private _startPos = new Vec2();
    // private _camera: Camera = null;;
    // @property(Node)
    // player: Node = null!;
    // @property({tooltip: '移动速度'})
    // speedFactor: number = 0.1;
    // @property({tooltip: '场景宽度减去两侧可移动的范围'})
    // sceneVisibleSize: number = 640 + 460;
    // @property(Vec2)
    // public velocity: Vec2 = new Vec2(0, 100);

    // start() {
    //     const canvasNode = this.node.parent!;
    //     this._sceneWidth = canvasNode.getComponent(UITransform)!.width || view.getVisibleSize().width - this.sceneVisibleSize;
    //     this._playerWidth = this.player.getComponent(UITransform)!.width || 68;
    //     const cameraNode = find("Canvas/Camera");
    //     if (cameraNode) {
    //         this._camera = cameraNode.getComponent(Camera)
    //     }

    //     input.on(Input.EventType.TOUCH_START, this.touchStart, this);
    //     input.on(Input.EventType.TOUCH_MOVE, this.touchMove, this);
    //     input.on(Input.EventType.TOUCH_END, this.touchEnd, this);
    //     input.on(Input.EventType.TOUCH_CANCEL, this.touchCancel, this);

    //     let collider = this.getComponent(Collider2D);
    //     if (collider) {
    //         collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    //         collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
    //     }
    // }

    // onDestroy() {
    //     input.off(Input.EventType.TOUCH_START, this.touchStart, this);
    //     input.off(Input.EventType.TOUCH_MOVE, this.touchMove, this);
    //     input.off(Input.EventType.TOUCH_END, this.touchEnd, this);
    //     input.off(Input.EventType.TOUCH_CANCEL, this.touchCancel, this);
    // }

    // update(deltaTime: number) {
    //     if(!this._isTouch){
    //         return;
    //     }

    //     const moveDist = this.player['_moveDist'] || 0;
    //     const curPos = this.player.getPosition();
    //     const newPos = new Vec3(curPos.x + moveDist, curPos.y, curPos.z);
    //     const halfWidth = this._playerWidth / 2;
    //     const leftX = -this._sceneWidth / 2 + halfWidth;
    //     const rightX = this._sceneWidth / 2 + halfWidth;
    //     if (newPos.x < leftX) {
    //         newPos.x = leftX;
    //     } else if (newPos.x > rightX) {
    //         newPos.x = rightX;
    //     }

    //     this.player.setPosition(newPos);
    //     const deltaY = this.velocity.y;
    //     this.node.setPosition(newPos.x, newPos.y + deltaY);

    //     // TODO: 角色刚体自由向上，相机如何跟随角色向上，就行？
    //     if (this._camera) {
    //         const cameraPosition = new Vec3(newPos.x, newPos.y, this._camera.node.getPosition().z);
    //         this._camera.node.setPosition(cameraPosition);
    //     }
    // }

    // touchStart(event: EventTouch) {
    //     this._startPos = event.getLocation();
    //     this._isTouch = true;
    // }

    // touchMove(event: EventTouch){
    //     if(!this._isTouch){
    //         return;
    //     }

    //     const touchPos = event.getLocation();
    //     const offsetX = touchPos.x - this._startPos.x;
    //     this.player['_moveDirection'] = offsetX > 0 ? 'right' : 'left';
    //     const moveDist = offsetX * this.speedFactor;
    //     this.player['_moveDist'] = moveDist;
    // }

    // touchEnd(event: EventTouch){
    //     this._isTouch = false;
    //     this._startPos = v2(0, 0);
    //     this.player['_moveDist'] = 0;
    //     this.player['_moveDirection'] = '';
    // }

    // touchCancel(event: EventTouch){
    //     this.touchEnd(event);
    // }

    // onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    //     console.log('onBeginContact');
    // }
    // onEndContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    //     console.log('onEndContact');
    // }
}


