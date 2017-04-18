var forceTHREE = new D3THREE();

forceTHREE.init('canvas-force');
//D3THREE.prototype.init('canvas-force');
var forceViz = new D3THREE.Force(forceTHREE);

var threeData = window.data["force_data.json"];//数据接口

var color = d3.scale.category20();//定义一个20种颜色的比例尺

var spheres = [], three_links = [];//球体和边

//定义3D力导引布局
var force = d3.layout.force3d()
    .nodes(sort_data=[])
    .links(links=[])
    .size([50, 50])
    .gravity(0.3)//引力
    .charge(-400);//斥力

var DISTANCE = 1;
console.log(threeData.nodes);
for (var i = 0; i < threeData.nodes.length; i++) {
  sort_data.push({x:threeData.nodes.x + DISTANCE,y:threeData.nodes.y + DISTANCE,z:0});

  //初始化球体使用的变量
  var radius = 6,//球体半径
      segments = 64,//这个值越大，球体越圆
      rings = 16;//这个值越大，球体越圆

  //创建球体材料
  var nodeColor = +color(threeData.nodes[i].group).replace("#", "0x");
  var sphereMaterial = new THREE.MeshBasicMaterial({ color: nodeColor });

    //创建球体网格对象
  var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(
      radius,
      segments,
      rings),
    sphereMaterial);

  spheres.push(sphere);

  // 把球体添加到场景对象中
  forceViz._dt.scene.add(sphere);
}

for (var j = 0; j < threeData.links.length; j++) {
  links.push({target:sort_data[threeData.links[j].target],source:sort_data[threeData.links[j].source]});

  var material = new THREE.LineBasicMaterial({ color: forceViz._config.linkColor,
                linewidth: forceViz._config.linkWidth});

  var geometry = new THREE.Geometry();

  geometry.vertices.push( new THREE.Vector3( 0, 0, 0 ) );
  geometry.vertices.push( new THREE.Vector3( 0, 0, 0 ) );
  var line = new THREE.Line( geometry, material );
  line.userData = { source: threeData.links[j].source,
                    target: threeData.links[j].target };
  three_links.push(line);
  forceViz._dt.scene.add(line);

  force.start();
}

// set up the axes
var x = d3.scale.linear().domain([0, 350]).range([0, 10]),//从x轴方向拉伸
    y = d3.scale.linear().domain([0, 350]).range([0, 10]),//从y轴方向拉伸
    z = d3.scale.linear().domain([0, 350]).range([0, 10]);//从z轴方向拉伸

var self = forceViz;
force.on("tick", function() {
  for (var i = 0; i < sort_data.length; i++) {
    spheres[i].position.set(x(sort_data[i].x) * 40 - 40, y(sort_data[i].y) * 40 - 40,z(sort_data[i].z) * 40 - 40);

    for (var j = 0; j < three_links.length; j++) {
      var line = three_links[j];
      var vi = -1;
      if (line.userData.source === i) {
        vi = 0;
      }
      if (line.userData.target === i) {
        vi = 1;
      }

      if (vi >= 0) {
        line.geometry.vertices[vi].x = x(sort_data[i].x) * 40 - 40;
        line.geometry.vertices[vi].y = y(sort_data[i].y) * 40 - 40;
        line.geometry.vertices[vi].z = y(sort_data[i].z) * 40 - 40;
        line.geometry.verticesNeedUpdate = true;
      }
    }
  }
});

// call animate loop
forceTHREE.animate();

// Use sourceURL to enable debugging in Chrome
//# sourceURL=document.js
