 $(window).load(function(){
             $(".loading").fadeOut()
            })
$(function () {
    echarts_1();
	echarts_2();
	echarts_3();
	echarts_4();
	echarts_5();
	echarts_6();
	echarts_7();
	echarts_8();
	echarts_9();
//	homedata();
//	wingstop5();
//	heropick60();
function echarts_1() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart1'));
const data = [
  { value: 8, name: '学历博士' },
  { value: 53, name: '学历硕士' },
  { value: 988, name: '学历本科' },
];
const defaultPalette = [
  // '#51689b', '#ce5c5c', '#fbc357', '#8fbf8f', '#659d84', '#fb8e6a', '#c77288', '#786090', '#91c4c5', '#6890ba'
  '#5470c6',
  '#91cc75',
  '#fac858',
  '#ee6666',
  '#73c0de',
  '#3ba272',
  '#fc8452',
  '#9a60b4',
  '#ea7ccc'
];
const radius = ['30%', '80%'];
const pieOption = {
          tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            right:0,
            top:30,
            height:160,
            itemWidth:10,
            itemHeight:10,
            itemGap:10,
            textStyle:{
                color: 'rgba(255,255,255,.6)',
                fontSize:12
            },
            orient:'vertical',
            data:['学历博士','学历硕士','本科']
        },
        calculable : true,
  series: [
    {
      type: 'pie',
      id: 'distribution',
      radius: radius,
      label: {
        normal: {
        show: true
        },
        emphasis: {
        show: true
        }
      },
      lableLine: {
      normal: {
       show: true
      },
       emphasis: {
        show: true
      }
      },
      universalTransition: true,
      animationDurationUpdate: 1000,
      data: data
    }
  ]
};
const parliamentOption = (function () {
  let sum = data.reduce(function (sum, cur) {
    return sum + cur.value;
  }, 0);
  let angles = [];
  let startAngle = -Math.PI / 2;
  let curAngle = startAngle;
  data.forEach(function (item) {
    angles.push(curAngle);
    curAngle += (item.value / sum) * Math.PI * 2;
  });
  angles.push(startAngle + Math.PI * 2);
  function parliamentLayout(startAngle, endAngle, totalAngle, r0, r1, size) {
    let rowsCount = Math.ceil((r1 - r0) / size);
    let points = [];
    let r = r0;
    for (let i = 0; i < rowsCount; i++) {
      // Recalculate size
      let totalRingSeatsNumber = Math.round((totalAngle * r) / size);
      let newSize = (totalAngle * r) / totalRingSeatsNumber;
      for (
        let k = Math.floor((startAngle * r) / newSize) * newSize;
        k < Math.floor((endAngle * r) / newSize) * newSize - 1e-6;
        k += newSize
      ) {
        let angle = k / r;
        let x = Math.cos(angle) * r;
        let y = Math.sin(angle) * r;
        points.push([x, y]);
      }
      r += size;
    }
    return points;
  }
  return {
    series: {
      type: 'custom',
      id: 'distribution',
      data: data,
      coordinateSystem: undefined,
      universalTransition: true,
      animationDurationUpdate: 1000,
      renderItem: function (params, api) {
        var idx = params.dataIndex;
        var viewSize = Math.min(api.getWidth(), api.getHeight());
        var r0 = ((parseFloat(radius[0]) / 100) * viewSize) / 2;
        var r1 = ((parseFloat(radius[1]) / 100) * viewSize) / 2;
        var cx = api.getWidth() * 0.5;
        var cy = api.getHeight() * 0.5;
        var size = viewSize / 50;
        var points = parliamentLayout(
          angles[idx],
          angles[idx + 1],
          Math.PI * 2,
          r0,
          r1,
          size + 3
        );
        return {
          type: 'group',
          children: points.map(function (pt) {
            return {
              type: 'circle',
              autoBatch: true,
              shape: {
                cx: cx + pt[0],
                cy: cy + pt[1],
                r: size / 2
              },
              style: {
                fill: defaultPalette[idx % defaultPalette.length]
              }
            };
          })
        };
      }
    }
  };
})();
let currentOption = (option = pieOption);
setInterval(function () {
  currentOption = currentOption === pieOption ? parliamentOption : pieOption;
  myChart.setOption(currentOption);
}, 2000);
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}
function echarts_2() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart2'));

option = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
            textStyle:{
                color: 'rgba(255,255,255,.6)',
                fontSize:10
            },
    data: ['作业得分等级A', '作业得分等级B', '作业得分等级C', '作业得分等级D', '作业得分等级E']
  },
  xAxis: {
        nameTextStyle: {
        color: '#fff'
      },
          axisLabel: {
            inside: false,
            textStyle: {
                color: '#fff'
            }
        },
    type: 'value',
    color: 'rgba(255,255,255,.6)',
    boundaryGap: false
  },
  yAxis: {
        nameTextStyle: {
        color: '#fff'
      },
          axisLabel: {
            inside: false,
            textStyle: {
                color: '#fff'
            }
        },
    type: 'value',
    color: 'rgba(255,255,255,.6)',
    boundaryGap: false
  },
  series: [{
    name: '作业得分等级A',
    type: 'line',
    data: [[1.0,0],[2.0,80],[3.0,120],[4.0,105],[5.0,5]]
  }, {
    name: '作业得分等级B',
    type: 'line',
    data: [[1.0,0],[2.0,15],[3.0,45],[4.0,5],[5.0,20]]
  }, {
    name: '作业得分等级C',
    type: 'line',
    data: [[1.0,0],[2.0,10],[3.0,13],[4.0,5],[5.0,8]]
  }, {
    name: '作业得分等级D',
    type: 'line',
    data: [[1.0,0],[2.0,8],[3.0,10],[4.0,5],[5.0,7]]
  }, {
    name: '作业得分等级E',
    type: 'line',
    data: [[1.0,0],[2.0,40],[3.0,73],[4.0,50],[5.0,16]]
  }]
};
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
function echarts_3() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart3'));

    // 配置项
    option = {
  title: {
            left: 'center'
        },
  xAxis: {
        nameTextStyle: {
        color: '#fff'
      },
          axisLabel: {
            inside: false,
            textStyle: {
                color: '#fff'
            }
        },
    type: 'category',
    name: '参与度',
    nameLocation: 'middle',
    data: ['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7','0.8','0.9','1.0']
  },
  yAxis: {
        nameTextStyle: {
        color: '#fff'
      },
          axisLabel: {
            inside: false,
            textStyle: {
                color: '#fff'
            }
        },
    type: 'value',
//    name: '得分',
//    nameLocation: 'middle',
  },
  series: [
    {
      data: [60,0,0,0,0,10,0,10,20,420],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
};

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}
function echarts_4() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart4'));
// prettier-ignore
const femaleData = [[0.0, 0],
            [10.0, 0.8],
            [1.5,0.4],
            [2,0.2],
            [2.1,0.5],
            [2.2,0.6],
            [1.9,0.6],
            [2.8,0.16],
            [3,0.2],
            [3.1,0.3],
            [4.4,0.35],
            [4.2,0.42],
            [4.7,0.43],
            [2.9,0.41],
            [4,0.75],
            [5,0.4],[5.2,0.45],[6,0.6],[6.3,0.58],[7,0.5],[8,0.54],[9.1,0.62],
            [10.3,0.36],[10.5,0.42],[12,0.52],[12.5,0.65],[14,0.62],[13,0.578],[15,0.5],[16.5,0.45],[17,0.47],[19.4,0.63],[22,0.38],[23,0.36],[17.8,0.57],[10,0.76],[15,0.7],[13,0.78],[18,0.9],[22.5,0.93],[17,0.87],[7,0.83],[3,0.86],[3,0.05],[6,0.02],[8,0.04],[11,0.02],[14,0],[16,0.01],            [10,0.8],
            [9,0.9],[18,0.05],
            [11,0.85],
            [20,0.1],
            [20,0.4],
            [19,0.4],
            [19.2,0.5],
            [19.5,0.45],[23,0.02],[26,0.43],[30,0.03],[23,0.88],[26,0.99],[30,0.78],[35,0.82],[33,0.65],[26,0.84],[28,0.92],[38,0.76],[39,0.73],[33,0.83],[30.5,0.83],
           [42,0.03]
];
// prettier-ignore
const maleDeta = [[45,0.0],[50,0.01],[55,0.3],[53,0.02],[59,0.42],[57,0.07],[62,0.0],[64,0.01],[72,0],[73,0.01],[76,0.06],[79,0.02],[82,0.01],[90,0.01],[92,0.16],[88,0.2],[83,0.14],[96,0.4],[93,0.32],[90,0.5],
            [80,0.4],
            [88,0.0],
            [85,0.05],[61,0.41],[63,0.5],[70,0.6],[70.5,0.58],[63,0.53],[65,0.55],[62,0.33],[70,0.42],[68,0.49],[73,0.55],[76,0.64],[78,0.36],[77,0.42],[75.5,0.46],
            [82,0.7],[83,0.66],[88,0.82],[77,0.52],[73,0.51],[72,0.49],[71,0.46],[77,0.35],[72,0.3],[70,0.68],[66,0.78]
];
function calculateAverage(data, dim) {
  let total = 0;
  for (var i = 0; i < data.length; i++) {
    total += data[i][dim];
  }
  return (total /= data.length);
}
const scatterOption = (option = {
  xAxis: {
          axisLabel: {
            inside: false,
            textStyle: {
                color: '#fff'
            }
        },
  nameTextStyle: {
        color: '#fff'
    },
    name:'平均任务点完成时间（分钟）',
    nameLocation:"center",
    nameGap:25,
    scale: true
  },
  yAxis: {
          axisLabel: {
            inside: false,
            textStyle: {
                color: '#fff'
            }
        },
  nameTextStyle: {
        color: '#fff'
    },
    name:'综合成绩得分率',
    nameLocation:"center",
    nameGap:30,
    scale: true
  },
  series: [
    {
      type: 'scatter',
      id: 'female',
      dataGroupId: 'female',
      universalTransition: {
        enabled: true,
        delay: function (idx, count) {
          return Math.random() * 400;
        }
      },
      data: femaleData
    },
    {
      type: 'scatter',
      id: 'male',
      dataGroupId: 'male',
      universalTransition: {
        enabled: true,
        delay: function (idx, count) {
          return Math.random() * 400;
        }
      },
      data: maleDeta
    }
  ]
});
const barOption = {
  xAxis: {
  axisLabel: {
            inside: false,
            textStyle: {
                color: '#fff'
            }
        },
        nameTextStyle: {
        color: '#fff'
      },
    type: 'category',
    data: ['平均任务点完成速度中上的成绩得分', '平均任务点完成速度中下的成绩得分'],
    axisLabel: {
    color: '#ff0000'
  }
  },
  yAxis: {
  axisLabel: {
            inside: false,
            textStyle: {
                color: '#fff'
            }
        },
  nameTextStyle: {
        color: '#ff0000'
    },
    name:'综合成绩得分率',
    nameLocation:"center",
    nameGap:30,
  },
  series: [
    {
      type: 'bar',
      id: 'total',
      data: [
        {
          value: calculateAverage(maleDeta, 0),
          groupId: '平均任务点完成速度中下的成绩得分'
        },
        {
          value: calculateAverage(femaleData, 0),
          groupId: '平均任务点完成速度中上的成绩得分'
        }
      ],
      universalTransition: {
        enabled: true,
        seriesKey: ['平均任务点完成速度中上的成绩得分', '平均任务点完成速度中下的成绩得分'],
        delay: function (idx, count) {
          return Math.random() * 400;
        }
      }
    }
  ]
};
let currentOption = scatterOption;
setInterval(function () {
  currentOption = currentOption === scatterOption ? barOption : scatterOption;
  myChart.setOption(currentOption, true);
}, 2000);
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
}
function echarts_5() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart5'));
   var dataAxis = ['液压传动', '高等数学B2', '数据结构', '数据库原理', '地质信息技术导论', '现代软件工程', '统计学与数据分析', '农业气象','离散数学'];
