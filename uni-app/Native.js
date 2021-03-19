const Native = {
    //手机震动
	vibrate() {
		var context = plus.android.runtimeMainActivity();
		var Vibrator = plus.android.importClass('android.os.Vibrator');
		var vibrator = context.getSystemService(context.VIBRATOR_SERVICE);
		vibrator.vibrate([1, 1000000000], 0);
        setTimeout(()=>{
            vibrator.cancel();
        },2000)
	},
};
