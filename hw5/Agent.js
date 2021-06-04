class Agent {
  
  constructor(pos, mesh) {
    this.pos = pos.clone();
    this.vel = new THREE.Vector3();
    this.force = new THREE.Vector3();
    this.target = null;
    this.size = 3;
    this.mesh = mesh;
    scene.add (mesh);
    this.MAXSPEED = 5;
    this.ARRIVAL_R = 30;
    
    // for orientable agent
    this.angle = 0;
  }
  
  update(dt) {
    this.accumulateForce();
    this.vel.add(this.force.clone().multiplyScalar(dt));

		// ARRIVAL: velocity modulation
    if (this.target) {
      let diff = this.target.clone().sub(this.pos)
      let dst = diff.length();
      if (dst < this.ARRIVAL_R) {
        this.vel.setLength(dst)
      }
    }

		
    // MAXSPEED modulation
		let speed = this.vel.length()
		this.vel.setLength(Math.clamp (speed, 0, this.MAXSPEED))
		this.pos.add(this.vel.clone().multiplyScalar(dt))
    this.mesh.position.copy(this.pos)
    
    // for orientable agent
    if (this.vel.length() > 1) {
	    	this.angle = Math.atan2 (this.vel.y, this.vel.x)
    		this.mesh.rotation.z = this.angle;
   	}
  }
  
  setTarget(x,y,z) {
    if (this.target)
    	this.target.set(x,y,z);
    else
    	this.target = new THREE.Vector3(x,y,z);
  }
  
  targetInducedForce(targetPos, mode=0) { // seek
 
    let speed;
    if (mode === 0)
    	speed = this.MAXSPEED;
    else if (mode === 1)
    	speed = this.vel.length();
    	
    return targetPos.clone().sub(this.pos).normalize().multiplyScalar(speed).sub(this.vel)
  }

  accumulateForce() {
	//this.force.set (0,0,0);
    if (this.target)
			this.force.add(this.targetInducedForce(this.target));
		
    // path related (for simple straight line)
	let push = new THREE.Vector3()
    for (let i = 0; i < this.nbhd.length; i++) {
      let point = this.pos.clone().sub(this.nbhd[i].pos);
      push.add(point.setLength(1 / point.length()))
    }
    this.force.add(push)
	
	let posF = this.pos.clone().add (this.vel);
	
	if(this.pos.x>=-100 && this.pos.x<-50){
		
		let pHat =  p2.clone().sub(p1).normalize();
		// compute proj
		let tmp = posF.clone().sub(p1);
		let proj = pHat.multiplyScalar(tmp.dot(pHat)).add(p1);
		let distance = posF.distanceTo(proj);
		if(distance > radius){
			let correction = this.targetInducedForce(proj, 1);
			this.force.add(correction);
		}
	}
	if(this.pos.x>=-50 && this.pos.x<0){
		
		let pHat =  p3.clone().sub(p2).normalize();
		// compute proj
		let tmp = posF.clone().sub(p2);
		let proj = pHat.multiplyScalar(tmp.dot(pHat)).add(p2);
		let distance = posF.distanceTo(proj);
		if(distance > radius){
			let correction = this.targetInducedForce(proj, 1);
			this.force.add(correction);
		}
	}
	if(this.pos.x>=0 && this.pos.x<50){
		
		let pHat =  p4.clone().sub(p3).normalize();
		// compute proj
		let tmp = posF.clone().sub(p3);
		let proj = pHat.multiplyScalar(tmp.dot(pHat)).add(p3);
		let distance = posF.distanceTo(proj);
		if(distance > radius){
			let correction = this.targetInducedForce(proj, 1);
			this.force.add(correction);
		}
	}
	if(this.pos.x>=50 && this.pos.x<100){
		
		let pHat =  p5.clone().sub(p4).normalize();
		// compute proj
		let tmp = posF.clone().sub(p4);
		let proj = pHat.multiplyScalar(tmp.dot(pHat)).add(p4);
		let distance = posF.distanceTo(proj);
		if(distance > radius){
			let correction = this.targetInducedForce(proj, 1);
			this.force.add(correction);
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