var data = [6,3.8,3.5,2.8,2,2.8,1,2.65,2];
var yMax = 6;
var dataShadow = [];

for (var i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
}

option = {
    xAxis: {
        name: '课程名',
        nameLocation: 'center',
        nameGap:30,
    nameTextStyle: {
        color: '#fff'
    },
        data: dataAxis,
        axisLabel: {
            inside: false,
            textStyle: {
                color: '#fff'
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        z: 10
    },
    yAxis: {
        name: '参与率',
        nameGap:30,
        nameLocation: 'center',
        nameTextStyle: {
        color: '#fff'
    },
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            textStyle: {
                color: '#fff'
            }
        }
    },
    dataZoom: [
        {
            type: 'inside'
        }
    ],
    series: [
        { // For shadow
            type: 'bar',
            itemStyle: {
                color: 'rgba(0,0,0,0.05)'
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            data: dataShadow,
            animation: false
        },
        {
            type: 'bar',
            itemStyle: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: '#83bff6'},
                        {offset: 0.5, color: '#188df0'},
                        {offset: 1, color: '#188df0'}
                    ]
                )
            },
            emphasis: {
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2378f7'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
            data: data
        }
    ]
};

// Enable data zoom when user click bar.
var zoomSize = 6;
myChart.on('click', function (params) {
    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    myChart.dispatchAction({
        type: 'dataZoom',
        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    });
});
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
function echarts_6() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart6'));
    option = {
       tooltip: {
       trigger: 'axis',
       axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
            nameTextStyle: {
        color: '#fff'
      },
      axisLabel: {
         inside: false,
         textStyle: {
         color: '#fff'
         }
      },
      type: 'category',
      data: ['2016', '2017', '2018', '2019', '2020', '2021', '2022']
    }
  ],
  yAxis: [
    {
          nameTextStyle: {
        color: '#fff'
      },
     axisLabel: {
       inside: false,
        textStyle: {
        color: '#fff'
       }
     },
      type: 'value'
    }
  ],
  series: [
    {
      name: '地理信息与工程学院',
      type: 'bar',
      emphasis: {
        focus: 'series'
      },
      data: [20, 20, 22, 11, 6, 2, 0]
    },
    {
      name: '计算机学院',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      data: [15, 16, 17, 20, 7, 2, 4]
    },
    {
      name: '外国语学院',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      data: [5, 4, 4, 6, 0, 1, 3]
    },
    {
      name: '环境学院',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      data: [10, 13, 18, 13, 13, 2, 0]
    },
    {
      name: '经济管理学院',
      type: 'bar',
      data: [19, 24, 28, 21, 9, 5, 10],
      emphasis: {
        focus: 'series'
      },
      markLine: {
        lineStyle: {
          type: 'dashed'
        },
        data: [[{ type: 'min' }, { type: 'max' }]]
      }
    },
    {
      name: '机械与电子信息学院',
      type: 'bar',
      barWidth: 5,
      stack: 'Search Engine',
      emphasis: {
        focus: 'series'
      },
      data: [13, 18, 19, 22, 10, 6, 8]
    },
    {
      name: '海洋学院',
      type: 'bar',
      stack: 'Search Engine',
      emphasis: {
        focus: 'series'
      },
      data: [1, 2, 3, 1, 3, 5, 1]
    },
    {
      name: '李四光学院',
      type: 'bar',
      stack: 'Search Engine',
      emphasis: {
        focus: 'series'
      },
      data: [6, 5, 1, 2, 2, 0, 0]
    },
    {
      name: '工程学院',
      type: 'bar',
      stack: 'Search Engine',
      emphasis: {
        focus: 'series'
      },
      data: [15, 13, 34, 14, 9, 7, 14]
    }
  ]
};
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
}
function echarts_7() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('echart7'));

  // 配置项
  var option = {
    title: {
      left: 'center'
    },
    tooltip: {
      formatter: '{b}: {c}'
    },
    legend: {
      data: ['课程'],
      left: 'right'
    },
    grid: {
      left: '15%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
              axisLabel: {
            inside: false,
            textStyle: {
                color: '#fff'
            }
        },
      nameTextStyle: {
        color: '#fff'
      },
      color: '#fff00',
      type: 'value',
      name: '章数',
      nameLocation: 'middle',
      nameGap: 23,
      min: 0,
      max: 160,
      splitNumber: 16,
    },
    yAxis: {
            axisLabel: {
            inside: false,
            textStyle: {
                color: '#fff'
            }
        },
      nameTextStyle: {
        color: '#fff'
      },
      type: 'value',
      name: '考试成绩',
      nameLocation: 'middle',
      nameGap: 45,
      min: 0,
      max: 100,
      splitNumber: 10
    },
    series: [
      {
        name: '课程',
        type: 'scatter',
        data: [
          [15, 1],
          [15, 17],
          [15, 20],
          [15, 36],
          [15, 37],
          [15, 38],
          [15, 15],
          [15, 61],
          [15, 62],
          [15, 63],
          [15, 64],
          [15, 65],
          [15, 75],
          [15, 76],
          [15, 77],
          [15, 78],
          [15, 79],
          [15, 80],
          [15, 81],
          [15, 95],
          [15, 96],
          [15, 97],
          [15, 98],
          [15, 99],
          [15, 100],
          [160, 40],
          [160, 41],
          [160, 42],
          [160, 43],
          [160, 44],
          [160, 45],
          [160, 46],
          [160, 47],
          [160, 60],
          [160, 61],
          [160, 62],
          [160, 63],
          [160, 64],
          [160, 65],
          [160, 66],
          [160, 67],
          [160, 68],
          [160, 80],
          [160, 82]
        ],
        itemStyle: {
          color: 'red'
        },
        label: {
          show: false,
          position: 'top'
        },
        symbolSize: 10
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize",function(){
    myChart.resize();
  });
}
function echarts_8() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('echart8'));


  option = {
        title: {
//            text: '课程学生数量和平均成绩',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['学生数量', '平均成绩'],
            left: 'right'
        },
        grid: {
            left: '15%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: {
         axisLabel: {
            inside: false,
            textStyle: {
                color: '#fff'
            }
        },
      nameTextStyle: {
        color: '#fff'
      },
            type: 'category',
            boundaryGap: false,
            data: ['2.225', '2.2255', '2.226', '2.227', '2.228', '2.229', '2.23', '2.24', '2.25', '2.252', '2.253', '2.254', '2.255', '2.256', '2.257', '2.258', '2.259', '2.26', '2.261', '2.262', '2.263', '2.264', '2.265']
        },
        yAxis: [{
         axisLabel: {

        },
      nameTextStyle: {
        color: '#fff'
      },
            type: 'value',
            name: '学生数量',
            min: 0,
            max: 400,
            interval: 100,
            axisLabel: {
                formatter: '{value}',
                inside: false,
            textStyle: {
                color: '#fff'
            }
            }
        }, {
         axisLabel: {
            inside: false,
            textStyle: {
                color: '#fff'
            }
        },
      nameTextStyle: {
        color: '#fff'
      },
            type: 'value',
            name: '平均成绩',
            min: 0,
            max: 400,
            interval: 100,
            axisLabel: {
                formatter: '{value}',
                inside: false,
            textStyle: {
                color: '#fff'
            }
            }
        }],
        series: [{
            name: '学生数量',
            type: 'line',
            data: [50, 340, 100, 150, 120, 200, 250, 300, 400, 350, 320, 280, 250, 200, 180, 170, 160, 150, 120, 100, 80, 70, 60],
            itemStyle: {
                color: 'steelblue'
            }
        }, {
            name: '平均成绩',
            type: 'line',
            yAxisIndex: 1,
            data: [75, 85, 86, 93, 92, 77, 86, 83, 85, 82, 81, 70, 80, 90, 70, 82, 81, 80, 90, 82, 85, 81, 63],
            itemStyle: {
                color: 'darkorange'
            }
        }]
    };


  // 配置项
