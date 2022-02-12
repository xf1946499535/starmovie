<template>
    <div class="gwc">
        <div class="mengban" v-if="issubmit">
            <div class="placeorder">
                <div class="mygwc">
                    <img src="../img/gwc.png" alt="">
                    <span>我的购物车</span>
                </div>
                <div class="goodsinfo">
                    <div class="goodsorder">
                        <div class="goodsnum">商品数量:
                            <span>{{totalnum}}</span>
                        </div>
                        <div class="total">总计:
                            <span>￥{{totalprice}}</span>
                        </div>
                    </div>
                    <div class="detail">
                        <div class="promise">承诺</div>
                        <div class="promiseinfo">
                            <div>7天无理由退换货</div>
                            <div>100%官方正品</div>
                            <div>全场满299元包邮</div>
                        </div>
                    </div>
                </div>
                <div class="choosesubmit">
                    <div class="submit" @click="placeorder">提交订单</div>
                    <div class="cancel" @click="iscancel">取消</div>
                </div>
            </div>
        </div>
        
        <div class="gwc_nav">
            <span>购物车</span>
            <div :class="[allnochecked?'settlement_gray':'settlement']" @click="isSubmit">结算</div>
        </div>
        <div class="goods">
            <div class="car_list">
                <div class="buytop">
                    <div class="chooseall" :class="[allchecked?'chooseyes':'choosenull']" @click="allChecked">全选</div>   <!-- 判断选择框是否选中，添加动态类，实现选择框的选中与取消功能 -->
                    <div class="goodsdetail">商品详情</div>
                    <div class="price">单价(元)</div>
                    <div class="num">数量</div>
                    <div class="subtotal">小计</div>
                    <div class="operation">操作</div>
                </div>
                    <div class="good_item" v-for="(item,index) in goods" :key="'good'+index">    
                        <div class="good_item_one" v-if="!item.isdelete">
                        <div :class="[item.ischecked?'chooseyes':'choosenull']" @click="isChecked(index)"></div>  <!-- 判断选择框是否选中，添加动态类，实现选择框的选中与取消功能 -->
                        <div class="goodinfo">
                            <div class="goodimg">
                                <img :src="item.pic" alt="">
                            </div>
                            <div class="goodname">{{item.goodName}}</div>
                        </div>
                        <div class="goodprice">￥
                            {{item.goodPrice}}</div>
                        <div class="goodnum">
                            <div class="count">
                                <div class="sign" @click="minus(item.goodCount,index)">
                                    <svg
                                    t="1618847403984"
                                    class="icon"
                                    viewBox="0 0 1025 1024"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    p-id="1604"
                                    width="16"
                                    height="12"
                                    >
                                    <path
                                        d="M973.154 563.218 51.222 563.218c-28.275 0-51.222-22.946-51.222-51.214 0-28.276 22.946-51.222 51.222-51.222L973.154 460.782c28.33 0 51.222 22.946 51.222 51.222C1024.375 540.272 1001.484 563.218 973.154 563.218L973.154 563.218z"
                                        p-id="1605"
                                    ></path>
                                    </svg>
                                </div>
                                <div><input v-model="item.goodCount" type="text" @blur="resetnum()" class="number"></div>
                                <div class="sign" @click="plus(item.goodCount,index)">
                                    <svg
                                    t="1618847369558"
                                    class="icon"
                                    viewBox="0 0 1024 1024"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    p-id="1410"
                                    width="16"
                                    height="12"
                                    >
                                    <path
                                        d="M970.745 459.367 566.614 459.367 566.614 55.251C566.614 25.842 542.771 2 513.361 2c-29.411 0-53.253 23.841-53.253 53.251l0 404.116L55.975 459.367c-29.411 0-53.253 23.841-53.253 53.25 0 29.41 23.842 53.253 53.253 53.253l404.133 0 0 404.115c0 29.407 23.842 53.249 53.253 53.249 29.41 0 53.253-23.842 53.253-53.249L566.614 565.87l404.131 0c29.413 0 53.255-23.843 53.255-53.253C1024 483.208 1000.158 459.367 970.745 459.367z"
                                        p-id="1411"
                                    ></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="good_subtotal">￥{{item.goodCount*item.goodPrice}}</div>
                        <div class="good_operation"><span  class="good_operation1" @click="deleteone(index)">删除</span></div>
                        </div>
                    </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
    mounted() {
        this.getshoppingcart()
    },
    beforeUnmount() {
        this.keepnum()
    }, 

    data() {
        return {
            allnochecked:true,
            allchecked:false,
            ischecked:false,
            isdelete:false,
            goods:[],
            issubmit:false,
            totalprice:0,
            totalnum:0,
            submitgoods:[]
        }
    },

    methods: {
        //获取购物车信息
        async getshoppingcart(){
            let apiurl = this.$store.getters.GETapihttp + "gwc/Ulist"
            let res = await axios.get(apiurl,{
                method:"GET",
                params:{
                    userId : this.$store.getters.GETme.userId
                }
            }); 
            this.goods = res.data
        },

        //全选
        allChecked () {   
            if(!this.allchecked){
                this.goods.forEach((item) => {
                    item.ischecked = true
                });
                this.allchecked = !this.allchecked   
                this.allnochecked = false
            }else{
                this.goods.forEach((item) => {
                    item.ischecked = false
                });
                this.allchecked = !this.allchecked
                this.allnochecked = true
            }
        },

        //单选
        isChecked(index) {    
            var flag = true    //设置标志如果flag为true则表示全选
            var flag1 = true  //设置标志如果flag1为true则表示全不选

           if(this.goods[index].ischecked){
               this.goods[index].ischecked=!this.goods[index].ischecked       //当此单选为true时将此单选改为false
               this.allchecked=false  //将全选改为false

               this.goods.forEach((item)=>{
                   if(item.ischecked){
                       flag1 = false
                   }
               })
               if(flag1){
                   this.allnochecked = true
               }
           }else{
               this.goods[index].ischecked=!this.goods[index].ischecked         //将此单选改为true
               this.goods.forEach((item) => {
                   if(!item.ischecked){
                       flag = false  //如果item.ischecked为false,即有未选中，赋值flag为false
                   }
                   if(item.ischecked){
                       flag1 = false
                   }
               });
               if(flag){
                   this.allchecked = true
               }
               if(flag1){
                   this.allnochecked = true
               }else if(!flag1){
                   this.allnochecked = false
               }
           }
        },

        minus(goodnum,index) {
        if (goodnum < 2) {
            this.goods[index].goodCount = 1;
        }
        else{
            this.goods[index].goodCount = this.goods[index].goodCount - 1
        }
        },
        plus(goodnum,index) { 
            this.goods[index].goodCount = Number(this.goods[index].goodCount)+1;   //将在input框输入的值强制转换为number类型，否则goodnum此时是字符串，+1会导致拼串
        },

        resetnum(){
            var reg = /^\d{1,}$/;
            var pattern=new RegExp(reg);
            if(!pattern.test(this.goodnum) ){
                this.goodnum=1;     //使用正则表达式来判断是否输入的是纯数字，不是的话将goodnum设为1
            }else{
                this.goodnum = this.goodnum;
            }
        },

        //单个商品删除
        deleteone(index) {
            let gwcId = []
            gwcId[0] = this.goods[index].gwcId;
            let apiurl = this.$store.getters.GETapihttp + "gwc/delete"
            let res = axios.get(apiurl,{
                method: "GET",
                params:{
                    gwcId : gwcId[0]
                }
            });
            this.goods[index].isdelete = true
        },
        //结算功能
        isSubmit(){
            if(this.allnochecked){

            }else{

                this.issubmit = true
            
                //遍历goods数组查找ischecked为true的对象，将所有ischecked为true对象的数量和价格相加得到总价和总数量
            this.goods.forEach((item) => {
                if(item.ischecked){
                    this.totalprice = item.goodCount*item.goodPrice + this.totalprice;
                    this.totalnum = Number(item.goodCount) + this.totalnum
                }
            }); 
            }
        },
        //提交订单
        placeorder(){
            let gwcId = []
            var mydate = new Date();
            var nowtime = mydate.toLocaleString();
            this.goods.forEach((item,index) => {
                if(item.ischecked){
                    this.submitgoods[index] = item  //将选中商品存入submitgoods数组中，作为提交给商品订单的参数
                    
                    this.submitgoods[index].time = nowtime
                    gwcId.push(item.gwcId)                    

                    if(this.allchecked){
                        this.allchecked = false   //如果全选将全选框清空
                    }
                    item.isdelete = true;   //将购物车选中的商品从购物车列表删除
                }
            });
            /* console.log(gwcId); */
            this.issubmit = false;
              
            //将选择的商品信息传入商品订单表            
            let apiurl = this.$store.getters.GETapihttp2 + "order/add";
            let res = axios.get(apiurl,{
                method: "GET",
                params:{
                    orderD:JSON.stringify(this.submitgoods)
                    // arr:this.submitgoods
                },
                paramsSerializer: params => {
                    return qs.stringify(params, { indices: false })
                }
            })


            let apiurl1 = this.$store.getters.GETapihttp + "gwc/delete"
            let res1 = axios.get(apiurl1,{
                method: "GET",
                params:{
                    gwcId : gwcId
                },
                paramsSerializer: params => {
                    return qs.stringify(params, { indices: false })
                }
            });
           
           
         
        },

        //结算取消功能
        iscancel() {
            this.issubmit = false;

            this.totalprice = 0;
            this.totalnum = 0;
        },

        //退出购物车保存修改的数量
        keepnum(){
            let apiurl = this.$store.getters.GETapihttp2 + "gwc/updateNum"
            let res = axios.get(apiurl,{
                methods: "GET",
                params: {
                    goods: JSON.stringify(this.goods)
                }
            })
            
        }
    },
    
}
</script>

