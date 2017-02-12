一个小游戏 记忆大考验
======

###  简单说明
- Tween动画算法,来源于FLASH中的ActionScript Tween类，参见http://www.cnblogs.com/cloudgamer/archive/2009/01/06/tween.html,http://www.robertpenner.com/easing/easing_demo.html
- 算法来源：http://www.robertpenner.com/easing/
#### 命名空间Tween
+ 参数说明：
- curTime:当前时间,即动画已经进行了多长时间,开始时间为0
- start:开始值
- dur:动画持续多长时间
- alter:总的变化量

- Elastic中的参数
- extent:正弦波的幅度
- cycle:正弦波的周期

- Back中的s,过冲量,此处数值越大，过冲越大

#### - 相对应的下面还分easeIn,easeOut,easeInOut方法
- easeIn() 加速度运动,初始速度为0
- easeOut() 减速度运动,结束速度为0
- easeInOut() 先加速后减速,开始与结束时速度都为0
- 具体参见ActionScript 3.0 语言和组件参考   