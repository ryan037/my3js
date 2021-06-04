class Path {
  
  constructor(pS, pE, radius) {
    this.pS = pS.clone();
    this.pE = pE.clone();
    this.radius = radius;	
  }
  
  creatPath(){	  	  
	  
	  let end = new THREE.Mesh (new THREE.CircleGeometry (4,20), new THREE.MeshBasicMaterial({color:'red'}));  
	  let path = new THREE.Mesh (new THREE.PlaneGeometry (this.pS.distanceTo(this.pE), 2*radius), new THREE.MeshBasicMaterial({color:'yellow', transparent:true, opacity:0.2}));
	  scene.add (path);
	  let end2 = end.clone();
	  end.position.copy (this.pS);
	  end2.position.copy (this.pE);
	  
	  scene.add (end, end2);
	  
	  let center = this.pS.clone().add(this.pE).multiplyScalar(0.5);// (pS+pE)/2
	  path.position.copy (center);
	  let p = this.pE.clone().sub(this.pS); // pE-pS
	  let angle = Math.atan2(p.y, p.x);
	  
	  path.rotation.z = angle;  
	  
  }
  
}