<style lang="less" scope>

.mengban{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
}
.placeorder{
    width: 30rem;
    height: 30rem;
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;

    .mygwc{
        margin: 1rem 0 0 1rem;
        height: 4rem;
        width: 100%;
        display: flex;
        line-height: 4rem;
        
        img{
            width: 4rem;
            height: 4rem;
        }
        span{
            font-size: 2rem;
            margin-left: 1rem;
        }
    }
    .goodsinfo{
        width: 100%;
        margin-top: 0.5rem;
        height: 20rem;
        border-top: solid 1px #ddd;
        flex-wrap: wrap;
        
        .goodsorder{
            margin-left: 3rem;
            margin-top: 1rem;
            
            .goodsnum{
                margin-top: 2rem;
                font-size: 1.7rem;
                span{
                    margin-left: 1rem;
                    color: #666666;
                }
            }
            .total{
                margin-top: 3rem;
                font-size: 1.7rem;
                span{
                    margin-left: 1rem;
                    color: #ed3029;
                }
            }
        }
        .detail{
            display: flex;
            height: 5rem;
            width: 18rem;
            margin-top: 3rem;
            margin-left: 3rem;
            
            .promise{
                line-height: 5rem;
                font-size: 1.3rem;
                width: 4rem;
                color: #666666;
            }
            .promiseinfo{
                flex:1;
                padding-left: 1rem;
                border-left: solid 1px #ccc;
                color: #666666;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
            }
        }
    }
    .choosesubmit{
        width: 100%;
        height: 5rem;
        margin-top: 0.5rem;
        display: flex;
        background: aqua;
        .submit{
            width: 15rem;
            height: 100%;
            font-size: 1.5rem;
            text-align: center;
            line-height: 5rem;
            color: #fff;
            background: rgb(15, 189, 229);
        }
        .cancel{
            flex:1;
            font-size: 1.5rem;
            color: #fff;
            text-align: center;
            line-height: 5rem;
            background: rgba(122, 231, 167, 0.993);
        }
        .submit:hover{
            cursor: pointer;
            background: rgb(116, 224, 248);
        }
        .cancel:hover{
            cursor: pointer;
            background: rgba(162, 243, 196, 0.993);
        }
    }
}
    .choosenull{
        width: 5rem;
        height: 100%;
        background: url(//js01.daoju.qq.com/zb/lolriotmall/pc/images/member/buy_inphui.jpg) no-repeat 1rem center;
        }

    .chooseyes{
        height: 100%;
        width: 5rem;
        background: url(https://js01.daoju.qq.com/zb/lolriotmall/pc/images/member/buy_inphoer.jpg) no-repeat 1rem center;    
        }

    .gwc{
        width: 100%;
        position: relative;
        .gwc_nav{
            display: flex;
            width: 81rem;
            height: 6rem;
            margin-left: 4rem;
            line-height: 6rem;
            font-size: 1.7rem;
            justify-content: space-between;
            color: rgb(15, 189, 229);
            border-bottom: 1px solid rgba(100, 100, 100, 0.2);

            .settlement{
                background: rgb(15, 189, 229);
                height: 4rem;
                width: 8rem;
                margin-right: 8rem;
                margin-top: 1rem;
                border-radius: 5rem;
                text-align: center;
                font-size: 1.5rem;
                line-height: 4rem;
                color: #fff;
            }
            .settlement:hover{
                background: rgb(116, 224, 248);
                cursor: pointer;
            }
            .settlement_gray{
                height: 4rem;
                width: 8rem;
                margin-right: 8rem;
                margin-top: 1rem;
                border-radius: 5rem;
                text-align: center;
                font-size: 1.5rem;
                line-height: 4rem;
                color: #fff;
                background: rgba(0, 0, 0, 0.4);
            }
        }
        .car_list{
            margin-top: 2rem;
            .buytop{
                display: flex;
                width: 90%;
                height: 3rem;
                margin-left: 4rem;
                background-color: #efefef;
                
                .chooseall{
                    text-align: right;
                    font-size: 1.2rem;
                    line-height: 3rem;
                }
                .goodsdetail{
                    width: 6rem;
                    height: 100%;
                    margin-left: 3rem;
      
                    text-align: center;
                    line-height: 3rem;
                    font-size: 1.3rem;
                }
                .price{
                    width: 5rem;
                    height: 100%;
                    margin-left: 25rem;
                    font-size: 1.3rem;
                    line-height: 3rem;
                    text-align: center;
          
                }
                .num{
                    width: 8rem;
                    height: 100%;
                    margin-left: 4rem;
                    font-size: 1.3rem;
                    line-height: 3rem;
                    text-align: center;
                
                }
                .subtotal{
                    width: 5rem;
                    height: 100%;
                    margin-left: 4rem;
                    font-size: 1.3rem;
                    line-height: 3rem;
                    text-align: center;
                  
                }
                .operation{
                    width: 5rem;
                    height: 100%;
                    margin-left: 4rem;
                    font-size: 1.3rem;
                    line-height: 3rem;
                    text-align: center;
                }
            
            }
            

            .good_item_one{
                margin-left: 4rem;
                width: 90%;
                height: 8rem;
                border-bottom: 1px solid #ccc;
                display: flex;

                .goodinfo{
                    width: 25rem;
                    height: 100%;
                    margin-left: 3rem;
                    font-size: 1.3rem;
                    display: flex;
                    align-items: center;

                    .goodimg{
                        width: 7rem;
                        height: 7rem;
                        margin-left: 0;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .goodname{
                        margin-left: 0.5rem;
                    }
                    
                }
                .goodprice{
                    width: 7rem;
                    height: 100%;
                    margin-left: 5rem;
                    font-size: 1.3rem;
                    line-height: 8rem;
                    text-align: center;
                 
                }
                .goodnum{
                    width: 10rem;
                    height: 100%;
                    margin-left: 2rem;
                    text-align: center;

                    .count {
                        display: flex;
                        width: 8rem;
                        padding-top: 3rem;
                        padding-left: 1.5rem;

                        .sign {
                            width: 2rem;
                            height: 2rem;
                            text-align: center;
                            border: 1px solid #cacaca;
                            line-height: 2rem;
                            font-size: 1.3rem;
                            cursor: pointer;
                            .svg {
                            height: 3rem;
                            }
                        }
                        .number {
                            width: 4rem;
                            height: 2rem;
                            text-align: center;
                            border: 1px solid #cacaca;
                            line-height: 3.4rem;
                            font-size: 1.2rem;
                        }
                    }
                }
                .good_subtotal{
                    width: 7rem;
                    height: 100%;
                    margin-left: 2rem;
                    font-size: 1.2rem;
                    color: #666666;
                    line-height: 8rem;
                    text-align: center;
                   
                }
                .good_operation{
                    width: 7rem;
                    height: 100%;
                    margin-left: 2rem;
                    font-size: 1.2rem;
                    line-height: 8rem;
                    text-align: center;
                    color: #666666;
                    .good_operation1:hover{
                        cursor: pointer;
                    }
                }
            }
            
        }
    }
</style>