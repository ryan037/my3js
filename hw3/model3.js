var texture;

function buildSteve() {
  
  
  var loader = new THREE.TextureLoader();
  loader.setCrossOrigin('');
  texture = loader.load ('https://i.imgur.com/1utWTdm.png');

  
  head = buildHead2(WW*2,WW*2,WW*2); 
  body = buildBody2(WW*2,HH,WW);
  lleg = buildLeg2(WW,HH,WW); 
  rleg = buildLeg2(WW,HH,WW);
  
  larm = buildArm2(WW,HH,WW);
  larm.position.set(-WW*(3/2),0,0);
  //scene.add (larm);
  
  rarm = buildArm2(WW,HH,WW);
  rarm.position.set(WW*(3/2),0,0);
 // scene.add (rarm);
  
  body.add(head);
  head.position.y = HH;
  
  body.add(lleg);
  lleg.position.x = -WW*(1/2);
  
  body.add(rleg);
  rleg.position.x = WW*(1/2);
  
  body.add(larm);
  larm.position.x = -WW*(3/2);
  larm.position.y = HH;
  
  body.add(rarm);
  rarm.position.x = WW*(3/2);
  rarm.position.y = HH;
  
  body.position.y = HH;
  scene.add (body);
}

function buildHead2(WW, HH, DD) {

  var geometry = new THREE.BufferGeometry();	
  var vertices = [];
  var indices = [];
  var uvs = [];

  ////////////
  const ww = 1;
  const hh = 3;
  const UU = 14*ww;
  const VV = hh + 5*ww;
  
  var a = {u: 2*ww, v: hh+5*ww};
  var b = {u: 4*ww, v: hh+5*ww};
  var c = {u: 6*ww, v: hh+5*ww};
  var d = {u: 0, v: hh+3*ww};
  var e = {u: 2*ww, v: hh+3*ww};
  var f = {u: 4*ww, v: hh+3*ww};
  var g = {u: 6*ww, v: hh+3*ww};
  var h = {u: 8*ww, v: hh+3*ww};
  var i = {u: 0, v: hh+ww};
  var j = {u: 2*ww, v: hh+ww};
  var k = {u: 4*ww, v: hh+ww};
  var l = {u: 6*ww, v: hh+ww};
  var m = {u: 8*ww, v: hh+ww};

  // PZ
  vertices.push(-WW/2,HH/2,DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,HH/2,DD/2 ); // 0,3,2,1
  indices.push(0,1,2, 0,2,3);
  uvs.push (e.u/UU,e.v/VV, j.u/UU,j.v/VV, k.u/UU,k.v/VV, f.u/UU,f.v/VV); // e,j,k,f

  // PX
  vertices.push(WW/2,HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2, WW/2,HH/2,-DD/2 ); // 1,2,6,5
  indices.push (4,5,6, 4,6,7); // [0,1,2, 0,2,3] + 4
  uvs.push (f.u/UU,f.v/VV, k.u/UU,k.v/VV, l.u/UU,l.v/VV, g.u/UU,g.v/VV); // f,k,l,g
	
  // NX
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, -WW/2,HH/2,DD/2 ); // 4,7,3,0
  indices.push (8,9,10, 8,10,11); // [0,1,2, 0,2,3] + 8
  uvs.push (d.u/UU,d.v/VV, i.u/UU,i.v/VV, j.u/UU,j.v/VV, e.u/UU,e.v/VV); // d,i,j,e

  // NZ
  vertices.push(WW/2,HH/2,-DD/2, WW/2,-HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,HH/2,-DD/2 ); // 5,6,7,4
  indices.push (12,13,14, 12,14,15); // [0,1,2, 0,2,3] + 12
  uvs.push (g.u/UU,g.v/VV, l.u/UU,l.v/VV, m.u/UU,m.v/VV, h.u/UU,h.v/VV); // g,l,m,h
  
  // PY
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,HH/2,DD/2, WW/2,HH/2,DD/2, WW/2,HH/2,-DD/2 ); // 4,0,1,5
  indices.push (16,17,18, 16,18,19); // [0,1,2, 0,2,3] + 16
  uvs.push (a.u/UU,a.v/VV, e.u/UU,e.v/VV, f.u/UU,f.v/VV, b.u/UU,b.v/VV); // a,e,f,b
   
  // NY
  vertices.push(-WW/2,-HH/2,DD/2, -WW/2,-HH/2,-DD/2, WW/2,-HH/2,-DD/2, WW/2,-HH/2,DD/2 ); // 3,7,6,2
  indices.push (20,21,22, 20,22,23); // [0,1,2, 0,2,3] + 20
  uvs.push (b.u/UU,b.v/VV, f.u/UU,f.v/VV, g.u/UU,g.v/VV, c.u/UU,c.v/VV); // b,f,g,c
  
  
  geometry.setIndex(indices);  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));	
	
  let mesh = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, side:THREE.DoubleSide}));
  let head = new THREE.Group();
  head.add(mesh);
  mesh.position.set(0, HH/2, 0);
  //let axis = new THREE.AxesHelper(25)
  //head.add(axis)
  
  return head;
}

