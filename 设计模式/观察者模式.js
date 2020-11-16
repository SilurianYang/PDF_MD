class Channel{
    constructor(name){
        this.channelName=name;
        this.videos=[];
        this.subscriber=[];
    }
    subscribe(user){
        this.subscriber.push(user);
        const lastIndex=this.subscriber.length-1;
        return ()=>{
            this.unsubscribe(lastIndex)
        };
    }
    unsubscribe(index){
        this.subscriber.splice(index,1);
    }
    publish(video){
        this.videos.push(video);
        for(let i=0;i<this.subscriber.length;i++){
            const user= this.subscriber[i];
            user.notify(`
                亲爱的${user.name}，欢迎订阅 '${this.channelName}' 频道。今天推出的视频是：${video.name}
            `)
        }
    }
}

class User{
    constructor(name){
        this.name=name;
    }
    notify(msg){
        console.log(msg)
    }
}

(async ()=>{
    const doChannel =new Channel('教你学观察者');

    for(let i=0;i<10;i++){
        const user=new User(`hhyang${i+1}`);
        doChannel.subscribe(user);
    }
    
    for(let i=0;i<5;i++){
        doChannel.publish({name:`视频${i+1}`})
        await timeOut();
    }
})()


function timeOut(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve();
        },10000)
    })
}