let F = 50
let T = 70
let millisOld = 4,
    gTime = 4, 
    gSpeed = 4;

let pos = {
    x: 1,
    y: 50,
    z: 50
}

let millis = function(){
    return Date.now()
}

let IK = () =>{    

    let X = pos.x,
        Y = pos.y,
        Z = pos.z,
        L = Math.sqrt(Y*Y+X*X),
        dia = Math.sqrt(Z*Z+L*L);
    const pi = Math.PI

    let alpha = pi/2-(Math.atan2(L, Z)+Math.acos((T*T-F*F-dia*dia)/(-2*F*dia))),
        beta = -pi+Math.acos((dia*dia-T*T-F*F)/(-2*F*T)),
        gamma = Math.atan2(Y, X);
    return [alpha, beta, gamma]
}

let setTime = () =>{
    gTime += (millis()/1000 - millisOld)*(gSpeed/4)
    
    if(gTime >= 4){
        gTime = 0
    }
    millisOld = millis()/1000
}

let writePos = () => {
    //console.log(gTime)
    pos.x = Math.sin(gTime*Math.PI/2)*20
    pos.z = Math.sin(gTime*Math.PI)*20
    pos.y = Math.abs(Math.sin(gTime*Math.PI))*40+25;
    //console.log(gTime, pos.y)
    

    let angs = IK(pos.x, pos.y, pos.z)

    setTime()
    
    //console.log(angs)
    return {angs: angs, pos: pos}
}
export default writePos