function buildBody2(WW, HH, DD) {
 
  var geometry = new THREE.BufferGeometry();	
  var vertices = [];
  var indices = [];
  var uvs = [];

  const ww = 1;
  const hh = 3;
  const UU = 14*ww;
  const VV = hh + 5*ww;
  
  var a = {u: 5*ww, v:hh+ww};
  var b = {u: 7*ww, v:hh+ww};
  var c = {u: 9*ww, v:hh+ww};
  var d = {u: 4*ww, v:hh};
  var e = {u: 5*ww, v:hh};
  var f = {u: 7*ww, v:hh};
  var g = {u: 8*ww, v:hh};
  var h = {u: 10*ww, v:hh};
  var i = {u: 4*ww, v:0};
  var j = {u: 5*ww, v:0};
  var k = {u: 7*ww, v:0};
  var l = {u: 8*ww, v:0};
  var m = {u: 10*ww, v:0};
  var x = {u: 9*ww, v: hh};

	// PZ
  vertices.push(-WW/2,HH/2,DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,HH/2,DD/2 ); // 0,3,2,1
  indices.push(0,1,2, 0,2,3);
  uvs.push (e.u/UU,e.v/VV, j.u/UU,j.v/VV, k.u/UU,k.v/VV, f.u/UU,f.v/VV); // e,j,k,f

	// PX
  vertices.push(WW/2,HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2, WW/2,HH/2,-DD/2 ); // 1,2,6,5
  indices.push (4,5,6, 4,6,7); // [0,1,2, 0,2,3] + 4
  uvs.push (f.u/UU,f.v/VV, k.u/UU,k.v/VV, l.u/UU,l.v/VV, g.u/UU,g.v/VV); // f,k,l,g
	
	// NX
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, -WW/2,HH/2,DD/2 ); // 4,7,3,0
  indices.push (8,9,10, 8,10,11); // [0,1,2, 0,2,3] + 8
  uvs.push (d.u/UU,d.v/VV, i.u/UU,i.v/VV, j.u/UU,j.v/VV, e.u/UU,e.v/VV); // d,i,j,e

    // NY
  vertices.push(-WW/2,-HH/2,DD/2, -WW/2,-HH/2,-DD/2, WW/2,-HH/2,-DD/2, WW/2,-HH/2,DD/2 ); // 3,7,6,2
  indices.push (12,13,14, 12,14,15); // [0,1,2, 0,2,3] + 12
  uvs.push (b.u/UU,b.v/VV, f.u/UU,f.v/VV, x.u/UU,x.v/VV, c.u/UU,c.v/VV); // b,f,x,c

   // NZ
  vertices.push(WW/2,HH/2,-DD/2, WW/2,-HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,HH/2,-DD/2 ); // 5,6,7,4
  indices.push (16,17,18, 16,18,19); // [0,1,2, 0,2,3] + 16
  uvs.push (g.u/UU,g.v/VV, l.u/UU,l.v/VV, m.u/UU,m.v/VV, h.u/UU,h.v/VV); // g,l,m,h

  // PY
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,HH/2,DD/2, WW/2,HH/2,DD/2, WW/2,HH/2,-DD/2 ); // 4,0,1,5
  indices.push (20,21,22, 20,22,23); // [0,1,2, 0,2,3] + 20
  uvs.push (a.u/UU,a.v/VV, e.u/UU,e.v/VV, f.u/UU,f.v/VV, b.u/UU,b.v/VV); // a,e,f,b
  
  geometry.setIndex(indices);  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));	
	
  let mesh = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, side:THREE.DoubleSide}));
  let body = new THREE.Group();
  body.add(mesh);
  mesh.position.set(0, HH/2, 0);
  //let axis = new THREE.AxesHelper(25)
  //body.add(axis)
  
  return body;
}


