<template>
    <div class="echartsBox">
        <div class="mapChoose">
          <span v-for="(item, index) in parentInfo" :key="item.code">
            <span class="title" @click="chooseArea(item, index)">{{ item.cityName == '中国' ? '中国' : item.cityName }}</span>
            <span class="icon" v-show="index + 1 != parentInfo.length">=></span>
          </span>
        </div>
        <!-- <button class="backBtn" @click="back()">返回上级</button> -->
        <div id="myechart" ref="myechart" style="width:100%;height:100%; min-height:100vh;"></div>
        <!-- <a target="_blank" href="https://echarts.apache.org/zh/option.html#toolbox">echarts官网配置</a> -->
        <!-- <a target="_blank" href="https://www.jianshu.com/p/fe3f3d0f7316">参考</a> -->
    </div>
</template>

<script>
import cityMap from "@/js/china-main-city-map.js";
//引入echarts
import * as echarts from 'echarts';
import axios from "axios";
import { isPointInAreas } from '@/js/util.js'

//看网上说把地图实例及参数拿到外面，全局会加载比较快
//地图实例
var myChart = null;

//初始中国地图（第一级地图）的ID、Name、Json数据
var chinaId = 100000;
var chinaName = "china";
var chinaJson = 'null';

// 记录父级ID、Name
var parentId = '';
var parentName = '';
var parentJson = [];
var mapStack = [{
    mapName: "中国",
    mapId: 100000
}];

