<template>
    <div>
        <div id="myechart" ref="myechart" style="width: 1100px; height: 750px"></div>
        <a href="https://echarts.apache.org/zh/option.html#toolbox">echarts官网配置</a>
    </div>
</template>

<script>
//china 中国地图数据
import china from 'echarts/map/json/china.json';

export default {
    name: 'home',
    data () {
        return {
     
        }
    },
    mounted () {
        this.initChinaChart()
    },
    methods: {
        initChinaChart () {
            // var myChart = this.$echarts.init(this.$refs.myechart)
            var myChart = this.$echarts.init(this.$refs.myechart)
            // 指定图表的配置项和数据
            var option = {
                // 背景颜色
                backgroundColor: "#fff", //地图外的背景颜色
                //标题
                title: {
                    text: "ECharts China Map", //主标题
                    subtext: '中国大雄鸡',//副标题
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
                    formatter (params) {
                        //console.log(params);
                        // 地图 : {a}（系列名称），{b}（区域名称），{c}（合并数值）, {d}（无）
                        return `${params.name}</br>数值：${params.value}`;
                    }

                },
                //工具栏
                toolbox: {
                    show: true, // 显示工具箱
                    orient: 'horizontal', //工具栏 icon 的布局朝向'horizontal' / 'vertical'
                    itemSize: 20, // 工具栏 icon 的大小
                    itemGap: 8, // 工具栏 icon 每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
                    showTitle: true, //是否在鼠标 hover 的时候显示每个工具 icon 的标题
                    //各工具配置项
                    //除了各个内置的工具按钮外，还可以自定义工具按钮。
                    //注意，自定义的工具名字，只能以 my 开头，例如下例中的 myTool1，myTool2：
                    feature: {
                        // 数据缩放
                        dataZoom: {
                            yAxisIndex: "none"
                        },
                        // 数据视图只读
                        dataView: {
                            readOnly: false
                        },
                        //  重置
                        restore: {}
                    }
                },
                // 自定义设置 连续型数据不分段。
                // visualMap: {
                    //1、连续型数据不分段。
                    // type: 'continuous', // continuous 连续型 / piecewise 分段型
                    // min: 0, // 最小值
                    // max: 500, // 最大值

                    // range: [0, 500], // 指定手柄对应数值的位置。range 应在 min max 范围内。
                    // calculable: true, // 是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
                    // realtime: true, // 拖拽时，是否实时更新。如果为true则拖拽手柄过程中实时更新图表视图。如果为false则拖拽结束时，才更新视图。
                    // inverse: false, // 当inverse为false时，数据大小的位置规则，和直角坐标系相同，即：当 visualMap.orient 为'vertical'时，数据上大下小。当 visualMap.orient 为'horizontal'时，数据右大左小。当inverse为true时，相反。
                    // precision: 0, // 数据展示的小数精度，默认为0，无小数点。
                    // itemWidth: 20, // 长条的宽度
                    // itemHeight: 200, // 长条的高度。
                    // align: 'top', // 组件中手柄和文字摆放位置，可选值为：'auto'自动决定。orient 为 horizontal 时:'left' 手柄和label在右，'right' 手柄和label在左。orient 为 vertical 时:'top' 手柄和label在下，'bottom' 手柄和label在上。
                    // text: ['高', '低'], // 两端的文本 如 ['High', 'Low']
                    // textGap: 20, // 两端文字主体之间的距离，单位为px。
                    // show: true, // 是否显示 visualMap-continuous 组件。如果设置为 false，不会显示，但是数据映射的功能还存在。
                    // dimension: '',指定用数据的『哪个维度』，映射到视觉元素上。『数据』即 series.data。 可以把 series.data 理解成一个二维数组例如：

                    // [
                    //     [12, 23, 43],
                    //     [12, 23, 43],
                    //     [43, 545, 65],
                    //     [92, 23, 33]
                    // ]
                    //其中每个列是一个维度，即 dimension。 例如 dimension 为 1 时，取第二列（即 23，23，545，23），映射到视觉元素上。默认取 data 中最后一个维度

                    // hoverLink = true //打开 hoverLink 功能时，鼠标悬浮到 visualMap 组件上时，鼠标位置对应的数值 在 图表中对应的图形元素，会高亮。反之，鼠标悬浮到图表中的图形元素上时，在 visualMap 组件的相应位置会有三角提示其所对应的数值。
                    // // left、top、right、bottom 设置组件在容器中的位置
                    // left: 26,
                    // bottom: 10,
                    // orient: 'vertical', // 如何放置 visualMap 组件，水平（'horizontal'）或者竖直（'vertical'）。
                    // padding: 5, // visualMap-piecewise内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距。
                    // backgroundColor: '#eee', // 背景色
                    // borderColor: '#999', // 边框颜色
                    // borderWidth: 1, // 边框线宽，单位px。
                    // // 文字样式设置
                    // textStyle: {
                    //     color: '#11dd11',
                    //     fontSize: 14
                    // },
                    // color: ['red', 'orangered', 'yellow', 'lightskyblue'], // 定义 在选中范围中 的视觉元素。顺序是由数值 大 到 小


                    // 2、连续型数据-自动-平均分段
                    // type: 'piecewise', // 分段型。
                    // min: 100, // 最小值。
                    // max: 500, // 最大值。
                    // splitNumber: 4, // 对于连续型数据，自动平均切分成几段。默认为5段。 连续数据的范围需要 max 和 min 来指定。如果设置了 visualMap-piecewise.pieces 或者 visualMap-piecewise.categories，则 splitNumber 无效。
                    // minOpen: true, // 当 type 为 piecewise 且使用 min/max/splitNumber 时，此参数有效。当值为 true 时，界面上会额外多出一个『< min』的选块。
                    // maxOpen: true, // 当 type 为 piecewise 且使用 min/max/splitNumber 时，此参数有效。当值为 true 时，界面上会额外多出一个『> max』的选块。

                    // selectedMode: 'multiple', // 选择模式，可以是：'multiple'（多选）。'single'（单选）。true（单选）从5.3.3版本支持。false（禁止选择）从5.3.3版本支持。四种取值效果都不一样。
                    // inverse: false, // 是否反转。
                    // precision: 0, // 数据展示的小数精度。
                    // itemWidth: 15, // 图形的宽度，即每个小块的宽度。
                    // itemHeight: 15, // 图形的高度，即每个小块的高度。
                    // align: 'auto', // 指定组件中图形（比如小方块）和文字的摆放关系，可选值为：'auto' 自动决定。'left' 图形在左文字在右。'right' 图形在右文字在左。
                    // text: ['高', '低'], // 两端的文本
                    // textGap: 10, // 每项的色块与文本标签之间的距离，单位为px。
                    // showLabel: true, // 是否显示每项选块的文本标签。默认情况是，如果 visualMap-piecewise.text 被使用则不显示文本标签，否则显示。
                    // itemGap: 10, // 每两个图元选块之间的间隔距离，单位为px。
                    // itemSymbol: 'roundRect', // 默认的图形。可选值为：'circle'圆型, 'rect'方型, 'roundRect'方形圆角, 'triangle'三角形, 'diamond'菱形, 'pin'倒置水滴形, 'arrow'凹陷三角形, 'none'。
                    // show: true, // 是否显示 visualMap-piecewise 组件。如果设置为 false，不会显示，但是数据映射的功能还存在，即地图各块会渲染颜色。
                    // // left、top、right、bottom 设置组件在容器中的位置
                    // left: 10,
                    // bottom: 20,
                    // orient: 'vertical', // 如何放置 visualMap 组件，水平（'horizontal'）或者竖直（'vertical'）。
                    // padding: 10, // visualMap-piecewise内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距。
                    // backgroundColor: '#eee', // 背景色
                    // borderColor: '#999', // 边框颜色
                    // borderWidth: 1, // 边框线宽，单位px。
                    // // 文字样式设置
                    // textStyle: {
                    //     color: '#11dd11',
                    //     fontSize: 14
                    // },
                    // color: ['red', 'orangered', 'yellow', 'lightskyblue']


                    //3、连续型数据-自定义-平均分段 
                    // type: 'piecewise', // 分段型
                    // // 连续型数据自定义分段
                    // // 可以使用 lt（小于，less than），gt（大于，greater than），lte（小于等于 less than or equals），gte（大于等于，greater than or equals）来表达边界
                    // pieces: [
                    //     {
                    //         gt: 300,
                    //         label: "> 300",
                    //         color: "red"
                    //     },
                    //     {
                    //         gte: 100,
                    //         lte: 300,
                    //         label: "101 - 300",
                    //         color: "orangered"
                    //     },
                    //     {
                    //         gte: 50,
                    //         lte: 100,
                    //         label: "51 - 100",
                    //         color: "yellow"
                    //     },
                    //     {
                    //         gte: 0,
                    //         lte: 50,
                    //         label: "0 - 50",
                    //         color: "lightskyblue"
                    //     },
                    // ],
                    // // 连续型数据分段设置
                    // // 以下部分自定义设置 与 连续型数据自动平均分段 一样
                    // selectedMode: 'multiple', // 选择模式，可以是：'multiple'（多选）。'single'（单选）。true（单选）从5.3.3版本支持。false（禁止选择）从5.3.3版本支持。四种取值效果都不一样。
                    // inverse: false, // 是否反转。
                    // precision: 0, // 数据展示的小数精度。
                    // itemWidth: 15, // 图形的宽度，即每个小块的宽度。
                    // itemHeight: 15, // 图形的高度，即每个小块的高度。
                    // align: 'auto', // 指定组件中图形（比如小方块）和文字的摆放关系，可选值为：'auto' 自动决定。'left' 图形在左文字在右。'right' 图形在右文字在左。
                    // text: ['高', '低'], // 两端的文本
                    // textGap: 15, // 每项的色块与文本标签之间的距离，单位为px。
                    // showLabel: true, // 是否显示每项选块的文本标签。默认情况是，如果 visualMap-piecewise.text 被使用则不显示文本标签，否则显示。
                    // itemGap: 20, // 每两个图元选块之间的间隔距离，单位为px。
                    // itemSymbol: 'circle', // 默认的图形。可选值为：'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'。
                    // show: true, // 是否显示 visualMap-piecewise 组件。如果设置为 false，不会显示，但是数据映射的功能还存在，即地图各块会渲染颜色。
                    // // left、top、right、bottom 设置组件在容器中的位置
                    // left: 26,
                    // bottom: 40,
                    // orient: 'vertical', // 如何放置 visualMap 组件，水平（'horizontal'）或者竖直（'vertical'）。
                    // padding: 20, // visualMap-piecewise内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距。
                    // backgroundColor: '#eee', // 背景色
                    // borderColor: '#999', // 边框颜色
                    // borderWidth: 1, // 边框线宽，单位px。
                    // // 文字样式设置
                    // textStyle: {
                    //     color: '#11dd11',
                    //     fontSize: 14
                    // }
                // }, 
                // 地图配置，geo 区域的颜色也可以被 map series 所控制
                geo: {
                    //1、鼠标缩放和平移
                    roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。开启缩放'scale'，开启平移'move'。设置成 true 为都开启
                    zoom: 1, //当前视角的缩放比例,改变这个值的大小就可以了，越大地图越大，默认1
                    scaleLimit: { // 滚轮缩放的缩放比例，默认的缩放为1
                        min: 1,  // 最小的缩放值
                        max: 3,  // 最大的缩放值
                    },
                    

                    //2、组件在容器中的位置
                    // 值可以是 20 代表像素值，
                    // 可以是 '20%' 是相对于容器高宽的百分比，
                    // 也可以是 'top', 'middle', 'bottom',组件会根据相应的位置自动对齐。
                    top: 'middle',
                    // bottom: '20',
                    left: 'center',
                    // right: '20%',
                    
                    map: "china", //设置china，南海诸岛会以缩略图展示，以china之外来命名地图，则不会展示缩略图。


                     //选中状态下的多边形和标签样式
                    selectedMode: 'single', // 选中模式，表示是否支持多个选中，默认关闭，支持布尔值和字符串，字符串取值可选'single'表示单选，或者'multiple'表示多选。
                    // 选中状态下的多边形和标签样式。
                    select: {
                        // disabled: false, // 是否可以被选中。在开启selectedMode的时候有效，可以用于关闭部分数据。
                        // 选中区域文本标签
                        label: {
                            color: '#fff',
                        },
                        // 选中区域图形样式
                        itemStyle: {
                            areaColor: 'blue', // 选中区域的颜色。
                            borderColor: 'rgba(255,255,255,1)', // 选中区域描边颜色。
                            borderWidth: 1, // 描边线宽。为 0 时无描边
                            borderType: 'dashed', // 描边类型。'solid'/'dashed'/'dotted'

                            
                        },
                    },
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
                            //areaColor: '#409eff',  // 默认区域的颜色。
                            borderColor: "rgba(0, 0, 0, 0.2)", //// 图形的描边颜色
                            borderWidth: 0.5, // 描边线宽。为 0 时无描边。
                            borderType: 'dashed', // 描边类型。'solid'/'dashed'/'dotted'
                        },
                        //emphasis 鼠标放上去高亮的样式(多边形和标签样式)
                        emphasis: {
                            focus: 'none', //在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。'none' 不淡出其它图形，默认使用该配置。'self' 聚焦当前高亮图形，淡出其它图形。
                            // 高亮状态下文本标签
                            label: {
                                color: '#abcdef',
                            },
                            // 高亮状态下图形样式
                            areaColor: '#409eff',  // 高亮区域的颜色。
                            borderWidth: 0,

                            //下面4个阴影效果配合使用
                            shadowOffsetX: '-2px', //阴影水平方向上的偏移距离
                            shadowOffsetY: '10px', //阴影垂直方向上的偏移距离
                            shadowBlur: '5px', //图形阴影的模糊大小
                            shadowColor: "#C3F4F4" //阴影颜色

                        }
                    }
                },
                series: [
                    // series （系列列表配置）中添加两个图表配置，通过修改 type 值，决定图表类型（散点图和地图），具体细节配置选项请参看官方 echarts 文档。
                    {
                        type: "scatter",//散点（气泡）图
                        coordinateSystem: "geo", //该系列使用的坐标系 'geo'使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
                        // pointSize: 6, // 设置 热力图 点 的大小
                        //  blurSize: 6, // 设置点的 阴影半径
                        data: [],
                        symbol: 'circle',// 标记的图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none',
                        symbolRotate: 35, //标记的大小,如果需要每个数据的图形大小不一样，可以设置为如下格式的回调函数
                        // 这里渲染标志里的内容以及样式
                        symbolSize: function (val) {
                            return val[2] / 15;
                            return Math.sqrt(val[2]) / 5e2;
                        },
                        label: {
                            normal: {
                                //显示圆点文字
                                show: true,
                                formatter: "{b}",
                                position: "right",
                                
                                //文字颜色
                                color: "#fff" 
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        // 标志的样式
                        itemStyle: {
                            normal: {
                                color: "#F06C00",
                            }
                        }
                    },
                    {
                        name: "订单量",
                        type: "map",
                        geoIndex: 0, //使用的地理坐标系的 index，在单个图表实例中存在多个地理坐标系的时候有用
                        tooltip: { show: true },
                        // 数据格式，其中name,value是必要的
                        // 至于如何展示，完全是靠上面的formatter来自己定义的
                        data: [
                            { name: "北京", value: this.randomdata(500) },
                            { name: "天津", value: this.randomdata(500) },
                            { name: "上海", value: this.randomdata(500) },
                            { name: "重庆", value: this.randomdata(500) },
                            { name: "河北", value: this.randomdata(500) },
                            { name: "河南", value: this.randomdata(500) },
                            { name: "云南", value: this.randomdata(500) },
                            { name: "辽宁", value: this.randomdata(500) },
                            { name: "黑龙江", value: this.randomdata(500) },
                            { name: "湖南", value: this.randomdata(500) },
                            { name: "安徽", value: this.randomdata(500) },
                            { name: "山东", value: this.randomdata(500) },
                            { name: "新疆", value: this.randomdata(500) },
                            { name: "江苏", value: this.randomdata(500) },
                            { name: "浙江", value: this.randomdata(500) },
                            { name: "江西", value: this.randomdata(500) },
                            { name: "湖北", value: this.randomdata(500) },
                            { name: "广西", value: this.randomdata(500) },
                            { name: "甘肃", value: this.randomdata(500) },
                            { name: "山西", value: this.randomdata(500) },
                            { name: "内蒙古", value: this.randomdata(500) },
                            { name: "陕西", value: this.randomdata(500) },
                            { name: "吉林", value: this.randomdata(500) },
                            { name: "福建", value: this.randomdata(500) },
                            { name: "贵州", value: this.randomdata(500) },
                            { name: "广东", value: this.randomdata(500) },
                            { name: "青海", value: this.randomdata(500) },
                            { name: "西藏", value: this.randomdata(500) },
                            { name: "四川", value: this.randomdata(500) },
                            { name: "宁夏", value: this.randomdata(500) },
                            { name: "海南", value: this.randomdata(500) },
                            { name: "台湾", value: this.randomdata(500) },
                            { name: "香港", value: this.randomdata(500) },
                            { name: "澳门", value: this.randomdata(500) }
                        ]
                    }

                ]
            }
            //注册地图 echarts.registerMap("自定义地图名称", 地图数据),第一个参数的名字必须和option.geo.map一致
            this.$echarts.registerMap("china", china);
            // 使用刚指定的配置项和数据显示图表。
            // this.$nextTick(() => {
                myChart.setOption(option);
            // })
            
            window.addEventListener("resize", function () {
                myChart.resize();
            });
            // myChart.on("mouseover", function (params) {
            //     console.log(params); //鼠标移动省显示的
            // });
            // myChart.on("click", function (param) {
            //     that.routpush(param);
            //     console.log(param); //鼠标点击省显示的
            // });
            // 点击触发
            myChart.on("click", param => {
                console.log(param)
               if (param.componentSubType == 'map') {
                   this.showProvince(param.name)
                }
            });
        },
        randomdata: function (num) {
            return Math.round(Math.random() * num);
        },
        // 展示对应的省
        showProvince: async function (name) {
            //获取地图数据之后，修改地图options
            const mapname = name
            console.log(this.$echarts.getMap(name))
            // if (!this.$echarts.getMap(name)) {
            //     const newMapJson = await getMapJson(name)
            //     this.$echarts.registerMap(mapname, newMapJson)
            // }
            // options.geo.map = mapname
            // options.series[0].map = mapname
            // //然后重新绘制地图
            // history.push(currentName)
            // chart.setOption(this.options)
            // currentName = name



        },
        getMapJson: async function (name) {
            const jsonData = await import('echarts/map/json/province/' + name + '.json')
            return jsonData.default
        },
        //展示对应市
        showCitys: function (cName, param) {
            // console.log(cName, param)
            // // 显示县级地图
            // $.getJSON(`/map/city/${cName}.json`, data => {
            //     that.$echarts.registerMap(param, data);
            //     alert("县")
            //     initEcharts(param);
            // })
        }
    } 
}
</script>


<style scoped>

</style>