function buildLeg2(WW, HH, DD) {

  var geometry = new THREE.BufferGeometry();	
  var vertices = [];
  var indices = [];
  var uvs = [];

  ////////////
  const ww = 1;
  const hh = 3;
  const UU = 14*ww;
  const VV = hh + 5*ww;
  
  var a = {u: ww, v: hh+ww};
  var b = {u: 2*ww, v: hh+ww};
  var c = {u: 6*ww, v: hh+ww};
  var d = {u: 0, v: hh};
  var e = {u: ww, v: hh};
  var f = {u: 2*ww, v: hh};
  var g = {u: 3*ww, v: hh};
  var h = {u: 4*ww, v: hh};
  var i = {u: 0, v: 0};
  var j = {u: ww, v: 0};
  var k = {u: 2*ww, v: 0};
  var l = {u: 3*ww, v: 0};
  var m = {u: 4*ww, v: 0};

  // PZ
  vertices.push(-WW/2,HH/2,DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,HH/2,DD/2 ); // 0,3,2,1
  indices.push(0,1,2, 0,2,3);
  uvs.push (e.u/UU,e.v/VV, j.u/UU,j.v/VV, k.u/UU,k.v/VV, f.u/UU,f.v/VV); // e,j,k,f

  // PX
  vertices.push(WW/2,HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2, WW/2,HH/2,-DD/2 ); // 1,2,6,5
  indices.push (4,5,6, 4,6,7); // [0,1,2, 0,2,3] + 4
  uvs.push (f.u/UU,f.v/VV, k.u/UU,k.v/VV, l.u/UU,l.v/VV, g.u/UU,g.v/VV); // f,k,l,g
	
  // NX
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, -WW/2,HH/2,DD/2 ); // 4,7,3,0
  indices.push (8,9,10, 8,10,11); // [0,1,2, 0,2,3] + 8
  uvs.push (d.u/UU,d.v/VV, i.u/UU,i.v/VV, j.u/UU,j.v/VV, e.u/UU,e.v/VV); // d,i,j,e

  // NZ
  vertices.push(WW/2,HH/2,-DD/2, WW/2,-HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,HH/2,-DD/2 ); // 5,6,7,4
  indices.push (12,13,14, 12,14,15); // [0,1,2, 0,2,3] + 12
  uvs.push (g.u/UU,g.v/VV, l.u/UU,l.v/VV, m.u/UU,m.v/VV, h.u/UU,h.v/VV); // g,l,m,h
  
  // PY
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,HH/2,DD/2, WW/2,HH/2,DD/2, WW/2,HH/2,-DD/2 ); // 4,0,1,5
  indices.push (16,17,18, 16,18,19); // [0,1,2, 0,2,3] + 16
  uvs.push (a.u/UU,a.v/VV, e.u/UU,e.v/VV, f.u/UU,f.v/VV, b.u/UU,b.v/VV); // a,e,f,b
   
  // NY
  vertices.push(-WW/2,-HH/2,DD/2, -WW/2,-HH/2,-DD/2, WW/2,-HH/2,-DD/2, WW/2,-HH/2,DD/2 ); // 3,7,6,2
  indices.push (20,21,22, 20,22,23); // [0,1,2, 0,2,3] + 20
  uvs.push (b.u/UU,b.v/VV, f.u/UU,f.v/VV, g.u/UU,g.v/VV, c.u/UU,c.v/VV); // b,f,g,c
  
  
  geometry.setIndex(indices);  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));	
	
  let mesh = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, side:THREE.DoubleSide}));
  let leg = new THREE.Group();
  leg.add(mesh);
  mesh.position.set(0, -HH/2, 0);
  //let axis = new THREE.AxesHelper(25)
  //leg.add(axis)
  
  return leg;
}

