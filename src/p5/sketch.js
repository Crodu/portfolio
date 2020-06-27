// Sketch.js 
import writePos from './movement.js'

export default function Sketch(p5) {
    let size;
    let canvas;
    
    let obj;
    let pos = {
      x: 1,
      y: 50,
      z: 50
    }
    let ang = {
      alpha: -1.0,
      beta: -1.0,
      gamma: 0.0
    }
    let rot = {
      x: 0,
      y: 0
    }

    p5.preload = () => {
      obj = {
        base: p5.loadModel("data/r5.obj"),
        shoulder: p5.loadModel("./data/r1.obj"),
        upArm: p5.loadModel("./data/r2.obj"),
        loArm: p5.loadModel("./data/r3.obj"),
        endp: p5.loadModel("./data/r4.obj"),
      };
      //console.log(obj)
    }
    
    p5.setup = () => {
      canvas = p5.createCanvas(
        window.innerWidth,
        window.innerHeight,
        p5.WEBGL);    

        size = {
          width: window.innerWidth,
          height: window.innerHeight
        }
    };

    p5.myCustomRedrawAccordingToNewPropsHandler = function (props) {
      if (props.size){
        size = props.size
        p5.resizeCanvas(props.size.width, props.size.height)
      }
    };
  
    p5.draw = () => {
      p5.background(32);
      p5.smooth();
      p5.noStroke()
      p5.ambientLight(182,182,182);
      p5.directionalLight(51, 102, 126, 0, -1, -1)
      p5.fill(0xFFFF9F03)
      p5.ambientMaterial(250); 

      mouseHandle();

      let wpo = writePos()
      ang = {
        alpha: wpo.angs[0],
        beta: wpo.angs[1],
        gamma: wpo.angs[2]
      }
      pos = wpo.pos;
      p5.scale(-4)
      p5.push()
      showShapes();
      p5.pop()
      
      trail(pos, spheres);
      

      
    };    

    let spheres = [];
    const trail = (pos, spheres) => {

      if(spheres.length < 150){
        spheres.push({x: pos.x, y: pos.y, z: pos.z})
      }else{
        for(let i = 0;i < spheres.length -1; i++){
          spheres[i] = spheres[i+1]  
        }
        spheres[spheres.length - 1] = {x: pos.x, y: pos.y, z: pos.z};
      }
      for(let i = 0;i < spheres.length; i++){
        p5.push()       
        console.log(spheres)
        p5.translate(-spheres[i].y, -spheres[i].z-11, -spheres[i].x)
        p5.fill(255,255,255,(255/spheres.length)*i)
        p5.sphere(i/45, 8);               
        p5.pop()  
      }      
      //console.log(spheres)
    }

    const showShapes = () => {
      //p5.translate(size.width/2, size.height/2)
      let c = p5.color('#4f4f4fff')
      p5.fill(c)

      p5.translate(0,-40,0)
      

      p5.model(obj.base)  

      c = p5.color('#ff7600ff')
      p5.fill(c)
      p5.translate(0, 4, 0)
      p5.rotateY(ang.gamma)
      p5.model(obj.shoulder)
        
      p5.translate(0, 25, 0)
      p5.rotateY(Math.PI)
      p5.rotateX(ang.alpha)
      p5.model(obj.upArm)
          
      // //box(3,3,150)  
        
      p5.translate(0, 0, 50)
      p5.rotateY(Math.PI)
      p5.rotateX(ang.beta)
      p5.model(obj.loArm)
        
      p5.translate(0, 0, -50)
      p5.rotateY(Math.PI)
      p5.model(obj.endp)
      
      //trail(pos);
    
  }
    
    
    p5.mouseDragged = () => {
      rot.y -= (p5.mouseX - p5.pmouseX) * 0.01
      rot.x -= (p5.mouseY - p5.pmouseY) * 0.01
    }
    let mouseHandle = () =>{
      p5.rotateX(rot.x)
      p5.rotateY(-rot.y)
    }

  }