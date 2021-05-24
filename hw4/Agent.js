class Agent {
  
  constructor(pos, mesh) {
    this.pos = pos.clone();
    this.vel = new THREE.Vector3();
    this.force = new THREE.Vector3();
    this.target = null;
    this.size = 6;  // half width
    this.mesh = mesh;
    scene.add (mesh);
    
    this.MAXSPEED = 60;
    this.ARRIVAL_R = 5;
    this.nbhd = [];

    // for orientable agent
    this.angle = 0;
  }
  
  update(dt) {
    this.accumulateForce();
    
    // collision
    // for all obstacles in the scene
    let obs = scene.obstacles;

    // pick the most threatening one
    let theOne = null;
    let dist = 1e10; //預設10^-10
    let vhat = this.vel.clone().normalize();
    const REACH = 60;
    const K = 30;
    let perp; 
    for (let i = 0; i < obs.length; i++) {
      let point = obs[i].center.clone().sub (this.pos) // c-p 
      let proj  = point.dot(vhat);
      if (proj > 0 && proj < REACH) {
        perp = new THREE.Vector3();
        perp.subVectors (point, vhat.clone().setLength(proj));
        let overlap = obs[i].size + this.size - perp.length();
        if (overlap > 0 && proj < dist) {
            theOne = obs[i];
            dist = proj; //找最小的proj
            perp.setLength (K*overlap); //越靠近force越大
            perp.negate(); 
        }
      }
    }
    if (theOne)
       this.force.add (perp);
       
    this.vel.add(this.force.clone().multiplyScalar(dt));


    // ARRIVAL: velocity modulation 當靠近目標時 速度要變慢
    if (this.target !== null) {
      let diff = this.target.clone().sub(this.pos)
      let dst = diff.length();
      if (dst < this.ARRIVAL_R) {
        this.vel.setLength(dst*0.1); //dst越小 速度越慢
      }
    }
    this.pos.add(this.vel.clone().multiplyScalar(dt))
    this.mesh.position.copy(this.pos)
    
    // for orientable agent
    // non PD version
    if (this.vel.length() > 0.5) {
			this.angle = Math.atan2 (-this.vel.z, this.vel.x)
    		this.mesh.rotation.y = this.angle;
   	}
	
  }

  setTarget(x,y,z) {
  	if (this.target)
	    this.target.set(x,y,z);
    else
    	this.target = new THREE.Vector3(x,y,z);
  }
  
  targetInducedForce(targetPos) { // seek
    return targetPos.clone().sub(this.pos).normalize().multiplyScalar(this.MAXSPEED).sub(this.vel);
  }

  accumulateForce() {
    if (this.target !== null)
    	this.force.copy(this.targetInducedForce(this.target));
	////////////////////////////////////////
    // group steer related
    // separation
    
	let push = new THREE.Vector3()
    if(flag == 1){
		for (let i = 0; i < this.nbhd.length; i++) {
		  let point = this.pos.clone().sub(this.nbhd[i].pos);
		  push.add(point.setLength(200 / point.length()))
		}
	    this.force.add(push)

	}
		// coherence
    if(flag == 0){
		if (this.nbhd.length > 0) { // 如果this.nbhd有其他agents
		  
		  var sum = new THREE.Vector3();
          for(var i = 0; i < this.nbhd.length; i++) sum.add(this.nbhd[i].pos);
          sum.divideScalar(this.nbhd.length);
	      this.force.add(this.targetInducedForce(sum));
		  // 算出 nbhd的平均位置
		  // 利用 targetInducedForce （來吸引 this 往平均位置靠近）	
		  // 將此力加到 this.force
		}
	}

  }
  
  distanceTo(otherAgent) {
    return this.pos.distanceTo(otherAgent.pos)
  }
  
  addNbr(otherAgent) {
    this.nbhd.push(otherAgent)
  }
}