export default {
    name: 'chinaMap',
    data () {
        return {
            
            parentInfo: [{
                cityName: "中国",
                code: 100000
            }],

            //假数据
            resData: [
                // { "name": "沈阳", "value": [123.429092, 41.796768, 100] },
            // { "name": "长春", "value": [125.324501, 43.886841, 101] },
            // { "name": "哈尔滨", "value": [126.642464, 45.756966, 188] },
            // { "name": "北京", "value": [116.405289, 39.904987, 280] },
            // { "name": "天津", "value": [117.190186, 39.125595, 200] },
            // { "name": "呼和浩特", "value": [111.751990, 40.841490, 150] },
            // { "name": "银川", "value": [106.232480, 38.486440, 50] },
            // { "name": "太原", "value": [112.549248, 37.857014, 88] },
            // { "name": "石家庄", "value": [114.502464, 38.045475, 189] },
            // { "name": "济南", "value": [117.000923, 36.675808, 100] },
            // { "name": "郑州", "value": [113.665413, 34.757977, 130] },
            // { "name": "西安", "value": [108.948021, 34.263161, 120] },
            // { "name": "武汉", "value": [114.298569, 30.584354, 80] },
            // { "name": "南京", "value": [118.76741, 32.041546, 30] },
            // { "name": "合肥", "value": [117.283043, 31.861191, 200] },
            // { "name": "上海", "value": [121.472641, 31.231707, 109] },
            // { "name": "长沙", "value": [112.982277, 28.19409, 59] },
            // { "name": "南昌", "value": [115.892151, 28.676493, 220] },
            { "name": "杭州", "value": [120.15358, 30.287458, 240] }
            // { "name": "福州", "value": [119.306236, 26.075302, 160] },
            // { "name": "广州", "value": [113.28064, 23.125177, 40] },
            // { "name": "台北", "value": [121.5200760, 25.0307240, 145] },
            // { "name": "海口", "value": [110.199890, 20.044220, 70] },
            // { "name": "南宁", "value": [108.320007, 22.82402, 40] },
            // { "name": "重庆", "value": [106.504959, 29.533155, 100] },
            // { "name": "昆明", "value": [102.71225, 25.040609, 139] },
            // { "name": "贵阳", "value": [106.713478, 26.578342, 104] },
            // { "name": "成都", "value": [104.065735, 30.659462, 148] },
            // { "name": "兰州", "value": [103.834170, 36.061380, 95] },
            // { "name": "西宁", "value": [101.777820, 36.617290, 142] },
            // { "name": "拉萨", "value": [91.11450, 29.644151, 80] },
            // { "name": "乌鲁木齐", "value": [87.616880, 43.826630, 30] },
            // { "name": "香港", "value": [114.165460, 22.275340, 100] },
            //     { "name": "澳门", "value": [113.549130, 22.198750, 80] }
            ]
            
        }
    },
    mounted () {
        // this.getGeoJson(100000)
        this.initChinaChart()
    },
    methods: {
        //获取数据
        // getGeoJson (adcode) {
        //     axios.get("../../../static/json/map/" + adcode + ".json", {}).then(response => {
        //         const mapJson = response.data;

        //         chinaJson = mapJson;

        //         myChart = echarts.init(this.$refs.myechart);

        //         this.registerAndsetOption(myChart, chinaId, this.chinaName, mapJson, false);

        //         parentId = chinaId;
        //         parentName = chinaName;
        //         parentJson = mapJson;

                
        //     })

        // },
        //
        initChinaChart () {
            axios.get("../../../static/json/map/" + chinaId + ".json", {}).then(response => {
                const mapJson = response.data;

                chinaJson = mapJson;

                myChart = echarts.init(this.$refs.myechart);
            
                this.registerAndsetOption(myChart, chinaId, chinaName, mapJson, false);

                parentId = chinaId;
                parentName = chinaName;
                parentJson = mapJson;

                myChart.on("click", param => {
                    console.log(param,'param')
                    var cityId = cityMap[param.name];
                    if (cityId) {
                        //代表有下级地图
                        axios.get("../../../static/json/map/" + cityId + ".json", {}).then(response => {
                            const mapJson = response.data;
                            // console.log(mapJson,'mapJson')
                            parentJson = mapJson;
                            this.registerAndsetOption(myChart, cityId, param.name, mapJson, true);

                            this.parentInfo.push({
                                cityName: param.name,
                                code: cityId
                            });
                        }).catch((error) => {
                            console.log(error)
                        });
                    } else {
                        //没有下级地图，回到一级中国地图，并将mapStack清空
                        //this.registerAndsetOption(this.myChart, this.chinaId, this.chinaName, this.chinaJson, false);

                        // this.parentId= this.chinaId;
                        // this.parentName= this.chinaName;
                        // this.mapStack= [];
                    }
                })
            }).catch((error) => {
                console.log(error)
             })

        },
        // echarts配置项
        //参数说明： myChart:echarts、id:省市县Id、name:省市县名称、mapJson:地图Json数据、flag:是否往mapStack里添加parentId，parentName
        registerAndsetOption (myChart, id, name, mapJson, flag) {
            echarts.registerMap(name, mapJson);
            myChart.setOption({
                 // 背景颜色
                backgroundColor: "#1F3137", //地图外的背景颜色
                //标题
                title: {
                    text: "ECharts China Map 三级下钻", //主标题
                    subtext: '中国大雄鸡',//副标题
                    left: 'center', // 显示位置  居左
                    padding: [ // 分别设置四个方向的内边距
                        20, // 上
                        0, // 右
                        0, // 下
                        0 // 左
                    ],
                    textStyle: {
                        color: '#fff'
                    },
                    subtextStyle: {
                        color: '#fff'
                    }
                },
                // tooltip提示 
                tooltip: {
                    trigger: "item",  //trigger触发器 axis坐标轴触发,主要在柱状图，折线图等会使用类目轴的图表中使用，item 数据项图形触发,主要在散点图，饼图等无类目轴的图表中使用
                    backgroundColor: 'rgba(50,50,50,0.7)', //提示框浮层的背景颜色
                    borderColor: '#333', //提示框浮层的边框颜色
                    textStyle: { //提示框浮层的文本样式
                        color: '#fff'
                    },
                    // formatter: function (params) {
                    //     //console.log(params);
                    //     //return `地区：${params.name}</br>数值：${params.value[2]}`;
                    // }
                    //简写  提示框浮层内容格式器，支持字符串模板和回调函数两种形式
                    formatter: (params) => {
                        //console.log(params);
                        // 地图 : {a}（系列名称），{b}（区域名称），{c}（合并数值）, {d}（无）
                        // return `${params.name}</br>数值：${params.value}`;

                        // params.seriesName 标题
                        // params.marker 圆点
                        return `${params.seriesName}<br />${params.marker} ${params.data.name}: ${params.data.value[2]}`
                    } 
                },
                 // 地图配置，geo 区域的颜色也可以被 map series 所控制
                geo: {
                    //1、鼠标缩放和平移
                    roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。开启缩放'scale'，开启平移'move'。设置成 true 为都开启
                    zoom: 1, //当前视角的缩放比例,改变这个值的大小就可以了，越大地图越大，默认1
                    scaleLimit: { // 滚轮缩放的缩放比例，默认的缩放为1
                        min: 1,  // 最小的缩放值
                        max: 2,  // 最大的缩放值
                    },


                    //2、组件在容器中的位置
                    // 值可以是 20 代表像素值，
                    // 可以是 '20%' 是相对于容器高宽的百分比，
                    // 也可以是 'top', 'middle', 'bottom',组件会根据相应的位置自动对齐。
                    top: 'middle',
                    // bottom: '20',
                    left: 'center',
                    // right: '20%',

                    //地图下钻，其实就是，在地图的点击事件回调中，加载了另一份地图的json并注册地图，然后再setOption中更改了地图名字，如下的名字
                    map: name, //设置china，南海诸岛会以缩略图展示，以china之外来命名地图，则不会展示缩略图。


                    //选中状态下的多边形和标签样式
                    // selectedMode: 'single', // 选中模式，表示是否支持多个选中，默认关闭，支持布尔值和字符串，字符串取值可选'single'表示单选，或者'multiple'表示多选。
                    
                    //在地图中对特定的区域配置样式
                    regions: [{
                        name: '浙江',
                        itemStyle: {
                            areaColor: 'red',
                            color: 'red',
                            borderType: 'dashed',
                        }
                    }],

                    //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
                    label: {
                        // 通常状态下的样式
                        normal: {
                            show: true, // 是否显示标签
                            textStyle: {
                                color: "#000", //颜色
                                // fontSize: '', //字体大小
                            }
                        },
                        // 鼠标放上去的样式
                        emphasis: {
                            show: true,
                            textStyle: {
                                color: "red",
                            }
                        },
                        //formatter: '{a}ok' // 标签显示内容,字符创与函数两种格式,附带多种变量用法↓
                        // https://echarts.apache.org/zh/option.html#geo.label.formatter
                    },
                    // 地图区域的样式设置（多边形 图形样式）选中板块配置
                    itemStyle: {
                        //normal 是图形在默认状态下的样式；
                        normal: {
                            areaColor: '#abcdef',  // 默认区域的颜色。
                            borderColor: "#000", //// 图形的描边颜色
                            borderWidth: 0.5, // 描边线宽。为 0 时无描边。
                            borderType: 'dashed', // 描边类型。'solid'/'dashed'/'dotted'
                        },
                        //emphasis 鼠标放上去高亮的样式(多边形和标签样式)
                        emphasis: {
                            focus: 'none', //在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。'none' 不淡出其它图形，默认使用该配置。'self' 聚焦当前高亮图形，淡出其它图形。
                            // 高亮状态下图形样式
                            areaColor: '#F6998B',  // 高亮区域的颜色。
                            borderWidth: 0,

                        }
                    }
                },
                series: [{
                    name: '测试数据',
                    type: "effectScatter", //带有涟漪特效动画的散点（气泡）图
                    coordinateSystem: "geo",
                    showEffectOn: 'render', //配置何时显示特效  'render' 绘制完成后显示特效。'emphasis' 高亮（hover）的时候显示特效。
                    rippleEffect: { //涟漪特效相关配置
                        period: 15, //动画的周期，秒数
                        scale: 4,  //动画中波纹的最大缩放比例
                        brushType: 'stroke' //波纹的绘制方式，可选 'stroke' 和 'fill'。
                    },
                   
                    hoverAnimation: true, //是否开启 hover 在 box 上的动画效果
                    itemStyle: {
                        normal: {
                            color: 'purple',
                            shadowBlur: 10, // 设置图形阴影的模糊大小
                            shadowColor: '#333' // 设置图形阴影颜色
                        }
                    },
                     // 这里渲染标志里的内容以及样式（例如涟漪特效动画的散点大小）
                    symbolSize: function (val) {
                        return val[2] / 10;
                    },
                    // data: this.filterMapData(mapJson,name)
                    data: this.resData,
                    // data:[]
                }]
            }, true)
            if (flag) {
                //往mapStack里添加parentId，parentName,返回上一级使用
                mapStack.push({
                    mapId: parentId,
                    mapName: parentName
                });
                parentId = id;
                parentName = name;                
            }
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        },
        //过滤数据
        filterMapData (mapJson, name) {
            console.log(name,1)
            if (name == 'china') {
                return this.resData
            } else {
                var aa = this.resData.filter(item => {
                    return item.name == name
                })
                console.log(aa ,'aa')
            }

            
            // this.resData.filter(item => {
            //     return isPointInAreas([item.value[0], item.value[1]], mapJson)
            // })
           

            
           
        },
        //返回上一级
        // back () {
        //     if (mapStack.length != 0) {
        //         //如果有上级目录则执行
        //         var map = mapStack.pop();
        //         axios.get("../../../static/json/map/" + map.mapId + ".json", {}).then(response => {
        //             const mapJson = response.data;
        //             this.registerAndsetOption(myChart, map.mapId, map.mapName, mapJson, false);
        //             //返回上一级后，父级的ID、Name随之改变
        //             parentId = map.mapId;
        //             parentName = map.mapName;
        //         });
        //     }
        // },
        //选择切换市县
        chooseArea (val, index) {
            if (this.parentInfo.length === index + 1) {
                return
            }
            this.parentInfo.splice(index + 1)

            var code = this.parentInfo[this.parentInfo.length - 1].code
            var cityName = this.parentInfo[this.parentInfo.length - 1].cityName
            // console.log(this.parentInfo.splice(index + 1), code, cityName)
            axios.get("../../../static/json/map/" + code + ".json", {}).then(response => {
                const mapJson = response.data;
                this.registerAndsetOption(myChart, code, cityName, mapJson, false);
                //返回后，父级的ID、Name随之改变
                parentId = code;
                parentName = cityName;
            });
           
            
           
        }
    }
}
</script>


<style scoped>
.echartsBox{
    width: 100%;
    height: 100%;
    min-height:100vh;
    position: relative;
}

.mapChoose {
    position: absolute;
    left: 20px;
    top: 55px;
    color: #fff;
    z-index: 100;
  
}

.title {
    padding: 5px;
    border-top: 1px solid rgba(147, 235, 248, .8);
    border-bottom: 1px solid rgba(147, 235, 248, .8);
    cursor: pointer;
}

.icon {
    font-family: "simsun";
    font-size: 25px;
    margin: 0 11px;
}
</style>