//  option = {
//        title: {
////            text: '课程学生数量和平均成绩',
//            left: 'center'
//        },
//        tooltip: {
//            trigger: 'axis',
//            axisPointer: {
//                type: 'cross'
//            }
//        },
//        legend: {
//            data: ['学生数量', '平均成绩'],
//            left: 'right'
//        },
//        grid: {
//            left: '15%',
//            right: '4%',
//            bottom: '15%',
//            containLabel: true
//        },
//        xAxis: {
//         axisLabel: {
//            inside: false,
//            textStyle: {
//                color: '#fff'
//            }
//        },
//      nameTextStyle: {
//        color: '#fff'
//      },
//            type: 'category',
//            boundaryGap: false,
//            data: ['2.225', '2.2255', '2.226', '2.227', '2.228', '2.229', '2.23', '2.24', '2.25', '2.252', '2.253', '2.254', '2.255', '2.256', '2.257', '2.258', '2.259', '2.26', '2.261', '2.262', '2.263', '2.264', '2.265']
//        },
//        yAxis: [{
//         axisLabel: {
//
//        },
//      nameTextStyle: {
//        color: '#fff'
//      },
//            type: 'value',
//            name: '学生数量',
//            min: 0,
//            max: 400,
//            interval: 100,
//            axisLabel: {
//                formatter: '{value}',
//                inside: false,
//            textStyle: {
//                color: '#fff'
//            }
//            }
//        }, {
//         axisLabel: {
//            inside: false,
//            textStyle: {
//                color: '#fff'
//            }
//        },
//      nameTextStyle: {
//        color: '#fff'
//      },
//            type: 'value',
//            name: '平均成绩',
//            min: 0,
//            max: 400,
//            interval: 100,
//            axisLabel: {
//                formatter: '{value}',
//                inside: false,
//            textStyle: {
//                color: '#fff'
//            }
//            }
//        }],
//        series: [{
//            name: '学生数量',
//            type: 'line',
//            data: [50, 340, 100, 150, 120, 200, 250, 300, 400, 350, 320, 280, 250, 200, 180, 170, 160, 150, 120, 100, 80, 70, 60],
//            itemStyle: {
//                color: 'steelblue'
//            }
//        }, {
//            name: '平均成绩',
//            type: 'line',
//            yAxisIndex: 1,
//            data: [150, 150, 150, 160, 170, 180, 190, 200, 250, 280, 270, 260, 270, 290, 300, 280, 270, 260, 240, 230, 220, 200, 190],
//            itemStyle: {
//                color: 'darkorange'
//            }
//        }]
//    };


  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize",function(){
    myChart.resize();
  });
}
function echarts_9() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('echart9'));

  // 配置项

