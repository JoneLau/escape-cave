
import { _decorator, Component, AudioSource, assert, game, find } from 'cc';
// import { setting } from '../ui/main/setting';
import { audioManager } from './audioManager';
import { constant } from './constant';
const { ccclass, property } = _decorator;

declare const cocosAnalytics: any;

@ccclass('GameRoot')
export class GameRoot extends Component {

    @property(AudioSource)
    private _audioSource: AudioSource = null!;

    @property({
        tooltip: '怪物移动范围'
    })
    MonsterMoveRange = 10;
    @property({
        tooltip: '每帧移动距离'
    })
    MonsterMoveSpeed = 0.1;



    onLoad () {
        // const audioSource = this.getComponent(AudioSource)!;
        // assert(audioSource);
        // this._audioSource = audioSource;
        // game.addPersistRootNode(this.node);

        // // init AudioManager
        // audioManager.instance.init(this._audioSource);
        constant.player = find('player');
        constant.MonsterMoveRange = this.MonsterMoveRange;
        constant.MonsterMoveSpeed = this.MonsterMoveSpeed;
    }

    onEnable () {
        // NOTE: 常驻节点在切场景时会暂停音乐，需要在 onEnable 继续播放
        // 之后需要在引擎侧解决这个问题
        // audioManager.instance.playMusic(true);
        // setting.checkState();
    }

    start(){

    }
}