function buildArm2(WW, HH, DD) {

  var geometry = new THREE.BufferGeometry();	
  var vertices = [];
  var indices = [];
  var uvs = [];

  ////////////
  const ww = 1;
  const hh = 3;
  const UU = 14*ww;
  const VV = hh + 5*ww;
  
  var a = {u:11*ww, v:hh+ww};
  var b = {u:12*ww, v:hh+ww};
  var c = {u:13*ww, v:hh+ww};
  var d = {u:10*ww, v:hh};
  var e = {u:11*ww, v:hh};
  var f = {u:12*ww, v:hh};
  var g = {u:13*ww, v:hh};
  var h = {u:14*ww, v:hh};
  var i = {u:10*ww, v:0};
  var j = {u:11*ww, v:0};
  var k = {u:12*ww, v:0};
  var l = {u:13*ww, v:0};
  var m = {u:14*ww, v:0};

  // PZ
  vertices.push(-WW/2,HH/2,DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,HH/2,DD/2 ); // 0,3,2,1
  indices.push(0,1,2, 0,2,3);
  uvs.push (e.u/UU,e.v/VV, j.u/UU,j.v/VV, k.u/UU,k.v/VV, f.u/UU,f.v/VV); // e,j,k,f

  // PX
  vertices.push(WW/2,HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2, WW/2,HH/2,-DD/2 ); // 1,2,6,5
  indices.push (4,5,6, 4,6,7); // [0,1,2, 0,2,3] + 4
  uvs.push (f.u/UU,f.v/VV, k.u/UU,k.v/VV, l.u/UU,l.v/VV, g.u/UU,g.v/VV); // f,k,l,g
	
  // NX
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, -WW/2,HH/2,DD/2 ); // 4,7,3,0
  indices.push (8,9,10, 8,10,11); // [0,1,2, 0,2,3] + 8
  uvs.push (d.u/UU,d.v/VV, i.u/UU,i.v/VV, j.u/UU,j.v/VV, e.u/UU,e.v/VV); // d,i,j,e

  // NZ
  vertices.push(WW/2,HH/2,-DD/2, WW/2,-HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,HH/2,-DD/2 ); // 5,6,7,4
  indices.push (12,13,14, 12,14,15); // [0,1,2, 0,2,3] + 12
  uvs.push (g.u/UU,g.v/VV, l.u/UU,l.v/VV, m.u/UU,m.v/VV, h.u/UU,h.v/VV); // g,l,m,h
  
  // PY
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,HH/2,DD/2, WW/2,HH/2,DD/2, WW/2,HH/2,-DD/2 ); // 4,0,1,5
  indices.push (16,17,18, 16,18,19); // [0,1,2, 0,2,3] + 16
  uvs.push (a.u/UU,a.v/VV, e.u/UU,e.v/VV, f.u/UU,f.v/VV, b.u/UU,b.v/VV); // a,e,f,b
   
  // NY
  vertices.push(-WW/2,-HH/2,DD/2, -WW/2,-HH/2,-DD/2, WW/2,-HH/2,-DD/2, WW/2,-HH/2,DD/2 ); // 3,7,6,2
  indices.push (20,21,22, 20,22,23); // [0,1,2, 0,2,3] + 20
  uvs.push (b.u/UU,b.v/VV, f.u/UU,f.v/VV, g.u/UU,g.v/VV, c.u/UU,c.v/VV); // b,f,g,c
  
  
  geometry.setIndex(indices);  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));	
	
  let mesh = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, side:THREE.DoubleSide}));
  let arm = new THREE.Group();
  arm.add(mesh);
  mesh.position.set(0, -HH/2, 0);
  //let axis = new THREE.AxesHelper(25)
  //arm.add(axis)
  
  return arm;
}