// prettier-ignore
const hours = [
  '40','80','120','160','200','240','280','320'
];
// prettier-ignore
const days = [
    '0.2', '0.4', '0.6',
    '0.8', '1.0'
];
// prettier-ignore
const data = [[0, 0, 50],[3,0,10],[2,1,50],[3,2,60],[4,4,200],[4,3,200],[3,3,100],[4,6,200],[2,5,300],[2,4,200],[3,5,200],[2,5,100],[1,5,200],[1,3,100],[4,5,300],[4,7,300],[3,7,200]]
    .map(function (item) {
    return [item[1], item[0], item[2] || '-'];
});
option = {
   title: {
//    text: '得分率与总持续时间的热图',
    left: 'center',
    top: 0,
  },
  tooltip: {
    position: 'top'
  },
  grid: {
    height: '50%',
    top: '10%'
  },
  xAxis: {
   axisLabel: {
            inside: false,
            textStyle: {
                color: '#fff'
            }
        },
      nameTextStyle: {
        color: '#fff'
      },
    type: 'category',
    name:'参与时间（小时）',
     nameLocation: 'middle',
    data: hours,
    splitArea: {
      show: true
    }
  },
  yAxis: {
   axisLabel: {
            inside: false,
            textStyle: {
                color: '#fff'
            }
        },
      nameTextStyle: {
        color: '#fff'
      },
    type: 'category',
    name:'得分率',
     nameLocation: 'middle',
    data: days,
    splitArea: {
      show: true
    }
  },
  visualMap: {
    min: 0,
    max: 500,
    calculable: true,
    orient: 'horizontal',
    left: 'center',
    bottom: '15%'
  },
  series: [
    {
      name: 'Punch Card',
      type: 'heatmap',
      data: data,
      label: {
        show: true
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};


  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize",function(){
    myChart.resize();
  });
}
//function round(elm,data1,data2,clolr,str1,str2,str3) {
//        // 基于准备好的dom，初始化echarts实例
//        var myChart = echarts.init(document.getElementById(elm));
//	    var v2=data2//胜利
//		var v1=data1//战败
//		var v3=v1+v2//总消费
//        option = {
//            tooltip: {
//                trigger: 'item',
//            },
//            series: [{
//
//                type: 'pie',
//                radius: ['60%', '70%'],
//                color:clolr,
//                label: {
//                    normal: {
//                    position: 'center'
//                    }
//                },
//            data: [{
//                value: v2,
//                name: str1,
//                label: {
//                    normal: {
//                        formatter: v2 +'',
//                        textStyle: {
//                            fontSize: 20,
//                            color:'#fff',
//                        }
//                    }
//                }
//            }, {
//                value: v1,
//                name: str2,
//                label: {
//                    normal: {
//                        formatter : function (params){
//                            return str3
//                        },
//                        textStyle: {
//                            color: '#aaa',
//                            fontSize: 12
//                        }
//                    }
//                },
//                itemStyle: {
//                    normal: {
//                        color: 'rgba(255,255,255,.2)'
//                    },
//                    emphasis: {
//                        color: '#fff'
//                    }
//                },
//            }]
//            }]
//        };
//        myChart.setOption(option);
//        window.addEventListener("resize",function(){
//        myChart.resize();
//        });
//    }
//function KDA(ka,d) {
//        // 基于准备好的dom，初始化echarts实例
//        var myChart = echarts.init(document.getElementById('zb6'));
//        var v1=d//死亡
//		var v2=ka//击杀和助攻
//option = {
//    tooltip: {
//        trigger: 'item',
//    },
//    series: [{
//
//        type: 'pie',
//       radius: ['60%', '70%'],
//        color:'#FB7293',
//        label: {
//            normal: {
//                position: 'center'
//            }
//        },
//        data: [{
//            value: v2,
//            name: '击杀和助攻',
//            label: {
//                normal: {
//                    formatter: v2 +'',
//                    textStyle: {
//                        fontSize: 20,
//						color:'#fff',
//                    }
//                }
//            }
//        }, {
//            value: v1,
//            name: '死亡',
//            label: {
//                normal: {
//                 formatter : function (params){
//                return 'KDA：'+Math.round( (ka)/d)
//            },
//                    textStyle: {
//                        color: '#aaa',
//                        fontSize: 12
//                    }
//                }
//            },
//            itemStyle: {
//                normal: {
//                    color: 'rgba(255,255,255,.2)'
//                },
//                emphasis: {
//                    color: '#fff'
//                }
//            },
//        }]
//    }]
//};
//        myChart.setOption(option);
//        window.addEventListener("resize",function(){
//            myChart.resize();
//        });
//    }
//
//function wingstop5() {
//    $.ajax({
//        url:'/wingstop5',
//        data: {},
//        type: 'POST',
//        async: false,
//        dataType:'json',
//        success:function (data) {
//            $("#wingstop5").children('tr').each(function (index,dom) {
//                if (index != 0){
//                    $(dom).children('td').eq(1).text(data.name[index-1]);
//                    $(dom).children('td').eq(2).text(data.outcount[index-1]);
//                    $(dom).children('td').eq(3).text(data.winRate[index-1]);
//                }
//            });
//            $("#membertop5").children('tr').each(function (index,dom) {
//                if (index != 0){
//                    $(dom).children('td').eq(1).text(data.membername[index-1]);
//                    $(dom).children('td').eq(2).text(data.memberpost[index-1]);
//                    $(dom).children('td').eq(3).text(data.memberkillsum[index-1]);
//                }
//            })
//        },
//        error:function (msg) {
//            console.log(msg);
//            alert('系统发生错误!战队排行榜');
//        }
//    })
//
//
//}
//function heropick60() {
//    $.ajax({
//        url:'/heropick',
//        data: {},
//        type: 'POST',
//        async: false,
//        dataType:'json',
//        success:function (data) {
//            var name = data.name;
//            var outcount = data.outcount;
//            var winrate = data.winrate;
//            var picknum = data.picknum;
//
//            $.each(name,function (i,item) {
//                $("#heropick").append("<li><p><span>"+ item +"</span><span>"+outcount[i]+"</span><span>"+picknum[i]+"</span><span>"+winrate[i]+"</span></p></li>");
//            });
//            $('.wrap,.adduser').liMarquee({
//                direction: 'up',/*身上滚动*/
//                runshort: false,/*内容不足时不滚动*/
//                scrollamount: 20/*速度*/
//            });
//        },
//        error:function (msg) {
//            console.log(msg);
//            alert('系统发生错误!战队排行榜');
//        }
//    })
//}
//function homedata() {
//    $.ajax({
//        url:'/homeround',
//        data: {},
//        type: 'POST',
//        async: false,
//        dataType:'json',
//        success:function (data) {
//            var homename = data.name
//            var data1 = data.data1
//            var data2 = data.data2
//
//            $("#winratetop").append(homename[0]+"<br>胜率最高");
//            $("#killtop").append(homename[1]+"<br>击杀最高");
//            $("#ineyetop").append(homename[2]+"<br>插眼最多");
//            $("#memberkdatop").append(homename[3]+"<br>KDA最高");
//            $("#memberdietop").append(homename[4]+"<br>死亡最多");
//            $("#memberkilltop").append(homename[5]+"<br>击杀最多");
//
//            round('zb1',data2[0],data1[0],'#37A2DA','胜利','战败','胜利场数');
//	        round('zb2',data2[1],data1[1],'#32C5E9','总击杀','总死亡','总击杀');
//	        round('zb3',data2[2],data1[2],'#67E0E3','插眼','排眼','总插眼');
//	        round('zb5',data2[4],data1[4],'#FFDB5C','助攻','击杀和助攻','总死亡');
//            round('zb4',data2[5],data1[5],'#9FE6B8','击杀','死亡和助攻','总击杀');
//            KDA(data1[3],data2[3]);
//        },
//        error:function (msg) {
//            console.log(msg);
//            alert('系统发生错误!战队排行榜');
//        }
//    });
//
//
//}
})




